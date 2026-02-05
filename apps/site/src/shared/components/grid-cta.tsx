'use client';
import React, { useState, useEffect } from 'react';
import { Group } from 'ui-lab-components';
import styles from './grid-cta.module.css';

type ContentType = 'elements' | 'starters' | 'sections';

interface GridCTAProps {
  contentType: ContentType;
  onSubmit?: (email: string) => void;
}

interface StoredSubmission {
  email: string;
  timestamp: number;
  source: ContentType;
}

const BellIcon = () => (
  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.successIcon} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export function GridCTA({ contentType, onSubmit }: GridCTAProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const storageKey = `ui-lab-newsletter-${contentType}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const submission: StoredSubmission = JSON.parse(stored);
        setIsSubmitted(true);
        setEmail(submission.email);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [contentType, storageKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    const input = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement;
    if (!input?.validity.valid) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: StoredSubmission = {
        email,
        timestamp: Date.now(),
        source: contentType,
      };

      localStorage.setItem(storageKey, JSON.stringify(submission));
      setIsSubmitted(true);

      onSubmit?.(email);
    } catch (err) {
      if (err instanceof Error && err.name === 'QuotaExceededError') {
        setError('Unable to save subscription. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contentTypeLabel = contentType.charAt(0).toUpperCase() + contentType.slice(1);

  return (
    <div className={styles.container}>
      <BellIcon />
      <h3 className={styles.headline}>More {contentTypeLabel} coming soon</h3>
      <p className={styles.subheading}>Get notified when we add new content</p>

      {isSubmitted ? (
        <div className={styles.successMessage}>
          <CheckIcon />
          <span>Thanks! We'll keep you updated</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <Group orientation="horizontal" variant="outline">
            <Group.Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                setError('');
              }}
              disabled={isSubmitting}
              aria-label="Email address"
              className={styles.input}
            />
            <Group.Button type="submit" disabled={isSubmitting} isDisabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Group.Button>
          </Group>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      )}
    </div>
  );
}
