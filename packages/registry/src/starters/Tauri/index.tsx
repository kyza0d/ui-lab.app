import React from 'react';
import { SiTauri } from 'react-icons/si';
import type { StarterMetadata } from '../../types';

const baseMetadata = {
  id: 'tauri-desktop',
  name: 'Tauri Desktop Starter',
  description: 'Cross-platform desktop app with Rust backend and React frontend using Tauri framework',
  category: 'framework' as const,
  tags: ['tauri', 'rust', 'desktop', 'electron-alternative'],
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
      name: 'Basic Desktop App',
      description: 'Minimal Tauri desktop app with React frontend and Rust backend',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "tauri-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "tauri dev",
    "build": "tauri build",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tauri-apps/api": "^2.0.0"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.0.0",
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
          filename: 'src-tauri/Cargo.toml',
          language: 'toml',
          code: `[package]
name = "tauri-app"
version = "0.1.0"
description = "A Tauri App"
authors = ["you"]
edition = "2021"

[build-dependencies]
tauri-build = { version = "2.0", features = [] }

[dependencies]
tauri = { version = "2.0", features = ["shell-open"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1", features = ["full"] }

[features]
default = ["custom-protocol"]
custom-protocol = ["tauri/custom-protocol"]`,
          isEntryPoint: false,
        },
        {
          filename: 'src-tauri/tauri.conf.json',
          language: 'json',
          code: `{
  "build": {
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:5173",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "fullscreen": false,
        "height": 600,
        "resizable": true,
        "title": "Tauri App",
        "width": 800
      }
    ],
    "security": {
      "csp": null
    }
  },
  "package": {
    "productName": "tauri-app",
    "version": "0.1.0"
  }
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src-tauri/src/main.rs',
          language: 'rust',
          code: `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn get_system_info() -> String {
    format!("System: {}", std::env::consts::OS)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}`,
          isEntryPoint: false,
        },
        {
          filename: 'vite.config.ts',
          language: 'typescript',
          code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1'
  }
})`,
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
    <title>Tauri Desktop App</title>
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
import { invoke } from '@tauri-apps/api/tauri'
import './App.css'

function App() {
  const [greetMsg, setGreetMsg] = useState('')
  const [name, setName] = useState('')

  async function greet() {
    setGreetMsg(await invoke<string>('greet', { name }))
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <p>Build a desktop app with Rust and React</p>

      <div>
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button onClick={() => greet()}>Greet</button>
      </div>

      <p>{greetMsg}</p>
    </div>
  )
}

export default App`,
          isEntryPoint: true,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Tauri Desktop App Starter

A cross-platform desktop application template using Tauri with React and Rust.

## Prerequisites

- Node.js (14+)
- Rust toolchain
- System dependencies for your OS

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- 🦀 Rust backend for performance
- ⚛️ React frontend with TypeScript
- 🔐 Secure Tauri command system
- 🖥️ Cross-platform (Windows, macOS, Linux)
- 📦 Small bundle size

## Build for Production

\`\`\`bash
npm run build
\`\`\``,
          isEntryPoint: false,
        },
      ],
    },
    {
      name: 'With File I/O',
      description: 'Tauri app with file system operations and data persistence',
      files: [
        {
          filename: 'package.json',
          language: 'json',
          code: `{
  "name": "tauri-file-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "tauri dev",
    "build": "tauri build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tauri-apps/api": "^2.0.0"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.0.0",
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
          filename: 'src-tauri/Cargo.toml',
          language: 'toml',
          code: `[package]
name = "tauri-file-app"
version = "0.1.0"
edition = "2021"

[build-dependencies]
tauri-build = { version = "2.0" }

[dependencies]
tauri = { version = "2.0", features = ["fs-all", "shell-open"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1", features = ["full"] }`,
          isEntryPoint: false,
        },
        {
          filename: 'src-tauri/tauri.conf.json',
          language: 'json',
          code: `{
  "build": {
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:5173",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "fullscreen": false,
        "height": 600,
        "resizable": true,
        "title": "File Manager",
        "width": 800
      }
    ],
    "security": {
      "csp": null
    }
  },
  "package": {
    "productName": "file-manager",
    "version": "0.1.0"
  }
}`,
          isEntryPoint: false,
        },
        {
          filename: 'src-tauri/src/main.rs',
          language: 'rust',
          code: `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::PathBuf;
use tauri::Config;

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_file(path: String, contents: String) -> Result<(), String> {
    fs::write(&path, &contents).map_err(|e| e.to_string())
}

#[tauri::command]
fn list_files(path: String) -> Result<Vec<String>, String> {
    let entries = fs::read_dir(&path)
        .map_err(|e| e.to_string())?
        .filter_map(|entry| {
            entry.ok().and_then(|e| {
                e.file_name().into_string().ok()
            })
        })
        .collect();
    Ok(entries)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            read_file,
            write_file,
            list_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}`,
          isEntryPoint: false,
        },
        {
          filename: 'vite.config.ts',
          language: 'typescript',
          code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1'
  }
})`,
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
    <title>File Manager</title>
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
import { invoke } from '@tauri-apps/api/tauri'
import { documentDir } from '@tauri-apps/api/path'
import './App.css'

function App() {
  const [files, setFiles] = useState<string[]>([])
  const [currentPath, setCurrentPath] = useState('')
  const [fileContent, setFileContent] = useState('')

  const listFiles = async (path: string) => {
    try {
      const result = await invoke<string[]>('list_files', { path })
      setFiles(result)
      setCurrentPath(path)
    } catch (error) {
      console.error('Error listing files:', error)
    }
  }

  const openFile = async (name: string) => {
    const fullPath = \`\${currentPath}/\${name}\`
    try {
      const content = await invoke<string>('read_file', { path: fullPath })
      setFileContent(content)
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return (
    <div className="container">
      <h1>File Manager</h1>
      <button onClick={() => listFiles(await documentDir())}>Open Documents</button>
      <div className="files-list">
        {files.map((file) => (
          <div key={file} onClick={() => openFile(file)} className="file-item">
            📄 {file}
          </div>
        ))}
      </div>
      {fileContent && (
        <div className="file-content">
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  )
}

export default App`,
          isEntryPoint: true,
        },
        {
          filename: 'README.md',
          language: 'markdown',
          code: `# Tauri File Manager Starter

Desktop app template with file I/O operations and data persistence using Tauri.

## Features

- 📁 File system operations
- 💾 Read and write files
- 🔐 Secure backend commands
- 📱 Cross-platform desktop app

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

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
      <SiTauri size={48} className="text-foreground-400" />
    </div>
  );
}

export const metadata = baseMetadata;
export default starterMetadata;
