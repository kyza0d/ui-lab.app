"use client";

import { useState } from "react";
import { Input, Flex, Badge } from "ui-lab-components";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

export const metadata = {
  title: "Search",
  description: "Search input with a keyboard shortcut hint that switches to a clear action once the user types.",
};

export default function Example() {
  const [query, setQuery] = useState("");

  return (
    <Flex direction="column" gap="sm" style={{ width: 340 }}>
      <Input
        icon={<FaMagnifyingGlass className="w-3.5 h-3.5 text-foreground-400" />}
        placeholder="Search components..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        hint={!query ? <Badge>⌘K</Badge> : undefined}
        actions={
          query
            ? [{ icon: <FaXmark className="w-3.5 h-3.5" />, title: "Clear", onClick: () => setQuery("") }]
            : []
        }
      />
    </Flex>
  );
}
