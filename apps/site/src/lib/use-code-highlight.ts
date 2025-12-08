import highlightsMap from '@/lib/code-highlights.json';

export function useCodeHighlight(snippetId: string | undefined) {
  if (!snippetId || !highlightsMap[snippetId as keyof typeof highlightsMap]) {
    return { preHighlightedLight: undefined, preHighlightedDark: undefined };
  }

  const snippet = highlightsMap[snippetId as keyof typeof highlightsMap];
  return {
    preHighlightedLight: snippet.light,
    preHighlightedDark: snippet.dark,
  };
}
