import { Table } from "@/components/table";
import { ComponentDetail } from "@/types/component";

interface SampleData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const sampleData: SampleData[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
  { id: 3, name: "Carol White", email: "carol@example.com", status: "Active" },
  { id: 4, name: "David Brown", email: "david@example.com", status: "Pending" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", status: "Active" },
];

const basicTableCode = `import { Table } from "@/components/table";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const data: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
];

export function Example() {
  return (
    <Table
      data={data}
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}`;

const tableWithFiltersCode = `import { Table } from "@/components/table";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const data: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
];

export function Example() {
  const [filters, setFilters] = useState({});

  return (
    <Table
      data={data}
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name", filterable: true },
        { key: "email", label: "Email", filterable: true },
        { key: "status", label: "Status", filterable: true },
      ]}
      showFilters
      onFilterChange={setFilters}
    />
  );
}`;

const tableWithClickCode = `import { Table } from "@/components/table";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const data: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
];

export function Example() {
  return (
    <Table
      data={data}
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
      ]}
      onRowClick={(row) => console.log("Clicked:", row)}
    />
  );
}`;

export const tableDetail: ComponentDetail = {
  id: "table",
  name: "Table",
  description: "A minimal table component for displaying tabular data with optional filtering capabilities.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Table component provides a clean, semantic way to display structured data with optional filter controls. It's designed to be minimal yet functional, supporting both basic data display and advanced filtering scenarios.
      </p>
      <p>
        Use filters to enable real-time data filtering, and row click handlers to create interactive experiences. The component manages filter state internally and provides callbacks for external state management.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Table",
      description: "A simple table displaying data with no filters or interactive features.",
      code: basicTableCode,
      preview: (
        <Table
          data={sampleData}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "status", label: "Status" },
          ]}
        />
      ),
    },
    {
      id: "with-filters",
      title: "Table with Filters",
      description: "Table with filter inputs for searching by name, email, and status.",
      code: tableWithFiltersCode,
      preview: (
        <Table
          data={sampleData}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name", filterable: true },
            { key: "email", label: "Email", filterable: true },
            { key: "status", label: "Status", filterable: true },
          ]}
          showFilters
        />
      ),
    },
    {
      id: "with-click",
      title: "Clickable Rows",
      description: "Table rows become clickable with hover effects when onRowClick is provided.",
      code: tableWithClickCode,
      preview: (
        <Table
          data={sampleData}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "status", label: "Status" },
          ]}
          onRowClick={(row) => console.log("Clicked:", row)}
        />
      ),
    },
  ],
};
