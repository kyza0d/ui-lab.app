import React from 'react';
import { SiVite } from 'react-icons/si';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'vite-react',
  name: 'Vite + React Starter',
  description: 'Modern, fast build tool with React 19 and TypeScript for instant development experience',
  category: 'framework' as const,
  tags: ['vite', 'react', 'typescript', 'fast-refresh'],
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
      name: 'Basic',
      description: 'Minimal Vite + React setup with TypeScript',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "vite-react-starter",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5",
    "vite": "^5.0.0"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'vite.config.ts',
          language: 'typescript',
          code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})`,
          isEntryPoint: false,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
          isEntryPoint: false,
        },
        {
          filename: 'index.html',
          language: 'html',
          code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/main.tsx',
          language: 'typescript',
          code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
          isEntryPoint: true,
        },
        {
          filename: 'src/App.tsx',
          language: 'typescript',
          code: `import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Vite + React</h1>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App`,
          isEntryPoint: true,
        },
        {
          filename: 'src/index.css',
          language: 'css',
          code: `:root {
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Vite + React Starter

A modern, lightweight starter template using Vite and React 19 with TypeScript.

## Features

- ⚡ Lightning-fast build tool (Vite)
- ⚛️ React 19 with TypeScript
- 🔥 Hot Module Replacement (HMR)
- 📦 Minimal dependencies
- 🎯 Production-ready

## Getting Started

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Start development server:

\`\`\`bash
npm run dev
\`\`\`

Build for production:

\`\`\`bash
npm run build
\`\`\`

Preview production build:

\`\`\`bash
npm run preview
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
    {
      name: 'With Router',
      description: 'Vite + React with React Router for client-side routing',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "vite-react-router-starter",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5",
    "vite": "^5.0.0"
  }
}`,
          isEntryPoint: true,
        },
        {
          filename: 'vite.config.ts',
          language: 'typescript',
          code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})`,
          isEntryPoint: false,
        },
        {
          filename: 'tsconfig.json',
          language: 'json',
          code: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
          isEntryPoint: false,
        },
        {
          filename: 'index.html',
          language: 'html',
          code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React Router</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
          isEntryPoint: false,
        },
        {
          filename: 'src/main.tsx',
          language: 'typescript',
          code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
          isEntryPoint: true,
        },
        {
          filename: 'src/App.tsx',
          language: 'typescript',
          code: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App`,
          isEntryPoint: true,
        },
        {
          filename: 'src/pages/Home.tsx',
          language: 'typescript',
          code: `export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to your Vite + React Router application</p>
    </div>
  )
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/pages/About.tsx',
          language: 'typescript',
          code: `export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
    </div>
  )
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src/index.css',
          language: 'css',
          code: `:root {
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

body {
  margin: 0;
  font-family: sans-serif;
}

.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #333;
}

.navbar a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

.navbar a:hover {
  background-color: #555;
  border-radius: 4px;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}`,
          isEntryPoint: false,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Vite + React + Router Starter

A modern starter template with Vite, React 19, TypeScript, and React Router for SPA development.

## Features

- ⚡ Vite for instant server start
- ⚛️ React 19 with TypeScript
- 🛣️ React Router for client-side routing
- 🔥 Hot Module Replacement
- 📦 Lightweight setup

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## File Structure

\`\`\`
src/
├── pages/     # Page components
├── App.tsx    # Main app with routing
├── main.tsx   # Entry point
└── index.css  # Global styles
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
      <SiVite size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
