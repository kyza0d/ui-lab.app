import React from 'react';
import { Table } from "ui-lab-components";
import { ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-table.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "70%" }} className='w-full'>
      <div style={{ width: "60%" }} className="flex py-1 px-1 mb-2 rounded-sm overflow-hidden border border-background-700 flex flex-col">
        <div style={{ width: 46, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-sm h-2'></div>
      </div>
      <div className="flex rounded-sm overflow-hidden border border-background-700 flex flex-col max-w-sm">
        <div className='w-full bg-background-800 flex items-center gap-1 flex'>
          <div style={{ width: "26%" }} className='h-5 flex items-center pl-1'>
            <div style={{ width: 24, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
          </div>
          <div style={{ width: "26%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
            <div style={{ width: 14, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
          </div>
          <div style={{ width: "52%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
            <div style={{ width: 34, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='w-full border-b border-background-700 flex items-center gap-1 flex'>
            <div style={{ width: "26%" }} className='h-5 flex items-center pl-1'>
              <div style={{ width: 22, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
            <div style={{ width: "26%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
              <div style={{ width: 22, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
            <div style={{ width: "52%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
              <div style={{ width: 40, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
          </div>
          <div className='w-full border-b border-background-700 flex items-center gap-1 flex'>
            <div style={{ width: "26%" }} className='h-5 flex items-center pl-1'>
              <div style={{ width: 16, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
            <div style={{ width: "26%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
              <div style={{ width: 15, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
            <div style={{ width: "52%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
              <div style={{ width: 36, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
          </div>
          <div className='w-full flex items-center gap-1 flex'>
            <div style={{ width: "26%" }} className='h-5 flex items-center pl-1'>
              <div style={{ width: 26, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
            <div style={{ width: "26%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
              <div style={{ width: 18, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
            <div style={{ width: "52%" }} className='h-5 flex items-center pl-1 border-l border-background-700'>
              <div style={{ width: 35, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define examplesData locally
const examplesData = [
  { id: '01-basic-table', Component: Example1, metadata: metadata1 },
];

interface SampleData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const sampleData: SampleData[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
  { id: 3, name: "Carol White", email: "carol@example.com", status: "Active" },
];

const tableBasicCode = `import { Table } from "@/components/table";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const data: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
];

export function Example() {
  return (
    <Table
      data={data}
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}`;

export const tableDetail: ComponentDetail = {
  id: "table",
  name: "Table",
  description: "A minimal table component for displaying tabular data with optional filtering capabilities.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Table component provides a clean, semantic way to display structured data with optional filter controls. It's designed to be minimal yet functional, supporting both basic data display and advanced filtering scenarios.
      </p>
      <p>
        Use filters to enable real-time data filtering, and row click handlers to create interactive experiences. The component manages filter state internally and provides callbacks for external state management.
      </p>
    </div>
  ),
  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "A simple table displaying data",
      code: tableBasicCode,
      preview: (
        <Table
          data={sampleData}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "status", label: "Status" },
          ]}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: "default",
      name: "Default",
      description: "Basic table for displaying structured data.",
      code: tableBasicCode,
      preview: (
        <Table
          data={sampleData}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
          ]}
        />
      ),
    },
  ],
};

export * from './examples';
