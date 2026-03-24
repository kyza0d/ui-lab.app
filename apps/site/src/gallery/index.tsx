"use client";

import React from "react";
import { CardAnimation } from "./timelines/card.animation";
import { DividerAnimation } from "./timelines/divider.animation";
import { ExpandAnimation } from "./timelines/expand.animation";
import { GridAnimation } from "./timelines/grid.animation";
import { FlexAnimation } from "./timelines/flex.animation";
import { GroupAnimation } from "./timelines/group.animation";
import { GalleryAnimation } from "./timelines/gallery.animation";
import { PopoverAnimation } from "./timelines/popover.animation";
import { ListAnimation } from "./timelines/list.animation";
import { PanelAnimation } from "./timelines/panel.animation";
import { BannerAnimation } from "./timelines/banner.animation";
import { ButtonAnimation } from "./timelines/button.animation";
import { CheckboxAnimation } from "./timelines/checkbox.animation";
import { ConfirmAnimation } from "./timelines/confirm.animation";
import { CommandAnimation } from "./timelines/command.animation";
import { DateAnimation } from "./timelines/date.animation";
import { ColorAnimation } from "./timelines/color.animation";
import { InputAnimation } from "./timelines/input.animation";
import { RadioAnimation } from "./timelines/radio.animation";
import { SelectAnimation } from "./timelines/select.animation";
import { SliderAnimation } from "./timelines/slider.animation";
import { SwitchAnimation } from "./timelines/switch.animation";
import { TextareaAnimation } from "./timelines/textarea.animation";
import { BadgeAnimation } from "./timelines/badge.animation";
import { LabelAnimation } from "./timelines/label.animation";
import { TooltipAnimation } from "./timelines/tooltip.animation";
import { ProgressAnimation } from "./timelines/progress.animation";
import { ToastAnimation } from "./timelines/toast.animation";
import { PathAnimation } from "./timelines/path.animation";
import { MenuAnimation } from "./timelines/menu.animation";
import { TabsAnimation } from "./timelines/tabs.animation";
import { AnchorAnimation } from "./timelines/anchor.animation";
import { ScrollAnimation } from "./timelines/scroll.animation";
import { ToolbarAnimation } from "./timelines/toolbar.animation";
import { CarouselAnimation } from "./timelines/Carousel.animation";
import { TimelineAnimation } from "./timelines/Timeline.animation";
import { SkeletonAnimation } from "./timelines/Skeleton.animation";
import { LoadingAnimation } from "./timelines/Loading.animation";
import { ModalAnimation } from "./timelines/modal.animation";
import { AlertAnimation } from "./timelines/Alert.animation";


export const previews: Record<string, React.ReactNode> = {
  anchor: <AnchorAnimation />,
  badge: <BadgeAnimation />,
  banner: <BannerAnimation />,
  path: <PathAnimation />,
  button: <ButtonAnimation />,
  card: <CardAnimation />,
  checkbox: <CheckboxAnimation />,
  color: <ColorAnimation />,
  command: <CommandAnimation />,
  confirm: <ConfirmAnimation />,
  date: <DateAnimation />,
  divider: <DividerAnimation />,
  panel: <PanelAnimation />,
  flex: <FlexAnimation />,
  expand: <ExpandAnimation />,
  gallery: <GalleryAnimation />,
  grid: <GridAnimation />,
  group: <GroupAnimation />,
  input: <InputAnimation />,
  label: <LabelAnimation />,
  select: <SelectAnimation />,
  slider: <SliderAnimation />,
  menu: <MenuAnimation />,
  tabs: <TabsAnimation />,
  textarea: <TextareaAnimation />,
  toast: <ToastAnimation />,
  tooltip: <TooltipAnimation />,
  switch: <SwitchAnimation />,
  list: <ListAnimation />,
  popover: <PopoverAnimation />,
  progress: <ProgressAnimation />,
  radio: <RadioAnimation />,
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
  modal: <ModalAnimation />,

  scroll: <ScrollAnimation />,
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
  frame: <div className="w-[120px] h-[40px] flex bg-background-900 items-center justify-center border border-background-700 rounded-md"></div>,
  toolbar: <ToolbarAnimation />,
  carousel: <CarouselAnimation />,
  timeline: <TimelineAnimation />,
  skeleton: <SkeletonAnimation />,
  loading: <LoadingAnimation />,
  alert: <AlertAnimation />,
};
