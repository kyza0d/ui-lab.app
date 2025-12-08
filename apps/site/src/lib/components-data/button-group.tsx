"use client"

import React, { useState } from "react"
import { ButtonGroup, ButtonGroupItem } from "@ui-lab/components"
import { ComponentDetail } from "@/types/component"
import { ControlDef } from "@/components/component-configurator"
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaVolumeHigh,
  FaList,
  FaTableCells,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaPencil,
  FaEraser,
  FaDownload,
  FaShare,
  FaComment,
  FaStar,
  FaMagnifyingGlassPlus,
  FaMagnifyingGlassMinus,
  FaStrikethrough,
  FaCode,
} from "react-icons/fa6"

// Text Formatting Toolbar Preview
function TextFormattingToolbarPreview() {
  const [selected, setSelected] = useState<string>("bold")

  return (
    <div className="flex flex-col gap-8">
      <div>
        <ButtonGroup spacing="tight" showDividers>
          <ButtonGroupItem
            size="icon"
            icon={<FaBold />}
            isSelected={selected === "bold"}
            onClick={() => setSelected("bold")}
            title="Bold"
          />
          <ButtonGroupItem
            size="icon"
            icon={<FaItalic />}
            isSelected={selected === "italic"}
            onClick={() => setSelected("italic")}
            title="Italic"
          />
          <ButtonGroupItem
            size="icon"
            icon={<FaUnderline />}
            isSelected={selected === "underline"}
            onClick={() => setSelected("underline")}
            title="Underline"
          />
          <ButtonGroupItem
            size="icon"
            icon={<FaStrikethrough />}
            isSelected={selected === "strikethrough"}
            onClick={() => setSelected("strikethrough")}
            title="Strikethrough"
          />
        </ButtonGroup>
      </div>

      <div>
        <ButtonGroup variant="outline" spacing="tight" showDividers>
          <ButtonGroupItem
            size="icon"
            icon={<FaBold />}
            isSelected={selected === "bold"}
            onClick={() => setSelected("bold")}
            title="Bold"
          />
          <ButtonGroupItem
            size="icon"
            icon={<FaItalic />}
            isSelected={selected === "italic"}
            onClick={() => setSelected("italic")}
            title="Italic"
          />
          <ButtonGroupItem
            size="icon"
            icon={<FaCode />}
            isSelected={selected === "code"}
            onClick={() => setSelected("code")}
            title="Code"
          />
        </ButtonGroup>
      </div>
    </div>
  )
}

// Text Alignment Preview
function TextAlignmentPreview() {
  const [alignment, setAlignment] = useState<string>("left")

  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup variant="secondary" spacing="tight" showDividers>
        <ButtonGroupItem
          size="icon"
          icon={<FaAlignLeft />}
          isSelected={alignment === "left"}
          onClick={() => setAlignment("left")}
          title="Align left"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaAlignCenter />}
          isSelected={alignment === "center"}
          onClick={() => setAlignment("center")}
          title="Align center"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaAlignRight />}
          isSelected={alignment === "right"}
          onClick={() => setAlignment("right")}
          title="Align right"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaAlignJustify />}
          isSelected={alignment === "justify"}
          onClick={() => setAlignment("justify")}
          title="Justify"
        />
      </ButtonGroup>
    </div>
  )
}

// Media Controls Preview
function MediaControlsPreview() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup spacing="tight" showDividers>
        <ButtonGroupItem
          size="icon"
          icon={<FaBackward />}
          title="Previous"
        />
        <ButtonGroupItem
          size="icon"
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          isSelected={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause" : "Play"}
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaForward />}
          title="Next"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaVolumeHigh />}
          title="Volume"
        />
      </ButtonGroup>
    </div>
  )
}

// View Mode Switcher Preview
function ViewModeSwitcherPreview() {
  const [viewMode, setViewMode] = useState<string>("list")

  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup variant="ghost" spacing="normal" showDividers>
        <ButtonGroupItem
          size="icon"
          icon={<FaList />}
          isSelected={viewMode === "list"}
          onClick={() => setViewMode("list")}
          title="List view"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaTableCells />}
          isSelected={viewMode === "grid"}
          onClick={() => setViewMode("grid")}
          title="Grid view"
        />
      </ButtonGroup>
    </div>
  )
}

