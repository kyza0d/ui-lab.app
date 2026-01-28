"use client"
import React from 'react';
import { ThoughtStep } from './layout/ThoughtStep';

export function BasicChainOfThought() {
  const steps = [
    {
      number: 1,
      title: 'Problem Analysis',
      description: 'Breaking down the problem into manageable parts',
    },
    {
      number: 2,
      title: 'Strategy Development',
      description: 'Developing a strategy to solve the problem',
    },
    {
      number: 3,
      title: 'Implementation',
      description: 'Implementing the solution step by step',
    },
    {
      number: 4,
      title: 'Validation',
      description: 'Validating the solution and checking results',
    },
  ];

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground-50 mb-2">AI Reasoning Process</h1>
        <p className="text-foreground-400 mb-8">Here's how the AI is thinking through the problem:</p>

        <div className="space-y-4">
          {steps.map((step) => (
            <ThoughtStep key={step.number} {...step} />
          ))}
        </div>

        <div className="mt-8 p-4 bg-background-800 border border-background-700 rounded-md">
          <p className="text-sm text-foreground-300">
            The chain of thought shows the reasoning process, making it easier to understand how the AI arrived at the conclusion.
          </p>
        </div>
      </div>
    </div>
  );
}
