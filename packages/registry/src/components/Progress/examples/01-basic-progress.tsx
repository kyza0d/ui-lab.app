"use client";

import { useState, useEffect } from 'react';
import { Progress, Flex, Button } from 'ui-lab-components';

export const metadata = {
  title: 'File Upload',
  description: 'Simulated upload progress with a label and live percentage — starts on button click.'
};

export default function Example() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (progress >= 100) { setRunning(false); return; }
    const t = setTimeout(() => setProgress((p) => Math.min(p + Math.random() * 12, 100)), 200);
    return () => clearTimeout(t);
  }, [running, progress]);

  const reset = () => { setProgress(0); setRunning(false); };

  return (
    <Flex direction="column" gap="md" style={{ width: 340 }}>
      <Flex direction="column" gap="xs">
        <span style={{ fontSize: "var(--text-sm)", color: "var(--foreground-muted)" }}>
          report-q4-2025.pdf
        </span>
        <Progress value={progress} label="Uploading" showValue />
      </Flex>
      <Flex gap="sm">
        <Button variant="primary" onClick={() => setRunning(true)} disabled={running || progress === 100}>
          {progress === 100 ? "Done" : "Upload"}
        </Button>
        <Button variant="ghost" onClick={reset}>Reset</Button>
      </Flex>
    </Flex>
  );
}
