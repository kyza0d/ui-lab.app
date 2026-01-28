import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'productivity-app',
  name: 'Productivity App Starter',
  description: 'Task and note management application template with local storage persistence',
  category: 'productivity' as const,
  tags: ['productivity', 'nextjs', 'tasks', 'notes'],
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
      name: 'Task Manager',
      description: 'Simple task management app with add, complete, and delete functionality',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "productivity-starter",
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
  title: 'Productivity App',
  description: 'Manage your tasks and boost productivity',
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
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './page.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    saveTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    saveTasks(
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  if (!loaded) return <div className="container">Loading...</div>;

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <main className="container">
      <div className="header">
        <h1>✓ Task Manager</h1>
        <p className="stats">{completedCount} of {tasks.length} tasks completed</p>
      </div>
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </main>
  );
}`,
          isEntryPoint: true,
        },
        {
          filename: 'app/components/TaskForm.tsx',
          language: 'typescript',
          code: `'use client';

import { useState } from 'react';

interface TaskFormProps {
  onAdd: (text: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button type="submit" className="btn-add">Add Task</button>
    </form>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/components/TaskList.tsx',
          language: 'typescript',
          code: `'use client';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet. Add one to get started!</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="task-checkbox"
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text}
            </span>
            <button
              onClick={() => onDelete(task.id)}
              className="btn-delete"
            >
              ✕
            </button>
          </div>
        ))
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem 1rem;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/page.css',
          language: 'css',
          code: `.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.stats {
  color: #666;
  font-size: 0.95rem;
}

.task-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.task-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.task-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add:hover {
  background: #5568d3;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  transition: background 0.2s;
}

.task-item:hover {
  background: #e9ecef;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-item span {
  flex: 1;
  color: #333;
}

.task-item span.completed {
  text-decoration: line-through;
  color: #999;
}

.btn-delete {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  transition: color 0.2s;
}

.btn-delete:hover {
  color: #f56565;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 2rem;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Productivity App - Task Manager

A simple task management application built with Next.js 15 and React 19.

## Features

- ✓ Add, complete, and delete tasks
- 💾 Local storage persistence
- 📊 Task completion stats
- 🎨 Clean, modern UI
- ⚡ Built with Next.js App Router

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Project Structure

\`\`\`
app/
├── page.tsx          # Main page
├── layout.tsx        # Root layout
├── page.css          # Page styles
├── globals.css       # Global styles
└── components/
    ├── TaskForm.tsx  # Add task form
    └── TaskList.tsx  # Task list display
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
    {
      name: 'Advanced with Notes',
      description: 'Extended productivity app with task categories, notes, and reminders',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "advanced-productivity",
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
    "react-dom": "^19.0.0",
    "date-fns": "^3.0.0"
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
          filename: 'app/layout.tsx',
          language: 'typescript',
          code: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Advanced Productivity Suite',
  description: 'Tasks, notes, and reminders in one place',
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
import TaskSection from './components/TaskSection';
import NoteSection from './components/NoteSection';
import Navigation from './components/Navigation';
import './page.css';

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  dueDate?: string;
  createdAt: number;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'notes'>('tasks');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedNotes = localStorage.getItem('notes');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    setLoaded(true);
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  if (!loaded) return <div>Loading...</div>;

  return (
    <main className="app">
      <aside className="sidebar">
        <h1>📊 ProductivityHub</h1>
        <Navigation activeTab={activeTab} onChange={setActiveTab} />
      </aside>
      <section className="content">
        {activeTab === 'tasks' && (
          <TaskSection tasks={tasks} onSaveTasks={saveTasks} />
        )}
        {activeTab === 'notes' && (
          <NoteSection notes={notes} onSaveNotes={saveNotes} />
        )}
      </section>
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
  activeTab: 'tasks' | 'notes';
  onChange: (tab: 'tasks' | 'notes') => void;
}

export default function Navigation({ activeTab, onChange }: NavigationProps) {
  return (
    <nav className="navigation">
      <button
        className={activeTab === 'tasks' ? 'active' : ''}
        onClick={() => onChange('tasks')}
      >
        ✓ Tasks
      </button>
      <button
        className={activeTab === 'notes' ? 'active' : ''}
        onClick={() => onChange('notes')}
      >
        📝 Notes
      </button>
    </nav>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/components/TaskSection.tsx',
          language: 'typescript',
          code: `'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  dueDate?: string;
  createdAt: number;
}

interface TaskSectionProps {
  tasks: Task[];
  onSaveTasks: (tasks: Task[]) => void;
}

export default function TaskSection({ tasks, onSaveTasks }: TaskSectionProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSaveTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title,
          category,
          completed: false,
          createdAt: Date.now(),
        }
      ]);
      setTitle('');
    }
  };

  return (
    <div className="section">
      <h2>Tasks</h2>
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                const updated = tasks.map(t =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                );
                onSaveTasks(updated);
              }}
            />
            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            <span className="category-badge">{task.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/components/NoteSection.tsx',
          language: 'typescript',
          code: `'use client';

import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

interface NoteSectionProps {
  notes: Note[];
  onSaveNotes: (notes: Note[]) => void;
}

export default function NoteSection({ notes, onSaveNotes }: NoteSectionProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSaveNotes([
        ...notes,
        {
          id: Date.now().toString(),
          title,
          content,
          tags: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
      ]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="section">
      <h2>Notes</h2>
      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content..."
          rows={6}
        />
        <button type="submit">Save Note</button>
      </form>
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
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
  background: #f5f7fa;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'app/page.css',
          language: 'css',
          code: `.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 2rem;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
}

.sidebar h1 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.navigation button {
  padding: 0.75rem 1rem;
  background: transparent;
  color: #bbb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.navigation button:hover {
  background: #34495e;
  color: white;
}

.navigation button.active {
  background: #3498db;
  color: white;
}

.content {
  flex: 1;
  padding: 2rem;
}

.section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section h2 {
  margin-bottom: 1.5rem;
}

.task-form, .note-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.task-form input, .task-form select,
.note-form input, .note-form textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.task-form input {
  flex: 1;
  min-width: 250px;
}

.note-form input {
  width: 100%;
  margin-bottom: 0.75rem;
}

.note-form textarea {
  width: 100%;
  margin-bottom: 0.75rem;
}

.task-form button, .note-form button {
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.task-list, .notes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.category-badge {
  margin-left: auto;
  padding: 0.25rem 0.75rem;
  background: #e8f0f7;
  color: #3498db;
  border-radius: 12px;
  font-size: 0.85rem;
}

.note-card {
  padding: 1rem;
  border-left: 4px solid #3498db;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.note-card h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.note-card p {
  color: #555;
  white-space: pre-wrap;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Advanced Productivity Suite

A feature-rich productivity application with tasks, notes, and categories.

## Features

- ✓ Task management with categories
- 📝 Note-taking functionality
- 💾 Local storage persistence
- 🏷️ Task categorization (Work, Personal, Shopping)
- 📊 Organized dashboard
- ⚡ Built with Next.js 15

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Task creation with due dates and categories
- Note-taking with rich content
- Sidebar navigation
- Persistent local storage
- Clean, modern UI

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
      <FaCheck size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
