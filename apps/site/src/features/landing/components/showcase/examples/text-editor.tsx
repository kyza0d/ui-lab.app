"use client";

import { useState } from "react";
import { Group, Divider, Select, Tooltip } from "ui-lab-components";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl, FaLink } from "react-icons/fa6";

export function TextEditor() {
  const [textStyle, setTextStyle] = useState<string | number | null>("paragraph");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [align, setAlign] = useState("left");

  return (
    <div className="w-full bg-background-200 border border-background-700 rounded-sm overflow-hidden">
      <div className="border-b border-background-700">
        <Group variant="ghost" orientation="horizontal" spacing="sm">
          <Group.Select selectedKey={textStyle} onSelectionChange={setTextStyle} className="w-40">
            <Select.Trigger>
              <Select.Value placeholder="Paragraph" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="paragraph" textValue="Paragraph">Paragraph</Select.Item>
                <Select.Item value="h1" textValue="Heading 1">Heading 1</Select.Item>
                <Select.Item value="h2" textValue="Heading 2">Heading 2</Select.Item>
                <Select.Item value="quote" textValue="Quote">Quote</Select.Item>
                <Select.Item value="code" textValue="Code">Code</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>

          <Divider orientation="vertical" />

          <Tooltip content="Bold"><Group.Button active={bold} onClick={() => setBold(b => !b)}><FaBold size={13} /></Group.Button></Tooltip>
          <Tooltip content="Italic"><Group.Button active={italic} onClick={() => setItalic(i => !i)}><FaItalic size={13} /></Group.Button></Tooltip>
          <Tooltip content="Underline"><Group.Button active={underline} onClick={() => setUnderline(u => !u)}><FaUnderline size={13} /></Group.Button></Tooltip>

          <Divider orientation="vertical" />

          <Tooltip content="Align Left"><Group.Button active={align === "left"} onClick={() => setAlign("left")}><FaAlignLeft size={13} /></Group.Button></Tooltip>
          <Tooltip content="Align Center"><Group.Button active={align === "center"} onClick={() => setAlign("center")}><FaAlignCenter size={13} /></Group.Button></Tooltip>
          <Tooltip content="Align Right"><Group.Button active={align === "right"} onClick={() => setAlign("right")}><FaAlignRight size={13} /></Group.Button></Tooltip>
        </Group>
      </div>

      <textarea
        rows={5}
        placeholder="Start writing..."
        className="w-full bg-transparent px-4 py-3 text-xs text-foreground-100 placeholder:text-foreground-500 resize-none outline-none"
        style={{
          fontStyle: italic ? "italic" : "normal",
          fontWeight: bold ? "bold" : "normal",
          textDecoration: underline ? "underline" : "none",
          textAlign: align as "left" | "center" | "right",
        }}
      />

      <div className="px-3 py-2 border-t border-background-700 flex items-center justify-between">
        <span className="text-xs text-foreground-500">Markdown enabled</span>
        <Group spacing="sm">
          <Group.Button variant="ghost" size="sm">Discard</Group.Button>
          <Group.Button variant="default" size="sm">Publish</Group.Button>
        </Group>
      </div>
    </div>
  );
}