// Direction Controls Preview
function DirectionControlsPreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 items-center">
        <ButtonGroup variant="secondary" spacing="tight">
          <ButtonGroupItem
            size="icon"
            icon={<FaArrowUp />}
            title="Up"
          />
        </ButtonGroup>
        <ButtonGroup variant="secondary" spacing="tight" showDividers>
          <ButtonGroupItem
            size="icon"
            icon={<FaArrowLeft />}
            title="Left"
          />
          <ButtonGroupItem
            size="icon"
            icon={<FaArrowDown />}
            title="Down"
          />
          <ButtonGroupItem
            size="icon"
            icon={<FaArrowRight />}
            title="Right"
          />
        </ButtonGroup>
      </div>
    </div>
  )
}

// Vertical Button Group Preview
function VerticalButtonGroupPreview() {
  const [selected, setSelected] = useState<string>("option1")

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-foreground-400">Vertical layout:</p>
      <ButtonGroup orientation="vertical" variant="secondary" spacing="tight" showDividers>
        <ButtonGroupItem
          size="md"
          isSelected={selected === "option1"}
          onClick={() => setSelected("option1")}
        >
          Option 1
        </ButtonGroupItem>
        <ButtonGroupItem
          size="md"
          isSelected={selected === "option2"}
          onClick={() => setSelected("option2")}
        >
          Option 2
        </ButtonGroupItem>
        <ButtonGroupItem
          size="md"
          isSelected={selected === "option3"}
          onClick={() => setSelected("option3")}
        >
          Option 3
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}

// Vertical Icon Group Preview
function VerticalIconGroupPreview() {
  const [tool, setTool] = useState<string>("pen")

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-foreground-400">Vertical toolbar:</p>
      <ButtonGroup orientation="vertical" variant="outline" spacing="normal" showDividers>
        <ButtonGroupItem
          size="icon"
          icon={<FaPencil />}
          isSelected={tool === "pen"}
          onClick={() => setTool("pen")}
          title="Pen"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaEraser />}
          isSelected={tool === "eraser"}
          onClick={() => setTool("eraser")}
          title="Eraser"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaMagnifyingGlassPlus />}
          isSelected={tool === "zoom"}
          onClick={() => setTool("zoom")}
          title="Zoom"
        />
      </ButtonGroup>
    </div>
  )
}

// Drawing Tools Preview
function DrawingToolsPreview() {
  const [tool, setTool] = useState<string>("pen")

  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup variant="default" spacing="tight" showDividers>
        <ButtonGroupItem
          size="icon"
          icon={<FaPencil />}
          isSelected={tool === "pen"}
          onClick={() => setTool("pen")}
          title="Pen"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaEraser />}
          isSelected={tool === "eraser"}
          onClick={() => setTool("eraser")}
          title="Eraser"
        />
      </ButtonGroup>
    </div>
  )
}

// Zoom Controls Preview
function ZoomControlsPreview() {
  const [zoom, setZoom] = useState(100)

  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup variant="outline" spacing="tight" showDividers>
        <ButtonGroupItem
          size="icon"
          icon={<FaMagnifyingGlassMinus />}
          onClick={() => setZoom(Math.max(50, zoom - 10))}
          title="Zoom out"
        />
        <ButtonGroupItem
          size="md"
          disabled
          className="cursor-default"
        >
          {zoom}%
        </ButtonGroupItem>
        <ButtonGroupItem
          size="icon"
          icon={<FaMagnifyingGlassPlus />}
          onClick={() => setZoom(Math.min(200, zoom + 10))}
          title="Zoom in"
        />
      </ButtonGroup>
    </div>
  )
}

// Star Rating Preview
function StarRatingPreview() {
  const [rating, setRating] = useState<number>(0)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-foreground-400">Rate this: {rating} stars</p>
      <ButtonGroup variant="ghost" spacing="tight">
        {[1, 2, 3, 4, 5].map((star) => (
          <ButtonGroupItem
            key={star}
            size="icon"
            icon={<FaStar className={star <= rating ? "text-yellow-400" : ""} />
            }
            isSelected={star <= rating}
            onClick={() => setRating(star)}
            title={`${star} star${star !== 1 ? "s" : ""}`}
          />
        ))}
      </ButtonGroup>
    </div>
  )
}

// Actions Group Preview
function ActionsGroupPreview() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-foreground-400">Document actions:</p>
      <ButtonGroup variant="secondary" spacing="normal" showDividers>
        <ButtonGroupItem
          size="icon"
          icon={<FaDownload />}
          title="Download"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaShare />}
          title="Share"
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaComment />}
          title="Comment"
        />
      </ButtonGroup>
    </div>
  )
}

