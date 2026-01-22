'use client';

import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      "This tool has completely transformed how we manage our projects. The intuitive interface and powerful features save us hours every week.",
    author: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechStart Inc',
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The best investment we made for our team. Customer support is exceptional and the product keeps improving with valuable features.",
    author: 'Michael Chen',
    role: 'CEO',
    company: 'DataFlow Systems',
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Seamless integration with our existing tools and outstanding performance. Highly recommend to anyone looking for a reliable solution.",
    author: 'Emma Williams',
    role: 'Engineering Lead',
    company: 'CloudXYZ',
    rating: 5,
  },
];

export function CardTestimonials() {
  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground-900 md:text-4xl">
            Loved by teams worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-600">
            See what our customers have to say about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group rounded-md border border-background-700 bg-background-900/50 p-6 backdrop-blur-sm transition-all hover:border-accent-500/50 hover:bg-background-900"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent-500 text-accent-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 text-foreground-700">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-background-700 pt-4">
                <p className="font-semibold text-foreground-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-foreground-600">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  name: 'Card Testimonials',
  description: '3-card grid layout showcasing customer testimonials with ratings',
  demoPath: 'testimonials-cards',
};
