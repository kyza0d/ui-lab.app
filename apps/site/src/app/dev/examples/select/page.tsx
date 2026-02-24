"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Select, Searchable, Badge } from "ui-lab-components";
import { SiTypescript, SiJavascript, SiPython, SiRust, SiGo, SiSwift, SiKotlin, SiRuby, SiCplusplus, SiPhp, SiGithub, SiGitlab, SiBitbucket } from "react-icons/si";
import { Type, Image, Layout, Heading1, Heading2, Pilcrow, Code2, ImageIcon, Film, LayoutTemplate, Columns2, Rows3, PanelLeft } from "lucide-react";

const languages = [
  { value: "typescript", label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { value: "javascript", label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { value: "python", label: "Python", icon: SiPython, color: "#3776AB" },
  { value: "rust", label: "Rust", icon: SiRust, color: "#DEA584" },
  { value: "go", label: "Go", icon: SiGo, color: "#00ADD8" },
  { value: "swift", label: "Swift", icon: SiSwift, color: "#F05138" },
  { value: "kotlin", label: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { value: "ruby", label: "Ruby", icon: SiRuby, color: "#CC342D" },
  { value: "cpp", label: "C++", icon: SiCplusplus, color: "#00599C" },
  { value: "php", label: "PHP", icon: SiPhp, color: "#777BB4" },
];

function LanguageSelectPreview() {
  const [language, setLanguage] = useState<string | number | null>(null);
  const selected = languages.find(l => l.value === language);
  const Icon = selected?.icon;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground-300">Primary Language</label>
        <Select selectedKey={language} onSelectionChange={setLanguage} className="w-72">
          <Searchable.Trigger placeholder="Search languages..." />
          <Select.Content>
            <Select.List>
              {languages.map((lang) => {
                const LangIcon = lang.icon;
                return (
                  <Select.Item key={lang.value} value={lang.value} textValue={lang.label} icon={<LangIcon style={{ color: lang.color }} />}>
                    {lang.label}
                  </Select.Item>
                );
              })}
            </Select.List>
          </Select.Content>
        </Select>
      </div>
      {selected && Icon && (
        <div className="flex items-center gap-2 text-sm text-foreground-400">
          <Icon style={{ color: selected.color }} className="w-4 h-4" />
          <span>Selected: <span className="text-foreground-200">{selected.label}</span></span>
        </div>
      )}
    </div>
  );
}

const sourceControlProviders = [
  { value: "github", label: "GitHub", icon: SiGithub, description: "The world's leading software development platform" },
  { value: "gitlab", label: "GitLab", icon: SiGitlab, description: "Complete DevOps platform with built-in CI/CD" },
  { value: "bitbucket", label: "Bitbucket", icon: SiBitbucket, description: "Git solution for professional teams by Atlassian" },
];

function SourceControlPreview() {
  const [provider, setProvider] = useState<string | number | null>("github");
  const selected = sourceControlProviders.find(p => p.value === provider);
  const Icon = selected?.icon;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground-300">Repository Provider</label>
        <Select selectedKey={provider} onSelectionChange={setProvider} className="w-80">
          <Select.Trigger>
            <Select.Value placeholder="Select provider" icon={Icon && <Icon className="w-4 h-4" />} />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              {sourceControlProviders.map((p) => {
                const ProviderIcon = p.icon;
                return (
                  <Select.Item
                    key={p.value}
                    value={p.value}
                    textValue={p.label}
                    icon={<ProviderIcon className="w-4 h-4" />}
                    description={p.description}
                  >
                    {p.label}
                  </Select.Item>
                );
              })}
            </Select.List>
          </Select.Content>
        </Select>
      </div>
      {selected && (
        <p className="text-xs text-foreground-400">{selected.description}</p>
      )}
    </div>
  );
}

const countries = [
  { value: "us", label: "United States", flag: "🇺🇸", code: "+1" },
  { value: "gb", label: "United Kingdom", flag: "🇬🇧", code: "+44" },
  { value: "de", label: "Germany", flag: "🇩🇪", code: "+49" },
  { value: "fr", label: "France", flag: "🇫🇷", code: "+33" },
  { value: "jp", label: "Japan", flag: "🇯🇵", code: "+81" },
  { value: "kr", label: "South Korea", flag: "🇰🇷", code: "+82" },
  { value: "cn", label: "China", flag: "🇨🇳", code: "+86" },
  { value: "in", label: "India", flag: "🇮🇳", code: "+91" },
  { value: "br", label: "Brazil", flag: "🇧🇷", code: "+55" },
  { value: "au", label: "Australia", flag: "🇦🇺", code: "+61" },
  { value: "ca", label: "Canada", flag: "🇨🇦", code: "+1" },
  { value: "mx", label: "Mexico", flag: "🇲🇽", code: "+52" },
];

function CountrySelectPreview() {
  const [country, setCountry] = useState<string | number | null>("us");
  const selected = countries.find(c => c.value === country);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground-300">Country</label>
        <Select
          selectedKey={country}
          onSelectionChange={setCountry}
          className="w-72"
        >
          <Searchable.Trigger placeholder="Search countries..." />
          <Select.Content>
            <Select.List>
              {countries.map((c) => (
                <Select.Item key={c.value} value={c.value} textValue={c.label} icon={<span className="text-base">{c.flag}</span>}>
                  <div className="flex items-center justify-between w-full">
                    <span>{c.label}</span>
                    <span className="text-xs text-foreground-400 ml-2">{c.code}</span>
                  </div>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Select>
      </div>
      {selected && (
        <div className="flex items-center gap-2 text-sm text-foreground-400">
          <span className="text-lg">{selected.flag}</span>
          <span>{selected.label}</span>
          <span className="text-foreground-400">({selected.code})</span>
        </div>
      )}
    </div>
  );
}

const techStack = [
  { value: "typescript", label: "TypeScript", icon: SiTypescript, color: "#3178C6", description: "Typed superset of JavaScript" },
  { value: "python", label: "Python", icon: SiPython, color: "#3776AB", description: "General-purpose programming" },
  { value: "rust", label: "Rust", icon: SiRust, color: "#DEA584", description: "Systems programming language" },
  { value: "go", label: "Go", icon: SiGo, color: "#00ADD8", description: "Fast, simple, reliable" },
  { value: "swift", label: "Swift", icon: SiSwift, color: "#F05138", description: "iOS & macOS development" },
  { value: "kotlin", label: "Kotlin", icon: SiKotlin, color: "#7F52FF", description: "Modern JVM language" },
];

function MultiSelectPreview() {
  const [selected, setSelected] = useState<(string | number)[]>(["typescript", "rust"]);
  const selectedItems = techStack.filter(t => selected.includes(t.value));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground-300">Tech Stack</label>
        <Select mode="multiple" selectedKeys={selected} onSelectionChange={(keys) => setSelected(keys as (string | number)[])} className="w-full">
          <Select.Trigger>
            {selectedItems.length === 0 ? (
              <span className="text-foreground-400">Select technologies...</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {selectedItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Badge
                      key={item.value}
                      variant="default"
                      size="sm"
                      icon={<ItemIcon style={{ color: item.color }} className="w-3 h-3" />}
                      dismissible
                      onDismiss={() => setSelected(selected.filter(s => s !== item.value))}
                    >
                      {item.label}
                    </Badge>
                  );
                })}
              </div>
            )}
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              {techStack.map((tech) => {
                const TechIcon = tech.icon;
                return (
                  <Select.Item
                    key={tech.value}
                    value={tech.value}
                    textValue={tech.label}
                    icon={<TechIcon style={{ color: tech.color }} className="w-4 h-4" />}
                    description={tech.description}
                  >
                    {tech.label}
                  </Select.Item>
                );
              })}
            </Select.List>
          </Select.Content>
        </Select>
      </div>
    </div>
  );
}