// Controls
const buttonGroupControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Secondary", value: "secondary" },
      { label: "Outline", value: "outline" },
      { label: "Ghost", value: "ghost" },
    ],
    defaultValue: "default",
  },
  {
    name: "spacing",
    label: "Spacing",
    type: "select",
    options: [
      { label: "Tight", value: "tight" },
      { label: "Normal", value: "normal" },
      { label: "Relaxed", value: "relaxed" },
    ],
    defaultValue: "normal",
  },
  {
    name: "size",
    label: "Size",
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Icon", value: "icon" },
    ],
    defaultValue: "md",
  },
]

// Code snippets
const basicButtonGroupCode = `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";

export function Example() {
  const [selected, setSelected] = useState("bold");

  return (
    <ButtonGroup variant="outline" spacing="tight">
      <ButtonGroupItem
        size="icon"
        icon={<FaBold />}
        isSelected={selected === "bold"}
        onClick={() => setSelected("bold")}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaItalic />}
        isSelected={selected === "italic"}
        onClick={() => setSelected("italic")}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaUnderline />}
        isSelected={selected === "underline"}
        onClick={() => setSelected("underline")}
      />
    </ButtonGroup>
  );
}`

const textAlignmentCode = `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify
} from "react-icons/fa6";

export function Example() {
  const [alignment, setAlignment] = useState("left");

  return (
    <ButtonGroup variant="secondary" spacing="tight">
      <ButtonGroupItem
        size="icon"
        icon={<FaAlignLeft />}
        isSelected={alignment === "left"}
        onClick={() => setAlignment("left")}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaAlignCenter />}
        isSelected={alignment === "center"}
        onClick={() => setAlignment("center")}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaAlignRight />}
        isSelected={alignment === "right"}
        onClick={() => setAlignment("right")}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaAlignJustify />}
        isSelected={alignment === "justify"}
        onClick={() => setAlignment("justify")}
      />
    </ButtonGroup>
  );
}`

const mediaControlsCode = `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaVolumeHigh,
} from "react-icons/fa6";

export function Example() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ButtonGroup variant="outline" spacing="normal">
      <ButtonGroupItem
        size="icon"
        icon={<FaBackward />}
      />
      <ButtonGroupItem
        size="icon"
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        isSelected={isPlaying}
        onClick={() => setIsPlaying(!isPlaying)}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaForward />}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaVolumeHigh />}
      />
    </ButtonGroup>
  );
}`

const viewModeSwitcherCode = `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { FaList, FaTableCells } from "react-icons/fa6";

export function Example() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <ButtonGroup variant="ghost" spacing="tight">
      <ButtonGroupItem
        size="icon"
        icon={<FaList />}
        isSelected={viewMode === "list"}
        onClick={() => setViewMode("list")}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaTableCells />}
        isSelected={viewMode === "grid"}
        onClick={() => setViewMode("grid")}
      />
    </ButtonGroup>
  );
}`

const starRatingCode = `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { FaStar } from "react-icons/fa6";

export function Example() {
  const [rating, setRating] = useState(0);

  return (
    <ButtonGroup variant="ghost" spacing="tight">
      {[1, 2, 3, 4, 5].map((star) => (
        <ButtonGroupItem
          key={star}
          size="icon"
          icon={
            <FaStar
              className={star <= rating ? "text-yellow-400" : ""}
            />
          }
          isSelected={star <= rating}
          onClick={() => setRating(star)}
        />
      ))}
    </ButtonGroup>
  );
}`

const withLabelCode = `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";

export function Example() {
  const [priority, setPriority] = useState("medium");

  return (
    <ButtonGroup variant="secondary" spacing="normal">
      <ButtonGroupItem
        size="md"
        isSelected={priority === "low"}
        onClick={() => setPriority("low")}
      >
        Low
      </ButtonGroupItem>
      <ButtonGroupItem
        size="md"
        isSelected={priority === "medium"}
        onClick={() => setPriority("medium")}
      >
        Medium
      </ButtonGroupItem>
      <ButtonGroupItem
        size="md"
        isSelected={priority === "high"}
        onClick={() => setPriority("high")}
      >
        High
      </ButtonGroupItem>
    </ButtonGroup>
  );
}`

