export const SEMANTIC_HTML_STYLES = `
  h1 {
    font-size: var(--text-3xl);
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-tight);
  }

  h2 {
    font-size: var(--text-2xl);
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-tight);
  }

  h3 {
    font-size: var(--text-xl);
    line-height: var(--line-height-snug);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-snug);
  }

  h4 {
    font-size: var(--text-lg);
    line-height: var(--line-height-snug);
    font-weight: var(--font-weight-medium);
  }

  h5 {
    font-size: var(--text-md);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-medium);
  }

  h6 {
    font-size: var(--text-md);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-medium);
  }

  p {
    font-size: var(--text-md);
    line-height: var(--line-height-relaxed);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--letter-spacing-normal);
  }

  small {
    font-size: var(--text-sm);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-normal);
  }

  strong,
  b {
    font-weight: var(--font-weight-bold);
  }

  em,
  i {
    font-style: italic;
  }

  a {
    color: var(--color-foreground-300);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--color-accent-400);
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    background-color: var(--color-background-800);
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-xs);
  }

  pre {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    background-color: var(--color-background-800);
    padding: 1rem;
    border-radius: var(--radius-sm);
    overflow-x: auto;
    line-height: var(--line-height-normal);
  }

  pre code {
    background-color: transparent;
    padding: 0;
    font-size: inherit;
  }`;
