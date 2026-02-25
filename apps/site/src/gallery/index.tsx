"use client";

import React from "react";
import {
  Divider,
  Frame,
  Mask,
} from "ui-lab-components";
import { DividerAnimation } from "./timelines/divider.animation";
import { ExpandAnimation } from "./timelines/expand.animation";
import { GridAnimation } from "./timelines/grid.animation";
import { FlexAnimation } from "./timelines/flex.animation";
import {
  FaInfo,
  FaCircleInfo,
  FaChevronRight,
  FaCheck,
  FaX,
  FaChevronDown,
  FaMagnifyingGlass,
  FaEnvelope,
  FaQuestion,
} from "react-icons/fa6";
import { GalleryAnimation } from "./timelines/gallery.animation";

const TAIL_PATH = "M 0.00 0.00 C 3.00 0.00 7.50 -6.00 9.00 -6.00 C 10.50 -6.00 13.50 0.00 18.00 0.00";
const TAIL_WIDTH = 18;

export const previews: Record<string, React.ReactNode> = {
  anchor: (
    <div className="w-full grid grid-rows-2 items-start gap-2 justify-center">
      <div>
        <div
          className="w-[70px] h-3 opacity-10 rounded-md bg-background-500"
        ></div>
        <Divider size="sm" variant="dashed" />
      </div>
    </div>
  ),

  badge: (
    <div className="flex flex-col gap-3">
      <div className="w-[72px] h-[27px] gap-3 flex px-2 bg-background-900 items-center justify-center border border-background-700 rounded-[3px]">
        <FaInfo size={12} className="text-background-500" />
        <div
          className="w-full h-2 opacity-10 rounded-md bg-background-500"
        ></div>
      </div>
    </div>
  ),

  banner: (
    <div className="relative w-[85%] h-[36px] gap-3 flex px-2 bg-background-900 items-center justify-center border border-background-700 rounded-[3px]">
      <FaCircleInfo size={16} className="text-background-500" />
      <div className="flex flex-col gap-2 w-full">
        <div className="w-[50%] h-2 opacity-10 rounded-md bg-background-500"></div>
        <div className="w-[80%] h-1 opacity-10 rounded-md bg-background-500"></div>
      </div>
    </div>
  ),

  breadcrumbs: (
    <div className="w-[70%] flex items-center gap-3 max-w-sm">
      <div className="w-[60%] h-4 opacity-10 rounded-md bg-background-500"></div>
      <FaChevronRight
        size={10}
        className="text-foreground-400 opacity-20"
      />
      <div className="w-[30%] h-4 opacity-10 rounded-md bg-background-500"></div>
    </div>
  ),

  button: (
    <div className="w-[80px] h-[30px] flex bg-background-900 items-center justify-center border border-background-700 rounded-md">
      <div className="w-[70%] h-2 opacity-10 rounded-md bg-background-500"></div>
    </div>
  ),

  card: (
    <div className="w-[50%]">
      <div className="w-full border border-background-700 rounded bg-background-950">
        <div className="p-1 mb-2">
          <div className="w-full h-[42px] rounded-[3px] bg-background-900" />
        </div>
        <div className="w-[70%] h-1 opacity-10 rounded-md ml-2 bg-background-500"></div>
        <div className="w-[60%] h-1 opacity-10 rounded-md ml-2 mt-2 bg-background-500"></div>

        <div className="mt-4 py-1 border-t border-background-700 flex items-center gap-1">
          <div className="w-[35%] h-3 ml-auto flex justify-center items-center rounded-xs gap-2 pl-1 bg-background-800">
            <div className="w-[70%] h-1 opacity-20 rounded-md pr-1 mr-1 bg-background-500"></div>
          </div>
          <div className="w-[35%] h-3 flex justify-center items-center rounded-xs gap-2 pl-1 mr-0.5 bg-background-800">
            <div className="w-[70%] h-1 opacity-20 rounded-md bg-background-500"></div>
          </div>
        </div>
      </div>
    </div>
  ),

  checkbox: (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 flex items-center justify-center rounded-[3px] border border-background-600 bg-background-700">
        <FaCheck className="w-[10px] h-[10px] text-background-500 -mx-px mb-[1px]" />
      </div>
      <div className="w-[80px] h-2 opacity-10 rounded-md bg-background-500"></div>
    </div>
  ),

  color: (
    <div className="w-[80%] max-w-[120px] rounded-[8px] border-[2px] border-background-700 flex flex-col gap-2 p-0.5 bg-background-800/20">
      <div className="flex  flex-col p-[3px] gap-2 rounded-[3px]">
        <div className="rounded-[3px] w-full h-[60px] relative bg-background-800">
          <div className="w-2 h-2 bg-background-500 rounded-full absolute top-[30%] left-[60%] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="px-[4px] flex flex-col gap-[4px]">
          <div className="rounded-[3px] w-full h-2 bg-background-700 relative">
            <div className="w-1 h-3 bg-background-500 rounded-[3px] absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="rounded-[3px] mt-1 w-full flex items-center h-6 pl-[6px] border-[1px] border-background-700 relative">
            <div className="w-[53%] h-2 opacity-10 rounded-md bg-background-500"></div>
          </div>
        </div>
      </div>
    </div>
  ),

  command: (
    <div className="w-[60%] rounded-[3px] overflow-hidden border border-background-700 flex flex-col gap-2 max-w-sm">
      <div className="h-8 gap-2 flex border-b border-background-700">
        <FaMagnifyingGlass
          size={10}
          className="text-foreground-400 opacity-50 ml-2 mt-[10px]"
        />
      </div>
      <div className="h-8 pl-2 gap-2 flex border-b border-background-700">
        <div className="w-[30px] h-5 opacity-10 rounded-md mb-2 bg-background-500"></div>
        <div className="w-full flex flex-col">
          <div className="w-[20%] h-2 opacity-10 rounded-md mb-1 bg-background-500"></div>
          <div className="w-[50%] h-2 opacity-10 rounded-md bg-background-500"></div>
        </div>
      </div>

      <div className="h-6 pl-2 gap-2 flex">
        <div className="w-[30px] h-5 opacity-10 rounded-md mb-2 bg-background-500"></div>
        <div className="w-full flex flex-col">
          <div className="w-[20%] h-2 opacity-10 rounded-md mb-1 bg-background-500"></div>
          <div className="w-[50%] h-2 opacity-10 rounded-md bg-background-500"></div>
        </div>
      </div>

      <div className="border-t border-background-700 items-center h-5 px-2 gap-1 flex bg-background-800">
        <div className="w-[30%] h-2 opacity-20 rounded-md bg-background-500"></div>
        <div className="w-[30%] h-2 opacity-20 rounded-md bg-background-500"></div>
        <div className="w-[20%] h-2 opacity-20 rounded-md ml-auto bg-background-500"></div>
      </div>
    </div>
  ),

  confirm: (
    <div className="w-[70%] rounded-[3px] overflow-hidden border border-background-700 flex flex-col gap-2 max-w-sm">
      <div className="pl-2 pt-3">
        <div className="w-[60%] h-3 opacity-20 rounded-md mb-2 bg-background-500"></div>
        <div className="w-[70%] h-1 opacity-20 rounded-md mb-2 bg-background-500"></div>
        <div className="w-[40%] h-1 opacity-20 rounded-md bg-background-500"></div>
      </div>

      <div className="mt-4 border-t border-background-700 flex items-center py-1 gap-1">
        <div className="w-[35%] h-4 ml-auto flex items-center rounded-xs gap-2 pl-1 bg-background-800">
          <FaX size={8} className="text-foreground-400" />
          <div className="w-[70%] h-1 opacity-20 rounded-md pr-1 mr-1 bg-background-500"></div>
        </div>
        <div className="w-[35%] h-4 flex items-center rounded-xs gap-2 pl-1 mr-0.5 bg-background-800">
          <FaCheck size={10} className="text-foreground-400" />
          <div className="w-[70%] h-1 opacity-20 rounded-md bg-background-500"></div>
        </div>
      </div>
    </div>
  ),

  date: (
    <div className="w-[80%] max-w-[120px] rounded-[4px] border border-background-700 flex flex-col gap-2 p-2 bg-background-800/20">
      {/* Header: Month/Year + Chevrons */}
      <div className="flex items-center justify-between px-0.5">
        <div className="w-1.5 h-1.5 opacity-20 rounded-[1px] bg-background-500"></div>
        <div className="w-8 h-1.5 opacity-20 rounded-[1px] bg-background-500"></div>
        <div className="w-1.5 h-1.5 opacity-20 rounded-[1px] bg-background-500"></div>
      </div>

      {/* Calendar Grid: 7 Columns for Days of Week */}
      <div className="grid grid-cols-7 gap-1">
        {[...Array(24)].map((_, i) => (
          <div
            key={`day-${i}`}
            className="aspect-square opacity-10 rounded-[1px] bg-background-500 w-full"
          ></div>
        ))}
      </div>
    </div>
  ),

  divider: <DividerAnimation />,

  flex: <FlexAnimation />,

  expand: <ExpandAnimation />,

  frame: (
    <div className="w-[120px] h-[40px] flex bg-background-900 items-center justify-center border border-background-700 rounded-md"></div>
  ),

  gallery: <GalleryAnimation />,
  grid: <GridAnimation />,
  group: (
    <div className="flex border overflow-hidden rounded-md h-8 pl-2 items-center border-background-700 w-full">
      <div className="w-[36%] h-2 opacity-10 rounded-[3px] bg-background-500"></div>
      <Divider size="sm" orientation="vertical" />
      <div className="w-[36%] h-2 mr-2 opacity-10 rounded-[3px] bg-background-500"></div>
      <div className="w-[24%] border-l border-background-700 flex items-center px-2 h-full bg-background-900">
        <div className="w-full h-2 opacity-10 rounded-[3px] bg-background-500"></div>
      </div>
    </div>
  ),

  input: (
    <div className="flex flex-col">
      <div className="w-[50%] h-2 opacity-10 ml-2 mb-2 rounded-[3px] bg-background-500"></div>
      <div
        className="rounded-[4px] w-[140px] h-[30px] flex pl-2 pr-4 items-center border border-background-700"
      >
        <div className="w-[80%] h-2 opacity-10 rounded-md bg-background-500"></div>
        <div className="w-px h-4 opacity-30 rounded-md ml-2 bg-background-500"></div>
      </div>
    </div>
  ),

  label: (
    <div className="flex flex-col">
      <div className="flex mb-2 items-center gap-1 pl-1">
        <FaEnvelope size={11} color="var(--background-600)" />
        <div className="w-[50%] h-2 opacity-10 ml-2 rounded-md bg-background-500"></div>
      </div>
      <div className="w-[140px] h-[30px] flex bg-background-950 pl-2 pr-4 items-center border border-background-700 rounded-[3px]"></div>
    </div>
  ),

  list: (
    <div className="w-full flex flex-col gap-4 max-w-sm">
      <div className="h-8 flex flex-col border-b border-background-700">
        <div className="w-[20%] h-6 opacity-10 rounded-md mb-2 bg-background-500"></div>
        <div className="w-[50%] h-6 opacity-10 rounded-md mb-2 bg-background-500"></div>
      </div>
      <div className="h-8 flex flex-col border-b border-background-700">
        <div className="w-[20%] h-6 opacity-10 rounded-md mb-2 bg-background-500"></div>
        <div className="w-[50%] h-6 opacity-10 rounded-md mb-2 bg-background-500"></div>
      </div>
    </div>
  ),

  mask: (
    <div className="w-[80%] aspect-square max-w-[120px] flex items-center justify-center relative overflow-hidden">
      {/* The Divider Line */}
      <div className="absolute inset-y-0 left-1/2 -ml-px w-px border-l border-dashed border-background-700 z-10"></div>

      {/* The Element being 'Masked' (Gradient Circle) */}
      <div className="flex border rounded-full overflow-hidden border-background-700">
        <div className="w-6 h-12 bg-background-900"></div>
        <div className="w-6 h-12 bg-background-700"></div>
      </div>
    </div>
  ),

  menu: (
    <div className="w-[50%] rounded-[3px] overflow-hidden border pt-2 border-background-700 flex flex-col max-w-sm">
      <div className="h-4 pl-2 flex">
        <div className="w-[50%] h-2 opacity-10 mr-2 rounded-md bg-background-500"></div>
      </div>

      <div className="h-4 pl-2 gap-2 flex">
        <div className="w-[70%] h-2 opacity-10 rounded-md bg-background-500"></div>
      </div>
      <div className="h-4 pl-2 flex">
        <div className="w-[60%] h-2 opacity-10 mr-2 rounded-md bg-background-500"></div>
      </div>

      <div className="text-foreground-400 flex flex-col py-2 px-2 gap-2 border-t border-background-700">
        <div className="rounded-[3px] py-1 px-1 -m-1 bg-background-900">
          <div className="w-[70%] h-2 opacity-10 mr-2 rounded-md bg-background-500"></div>
        </div>
        <div className="w-[50%] h-2 opacity-10 mr-2 rounded-md bg-background-500"></div>
      </div>
      <div className="text-foreground-400 flex flex-col py-2 pl-2 gap-2 border-t border-background-700">
        <div className="w-[70%] h-2 opacity-10 mr-2 rounded-md bg-background-500"></div>
      </div>
    </div>
  ),

  modal: (
    <div className="w-[70%] rounded-[3px] overflow-hidden border border-background-700 flex flex-col gap-2 max-w-sm">
      <div className="mb-2 border-b border-background-700 flex items-center p-1 gap-1">
        <div className="ml-auto bg-background-900 w-3 h-3 rounded-[2px]"></div>
      </div>

      <div className="pl-2">
        <div className="w-[60%] h-3 opacity-20 rounded-md mb-2 bg-background-500"></div>
        <div className="w-[70%] h-1 opacity-20 rounded-md mb-2 bg-background-500"></div>
        <div className="w-[40%] h-1 opacity-20 rounded-md bg-background-500"></div>
      </div>

      <div className="mt-4 border-t border-background-700 flex items-center p-1 gap-1">
        <div className="w-[40%] h-2 opacity-10 rounded-md bg-background-500"></div>
        <div className="w-[35%] h-3 ml-auto flex items-center rounded-xs pl-1 bg-background-800"></div>
      </div>
    </div>
  ),

  popover: (
    <div className="flex flex-col items-center gap-3">
      <Frame
        side="bottom"
        shapeMode="extend"
        cornerRadius={4}
        path={TAIL_PATH}
        pathWidth={TAIL_WIDTH}
        fill="var(--color-background-900)"
        padding="small"
        className="w-auto max-w-sm"
      >
        <div className="w-20 h-3 bg-background-500 opacity-10 rounded-md" />
      </Frame>
      <div className="w-7 h-7 flex items-center px-2 rounded-[3px] bg-background-900 border border-background-700">
        <FaQuestion size={12} className="text-background-500" />
      </div>
    </div>
  ),

  progress: (
    <div className="w-[70%] relative rounded-md">
      <div className="w-full bg-background-700 rounded-md border border-background-600 left-0 absolute h-3" />
      <div className="w-[50%] h-3 left-0 absolute rounded-md bg-background-600" />
    </div>
  ),

  radio: (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 flex items-center justify-center rounded-full border border-background-600 bg-background-700">
        <div className="w-2 h-2 rounded-full bg-background-500 mr-[1px]"></div>
      </div>
      <div className="w-[80px] h-2 opacity-10 rounded-md bg-background-500"></div>
    </div>
  ),

  scroll: (
    <div className="w-[70%] rounded-[3px] flex gap-2">
      <div className="w-full pr-4">
        <div className="pt-3">
          <div className="w-[60%] h-2 opacity-20 rounded-md mb-2 bg-background-500"></div>
          <div className="w-[70%] h-1 opacity-20 rounded-md mb-2 bg-background-500"></div>
          <div className="w-[40%] h-1 opacity-20 rounded-md bg-background-500"></div>
        </div>

        <Divider size="sm" />
        <div className="pt-3">
          <div className="w-[62%] h-1 opacity-20 rounded-md mb-2 bg-background-500"></div>
          <div className="w-[33%] h-1 opacity-20 rounded-md mb-2 bg-background-500"></div>
          <div className="w-[50%] h-1 opacity-20 rounded-md bg-background-500"></div>
        </div>
      </div>

      <div className="w-[9px] h-[120px] relative rounded-md flex items-center bg-background-900">
        <div className="w-[5px] h-[60px] absolute rounded-md bg-background-700 left-[1.5px] top-[2px]"></div>
      </div>
    </div>
  ),

  select: (
    <div className="w-[140px] h-[30px] flex bg-background-900 pl-2 pr-4 items-center justify-center border border-background-700 rounded-md">
      <div className="w-[70%] h-2 opacity-10 rounded-md bg-background-500"></div>
      <FaChevronDown size={10} className="text-foreground-400 ml-auto" />
    </div>
  ),

  slider: (
    <div className="w-[60%] relative rounded-md">
      <div className="w-full rounded-md bg-background-700 border border-background-600 left-0 absolute h-3" />
      <div className="w-[50%] h-3 left-0 absolute rounded-md bg-background-600" />
      <div className="w-4 h-4 absolute -translate-x-1/2 left-1/2 rounded-full bg-background-500 -top-0.5"></div>
    </div>
  ),

  switch: (
    <div className="flex items-center gap-3">
      <div className="w-10 h-6 flex items-center rounded-full border border-background-600 bg-background-700 pl-[1px]">
        <div className="w-5 h-5 rounded-full bg-background-500" />
      </div>
    </div>
  ),

  table: (
    <div className="w-[80%]">
      <div className="w-[60%] flex py-1 px-1 mb-2 rounded-[3px] overflow-hidden border border-background-700 flex-col">
        <div className="w-[46px] h-2 opacity-10 rounded-[3px] bg-background-500"></div>
      </div>

      <div className="flex rounded-[3px] overflow-hidden border border-background-700 flex-col max-w-sm">
        <div className="w-full bg-background-800 flex items-center">
          <div className="w-[30%] h-5 flex items-center pl-1">
            <div className="w-[24px] h-2 opacity-10 rounded-md bg-background-500"></div>
          </div>
          <div className="w-[30%] h-5 flex items-center pl-1 border-l border-background-700">
            <div className="w-[14px] h-2 opacity-10 rounded-md bg-background-500"></div>
          </div>
          <div className="w-[40%] h-5 flex items-center pl-1 border-l border-background-700">
            <div className="w-[29px] h-2 opacity-10 rounded-md bg-background-500"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full border-b border-background-700 flex items-center">
            <div className="w-[30%] h-5 flex items-center pl-1">
              <div className="w-[22px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
            <div className="w-[30%] h-5 flex items-center pl-1 border-l border-background-700">
              <div className="w-[22px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
            <div className="w-[40%] h-5 flex items-center pl-1 border-l border-background-700">
              <div className="w-[40px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
          </div>

          <div className="w-full border-b border-background-700 flex items-center">
            <div className="w-[30%] h-5 flex items-center pl-1">
              <div className="w-[16px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
            <div className="w-[30%] h-5 flex items-center pl-1 border-l border-background-700">
              <div className="w-[15px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
            <div className="w-[40%] h-5 flex items-center pl-1 border-l border-background-700">
              <div className="w-[36px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
          </div>

          <div className="w-full flex items-center">
            <div className="w-[30%] h-5 flex items-center pl-1">
              <div className="w-[26px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
            <div className="w-[30%] h-5 flex items-center pl-1 border-l border-background-700">
              <div className="w-[18px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
            <div className="w-[40%] h-5 flex items-center pl-1 border-l border-background-700">
              <div className="w-[35px] h-2 opacity-10 rounded-md bg-background-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  tabs: (
    <div className="w-[160px] h-[42px] relative gap-2 flex items-center justify-center border-b border-background-700 px-1.5">
      <div className="w-[30%] h-2 opacity-50 rounded-[3px] bg-background-500"></div>
      <div className="w-[36%] h-0.75 absolute bottom-0 left-0 opacity-50 bg-background-500"></div>
      <div className="w-[30%] h-2 opacity-10 rounded-[3px] bg-background-500"></div>
      <div className="w-[30%] h-2 opacity-10 rounded-[3px] bg-background-500"></div>
    </div>
  ),

  textarea: (
    <div className="flex flex-col">
      <div className="w-[50%] h-2 opacity-10 ml-2 mb-2 rounded-[2px] bg-background-500"></div>
      <div
        className="rounded-[5px] w-[140px] h-[60px] flex bg-background-900 pl-2 pt-2 pr-4 border border-background-700"
      >
        <div className="w-[70%] h-2 opacity-10 mt-1 rounded-md bg-background-500"></div>
        <div className="w-px h-4 opacity-30 rounded-md ml-2 bg-background-500"></div>
      </div>
    </div>
  ),

  toast: (
    <div className="w-50 h-10 relative gap-3 flex px-2 bg-background-900 items-center justify-center border border-background-700 rounded-[3px]">
      <FaX
        size={7}
        className="text-foreground-400 absolute top-2 right-2"
      />
      <FaCircleInfo size={16} className="text-background-500" />
      <div className="flex flex-col gap-2 w-full">
        <div className="w-[50%] h-2 opacity-10 rounded-md bg-background-500"></div>
        <div className="w-[80%] h-2 opacity-10 rounded-md bg-background-500"></div>
      </div>
    </div>
  ),

  tooltip: (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 flex items-center px-2 rounded-[3px] bg-background-900 border border-background-700">
        <FaQuestion size={12} className="text-background-500" />
      </div>
      <Frame
        side="left"
        shapeMode="extend"
        cornerRadius={4}
        path={TAIL_PATH}
        pathWidth={TAIL_WIDTH}
        fill="var(--color-background-900)"
        padding="small"
        className="w-auto max-w-sm"
      >
        <div className="w-20 h-3 bg-background-500 opacity-10 rounded-md" />
      </Frame>
    </div>
  ),

  page: (
    <div className="w-40 flex flex-col border border-background-700 rounded overflow-hidden">
      <div className="h-6 bg-background-900 border-b border-background-700 flex items-center px-2">
        <div className="w-[40%] h-1 opacity-10 rounded-md bg-background-500"></div>
      </div>
      <div className="bg-background-950 flex flex-col justify-center gap-2 px-2 py-2 min-h-[50px]">
        <div className="w-[60%] h-1 opacity-10 rounded-md bg-background-500"></div>
        <div className="w-[80%] h-1 opacity-10 rounded-md bg-background-500"></div>
      </div>
      <div className="h-5 bg-background-900 border-t border-background-700 flex items-center px-2">
        <div className="w-[25%] h-1 opacity-10 rounded-md bg-background-500"></div>
      </div>
    </div>
  ),

  "code": (
    <div className="w-[85%] rounded-[3px] border border-background-700 overflow-hidden">
      <div className="h-[22px] flex items-center justify-between px-2 bg-background-900 border-b border-background-700">
        <div className="w-[40px] h-1.5 opacity-20 rounded bg-background-500" />
        <div className="w-[20px] h-1.5 opacity-15 rounded bg-background-500" />
      </div>
      <div className="px-2 py-2 flex flex-col gap-[5px] bg-background-950">
        <div className="flex gap-1.5">
          <div className="w-[22px] h-1.5 opacity-30 rounded bg-accent-500" />
          <div className="w-[28px] h-1.5 opacity-20 rounded bg-background-500" />
          <div className="w-[16px] h-1.5 opacity-15 rounded bg-background-500" />
        </div>
        <div className="flex gap-1.5 ml-3">
          <div className="w-[14px] h-1.5 opacity-20 rounded bg-background-500" />
          <div className="w-[32px] h-1.5 opacity-30 rounded bg-accent-500" />
        </div>
        <div className="flex gap-1.5 ml-3">
          <div className="w-[18px] h-1.5 opacity-20 rounded bg-background-500" />
          <div className="w-[24px] h-1.5 opacity-15 rounded bg-background-500" />
        </div>
        <div className="w-[8px] h-1.5 opacity-20 rounded bg-background-500" />
      </div>
    </div>
  ),

  panel: (
    <div className="w-full h-40 flex flex-col border border-background-700 rounded overflow-hidden">
      <div className="h-8 bg-background-900 border-b border-background-700 flex items-center px-2">
        <div className="w-[40%] h-2 opacity-10 rounded-md bg-background-500"></div>
      </div>
      <div className="flex-1 bg-background-950 flex items-center justify-center">
        <div className="w-[60%] h-2 opacity-10 rounded-md bg-background-500"></div>
      </div>
      <div className="h-6 bg-background-900 border-t border-background-700 flex items-center px-2">
        <div className="w-[30%] h-2 opacity-10 rounded-md bg-background-500"></div>
      </div>
    </div>
  ),
};
