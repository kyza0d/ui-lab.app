"use client"
import React from 'react';
import { NextArticleCard } from './layout/NextArticleCard';

export function BasicNextArticle() {
  const articles = [
    {
      title: 'Getting Started with Components',
      description: 'Learn how to install and use UI Lab components in your project.',
      href: '#getting-started',
    },
    {
      title: 'Advanced Component Patterns',
      description: 'Explore advanced patterns and best practices for using components.',
      href: '#advanced',
    },
  ];

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Documentation Sections</h2>
          <div className="space-y-6">
            {articles.map((article, index) => (
              <div key={index}>
                <div className="bg-background-800 rounded-md border border-background-700 p-8 mb-4">
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-background-700 rounded w-3/4 opacity-50" />
                    <div className="h-3 bg-background-700 rounded w-5/6 opacity-40" />
                    <div className="h-3 bg-background-700 rounded w-4/5 opacity-40" />
                  </div>
                </div>
                <NextArticleCard {...article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
