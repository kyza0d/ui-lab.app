import { createContext, useContext } from "react";

export type PreviewActiveTab = "preview" | "code";
export type PreviewVariant = "mobile" | "desktop";

export interface PreviewContextType {
  activeTab: PreviewActiveTab;
  setActiveTab: (tab: PreviewActiveTab) => void;
  variant: PreviewVariant;
  setVariant: (variant: PreviewVariant) => void;
  showPromptModal: boolean;
  setShowPromptModal: (show: boolean) => void;
  width: number;
  setWidth: (width: number) => void;
  maxWidth: number;
  minWidth: number;
  highlightedCode: string;
  setHighlightedCode: (code: string) => void;
  copied: boolean;
  setCopied: (copied: boolean) => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export { PreviewContext };

export function usePreviewContext() {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error("usePreviewContext must be used within a PreviewProvider");
  }
  return context;
}
