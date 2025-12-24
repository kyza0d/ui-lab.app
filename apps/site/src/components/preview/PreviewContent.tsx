"use client";

import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { transformerRenderIndentGuides } from "@shikijs/transformers";
import { FaCheck, FaCopy, FaExpand, FaFile } from "react-icons/fa6";
import { Button, Modal, Flex } from "ui-lab-components";
import { PreviewHeader } from "./PreviewHeader";
import { generateThemePalettes, type OklchColor } from "@/lib/color-utils";
import { generateShikiTheme, type ShikiTheme } from "@/lib/themes/shiki/generator";
import { generateSyntaxPalettes } from "@/lib/themes/syntax-colors";
import { useApp } from "@/lib/app-context";
import { usePreviewContext, type PreviewActiveTab } from "./PreviewContext";
import { ResizablePreviewFrame } from "./ResizablePreviewFrame";
import { Dashboard } from "@/lib/demos/dashboard";
import { useExternalWindow } from "@/hooks/useExternalWindow";

interface PreviewContentProps {
  categoryId: string;
  exampleId: string;
  exampleName: string;
  examplePrompts: Record<string, string>;
  exampleCode: string;
}

function PromptModal({ isOpen, onClose, prompt }: { isOpen: boolean; onClose: () => void; prompt: string }) {
  return (
    <Modal title="Generation Prompt" isOpen={isOpen} onOpenChange={onClose} isDismissable>
      <div>
        <p className="text-foreground-300 leading-relaxed whitespace-pre-wrap text-sm">{prompt}</p>
      </div>
    </Modal>
  );
}

function PlaceholderContent({
  variant,
  exampleId,
}: {
  variant: "mobile" | "desktop";
  exampleId: string;
}) {
  // if (exampleId === "saas-1") {
  //   return <Dashboard />;
  // }

  if (variant === "mobile") {
    return (
      <div className="p-6 bg-background-900">
        <Flex direction="column" gap="md">
          <div className="h-12 bg-background-800 rounded-lg flex items-center px-4">
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="h-24 bg-background-800 rounded-lg" />
            <div className="h-16 bg-background-800 rounded-lg" />
            <div className="h-16 bg-background-800 rounded-lg" />
          </div>
          <div className="h-12 bg-background-800 rounded-lg flex gap-2 px-4 items-center justify-around">
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
          </div>
        </Flex>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background-900 min-h-screen">
      <Flex gap="lg">
        <div className="w-48 bg-background-800 rounded-lg p-4 flex flex-col gap-3">
          <div className="h-8 bg-background-700 rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 bg-background-700 rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="h-16 bg-background-800 rounded-lg mb-6 p-4 flex items-center gap-3">
            <div className="h-8 w-32 bg-background-700 rounded" />
            <div className="ml-auto h-8 w-24 bg-background-700 rounded" />
          </div>
          <Flex gap="md">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-40 bg-background-800 rounded-lg p-4">
                <div className="h-4 bg-background-700 rounded mb-3 w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-background-700 rounded" />
                  <div className="h-3 bg-background-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </Flex>
        </div>
      </Flex>
    </div>
  );
}

export function PreviewContent({
  categoryId,
  exampleId,
  exampleName,
  examplePrompts,
  exampleCode,
}: PreviewContentProps) {
  const { currentThemeMode, currentThemeColors } = useApp();
  const { activeTab, setActiveTab, variant, setVariant, showPromptModal, setShowPromptModal, highlightedCode, setHighlightedCode, copied, setCopied } =
    usePreviewContext();
  const [isHighlighting, setIsHighlighting] = useState(true);
  const { openWindow } = useExternalWindow();

  const exampleId_key = `${categoryId}-${exampleId.split("-")[1]}`;
  const prompt = examplePrompts[exampleId_key] || `Generate a ${exampleName.toLowerCase()} interface for a modern application`;

  const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] || c));

  const generateFallbackHtml = (code: string): string => {
    return `<pre><code style="display: block; padding: 1rem;">${escapeHtml(code)}</code></pre>`;
  };

  useEffect(() => {
    const highlightCode = async () => {
      setIsHighlighting(true);
      try {
        let theme: string | ShikiTheme;

        if (currentThemeColors) {
          const palettes = generateThemePalettes(
            currentThemeColors.background,
            currentThemeColors.foreground,
            currentThemeColors.accent,
            currentThemeMode,
            0,
            currentThemeColors.semantic,
            currentThemeColors.accentChromaLimit ?? 0.3,
            currentThemeColors.accentEasing,
            currentThemeColors.accentChromaScaling
          );
          const syntaxPalettes = generateSyntaxPalettes(
            currentThemeColors.background,
            currentThemeColors.accent,
            currentThemeMode,
            currentThemeColors.syntaxVariation ?? 0
          );
          theme = generateShikiTheme({ ...palettes, ...syntaxPalettes }, currentThemeMode, `custom-${currentThemeMode}`);
        } else {
          theme = currentThemeMode === "light" ? "github-light" : "github-dark";
        }

        const html = await codeToHtml(exampleCode, {
          lang: "typescript" as any,
          theme,
          transformers: [transformerRenderIndentGuides()],
        });
        let styledHtml = html.replace(/<code>/, '<code style="display: block; padding: 1rem;">');
        styledHtml = styledHtml.replace(/background-color:\s*[^;]+;?/g, "");
        setHighlightedCode(styledHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(generateFallbackHtml(exampleCode));
      } finally {
        setIsHighlighting(false);
      }
    };

    highlightCode();
  }, [currentThemeMode, currentThemeColors, exampleCode, setHighlightedCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWindow = () => {
    openWindow({
      categoryId,
      exampleId,
      width: 1200,
      height: 900,
    });
  };

  return (
    <>
      <PromptModal isOpen={showPromptModal} onClose={() => setShowPromptModal(false)} prompt={prompt} />
      <div className="flex flex-col h-full bg-background-900/50 overflow-hidden">
        <PreviewHeader
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as PreviewActiveTab)}
          deviceVariant={variant}
          onDeviceVariantChange={setVariant}
          leftContent={
            <Button className="gap-2" variant="outline" onClick={() => setShowPromptModal(true)}>
              <FaFile size={14} />
              Prompt
            </Button>
          }
          rightContent={
            <Button variant="outline" size="sm" onClick={handleOpenWindow}>
              <FaExpand size={14} />
            </Button>
          }
          className="border-b-2"
        />

        <div className="flex-1 overflow-auto bg-background-950 p-[12px]">
          {activeTab === "preview" && (
            <ResizablePreviewFrame variant={variant} className="min-h-[300px]">
              <PlaceholderContent variant={variant} exampleId={exampleId} />
            </ResizablePreviewFrame>
          )}

          {activeTab === "code" && (
            <div className="relative bg-background-950">
              <button
                onClick={handleCopy}
                className={`absolute right-4 top-4 p-2 rounded transition-colors ${copied ? "text-accent-500" : "text-foreground-400 hover:text-foreground-50"
                  }`}
                title="Copy code"
              >
                {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
              </button>
              {isHighlighting ? (
                <div className="p-4 text-foreground-400 text-sm">Highlighting code...</div>
              ) : highlightedCode ? (
                <div
                  className="overflow-x-auto text-sm [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0 [&_pre]:overflow-hidden [&_code]:text-foreground-300 [&_code]:whitespace-pre-wrap [&_code]:wrap-break-word"
                  dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                  }}
                />
              ) : (
                <pre className="overflow-x-auto text-sm text-foreground-300 p-4 whitespace-pre-wrap break-words">{exampleCode}</pre>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
