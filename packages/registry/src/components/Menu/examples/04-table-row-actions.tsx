import { Menu, Button } from "ui-lab-components";
import { FaEllipsis } from "react-icons/fa6";

export const metadata = {
  title: "Table Row Actions",
  description: "Per-row overflow menu in a table, with a destructive action separated from neutral ones.",
};

const rows = [
  { id: "doc_1", name: "Q3 roadmap", updated: "2h ago" },
  { id: "doc_2", name: "Pricing review", updated: "yesterday" },
  { id: "doc_3", name: "Hiring plan", updated: "3 days ago" },
];

export default function Example() {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-background-700">
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Document</th>
          <th className="text-left py-2 px-3 font-medium text-foreground-200">Updated</th>
          <th className="py-2 px-3" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-background-700 last:border-0">
            <td className="py-2 px-3">{row.name}</td>
            <td className="py-2 px-3 text-foreground-400">{row.updated}</td>
            <td className="py-2 px-3 text-right">
              <Menu type="pop-over">
                <Menu.Trigger>
                  <Button
                    icon={<FaEllipsis />}
                    size="icon"
                    variant="ghost"
                    styles="p-2"
                    aria-label={`Actions for ${row.name}`}
                  />
                </Menu.Trigger>
                <Menu.Content align="end">
                  <Menu.Item onSelect={() => {}}>Open</Menu.Item>
                  <Menu.Item onSelect={() => {}}>Rename</Menu.Item>
                  <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item
                    onSelect={() => {}}
                    styles={{ root: "text-destructive" }}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Content>
              </Menu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
