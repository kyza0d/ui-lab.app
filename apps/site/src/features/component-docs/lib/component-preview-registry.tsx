"use client";

import { useState, useEffect } from "react";
import type { SiteComponentExample } from "ui-lab-registry";

const detailLoaders: Record<string, () => Promise<SiteComponentExample[]>> = {
  button:   () => import("ui-lab-registry/components/Button").then(m => m.buttonDetail.examples),
  date:     () => import("ui-lab-registry/components/Date").then(m => m.dateDetail.examples),
  anchor:   () => import("ui-lab-registry/components/Anchor").then(m => m.anchorDetail.examples),
  banner:   () => import("ui-lab-registry/components/Banner").then(m => m.bannerDetail.examples),
  badge:    () => import("ui-lab-registry/components/Badge").then(m => m.badgeDetail.examples),
  path:     () => import("ui-lab-registry/components/Path").then(m => m.pathDetail.examples),
  card:     () => import("ui-lab-registry/components/Card").then(m => m.cardDetail.examples),
  checkbox: () => import("ui-lab-registry/components/Checkbox").then(m => m.checkboxDetail.examples),
  color:    () => import("ui-lab-registry/components/Color").then(m => m.colorDetail.examples),
  divider:  () => import("ui-lab-registry/components/Divider").then(m => m.dividerDetail.examples),
  flex:     () => import("ui-lab-registry/components/Flex").then(m => m.flexDetail.examples),
  expand:   () => import("ui-lab-registry/components/Expand").then(m => m.expandDetail.examples),
  gallery:  () => import("ui-lab-registry/components/Gallery").then(m => m.galleryDetail.examples),
  grid:     () => import("ui-lab-registry/components/Grid").then(m => m.gridDetail.examples),
  group:    () => import("ui-lab-registry/components/Group").then(m => m.groupDetail.examples),
  input:    () => import("ui-lab-registry/components/Input").then(m => m.inputDetail.examples),
  label:    () => import("ui-lab-registry/components/Label").then(m => m.labelDetail.examples),
  menu:     () => import("ui-lab-registry/components/Menu").then(m => m.menuDetail.examples),
  toast:    () => import("ui-lab-registry/components/Toast").then(m => m.toastDetail.examples),
  modal:    () => import("ui-lab-registry/components/Modal").then(m => m.modalDetail.examples),
  page:     () => import("ui-lab-registry/components/Page").then(m => m.pageDetail.examples),
  mask:     () => import("ui-lab-registry/components/Mask").then(m => m.maskDetail.examples),
  popover:  () => import("ui-lab-registry/components/Popover").then(m => m.popoverDetail.examples),
  confirm:  () => import("ui-lab-registry/components/Confirm").then(m => m.confirmDetail.examples),
  progress: () => import("ui-lab-registry/components/Progress").then(m => m.progressDetail.examples),
  radio:    () => import("ui-lab-registry/components/Radio").then(m => m.radioDetail.examples),
  command:  () => import("ui-lab-registry/components/Command").then(m => m.commandDetail.examples),
  scroll:   () => import("ui-lab-registry/components/Scroll").then(m => m.scrollDetail.examples),
  select:   () => import("ui-lab-registry/components/Select").then(m => m.selectDetail.examples),
  slider:   () => import("ui-lab-registry/components/Slider").then(m => m.sliderDetail.examples),
  switch:   () => import("ui-lab-registry/components/Switch").then(m => m.switchDetail.examples),
  table:    () => import("ui-lab-registry/components/Table").then(m => m.tableDetail.examples),
  code:     () => import("ui-lab-registry/components/Code").then(m => m.codeDetail.examples),
  tabs:     () => import("ui-lab-registry/components/Tabs").then(m => m.tabsDetail.examples),
  textarea: () => import("ui-lab-registry/components/Textarea").then(m => m.textareaDetail.examples),
  tooltip:  () => import("ui-lab-registry/components/Tooltip").then(m => m.tooltipDetail.examples),
  list:     () => import("ui-lab-registry/components/List").then(m => m.listDetail.examples),
  panel:    () => import("ui-lab-registry/components/Panel").then(m => m.panelDetail.examples),
  frame:    () => import("ui-lab-registry/components/Frame").then(m => m.frameDetail.examples),
};

export function useComponentExamples(componentId: string): SiteComponentExample[] {
  const [examples, setExamples] = useState<SiteComponentExample[]>([]);
  useEffect(() => {
    detailLoaders[componentId]?.().then(setExamples);
  }, [componentId]);
  return examples;
}
