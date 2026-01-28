"use client"
import React from 'react';
import { NextArticleWithIconCard } from './layout/NextArticleWithIconCard';

export function NextArticleWithIcon() {
  const articles = [
    {
      icon: '🚀',
      title: 'Quick Start Guide',
      description: 'Get up and running in 5 minutes with our quick start guide.',
      href: '#quickstart',
      category: 'Getting Started',
    },
    {
      icon: '⚙️',
      title: 'Configuration Options',
      description: 'Learn about all available configuration options and customization.',
      href: '#config',
      category: 'Advanced',
    },
  ];

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-2xl font-bold text-foreground-50 mb-8">Continue Reading</h2>

        <div className="space-y-4">
          {articles.map((article, index) => (
            <NextArticleWithIconCard key={index} {...article} />
          ))}
        </div>

        <div className="bg-background-800 rounded-md border border-background-700 p-8 mt-12">
          <div className="space-y-3">
            <div className="h-4 bg-background-700 rounded w-2/3 opacity-50" />
            <div className="h-3 bg-background-700 rounded w-full opacity-40" />
            <div className="h-3 bg-background-700 rounded w-5/6 opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
