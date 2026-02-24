"use client";

import { useState, useMemo } from "react";
import { List, Group, Select, Divider } from "ui-lab-components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SiGithub, SiSlack, SiFigma, SiLinear, SiNotion, SiVercel } from "react-icons/si";

interface Integration {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  initiallyConnected: boolean;
}

const INTEGRATIONS: Integration[] = [
  { id: "github", name: "GitHub", desc: "Push-to-deploy from any branch.", icon: <SiGithub size={20} />, initiallyConnected: true },
  { id: "slack", name: "Slack", desc: "Get build and deploy notifications.", icon: <SiSlack size={20} />, initiallyConnected: true },
  { id: "vercel", name: "Vercel", desc: "Deploy previews on every push.", icon: <SiVercel size={20} />, initiallyConnected: true },
  { id: "figma", name: "Figma", desc: "Design handoff with live preview.", icon: <SiFigma size={20} />, initiallyConnected: false },
  { id: "linear", name: "Linear", desc: "Sync issues and pull requests.", icon: <SiLinear size={20} />, initiallyConnected: false },
  { id: "notion", name: "Notion", desc: "Document changelogs automatically.", icon: <SiNotion size={20} />, initiallyConnected: false },
];

export function IntegrationsPanel() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | number | null>("all");
  const [connected, setConnected] = useState(
    () => new Set(INTEGRATIONS.filter((i) => i.initiallyConnected).map((i) => i.id))
  );

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return INTEGRATIONS.filter((item) => {
      const matchesQuery = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      const isConnected = connected.has(item.id);
      const matchesFilter =
        filter === "all" ||
        (filter === "connected" && isConnected) ||
        (filter === "available" && !isConnected);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, connected]);

  function toggle(id: string) {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="w-full bg-background-200 border border-background-700 rounded-md overflow-hidden">
      <div className="px-3 py-2.5 border-b border-background-700">
        <Group >
          <Group.Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search integrations..."
            prefixIcon={<FaMagnifyingGlass />}
            className="flex-1"
          />
          <Divider />
          <Group.Select selectedKey={filter} onSelectionChange={setFilter} className="w-36">
            <Select.Trigger>
              <Select.Value placeholder="All" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="all" textValue="All">All</Select.Item>
                <Select.Item value="connected" textValue="Connected">Connected</Select.Item>
                <Select.Item value="available" textValue="Available">Available</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>
        </Group>
      </div>

      <List items={visible} spacing="default" className="max-w-none">
        {visible.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-foreground-500">
            No integrations match your search.
          </div>
        ) : (
          visible.map((item, i) => {
            const isConnected = connected.has(item.id);
            return (
              <div key={item.id}>
                <List.Item value={item.id} className="px-4 py-3">
                  <List.Media>
                    <div className="w-20 h-20 rounded-md flex items-center justify-center text-sm bg-background-300 text-foreground-300">
                      {item.icon}
                    </div>
                  </List.Media>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground-100">{item.name}</div>
                    <List.Desc>{item.desc}</List.Desc>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggle(item.id); }}
                    className={`flex-shrink-0 text-xs px-2.5 py-1 rounded font-medium transition-colors ${isConnected
                      ? "bg-background-400 text-foreground-200 hover:bg-background-500 hover:text-foreground-100"
                      : "bg-background-300 text-foreground-400 hover:bg-background-400 hover:text-foreground-100"
                      }`}
                  >
                    {isConnected ? "Connected" : "Connect"}
                  </button>
                </List.Item>
                {i < visible.length - 1 && <List.Divider spacing="none" />}
              </div>
            );
          })
        )}
      </List>
    </div>
  );
}
