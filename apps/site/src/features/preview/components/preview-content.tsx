"use client";

import { Modal, Flex } from "ui-lab-components";
import { PreviewCodeDisplay } from "./preview-code-display";
import { usePreviewContext, type PreviewDeviceVariant } from "./preview-context";

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

function PlaceholderContent({ variant, exampleId }: {
  variant: PreviewDeviceVariant;
  exampleId: string;
}) {
  if (variant === "mobile") {
    return (
      <div className="p-6 bg-background-900">
        <Flex direction="column" gap="md">
          <div className="h-12 bg-background-800 rounded-md flex items-center px-4">
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="h-24 bg-background-800 rounded-md" />
            <div className="h-16 bg-background-800 rounded-md" />
            <div className="h-16 bg-background-800 rounded-md" />
          </div>
          <div className="h-12 bg-background-800 rounded-md flex gap-2 px-4 items-center justify-around">
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
            <div className="w-6 h-6 bg-accent-500/20 rounded-full" />
          </div>
        </Flex>
      </div>
    );
  }

  if (variant === "tablet") {
    return (
      <div className="p-8 bg-background-900">
        <Flex gap="md">
          <div className="w-32 bg-background-800 rounded-md p-4 flex flex-col gap-3">
            <div className="h-6 bg-background-700 rounded" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-background-700 rounded" />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="h-12 bg-background-800 rounded-md mb-4 p-3 flex items-center gap-2">
              <div className="h-6 w-24 bg-background-700 rounded" />
              <div className="ml-auto h-6 w-16 bg-background-700 rounded" />
            </div>
            <Flex gap="md">
              {[1, 2].map((i) => (
                <div key={i} className="flex-1 h-32 bg-background-800 rounded-md p-3">
                  <div className="h-3 bg-background-700 rounded mb-2 w-1/2" />
                  <div className="space-y-1">
                    <div className="h-2 bg-background-700 rounded" />
                    <div className="h-2 bg-background-700 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </Flex>
          </div>
        </Flex>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background-900 min-h-screen">
      <Flex gap="lg">
        <div className="w-48 bg-background-800 rounded-md p-4 flex flex-col gap-3">
          <div className="h-8 bg-background-700 rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 bg-background-700 rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="h-16 bg-background-800 rounded-md mb-6 p-4 flex items-center gap-3">
            <div className="h-8 w-32 bg-background-700 rounded" />
            <div className="ml-auto h-8 w-24 bg-background-700 rounded" />
          </div>
          <Flex gap="md">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-40 bg-background-800 rounded-md p-4">
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
  const { activeTab, setActiveTab, displayVariant, selectDevice, showPromptModal, setShowPromptModal, width, setWidth } =
    usePreviewContext();

  const exampleId_key = `${categoryId}-${exampleId.split("-")[1]}`;
  const prompt = examplePrompts[exampleId_key] || `Generate a ${exampleName.toLowerCase()} interface for a modern application`;

  return (
    <>
      <PromptModal isOpen={showPromptModal} onClose={() => setShowPromptModal(false)} prompt={prompt} />
      <PreviewCodeDisplay
        code={exampleCode}
        language="typescript"
        previewContent={<PlaceholderContent variant={displayVariant} exampleId={exampleId} />}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        displayVariant={displayVariant}
        onDeviceVariantChange={selectDevice}
        width={width}
        onWidthChange={setWidth}
        categoryId={categoryId}
        exampleId={exampleId}
        prompt={prompt}
        onPromptClick={() => setShowPromptModal(true)}
        previewClassName="min-h-[300px]"
      />
    </>
  );
}
