"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Select, Searchable, Multi } from "ui-lab-components";
import { SiTypescript, SiJavascript, SiPython, SiRust, SiGo, SiSwift, SiKotlin, SiRuby, SiCplusplus, SiPhp, SiGithub, SiGitlab, SiBitbucket } from "react-icons/si";
import { FaFlag } from "react-icons/fa6";

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
      {selected && (
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
        <p className="text-xs text-foreground-500">{selected.description}</p>
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
        <Select selectedKey={country} onSelectionChange={setCountry} className="w-72">
          <Searchable.Trigger placeholder="Search countries..." />
          <Select.Content>
            <Select.List>
              {countries.map((c) => (
                <Select.Item key={c.value} value={c.value} textValue={c.label} icon={<span className="text-base">{c.flag}</span>}>
                  <div className="flex items-center justify-between w-full">
                    <span>{c.label}</span>
                    <span className="text-xs text-foreground-500 ml-2">{c.code}</span>
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
          <span className="text-foreground-500">({selected.code})</span>
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground-300">Tech Stack</label>
        <Multi selectedKeys={selected} onSelectionChange={setSelected} className="w-80">
          <Multi.Trigger placeholder="Select technologies..." />
          <Multi.Content searchPlaceholder="Search technologies...">
            <Multi.List>
              {techStack.map((tech) => {
                const TechIcon = tech.icon;
                return (
                  <Multi.Item
                    key={tech.value}
                    value={tech.value}
                    textValue={tech.label}
                    icon={<TechIcon style={{ color: tech.color }} className="w-4 h-4" />}
                    description={tech.description}
                  >
                    {tech.label}
                  </Multi.Item>
                );
              })}
            </Multi.List>
          </Multi.Content>
        </Multi>
      </div>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "language-select",
    title: "Language Select with Icons",
    description: "Searchable select with colored programming language icons from Simple Icons.",
    code: `import { useState } from "react";
import { Select, Searchable } from "ui-lab-components";
import { SiTypescript, SiPython, SiRust } from "react-icons/si";

const languages = [
  { value: "typescript", label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { value: "python", label: "Python", icon: SiPython, color: "#3776AB" },
  { value: "rust", label: "Rust", icon: SiRust, color: "#DEA584" },
];

export function LanguageSelect() {
  const [language, setLanguage] = useState(null);

  return (
    <Select selectedKey={language} onSelectionChange={setLanguage} className="w-72">
      <Searchable.Trigger placeholder="Search languages..." />
      <Select.Content>
        <Select.List>
          {languages.map((lang) => (
            <Select.Item
              key={lang.value}
              value={lang.value}
              textValue={lang.label}
              icon={<lang.icon style={{ color: lang.color }} />}
            >
              {lang.label}
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select>
  );
}`,
    preview: <LanguageSelectPreview />,
    previewLayout: "start",
  },
  {
    id: "source-control",
    title: "Source Control Provider",
    description: "Select with item descriptions for choosing a Git hosting provider.",
    code: `import { useState } from "react";
import { Select } from "ui-lab-components";
import { SiGithub, SiGitlab, SiBitbucket } from "react-icons/si";

const providers = [
  { value: "github", label: "GitHub", icon: SiGithub, description: "The world's leading software development platform" },
  { value: "gitlab", label: "GitLab", icon: SiGitlab, description: "Complete DevOps platform with built-in CI/CD" },
  { value: "bitbucket", label: "Bitbucket", icon: SiBitbucket, description: "Git solution for professional teams" },
];

export function ProviderSelect() {
  const [provider, setProvider] = useState("github");
  const selected = providers.find(p => p.value === provider);

  return (
    <Select selectedKey={provider} onSelectionChange={setProvider} className="w-80">
      <Select.Trigger>
        <Select.Value placeholder="Select provider" icon={selected && <selected.icon />} />
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          {providers.map((p) => (
            <Select.Item
              key={p.value}
              value={p.value}
              icon={<p.icon />}
              description={p.description}
            >
              {p.label}
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select>
  );
}`,
    preview: <SourceControlPreview />,
    previewLayout: "start",
  },
  {
    id: "country-select",
    title: "Country Selector",
    description: "Searchable country picker with flag emojis and dial codes.",
    code: `import { useState } from "react";
import { Select, Searchable } from "ui-lab-components";

const countries = [
  { value: "us", label: "United States", flag: "🇺🇸", code: "+1" },
  { value: "gb", label: "United Kingdom", flag: "🇬🇧", code: "+44" },
  { value: "de", label: "Germany", flag: "🇩🇪", code: "+49" },
  { value: "jp", label: "Japan", flag: "🇯🇵", code: "+81" },
];

export function CountrySelect() {
  const [country, setCountry] = useState("us");

  return (
    <Select selectedKey={country} onSelectionChange={setCountry} className="w-72">
      <Searchable.Trigger placeholder="Search countries..." />
      <Select.Content>
        <Select.List>
          {countries.map((c) => (
            <Select.Item key={c.value} value={c.value} icon={<span>{c.flag}</span>}>
              <div className="flex items-center justify-between w-full">
                <span>{c.label}</span>
                <span className="text-xs text-foreground-500">{c.code}</span>
              </div>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select>
  );
}`,
    preview: <CountrySelectPreview />,
    previewLayout: "start",
  },
  {
    id: "multi-select",
    title: "Multi-Select Tech Stack",
    description: "Select multiple technologies with checkboxes, descriptions, and badges with icons.",
    code: `import { useState } from "react";
import { Multi } from "ui-lab-components";
import { SiTypescript, SiPython, SiRust } from "react-icons/si";

const techStack = [
  { value: "typescript", label: "TypeScript", icon: SiTypescript, color: "#3178C6", description: "Typed superset of JavaScript" },
  { value: "python", label: "Python", icon: SiPython, color: "#3776AB", description: "General-purpose programming" },
  { value: "rust", label: "Rust", icon: SiRust, color: "#DEA584", description: "Systems programming language" },
];

export function TechStackSelect() {
  const [selected, setSelected] = useState(["typescript"]);

  return (
    <Multi selectedKeys={selected} onSelectionChange={setSelected} className="w-80">
      <Multi.Trigger placeholder="Select technologies..." />
      <Multi.Content searchPlaceholder="Search technologies...">
        <Multi.List>
          {techStack.map((tech) => {
            const TechIcon = tech.icon;
            return (
              <Multi.Item
                key={tech.value}
                value={tech.value}
                textValue={tech.label}
                icon={<TechIcon style={{ color: tech.color }} className="w-4 h-4" />}
                description={tech.description}
              >
                {tech.label}
              </Multi.Item>
            );
          })}
        </Multi.List>
      </Multi.Content>
    </Multi>
  );
}`,
    preview: <MultiSelectPreview />,
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
