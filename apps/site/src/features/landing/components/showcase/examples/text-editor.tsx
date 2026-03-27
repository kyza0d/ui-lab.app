"use client";

import { useReducer } from "react";
import { Group, Divider, Select, Tooltip } from "ui-lab-components";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl, FaLink } from "react-icons/fa6";

interface EditorState {
  textStyle: string | number | null;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: string;
}

type EditorAction =
  | { type: 'SET_TEXT_STYLE'; payload: string | number | null }
  | { type: 'SET_BOLD'; payload: boolean }
  | { type: 'SET_ITALIC'; payload: boolean }
  | { type: 'SET_UNDERLINE'; payload: boolean }
  | { type: 'SET_ALIGN'; payload: string };

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_TEXT_STYLE':
      return { ...state, textStyle: action.payload };
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
    bold: false,
    italic: false,
    underline: false,
    align: "left",
  });

  return (
    <div className="w-full bg-background-200 border border-background-700 rounded-sm overflow-hidden">
      <div className="border-b border-background-700">
        <Group variant="ghost" spacing="xs" className="justify-between w-full">
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

          <Divider orientation="vertical" />

          <Tooltip content="Bold">
            <Group.Button size="icon" active={state.bold} onClick={() => dispatch({ type: 'SET_BOLD', payload: !state.bold })}><FaBold size={13} /></Group.Button>
          </Tooltip>

          <Tooltip content="Italic">
            <Group.Button size="icon" active={state.italic} onClick={() => dispatch({ type: 'SET_ITALIC', payload: !state.italic })}>
              <FaItalic size={13} />
            </Group.Button>
          </Tooltip>

          <Tooltip content="Underline">
            <Group.Button active={state.underline} onClick={() => dispatch({ type: 'SET_UNDERLINE', payload: !state.underline })}>
              <FaUnderline size={13} />
            </Group.Button>
          </Tooltip>

          <Divider orientation="vertical" />

          <Tooltip content="Align Left"><Group.Button active={state.align === "left"} onClick={() => dispatch({ type: 'SET_ALIGN', payload: "left" })}><FaAlignLeft size={13} /></Group.Button></Tooltip>
          <Tooltip content="Align Center"><Group.Button active={state.align === "center"} onClick={() => dispatch({ type: 'SET_ALIGN', payload: "center" })}><FaAlignCenter size={13} /></Group.Button></Tooltip>
          <Tooltip content="Align Right"><Group.Button active={state.align === "right"} onClick={() => dispatch({ type: 'SET_ALIGN', payload: "right" })}><FaAlignRight size={13} /></Group.Button></Tooltip>
        </Group>
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
        }}
      />

      <div className="px-3 py-2 border-t border-background-700 flex items-center justify-between">
        <span className="text-sm text-foreground-500">Markdown enabled</span>
        <Group spacing="sm">
          <Group.Button variant="ghost" size="sm">Discard</Group.Button>
          <Group.Button variant="default" size="sm">Publish</Group.Button>
        </Group>
      </div>
    </div>
  );
}