function SubmenuSelectPreview() {
  const [selected, setSelected] = useState<string | number | null>(null);

  const labelMap: Record<string, string> = {
    h1: "Heading 1", h2: "Heading 2", paragraph: "Paragraph", code: "Code Block",
    image: "Image", video: "Video", columns: "Columns", rows: "Rows", sidebar: "Sidebar",
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground-300">Insert Block</label>
        <Select selectedKey={selected} onSelectionChange={setSelected} className="w-64">
          <Select.Trigger>
            <Select.Value placeholder="Select block type..." />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Sub>
                <Select.SubTrigger textValue="Text">
                  <Type className="w-4 h-4 text-foreground-400" />
                  Text
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="h1" textValue="Heading 1" icon={<Heading1 className="w-4 h-4" />}>Heading 1</Select.Item>
                  <Select.Item value="h2" textValue="Heading 2" icon={<Heading2 className="w-4 h-4" />}>Heading 2</Select.Item>
                  <Select.Item value="paragraph" textValue="Paragraph" icon={<Pilcrow className="w-4 h-4" />}>Paragraph</Select.Item>
                  <Select.Item value="code" textValue="Code Block" icon={<Code2 className="w-4 h-4" />}>Code Block</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Sub>
                <Select.SubTrigger textValue="Media">
                  <Image className="w-4 h-4 text-foreground-400" />
                  Media
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="image" textValue="Image" icon={<ImageIcon className="w-4 h-4" />}>Image</Select.Item>
                  <Select.Item value="video" textValue="Video" icon={<Film className="w-4 h-4" />}>Video</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Sub>
                <Select.SubTrigger textValue="Layout">
                  <Layout className="w-4 h-4 text-foreground-400" />
                  Layout
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="columns" textValue="Columns" icon={<Columns2 className="w-4 h-4" />}>Columns</Select.Item>
                  <Select.Item value="rows" textValue="Rows" icon={<Rows3 className="w-4 h-4" />}>Rows</Select.Item>
                  <Select.Item value="sidebar" textValue="Sidebar" icon={<PanelLeft className="w-4 h-4" />}>Sidebar</Select.Item>
                </Select.SubContent>
              </Select.Sub>
            </Select.List>
          </Select.Content>
        </Select>
      </div>
      {selected && (
        <p className="text-sm text-foreground-400">
          Selected: <span className="text-foreground-200">{labelMap[selected as string] ?? selected}</span>
        </p>
      )}
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "language-select",
    title: "Language Select with Icons",
    description: "Searchable select with colored programming language icons from Simple Icons.",
    preview: <LanguageSelectPreview />,
    previewLayout: "start",
  },
  {
    id: "source-control",
    title: "Source Control Provider",
    description: "Select with item descriptions for choosing a Git hosting provider.",
    preview: <SourceControlPreview />,
    previewLayout: "start",
  },
  {
    id: "country-select",
    title: "Country Selector",
    description: "Searchable country picker with flag emojis and dial codes.",
    preview: <CountrySelectPreview />,
    previewLayout: "start",
  },
  {
    id: "multi-select",
    title: "Multi-Select Tech Stack",
    description: "Select multiple technologies with dismissable badges shown in the trigger area.",
    preview: <MultiSelectPreview />,
    previewLayout: "start",
  },
  {
    id: "submenu-select",
    title: "Submenu Select (Insert Block)",
    description: "Select with nested submenus grouped by category — Text, Media, Layout. Hover or press ArrowRight to open a submenu.",
    preview: <SubmenuSelectPreview />,
    previewLayout: "start",
  },
];

export default function SelectExamplesPage() {
  return (
    <DevExampleLayout
      title="Select Examples"
      description="High-quality select configurations showcasing searchable dropdowns, item descriptions, country pickers, and multi-select with tags."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
