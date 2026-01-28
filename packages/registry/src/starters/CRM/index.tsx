import React from 'react';
import { FaBriefcase } from 'react-icons/fa6';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'crm-starter',
  name: 'CRM System Starter',
  description: 'Customer Relationship Management template with contact management and interaction tracking',
  category: 'crm' as const,
  tags: ['crm', 'customers', 'sales', 'nextjs'],
  layout: {
    layoutClass: 'starter',
    columnSpan: 8,
    rowSpan: 8,
  },
  componentDependencies: [],
  fullPageLayout: true,
};

const starterMetadata: StarterMetadata = {
  ...baseMetadata,
  variants: [
    {
      name: 'Basic CRM',
      description: 'Simple customer and contact management system',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "crm-starter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,
          isEntryPoint: false,
        },
        {
          filename: 'next.config.js',
          language: 'javascript',
          code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;`,
          isEntryPoint: false,
        },
        {
          filename: 'app/layout.tsx',
          language: 'typescript',
          code: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CRM System',
  description: 'Customer Relationship Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
          isEntryPoint: true,
        },
        {
          filename: 'app/page.tsx',
          language: 'typescript',
          code: `'use client';

import { useEffect, useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import './page.css';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'prospect' | 'customer' | 'lead' | 'inactive';
  createdAt: number;
}

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('customers');
    if (saved) {
      setCustomers(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  const saveCustomers = (newCustomers: Customer[]) => {
    setCustomers(newCustomers);
    localStorage.setItem('customers', JSON.stringify(newCustomers));
  };

  const addCustomer = (formData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...formData,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    saveCustomers([...customers, newCustomer]);
    setShowForm(false);
  };

  const deleteCustomer = (id: string) => {
    saveCustomers(customers.filter(c => c.id !== id));
  };

  if (!loaded) return <div className="container">Loading...</div>;

  const statusCounts = {
    prospect: customers.filter(c => c.status === 'prospect').length,
    customer: customers.filter(c => c.status === 'customer').length,
    lead: customers.filter(c => c.status === 'lead').length,
  };

  return (
    <main className="crm-app">
      <header className="crm-header">
        <h1>📊 CRM System</h1>
        <div className="stats">
          <div className="stat">
            <strong>{customers.length}</strong> Total Contacts
          </div>
          <div className="stat">
            <strong>{statusCounts.prospect}</strong> Prospects
          </div>
          <div className="stat">
            <strong>{statusCounts.customer}</strong> Customers
          </div>
        </div>
      </header>

      <section className="crm-container">
        <div className="crm-sidebar">
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '➕ Add Contact'}
          </button>

          {showForm && (
            <CustomerForm onAdd={addCustomer} />
          )}
        </div>

        <div className="crm-main">
          <CustomerList
            customers={customers}
            onDelete={deleteCustomer}
          />
        </div>
      </section>
    </main>
  );
}`,
          isEntryPoint: true,
        },
        {
          filename: 'app/components/CustomerForm.tsx',
          language: 'typescript',
          code: `'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'prospect' | 'customer' | 'lead' | 'inactive';
}

interface CustomerFormProps {
  onAdd: (data: FormData) => void;
}

export default function CustomerForm({ onAdd }: CustomerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onAdd(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'lead',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as FormData['status'] })}
      >
        <option value="lead">Lead</option>
        <option value="prospect">Prospect</option>
        <option value="customer">Customer</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit" className="btn-submit">Add Contact</button>
    </form>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/components/CustomerList.tsx',
          language: 'typescript',
          code: `'use client';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'prospect' | 'customer' | 'lead' | 'inactive';
  createdAt: number;
}

interface CustomerListProps {
  customers: Customer[];
  onDelete: (id: string) => void;
}

const statusColors = {
  lead: '#fbbf24',
  prospect: '#60a5fa',
  customer: '#34d399',
  inactive: '#9ca3af',
};

export default function CustomerList({ customers, onDelete }: CustomerListProps) {
  return (
    <div className="customer-list">
      {customers.length === 0 ? (
        <p className="empty-state">No contacts yet. Add one to get started!</p>
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td><strong>{customer.name}</strong></td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.company}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ background: statusColors[customer.status] }}
                  >
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onDelete(customer.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/globals.css',
          language: 'css',
          code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f3f4f6;
  color: #1f2937;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/page.css',
          language: 'css',
          code: `.crm-app {
  min-height: 100vh;
}

.crm-header {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.crm-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat strong {
  font-size: 1.5rem;
  color: #0066cc;
}

.crm-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
}

.crm-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.crm-main {
  flex: 1;
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.btn-primary:hover {
  background: #0052a3;
}

.customer-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.customer-form input,
.customer-form select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.customer-form input:focus,
.customer-form select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.btn-submit {
  padding: 0.75rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-submit:hover {
  background: #059669;
}

.customer-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.customers-table {
  width: 100%;
  border-collapse: collapse;
}

.customers-table thead {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.customers-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #6b7280;
}

.customers-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.customers-table tbody tr:hover {
  background: #f9fafb;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.btn-delete {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-delete:hover {
  background: #dc2626;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #9ca3af;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# CRM System Starter

A customer relationship management template built with Next.js.

## Features

- 👥 Customer contact management
- 📊 Contact status tracking (Lead, Prospect, Customer, Inactive)
- 💾 Local storage persistence
- 📱 Responsive design
- ⚡ Built with Next.js 15

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to use the CRM.

## Customer Fields

- Name
- Email
- Phone
- Company
- Status (Lead, Prospect, Customer, Inactive)

## Build

\`\`\`bash
npm run build
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
    {
      name: 'With Analytics',
      description: 'CRM with sales pipeline tracking and performance analytics',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "crm-analytics",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/layout.tsx',
          language: 'typescript',
          code: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CRM Analytics',
  description: 'CRM with sales analytics and pipeline tracking',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
          isEntryPoint: true,
        },
        {
          filename: 'app/page.tsx',
          language: 'typescript',
          code: `'use client';

import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import SalesAnalytics from './components/SalesAnalytics';
import Navigation from './components/Navigation';
import './page.css';

interface Deal {
  id: string;
  customerName: string;
  value: number;
  stage: 'prospect' | 'proposal' | 'negotiation' | 'closed';
  createdAt: number;
  closedAt?: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics'>('dashboard');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('deals');
    if (saved) {
      setDeals(JSON.parse(saved));
    } else {
      // Initialize with sample data
      const sampleDeals: Deal[] = [
        { id: '1', customerName: 'Acme Corp', value: 50000, stage: 'closed', createdAt: Date.now() - 86400000, closedAt: Date.now() },
        { id: '2', customerName: 'Tech Startup', value: 30000, stage: 'negotiation', createdAt: Date.now() - 172800000 },
        { id: '3', customerName: 'Global Industries', value: 75000, stage: 'proposal', createdAt: Date.now() - 259200000 },
        { id: '4', customerName: 'Local Business', value: 20000, stage: 'prospect', createdAt: Date.now() - 345600000 },
      ];
      setDeals(sampleDeals);
    }
    setLoaded(true);
  }, []);

  if (!loaded) return <div>Loading...</div>;

  return (
    <main className="crm">
      <Navigation activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'dashboard' && <Dashboard deals={deals} />}
      {activeTab === 'analytics' && <SalesAnalytics deals={deals} />}
    </main>
  );
}`,
          isEntryPoint: true,
        },
        {
          filename: 'app/components/Navigation.tsx',
          language: 'typescript',
          code: `'use client';

interface NavigationProps {
  activeTab: 'dashboard' | 'analytics';
  onChange: (tab: 'dashboard' | 'analytics') => void;
}

export default function Navigation({ activeTab, onChange }: NavigationProps) {
  return (
    <nav className="nav-bar">
      <h1>📊 CRM Analytics</h1>
      <div className="nav-buttons">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => onChange('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => onChange('analytics')}
        >
          Analytics
        </button>
      </div>
    </nav>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/components/Dashboard.tsx',
          language: 'typescript',
          code: `'use client';

interface Deal {
  id: string;
  customerName: string;
  value: number;
  stage: 'prospect' | 'proposal' | 'negotiation' | 'closed';
  createdAt: number;
  closedAt?: number;
}

interface DashboardProps {
  deals: Deal[];
}

export default function Dashboard({ deals }: DashboardProps) {
  const closedDeals = deals.filter(d => d.stage === 'closed');
  const totalRevenue = closedDeals.reduce((sum, d) => sum + d.value, 0);
  const avgDealSize = deals.length > 0 ? deals.reduce((sum, d) => sum + d.value, 0) / deals.length : 0;

  return (
    <div className="dashboard">
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-value">{deals.length}</div>
          <div className="kpi-label">Total Deals</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">\${totalRevenue.toLocaleString()}</div>
          <div className="kpi-label">Closed Revenue</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">\${Math.round(avgDealSize).toLocaleString()}</div>
          <div className="kpi-label">Avg Deal Size</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">{Math.round((closedDeals.length / deals.length) * 100)}%</div>
          <div className="kpi-label">Close Rate</div>
        </div>
      </div>

      <div className="pipeline-section">
        <h2>Sales Pipeline</h2>
        <div className="pipeline">
          {['prospect', 'proposal', 'negotiation', 'closed'].map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
            return (
              <div key={stage} className="pipeline-stage">
                <div className="stage-header">{stage.toUpperCase()}</div>
                <div className="stage-amount">\${stageValue.toLocaleString()}</div>
                <div className="stage-count">{stageDeals.length} deals</div>
                <div className="deal-list">
                  {stageDeals.map(deal => (
                    <div key={deal.id} className="deal-card">
                      <div className="deal-name">{deal.customerName}</div>
                      <div className="deal-value">\${deal.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/components/SalesAnalytics.tsx',
          language: 'typescript',
          code: `'use client';

interface Deal {
  id: string;
  customerName: string;
  value: number;
  stage: 'prospect' | 'proposal' | 'negotiation' | 'closed';
  createdAt: number;
  closedAt?: number;
}

interface SalesAnalyticsProps {
  deals: Deal[];
}

export default function SalesAnalytics({ deals }: SalesAnalyticsProps) {
  const byStage = {
    prospect: deals.filter(d => d.stage === 'prospect').reduce((sum, d) => sum + d.value, 0),
    proposal: deals.filter(d => d.stage === 'proposal').reduce((sum, d) => sum + d.value, 0),
    negotiation: deals.filter(d => d.stage === 'negotiation').reduce((sum, d) => sum + d.value, 0),
    closed: deals.filter(d => d.stage === 'closed').reduce((sum, d) => sum + d.value, 0),
  };

  const totalPipeline = Object.values(byStage).reduce((a, b) => a + b, 0);

  return (
    <div className="analytics">
      <h2>Sales Performance</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Pipeline by Stage</h3>
          <div className="stage-breakdown">
            {Object.entries(byStage).map(([stage, value]) => (
              <div key={stage} className="breakdown-item">
                <div className="breakdown-label">{stage}</div>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{
                      width: totalPipeline > 0 ? (value / totalPipeline) * 100 + '%' : '0%',
                    }}
                  />
                </div>
                <div className="breakdown-value">\${value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Deal Distribution</h3>
          <div className="distribution">
            {['prospect', 'proposal', 'negotiation', 'closed'].map(stage => {
              const count = deals.filter(d => d.stage === stage).length;
              return (
                <div key={stage} className="dist-item">
                  <span>{stage}: {count} deals</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/globals.css',
          language: 'css',
          code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f3f4f6;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/page.css',
          language: 'css',
          code: `.crm {
  min-height: 100vh;
}

.nav-bar {
  background: white;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-bar h1 {
  font-size: 1.5rem;
  margin: 0;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-buttons button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-buttons button.active {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}

.dashboard, .analytics {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.kpi-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.kpi-value {
  font-size: 2rem;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 0.5rem;
}

.kpi-label {
  color: #6b7280;
  font-size: 0.9rem;
}

.pipeline-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.pipeline-section h2 {
  margin-bottom: 1.5rem;
}

.pipeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.pipeline-stage {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 4px solid #0066cc;
}

.stage-header {
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #6b7280;
}

.stage-amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.stage-count {
  color: #9ca3af;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.deal-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.deal-card {
  background: white;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.deal-name {
  font-weight: 500;
}

.deal-value {
  color: #0066cc;
  font-weight: 600;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.analytics-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.analytics-card h3 {
  margin-bottom: 1.5rem;
}

.stage-breakdown {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.breakdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.breakdown-label {
  font-weight: 500;
  text-transform: capitalize;
}

.breakdown-bar {
  height: 20px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.breakdown-fill {
  height: 100%;
  background: linear-gradient(90deg, #0066cc, #00c9a7);
  transition: width 0.3s;
}

.breakdown-value {
  font-size: 0.9rem;
  color: #6b7280;
}

.distribution {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dist-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  font-weight: 500;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# CRM with Analytics

A comprehensive CRM system with sales analytics and pipeline tracking.

## Features

- 📈 Sales pipeline visualization
- 📊 Performance analytics
- 💰 Revenue tracking
- 🎯 Deal management
- 📉 Sales metrics and KPIs
- ⚡ Built with Next.js 15

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Dashboard Features

- KPI Cards: Total deals, closed revenue, average deal size, close rate
- Sales Pipeline: Visual representation of deals by stage
- Analytics: Detailed sales performance metrics

## Getting Started

\`\`\`bash
npm run build
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center justify-center gap-3 w-full h-full">
      <FaBriefcase size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
