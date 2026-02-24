'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from 'ui-lab-components';

const testimonials = [
  {
    id: 1,
    quote:
      "This platform has been a game-changer for our organization. We've seen a 40% increase in productivity and our team couldn't be happier.",
    author: 'David Martinez',
    role: 'Director of Operations',
    company: 'Global Enterprise Co',
    rating: 5,
    initials: 'DM',
  },
  {
    id: 2,
    quote:
      "The attention to detail and customer-centric approach is what sets this apart from competitors. Worth every penny and more.",
    author: 'Jessica Lee',
    role: 'Founder & CEO',
    company: 'InnovateLabs',
    rating: 5,
    initials: 'JL',
  },
  {
    id: 3,
    quote:
      "Implementation was smooth, onboarding was excellent, and ongoing support has been outstanding. Highly recommend!",
    author: 'Robert Thompson',
    role: 'VP of Technology',
    company: 'NextGen Solutions',
    rating: 5,
    initials: 'RT',
  },
];

export function FeaturedTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground-400 md:text-4xl">
            What our customers say
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="relative">
          {/* Decorative background */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/10 to-accent-600/10 blur-3xl" />

          {/* Card */}
          <div className="relative rounded-2xl border border-background-700 bg-background-900/80 p-8 md:p-12 backdrop-blur-sm">
            {/* Stars */}
            <div className="mb-6 flex gap-1">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-accent-500 text-accent-500"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-8 text-2xl font-semibold text-foreground-400 leading-relaxed md:text-3xl">
              "{current.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/20">
                <span className="text-sm font-bold text-accent-500">
                  {current.initials}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground-400">
                  {current.author}
                </p>
                <p className="text-sm text-foreground-400">
                  {current.role} at {current.company}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-background-700 pt-8">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  aria-label="Previous testimonial"
                  className="border-background-700 hover:border-accent-500/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                  className="border-background-700 hover:border-accent-500/50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === activeIndex
                        ? 'bg-accent-500 w-6'
                        : 'bg-background-700 hover:bg-background-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Featured Testimonial',
  description: 'Featured testimonial carousel with navigation controls and dot indicators',
  demoPath: 'testimonials-featured',
};
