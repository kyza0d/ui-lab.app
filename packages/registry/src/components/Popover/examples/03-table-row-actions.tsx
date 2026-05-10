"use client";

import { Popover, Button, List } from 'ui-lab-components';
import { FaEllipsis } from 'react-icons/fa6';

export const metadata = {
  title: 'Table Row Actions',
  description: 'Per-row action menu in a data table, anchored to the overflow button.'
};

const rows = [
  { id: "usr_1", name: "Alice", role: "Admin", status: "Active" },
  { id: "usr_2", name: "Bob", role: "Member", status: "Invited" },
  { id: "usr_3", name: "Carol", role: "Viewer", status: "Active" },
];

export default function Example() {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-background-700">
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Name</th>
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Role</th>
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Status</th>
          <th className="py-2 px-3" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-background-700 last:border-0">
            <td className="py-2 px-3">{row.name}</td>
            <td className="py-2 px-3 text-foreground-200">{row.role}</td>
            <td className="py-2 px-3 text-foreground-200">{row.status}</td>
            <td className="py-2 px-3 text-right">
              <Popover
                position="left"
                content={
                  <List gap="sm" styles={{ root: "w-full" }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      styles={{ root: "justify-start" }}
                    >
                      Edit {row.name}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      styles={{ root: "justify-start" }}
                    >
                      Remove {row.name}
                    </Button>
                  </List>
                }
              >
                <Button icon={<FaEllipsis />} styles="p-2" size="icon" variant="ghost" aria-label={`Row actions for ${row.name}`} />
              </Popover>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
