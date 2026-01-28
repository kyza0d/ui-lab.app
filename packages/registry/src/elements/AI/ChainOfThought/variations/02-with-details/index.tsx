"use client"
import React, { useState } from 'react';
import { ExpandableThoughtStep } from './layout/ExpandableThoughtStep';

export function ChainOfThoughtWithDetails() {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([1]));

  const steps = [
    {
      number: 1,
      title: 'Understanding the Request',
      description: 'Parsing and understanding what the user is asking for',
      details: [
        'Identified key requirements from the input',
        'Recognized the problem domain',
        'Determined necessary context and constraints',
      ],
    },
    {
      number: 2,
      title: 'Analyzing Available Approaches',
      description: 'Evaluating different methods to solve the problem',
      details: [
        'Approach A: Direct computation (Fast but limited)',
        'Approach B: Iterative refinement (Balanced)',
        'Approach C: Machine learning (Slow but accurate)',
      ],
    },
    {
      number: 3,
      title: 'Selecting Optimal Strategy',
      description: 'Choosing the best approach based on constraints',
      details: [
        'Evaluated trade-offs between speed and accuracy',
        'Considered resource constraints',
        'Selected Approach B for optimal balance',
      ],
    },
    {
      number: 4,
      title: 'Generating Solution',
      description: 'Implementing the chosen strategy step by step',
      details: [
        'Breaking down into sub-tasks',
        'Validating intermediate results',
        'Optimizing for performance',
      ],
    },
  ];

  const toggleStep = (number: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(number)) {
      newExpanded.delete(number);
    } else {
      newExpanded.add(number);
    }
    setExpandedSteps(newExpanded);
  };

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground-50 mb-2">Detailed AI Reasoning</h1>
        <p className="text-foreground-400 mb-8">Click steps to see detailed reasoning:</p>

        <div className="space-y-3">
          {steps.map((step) => (
            <ExpandableThoughtStep
              key={step.number}
              {...step}
              isExpanded={expandedSteps.has(step.number)}
              onToggle={() => toggleStep(step.number)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
