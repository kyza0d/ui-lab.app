const SHIKI_LANGUAGE_ALIASES: Record<string, string> = {
  javascriptreact: "jsx",
  jsreact: "jsx",
  typescriptreact: "tsx",
  tsreact: "tsx",
  node: "javascript",
  plaintext: "text",
  txt: "text",
  shell: "bash",
  sh: "bash",
  zsh: "bash",
  yml: "yaml",
};

export function normalizeCodeLanguage(language?: string): string {
  const normalized = language?.trim().toLowerCase().replace(/^language-/, "");
  if (!normalized) return "text";
  return SHIKI_LANGUAGE_ALIASES[normalized] ?? normalized;
}

export function resolveShikiLanguage(
  language: string | undefined,
  bundledLanguages: Record<string, unknown>,
  bundledLanguagesAlias: Record<string, unknown>,
): string {
  const normalized = normalizeCodeLanguage(language);

  if (normalized in bundledLanguages || normalized in bundledLanguagesAlias) {
    return normalized;
  }

  return "text";
}
