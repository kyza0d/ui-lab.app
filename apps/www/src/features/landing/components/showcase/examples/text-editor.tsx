"use client";

import { useReducer } from "react";
import { Group, Divider, Select, Tooltip } from "ui-lab-components";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl, FaLink } from "react-icons/fa6";

interface EditorState {
  textStyle: string | number | null;
  fontSize: string | number | null;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: string;
}

type EditorAction =
  | { type: 'SET_TEXT_STYLE'; payload: string | number | null }
  | { type: 'SET_FONT_SIZE'; payload: string | number | null }
  | { type: 'SET_BOLD'; payload: boolean }
  | { type: 'SET_ITALIC'; payload: boolean }
  | { type: 'SET_UNDERLINE'; payload: boolean }
  | { type: 'SET_ALIGN'; payload: string };

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_TEXT_STYLE':
      return { ...state, textStyle: action.payload };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'SET_BOLD':
      return { ...state, bold: action.payload };
    case 'SET_ITALIC':
      return { ...state, italic: action.payload };
    case 'SET_UNDERLINE':
      return { ...state, underline: action.payload };
    case 'SET_ALIGN':
      return { ...state, align: action.payload };
    default:
      return state;
  }
}

export function TextEditor() {
  const [state, dispatch] = useReducer(editorReducer, {
    textStyle: "paragraph",
    fontSize: "16",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
  });

  return (
    <div className="w-full bg-background-200 border border-background-700 rounded-sm overflow-hidden">
      <div className="border-b border-background-700">
        <div className="[&_.button]:aspect-square [&_.button]:p-0! px-1.5 h-14 flex items-center justify-between w-full">
          <Group className="flex">
            <Group.Select selectedKey={state.textStyle} onSelectionChange={(v) => dispatch({ type: 'SET_TEXT_STYLE', payload: v })} className="w-40">
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

            <Divider />

            <Group.Select selectedKey={state.fontSize} onSelectionChange={(v) => dispatch({ type: 'SET_FONT_SIZE', payload: v })} className="w-20">
              <Select.Trigger>
                <Select.Value placeholder="16" />
              </Select.Trigger>
              <Select.Content>
                <Select.List>
                  <Select.Item value="12" textValue="12">12</Select.Item>
                  <Select.Item value="14" textValue="14">14</Select.Item>
                  <Select.Item value="16" textValue="16">16</Select.Item>
                  <Select.Item value="18" textValue="18">18</Select.Item>
                  <Select.Item value="20" textValue="20">20</Select.Item>
                  <Select.Item value="24" textValue="24">24</Select.Item>
                  <Select.Item value="32" textValue="32">32</Select.Item>
                </Select.List>
              </Select.Content>
            </Group.Select>
          </Group>


          <Divider orientation="vertical" />
          <Group spacing="xs">
            <Tooltip content="Bold">
              <Group.Button active={state.bold} onClick={() => dispatch({ type: 'SET_BOLD', payload: !state.bold })}><FaBold size={13} /></Group.Button>
            </Tooltip>

            <Tooltip content="Italic">
              <Group.Button active={state.italic} onClick={() => dispatch({ type: 'SET_ITALIC', payload: !state.italic })}>
                <FaItalic size={13} />
              </Group.Button>
            </Tooltip>

            <Tooltip content="Underline">
              <Group.Button active={state.underline} onClick={() => dispatch({ type: 'SET_UNDERLINE', payload: !state.underline })}>
                <FaUnderline size={13} />
              </Group.Button>
            </Tooltip>

            <Divider />

            <Tooltip content="Align Left"><Group.Button active={state.align === "left"} onClick={() => dispatch({ type: 'SET_ALIGN', payload: "left" })}><FaAlignLeft size={13} /></Group.Button></Tooltip>
            <Tooltip content="Align Center"><Group.Button active={state.align === "center"} onClick={() => dispatch({ type: 'SET_ALIGN', payload: "center" })}><FaAlignCenter size={13} /></Group.Button></Tooltip>
            <Tooltip content="Align Right"><Group.Button active={state.align === "right"} onClick={() => dispatch({ type: 'SET_ALIGN', payload: "right" })}><FaAlignRight size={13} /></Group.Button></Tooltip>
          </Group>
        </div>
      </div>

      <textarea
        rows={5}
        placeholder="Start writing..."
        className="w-full bg-transparent px-4 py-3 text-sm text-foreground-100 placeholder:text-foreground-500 resize-none outline-none"
        style={{
          fontStyle: state.italic ? "italic" : "normal",
          fontWeight: state.bold ? "bold" : "normal",
          textDecoration: state.underline ? "underline" : "none",
          textAlign: state.align as "left" | "center" | "right",
          fontSize: state.fontSize ? `${state.fontSize}px` : undefined,
        }}
      />

      <div className="px-3 py-2 border-t border-background-700 flex items-center justify-between">
        <span className="text-sm text-foreground-500">Markdown enabled</span>
        <Group spacing="sm" className="h-12">
          <Group.Button variant="ghost" size="sm">Discard</Group.Button>
          <Divider />
          <Group.Button variant="default" size="sm">Publish</Group.Button>
        </Group>
      </div>
    </div>
  );
}
