"use client";

import { useState, useEffect } from 'react';
import { Progress, Flex, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Indeterminate Loading',
  description: 'Animated bar for unknown-duration operations — switches to complete when done.'
};

export default function Example() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      <Flex direction="column" gap="xs">
        <span style={{ fontSize: "var(--text-sm)", color: "var(--foreground-muted)" }}>
          {loading ? "Fetching results…" : "Results loaded"}
        </span>
        <Progress indeterminate={loading} value={loading ? 0 : 100} />
      </Flex>
      <Button variant="ghost" onClick={() => setLoading(true)} disabled={loading}>
        Reload
      </Button>
    </Flex>
  );
}
