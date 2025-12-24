import React from 'react';
import { Table } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Table',
  description: 'A simple data table displaying structured information with columns and rows. Use this for displaying tabular data in your application.'
};

export default function Example() {
  const data = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', status: 'Active' }
  ];

  return (
    <Table
      data={data}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'status', label: 'Status' }
      ]}
    />
  );
}
