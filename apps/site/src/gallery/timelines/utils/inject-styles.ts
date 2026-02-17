/**
 * Injects CSS styles into the document head once
 * @param id - Unique identifier for the style tag
 * @param css - CSS content to inject
 */
export function injectStyles(id: string, css: string): void {
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}
