"use client";

import { useState } from "react";
import { Button, Group, Select } from "ui-lab-components";
import { FaGears, FaArrowRight } from "react-icons/fa6";
import { SiOpenai, SiAnthropic, SiGooglegemini, SiClaude } from "react-icons/si";
import { Wand2, FileText, Languages, Braces, AlignLeft } from "lucide-react";
import { HiMicrophone, HiPaperClip } from "react-icons/hi";

type Provider = "openai" | "anthropic" | "google";

interface ModelInfo {
  label: string;
  provider: Provider;
  description: string;
}

const MODELS: Record<string, ModelInfo> = {
  "gpt-4o": { label: "GPT-4o", provider: "openai", description: "Flagship" },
  "gpt-4.1": { label: "GPT-4.1", provider: "openai", description: "Best coding" },
  "o3": { label: "o3", provider: "openai", description: "Deep reasoning" },
  "o4-mini": { label: "o4-mini", provider: "openai", description: "Fast & smart" },
  "claude-opus-46": { label: "Claude Opus 4.6", provider: "anthropic", description: "Most powerful" },
  "claude-sonnet-46": { label: "Claude Sonnet 4.6", provider: "anthropic", description: "Best for coding" },
  "claude-haiku-45": { label: "Claude Haiku 4.5", provider: "anthropic", description: "Fastest" },
  "gemini-3-pro": { label: "Gemini 3 Pro", provider: "google", description: "Most capable" },
  "gemini-3-flash": { label: "Gemini 3 Flash", provider: "google", description: "Ultra fast" },
  "gemini-25-flash-lite": { label: "Gemini 2.5 Flash-Lite", provider: "google", description: "Cost efficient" },
};

const PROVIDER_COLORS: Record<Provider, string> = {
  openai: "#10a37f",
  anthropic: "#d4713a",
  google: "#4285f4",
};

const PROVIDER_ICONS: Record<Provider, React.ElementType> = {
  openai: SiOpenai,
  anthropic: SiClaude,
  google: SiGooglegemini,
};

