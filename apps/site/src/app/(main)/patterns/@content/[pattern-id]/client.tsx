'use client';

import { PatternDetailContent } from '@/features/patterns';

interface PatternDetailClientProps {
  patternId: string;
}

export default function PatternDetailClient({ patternId }: PatternDetailClientProps) {
  return <PatternDetailContent patternId={patternId} />;
}
