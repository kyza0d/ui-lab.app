"use client";

import { useState } from 'react';
import { Select, Searchable } from 'ui-lab-components';

export const metadata = {
  title: 'Country Selector',
  description: 'Button trigger reveals a searchable country list with flags and dial codes inside the dropdown content.'
};

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

export default function Example() {
  const [country, setCountry] = useState<string | number | null>("us");
  const selected = countries.find(c => c.value === country);

  return (
    <Select
      selectedKey={country}
      valueLabel={selected?.label}
      onSelectionChange={setCountry}
      className="w-72"
    >
      <Select.Trigger>
        <Select.Value
          placeholder="Choose a country..."
          icon={selected && <span className="text-sm">{selected.flag}</span>}
        />
      </Select.Trigger>
      <Searchable.Content searchPlaceholder="Search countries...">
        {countries.map((c) => (
          <Select.Item key={c.value} value={c.value} textValue={c.label} icon={<span className="text-md">{c.flag}</span>}>
            <div className="flex items-center justify-between w-full">
              <span>{c.label}</span>
              <span className="ml-2 text-sm text-foreground-400">{c.code}</span>
            </div>
          </Select.Item>
        ))}
      </Searchable.Content>
    </Select>
  );
}