export function AIComposer() {
  const [text, setText] = useState("");
  const [model, setModel] = useState("claude-sonnet-46");
  const selectedModel = MODELS[model];
  const providerColor = PROVIDER_COLORS[selectedModel.provider];
  const ProviderIcon = PROVIDER_ICONS[selectedModel.provider] as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

  return (
    <div className="w-full h-fit bg-background-200 border border-background-700 rounded-md overflow-hidden shadow-sm">

      {/* ── Textarea ── */}
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask, search, or make anything..."
        className="w-full bg-transparent px-4 py-3 text-sm resize-none outline-none text-foreground-100 placeholder:text-foreground-500"
      />

      {/* ── Bottom toolbar ── */}
      <div className="px-3 py-2 border-t border-background-700 flex items-center gap-1.5">

        {/* Model selector */}
        <Select
          selectedKey={model}
          onSelectionChange={(k) => setModel(String(k))}
          className="w-fit shrink-0"
        >
          <Select.Trigger
            icon={{ prefix: <ProviderIcon className="w-4.5 h-4.5 shrink-0" style={{ color: providerColor }} /> }}
            className="text-sm h-10"
          >
            <span className="text-foreground-200">{selectedModel.label}</span>
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Sub>
                <Select.SubTrigger textValue="OpenAI">
                  <SiOpenai className="w-4.5 h-4.5" style={{ color: PROVIDER_COLORS.openai }} />
                  OpenAI
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="gpt-4o" textValue="GPT-4o" description="Flagship">GPT-4o</Select.Item>
                  <Select.Item value="gpt-4.1" textValue="GPT-4.1" description="Best coding">GPT-4.1</Select.Item>
                  <Select.Item value="o3" textValue="o3" description="Deep reasoning">o3</Select.Item>
                  <Select.Item value="o4-mini" textValue="o4-mini" description="Fast & smart">o4-mini</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Sub>
                <Select.SubTrigger textValue="Anthropic">
                  <SiAnthropic className="w-4.5 h-4.5" style={{ color: PROVIDER_COLORS.anthropic }} />
                  Anthropic
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="claude-opus-46" textValue="Claude Opus 4.6" description="Most powerful">Claude Opus 4.6</Select.Item>
                  <Select.Item value="claude-sonnet-46" textValue="Claude Sonnet 4.6" description="Best for coding">Claude Sonnet 4.6</Select.Item>
                  <Select.Item value="claude-haiku-45" textValue="Claude Haiku 4.5" description="Fastest">Claude Haiku 4.5</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Sub>
                <Select.SubTrigger textValue="Google">
                  <SiGooglegemini className="w-4.5 h-4.5" style={{ color: PROVIDER_COLORS.google }} />
                  Google
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="gemini-3-pro" textValue="Gemini 3 Pro" description="Most capable">Gemini 3 Pro</Select.Item>
                  <Select.Item value="gemini-3-flash" textValue="Gemini 3 Flash" description="Ultra fast">Gemini 3 Flash</Select.Item>
                  <Select.Item value="gemini-25-flash-lite" textValue="Gemini 2.5 Flash-Lite" description="Cost efficient">Gemini 2.5 Flash-Lite</Select.Item>
                </Select.SubContent>
              </Select.Sub>
            </Select.List>
          </Select.Content>
        </Select>

        {/* Options — icon-only trigger */}
        <Select className="w-fit" >
          <Select.Trigger chevron={null} variant="ghost" className="bg-none border-none  h-9 w-9 justify-center p-0" aria-label="Options">
            <FaGears className="w-4.5 h-4.5 text-foreground-400" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Sub>
                <Select.SubTrigger textValue="Tone">
                  <Wand2 className="w-4.5 h-4.5 text-foreground-400" />
                  Tone
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="professional" textValue="Professional">Professional</Select.Item>
                  <Select.Item value="casual" textValue="Casual">Casual</Select.Item>
                  <Select.Item value="creative" textValue="Creative">Creative</Select.Item>
                  <Select.Item value="technical" textValue="Technical">Technical</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Sub>
                <Select.SubTrigger textValue="Format">
                  <FileText className="w-4.5 h-4.5 text-foreground-400" />
                  Format
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="markdown" textValue="Markdown" icon={<AlignLeft className="w-4.5 h-4.5" />}>Markdown</Select.Item>
                  <Select.Item value="json" textValue="JSON" icon={<Braces className="w-4.5 h-4.5" />}>JSON</Select.Item>
                  <Select.Item value="plain" textValue="Plain text" icon={<FileText className="w-4.5 h-4.5" />}>Plain text</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Sub>
                <Select.SubTrigger textValue="Language">
                  <Languages className="w-4.5 h-4.5 text-foreground-400" />
                  Language
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="en" textValue="English">English</Select.Item>
                  <Select.Item value="es" textValue="Spanish">Spanish</Select.Item>
                  <Select.Item value="fr" textValue="French">French</Select.Item>
                  <Select.Item value="de" textValue="German">German</Select.Item>
                  <Select.Item value="ja" textValue="Japanese">Japanese</Select.Item>
                </Select.SubContent>
              </Select.Sub>
            </Select.List>
          </Select.Content>
        </Select>

        <div className="flex-1" />

        <Group variant="ghost" spacing="sm">
          <Group.Button aria-label="Attach file">
            <HiPaperClip className="w-4.5 h-4.5 text-foreground-400" />
          </Group.Button>
          <Group.Button aria-label="Attach file">
            <HiMicrophone className="w-4.5 h-4.5 text-foreground-400" />
          </Group.Button>
        </Group>

        <Button className="py-1.5! px-2" size="sm" isDisabled={!text.trim()} aria-label="Send">
          <FaArrowRight className="w-4.5 h-4.5" />
        </Button>
      </div>
    </div>
  );
}
