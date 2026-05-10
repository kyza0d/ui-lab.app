'use client';

import type React from 'react';
import { SiNextdotjs, SiVite, SiTauri, SiAstro } from 'react-icons/si';
import { FaBook, FaCheck, FaBriefcase, FaPen } from 'react-icons/fa6';

type PreviewComponent = React.ComponentType<object>;

const previewComponentMap: Record<string, PreviewComponent> = {
  'nextjs-basic': () => (
    <div className="flex items-center justify-center gap-3">
      <SiNextdotjs size={48} className="text-foreground-400" />
    </div>
  ),
  'vite-react': () => (
    <div className="flex items-center justify-center gap-3">
      <SiVite size={48} className="text-foreground-400" />
    </div>
  ),
  'tauri-desktop': () => (
    <div className="flex items-center justify-center gap-3">
      <SiTauri size={48} className="text-foreground-400" />
    </div>
  ),
  'astro-static': () => (
    <div className="flex items-center justify-center gap-3">
      <SiAstro size={48} className="text-foreground-400" />
    </div>
  ),
  'docs-site': () => (
    <div className="flex items-center justify-center gap-3">
      <FaBook size={48} className="text-foreground-400" />
    </div>
  ),
  'productivity-app': () => (
    <div className="flex items-center justify-center gap-3">
      <FaCheck size={48} className="text-foreground-400" />
    </div>
  ),
  'crm-starter': () => (
    <div className="flex items-center justify-center gap-3">
      <FaBriefcase size={48} className="text-foreground-400" />
    </div>
  ),
  'blog-platform': () => (
    <div className="flex items-center justify-center gap-3">
      <FaPen size={48} className="text-foreground-400" />
    </div>
  ),
};

export function getPreviewComponent(starterId: string): PreviewComponent | null {
  return previewComponentMap[starterId] || null;
}