const verticalOrientationCode = `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import {
  FaArrowUp,
  FaArrowLeft,
  FaArrowDown,
  FaArrowRight
} from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <ButtonGroup orientation="vertical" variant="secondary">
        <ButtonGroupItem
          size="icon"
          icon={<FaArrowUp />}
        />
      </ButtonGroup>
      <ButtonGroup variant="secondary">
        <ButtonGroupItem
          size="icon"
          icon={<FaArrowLeft />}
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaArrowDown />}
        />
        <ButtonGroupItem
          size="icon"
          icon={<FaArrowRight />}
        />
      </ButtonGroup>
    </div>
  );
}`

export const buttonGroupDetail: ComponentDetail = {
  id: "button-group",
  name: "ButtonGroup",
  description:
    "A flexible button group component for grouping related actions or selections. Supports icon-only buttons, text labels, and various visual styles.",
  overview: (
    <div className="space-y-4">
      <p>
        The ButtonGroup component organizes multiple related buttons or actions
        in a coherent, visually connected group. It's perfect for:
      </p>
      <ul className="list-disc list-inside space-y-2 text-sm text-foreground-400">
        <li>Text formatting toolbars (bold, italic, underline)</li>
        <li>View mode selection (list, grid, kanban)</li>
        <li>Media controls (play, pause, skip)</li>
        <li>Text alignment options</li>
        <li>Direction or navigation controls</li>
        <li>Drawing or design tool selection</li>
        <li>Rating or voting systems</li>
        <li>Priority or status selectors</li>
      </ul>
      <p className="text-sm text-foreground-400">
        The unique <code className="bg-background-800 px-1 rounded">size="icon"</code> prop
        creates perfect square icon buttons ideal for toolbars and compact interfaces.
      </p>
    </div>
  ),
  examples: [
    {
      id: "text-formatting",
      title: "Text Formatting Toolbar",
      description:
        "Common in rich text editors - bold, italic, underline, and strikethrough formatting options",
      code: basicButtonGroupCode,
      preview: <TextFormattingToolbarPreview />,
      renderPreview: () => <TextFormattingToolbarPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "text-alignment",
      title: "Text Alignment Controls",
      description:
        "Select text alignment: left, center, right, or justified. Classic editor toolbar pattern.",
      code: textAlignmentCode,
      preview: <TextAlignmentPreview />,
      renderPreview: () => <TextAlignmentPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "media-controls",
      title: "Media Player Controls",
      description:
        "Transport controls for audio/video playback with previous, play/pause, next, and volume.",
      code: mediaControlsCode,
      preview: <MediaControlsPreview />,
      renderPreview: () => <MediaControlsPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "view-mode-switcher",
      title: "View Mode Switcher",
      description:
        "Switch between different display modes - list view, grid view, or kanban layout.",
      code: viewModeSwitcherCode,
      preview: <ViewModeSwitcherPreview />,
      renderPreview: () => <ViewModeSwitcherPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "direction-controls",
      title: "Navigation Direction Controls",
      description:
        "Arrow-based controls for directional navigation in maps, games, or spatial interfaces.",
      code: verticalOrientationCode,
      preview: <DirectionControlsPreview />,
      renderPreview: () => <DirectionControlsPreview />,
      controls: [
        ...buttonGroupControls,
        {
          name: "orientation",
          label: "Orientation",
          type: "select",
          options: [
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ],
          defaultValue: "horizontal",
        },
      ],
    },
    {
      id: "drawing-tools",
      title: "Drawing Tool Selection",
      description:
        "Select active drawing tool in canvas-based applications (pen, eraser, highlighter).",
      code: `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { FaPencil, FaEraser } from "react-icons/fa6";

export function Example() {
  const [tool, setTool] = useState("pen");

  return (
    <ButtonGroup variant="default" spacing="tight">
      <ButtonGroupItem
        size="icon"
        icon={<FaPencil />}
        isSelected={tool === "pen"}
        onClick={() => setTool("pen")}
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaEraser />}
        isSelected={tool === "eraser"}
        onClick={() => setTool("eraser")}
      />
    </ButtonGroup>
  );
}`,
      preview: <DrawingToolsPreview />,
      renderPreview: () => <DrawingToolsPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "zoom-controls",
      title: "Zoom Level Controls",
      description: "Adjust zoom level in image viewers or design applications.",
      code: `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";

export function Example() {
  const [zoom, setZoom] = useState(100);

  return (
    <ButtonGroup variant="outline" spacing="tight">
      <ButtonGroupItem
        size="icon"
        icon={<FaMagnifyingGlassMinus />}
        onClick={() => setZoom(Math.max(50, zoom - 10))}
      />
      <ButtonGroupItem
        size="md"
        disabled
        className="cursor-default"
      >
        {zoom}%
      </ButtonGroupItem>
      <ButtonGroupItem
        size="icon"
        icon={<FaMagnifyingGlassPlus />}
        onClick={() => setZoom(Math.min(200, zoom + 10))}
      />
    </ButtonGroup>
  );
}`,
      preview: <ZoomControlsPreview />,
      renderPreview: () => <ZoomControlsPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "star-rating",
      title: "Interactive Star Rating",
      description:
        "User-friendly 5-star rating system for reviews and feedback.",
      code: starRatingCode,
      preview: <StarRatingPreview />,
      renderPreview: () => <StarRatingPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "with-labels",
      title: "Button Group with Labels",
      description:
        "Buttons with text labels instead of icons - ideal for priority, status, or categorical selection.",
      code: withLabelCode,
      preview: (
        <div className="flex flex-col gap-4">
          <p className="text-xs text-foreground-400">Priority selector:</p>
          <ButtonGroup variant="secondary" spacing="normal">
            <ButtonGroupItem size="md" isSelected>
              Low
            </ButtonGroupItem>
            <ButtonGroupItem size="md">Medium</ButtonGroupItem>
            <ButtonGroupItem size="md">High</ButtonGroupItem>
          </ButtonGroup>
        </div>
      ),
      renderPreview: () => (
        <div className="flex flex-col gap-4">
          <p className="text-xs text-foreground-400">Priority selector:</p>
          <ButtonGroup variant="secondary" spacing="normal">
            <ButtonGroupItem size="md" isSelected>
              Low
            </ButtonGroupItem>
            <ButtonGroupItem size="md">Medium</ButtonGroupItem>
            <ButtonGroupItem size="md">High</ButtonGroupItem>
          </ButtonGroup>
        </div>
      ),
      controls: buttonGroupControls,
    },
    {
      id: "actions-group",
      title: "Action Buttons Group",
      description: "Related actions like download, share, and comment grouped together.",
      code: `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { FaDownload, FaShare, FaComment } from "react-icons/fa6";

export function Example() {
  return (
    <ButtonGroup variant="secondary" spacing="normal">
      <ButtonGroupItem
        size="icon"
        icon={<FaDownload />}
        title="Download"
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaShare />}
        title="Share"
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaComment />}
        title="Comment"
      />
    </ButtonGroup>
  );
}`,
      preview: <ActionsGroupPreview />,
      renderPreview: () => <ActionsGroupPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "vertical-options",
      title: "Vertical Option Group",
      description: "Vertical layout for selecting from a list of options with text labels.",
      code: `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";

export function Example() {
  const [selected, setSelected] = useState("option1");

  return (
    <ButtonGroup orientation="vertical" variant="secondary" spacing="tight" showDividers>
      <ButtonGroupItem
        size="md"
        isSelected={selected === "option1"}
        onClick={() => setSelected("option1")}
      >
        Option 1
      </ButtonGroupItem>
      <ButtonGroupItem
        size="md"
        isSelected={selected === "option2"}
        onClick={() => setSelected("option2")}
      >
        Option 2
      </ButtonGroupItem>
      <ButtonGroupItem
        size="md"
        isSelected={selected === "option3"}
        onClick={() => setSelected("option3")}
      >
        Option 3
      </ButtonGroupItem>
    </ButtonGroup>
  );
}`,
      preview: <VerticalButtonGroupPreview />,
      renderPreview: () => <VerticalButtonGroupPreview />,
      controls: buttonGroupControls,
    },
    {
      id: "vertical-toolbar",
      title: "Vertical Icon Toolbar",
      description: "Vertical stacked icons for tools in sidebar or floating toolbars.",
      code: `import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { FaPencil, FaEraser, FaMagnifyingGlassPlus } from "react-icons/fa6";

export function Example() {
  const [tool, setTool] = useState("pen");

  return (
    <ButtonGroup orientation="vertical" variant="outline" spacing="normal" showDividers>
      <ButtonGroupItem
        size="icon"
        icon={<FaPencil />}
        isSelected={tool === "pen"}
        onClick={() => setTool("pen")}
        title="Pen"
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaEraser />}
        isSelected={tool === "eraser"}
        onClick={() => setTool("eraser")}
        title="Eraser"
      />
      <ButtonGroupItem
        size="icon"
        icon={<FaMagnifyingGlassPlus />}
        isSelected={tool === "zoom"}
        onClick={() => setTool("zoom")}
        title="Zoom"
      />
    </ButtonGroup>
  );
}`,
      preview: <VerticalIconGroupPreview />,
      renderPreview: () => <VerticalIconGroupPreview />,
      controls: buttonGroupControls,
    },
  ],
  variants: [
    {
      id: "default",
      name: "Default",
      description: "Prominent accent color variant for primary actions",
      code: `<ButtonGroup variant="default">
  <ButtonGroupItem>Button 1</ButtonGroupItem>
  <ButtonGroupItem>Button 2</ButtonGroupItem>
</ButtonGroup>`,
      preview: (
        <ButtonGroup variant="default">
          <ButtonGroupItem size="md">Button 1</ButtonGroupItem>
          <ButtonGroupItem size="md">Button 2</ButtonGroupItem>
        </ButtonGroup>
      ),
    },
    {
      id: "secondary",
      name: "Secondary",
      description: "Muted background variant for secondary actions",
      code: `<ButtonGroup variant="secondary">
  <ButtonGroupItem>Button 1</ButtonGroupItem>
  <ButtonGroupItem>Button 2</ButtonGroupItem>
</ButtonGroup>`,
      preview: (
        <ButtonGroup variant="secondary">
          <ButtonGroupItem size="md">Button 1</ButtonGroupItem>
          <ButtonGroupItem size="md">Button 2</ButtonGroupItem>
        </ButtonGroup>
      ),
    },
    {
      id: "outline",
      name: "Outline",
      description: "Bordered variant for subtle emphasis",
      code: `<ButtonGroup variant="outline">
  <ButtonGroupItem>Button 1</ButtonGroupItem>
  <ButtonGroupItem>Button 2</ButtonGroupItem>
</ButtonGroup>`,
      preview: (
        <ButtonGroup variant="outline">
          <ButtonGroupItem size="md">Button 1</ButtonGroupItem>
          <ButtonGroupItem size="md">Button 2</ButtonGroupItem>
        </ButtonGroup>
      ),
    },
    {
      id: "ghost",
      name: "Ghost",
      description: "Minimal variant with no background",
      code: `<ButtonGroup variant="ghost">
  <ButtonGroupItem>Button 1</ButtonGroupItem>
  <ButtonGroupItem>Button 2</ButtonGroupItem>
</ButtonGroup>`,
      preview: (
        <ButtonGroup variant="ghost">
          <ButtonGroupItem size="md">Button 1</ButtonGroupItem>
          <ButtonGroupItem size="md">Button 2</ButtonGroupItem>
        </ButtonGroup>
      ),
    },
  ],
  props: [
    {
      name: "variant",
      type: "'default' | 'secondary' | 'outline' | 'ghost'",
      default: "'default'",
      description: "The visual style variant of the button group items",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg' | 'icon'",
      default: "'md'",
      description:
        "The size of the buttons. Use 'icon' for fixed-size icon-only buttons.",
    },
    {
      name: "spacing",
      type: "'tight' | 'normal' | 'relaxed'",
      default: "'normal'",
      description: "The gap between buttons in the group",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "The layout direction of the button group",
    },
    {
      name: "isSelected",
      type: "boolean",
      default: "false",
      description: "For ButtonGroupItem - indicates if the button is selected/active",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      default: "undefined",
      description: "For ButtonGroupItem - icon to display (works best with size='icon')",
    },
  ],
  accessibility: [
    {
      icon: "♿",
      title: "Semantic HTML",
      description:
        "Uses native <button> elements within a <div role='group'> for proper semantics",
    },
    {
      icon: "⌨️",
      title: "Keyboard Navigation",
      description:
        "All buttons are keyboard accessible with Tab and Space/Enter to activate",
    },
    {
      icon: "🎯",
      title: "ARIA Attributes",
      description:
        "Uses aria-pressed to indicate selected state for screen readers and assistive technology",
    },
    {
      icon: "🏷️",
      title: "Title Attributes",
      description:
        "Include title prop on icon-only buttons to provide accessible labels for tooltips",
    },
  ],
}
