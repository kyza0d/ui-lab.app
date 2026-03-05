"use client";

import { buttonDetail } from "ui-lab-registry/components/Button";
import { dateDetail } from "ui-lab-registry/components/Date";
import { anchorDetail } from "ui-lab-registry/components/Anchor";
import { bannerDetail } from "ui-lab-registry/components/Banner";
import { badgeDetail } from "ui-lab-registry/components/Badge";
import { pathDetail } from "ui-lab-registry/components/Path";
import { cardDetail } from "ui-lab-registry/components/Card";
import { checkboxDetail } from "ui-lab-registry/components/Checkbox";
import { colorDetail } from "ui-lab-registry/components/Color";
import { dividerDetail } from "ui-lab-registry/components/Divider";
import { flexDetail } from "ui-lab-registry/components/Flex";
import { expandDetail } from "ui-lab-registry/components/Expand";
import { galleryDetail } from "ui-lab-registry/components/Gallery";
import { gridDetail } from "ui-lab-registry/components/Grid";
import { groupDetail } from "ui-lab-registry/components/Group";
import { inputDetail } from "ui-lab-registry/components/Input";
import { labelDetail } from "ui-lab-registry/components/Label";
import { menuDetail } from "ui-lab-registry/components/Menu";
import { toastDetail } from "ui-lab-registry/components/Toast";
import { modalDetail } from "ui-lab-registry/components/Modal";
import { pageDetail } from "ui-lab-registry/components/Page";
import { maskDetail } from "ui-lab-registry/components/Mask";
import { popoverDetail } from "ui-lab-registry/components/Popover";
import { confirmDetail } from "ui-lab-registry/components/Confirm";
import { progressDetail } from "ui-lab-registry/components/Progress";
import { radioDetail } from "ui-lab-registry/components/Radio";
import { commandDetail } from "ui-lab-registry/components/Command";
import { scrollDetail } from "ui-lab-registry/components/Scroll";
import { selectDetail } from "ui-lab-registry/components/Select";
import { sliderDetail } from "ui-lab-registry/components/Slider";
import { switchDetail } from "ui-lab-registry/components/Switch";
import { tableDetail } from "ui-lab-registry/components/Table";
import { codeDetail } from "ui-lab-registry/components/Code";
import { tabsDetail } from "ui-lab-registry/components/Tabs";
import { textareaDetail } from "ui-lab-registry/components/Textarea";
import { tooltipDetail } from "ui-lab-registry/components/Tooltip";
import { listDetail } from "ui-lab-registry/components/List";
import { panelDetail } from "ui-lab-registry/components/Panel";
import { frameDetail } from "ui-lab-registry/components/Frame";

import { ComponentDetail } from "@/types/component";
import { previews } from "@/gallery";
import {
  componentRegistry as registryData,
  getCategoriesInOrder,
  type ComponentCategory,
  type ComponentMetadata as RegistryMetadata,
  getComponentsInOrder,
} from "ui-lab-registry";
import {
  experimentalRegistry,
  type ExperimentalComponentMetadata,
} from "@/features/experimental/lib/experimental-registry";
import { serverComponentRegistry } from "./server-component-metadata"; // Import server-side registry
import React from "react";
export type { ComponentCategory } from "ui-lab-registry";
export { categories, categoryMap, getCategoriesInOrder, getCategoryIcon } from "ui-lab-registry";
export interface ComponentMetadata extends RegistryMetadata {
  preview: React.ReactNode;
  experimental?: boolean;
}

const experimentalIds = new Set(experimentalRegistry.map((c) => c.id));

export const componentRegistry: ComponentMetadata[] = serverComponentRegistry.map(
  (serverMetadata) => ({
    ...serverMetadata,
    preview: previews[serverMetadata.id] || <div />,
  }),
);

export const getComponentsByCategory = 
  (category: ComponentCategory): ComponentMetadata[] => {
    return componentRegistry.filter((c) => c.category === category);
  };

export const getComponentsGroupedByCategory = 
  (): Record<ComponentCategory, ComponentMetadata[]> => {
    const result: Record<ComponentCategory, ComponentMetadata[]> = {} as Record<
      ComponentCategory,
      ComponentMetadata[]
    >;
    getCategoriesInOrder().forEach((catId) => {
      result[catId] = getComponentsByCategory(catId);
    });
    return result;
  };

export const getRelatedComponents = (id: string): ComponentMetadata[] => {
  const component = componentRegistry.find((c) => c.id === id);
  if (!component) return [];
  return component.relatedComponents
    .map((id) => componentRegistry.find((c) => c.id === id))
    .filter(Boolean) as ComponentMetadata[];
};

export const getComponentsInCategoryOrder = 
  (category: ComponentCategory): ComponentMetadata[] => {
    const componentIds = getComponentsInOrder(category);

    return componentIds
      .map((id: string) =>
        componentRegistry.find((c): c is ComponentMetadata => c.id === id),
      )
      .filter((c): c is ComponentMetadata => c !== undefined);
  };

const componentDetails: Record<string, ComponentDetail> = {
  button: buttonDetail,
  date: dateDetail,
  color: colorDetail,
  anchor: anchorDetail,
  group: groupDetail,
  flex: flexDetail,
  grid: gridDetail,
  table: tableDetail,
  input: inputDetail,
  textarea: textareaDetail,
  label: labelDetail,
  select: selectDetail,
  checkbox: checkboxDetail,
  radio: radioDetail,
  banner: bannerDetail,
  badge: badgeDetail,
  path: pathDetail,
  tooltip: tooltipDetail,
  popover: popoverDetail,
  toast: toastDetail,
  modal: modalDetail,
  page: pageDetail,
  mask: maskDetail,
  slider: sliderDetail,
  progress: progressDetail,
  tabs: tabsDetail,
  menu: menuDetail,
  switch: switchDetail,
  card: cardDetail,
  command: commandDetail,
  confirm: confirmDetail,
  divider: dividerDetail,
  expand: expandDetail,
  gallery: galleryDetail,
  frame: frameDetail,
  scroll: scrollDetail,
  list: listDetail,
  panel: panelDetail,
  code: codeDetail,
};
export const getComponentById = (id: string): ComponentDetail | undefined => {
  return componentDetails[id];
};

export const getComponentMetadata = (id: string): ComponentMetadata | undefined => {
  return componentRegistry.find((component) => component.id === id);
};
