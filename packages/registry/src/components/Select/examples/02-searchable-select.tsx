import React from 'react';
import { Select, Searchable } from 'ui-lab-components';

export const metadata = {
  title: 'Searchable Select',
  description: 'A filterable select component with search input. Type to filter through a large list of options.'
};

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'br', label: 'Brazil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'pt', label: 'Portugal' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'be', label: 'Belgium' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'at', label: 'Austria' },
  { value: 'se', label: 'Sweden' },
  { value: 'no', label: 'Norway' },
  { value: 'dk', label: 'Denmark' },
  { value: 'fi', label: 'Finland' },
  { value: 'pl', label: 'Poland' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'kr', label: 'South Korea' },
  { value: 'in', label: 'India' },
  { value: 'au', label: 'Australia' },
  { value: 'nz', label: 'New Zealand' },
];

export default function Example() {
  return (
    <Select>
      <Searchable.Trigger placeholder="Search countries..." />
      <Searchable.Content searchPlaceholder="Type to filter...">
        {countries.map((country) => (
          <Select.Item key={country.value} value={country.value} textValue={country.label}>
            {country.label}
          </Select.Item>
        ))}
      </Searchable.Content>
    </Select>
  );
}
