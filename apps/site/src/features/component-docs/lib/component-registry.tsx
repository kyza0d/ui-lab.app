"use client";

import { cache } from "react";
import { Button, Banner } from "ui-lab-components";
import { buttonDetail, getPreview as getButtonPreview } from "ui-lab-registry/components/Button";
import { anchorDetail, getPreview as getAnchorPreview } from "ui-lab-registry/components/Anchor";
import { bannerDetail, getPreview as getBannerPreview } from "ui-lab-registry/components/Banner";
import { badgeDetail, getPreview as getBadgePreview } from "ui-lab-registry/components/Badge";
import { breadcrumbsDetail, getPreview as getBreadcrumbsPreview } from "ui-lab-registry/components/Breadcrumbs";
import { cardDetail, getPreview as getCardPreview } from "ui-lab-registry/components/Card";
import { checkboxDetail, getPreview as getCheckboxPreview } from "ui-lab-registry/components/Checkbox";
import { dividerDetail, getPreview as getDividerPreview } from "ui-lab-registry/components/Divider";
import { flexDetail, getPreview as getFlexPreview } from "ui-lab-registry/components/Flex";
import { foldDetail, getPreview as getFoldPreview } from "ui-lab-registry/components/Fold";
import { galleryDetail, getPreview as getGalleryPreview } from "ui-lab-registry/components/Gallery";
import { gridDetail, getPreview as getGridPreview } from "ui-lab-registry/components/Grid";
import { groupDetail, getPreview as getGroupPreview } from "ui-lab-registry/components/Group";
import { inputDetail, getPreview as getInputPreview } from "ui-lab-registry/components/Input";
import { labelDetail, getPreview as getLabelPreview } from "ui-lab-registry/components/Label";
import { menuDetail, getPreview as getMenuPreview } from "ui-lab-registry/components/Menu";
import { toastDetail, getPreview as getToastPreview } from "ui-lab-registry/components/Toast";
import { modalDetail, getPreview as getModalPreview } from "ui-lab-registry/components/Modal";
import { popoverDetail, getPreview as getPopoverPreview } from "ui-lab-registry/components/Popover";
import { confirmDetail, getPreview as getConfirmPreview } from "ui-lab-registry/components/Confirm";
import { progressDetail, getPreview as getProgressPreview } from "ui-lab-registry/components/Progress";
import { radioDetail, getPreview as getRadioPreview } from "ui-lab-registry/components/Radio";
import { commandDetail, getPreview as getCommandPreview } from "ui-lab-registry/components/Command";
import { scrollDetail, getPreview as getScrollPreview } from "ui-lab-registry/components/Scroll";
import { selectDetail, getPreview as getSelectPreview } from "ui-lab-registry/components/Select";
import { sliderDetail, getPreview as getSliderPreview } from "ui-lab-registry/components/Slider";
import { switchDetail, getPreview as getSwitchPreview } from "ui-lab-registry/components/Switch";
import { tableDetail, getPreview as getTablePreview } from "ui-lab-registry/components/Table";
import { tabsDetail, getPreview as getTabsPreview } from "ui-lab-registry/components/Tabs";
import { textareaDetail, getPreview as getTextareaPreview } from "ui-lab-registry/components/Textarea";
import { tooltipDetail, getPreview as getTooltipPreview } from "ui-lab-registry/components/Tooltip";
import { listDetail, getPreview as getListPreview } from "ui-lab-registry/components/List";
import { frameDetail, getPreview as getFramePreview } from "ui-lab-registry/components/Frame";
import { ComponentDetail } from "@/types/component";
import { FaFile } from "react-icons/fa6";
import {
  componentRegistry as registryData,
  getCategoriesInOrder,
  type ComponentCategory,
  type ComponentMetadata as RegistryMetadata,
  getComponentsInOrder,
  getCategoryIcon,
} from "ui-lab-registry";
import {
  experimentalRegistry,
  type ExperimentalComponentMetadata,
} from "@/features/experimental/lib/experimental-registry";
import React from "react";
export type { ComponentCategory } from "ui-lab-registry";
export { categories, categoryMap, getCategoriesInOrder, getCategoryIcon } from "ui-lab-registry";
export interface ComponentMetadata extends RegistryMetadata {
  preview: React.ReactNode;
  experimental?: boolean;
}
const previews: Record<string, React.ReactNode> = {
  button: getButtonPreview(),
  group: getGroupPreview(),
  flex: getFlexPreview(),
  grid: getGridPreview(),
  table: getTablePreview(),
  input: getInputPreview(),
  label: getLabelPreview(),
  textarea: getTextareaPreview(),
  select: getSelectPreview(),
  switch: getSwitchPreview(),
  checkbox: getCheckboxPreview(),
  radio: getRadioPreview(),
  banner: getBannerPreview(),
  badge: getBadgePreview(),
  anchor: getAnchorPreview(),
  breadcrumbs: getBreadcrumbsPreview(),
  tooltip: getTooltipPreview(),
  popover: getPopoverPreview(),
  modal: getModalPreview(),
  tabs: getTabsPreview(),
  menu: getMenuPreview(),
  slider: getSliderPreview(),
  progress: getProgressPreview(),
  card: getCardPreview(),
  command: getCommandPreview(),
  confirm: getConfirmPreview(),
  divider: getDividerPreview(),
  fold: getFoldPreview(),
  page: (
    <div className="flex items-center justify-center h-22">
      <FaFile className="w-9 h-9 text-accent-500" aria-label="Page document" />
    </div>
  ),
  gallery: getGalleryPreview(),
  frame: getFramePreview(),
  toast: getToastPreview(),
  scroll: getScrollPreview(),
  list: getListPreview(),
};

const experimentalIds = new Set(experimentalRegistry.map((c) => c.id));

export const componentRegistry: ComponentMetadata[] = [
  ...Object.entries(registryData)
    .filter(([id]) => !experimentalIds.has(id))
    .map(([id, metadata]) => ({
      ...metadata,
      preview: previews[id] || <div />,
    })),
  ...(!registryData.table
    ? [
      {
        id: "table",
        name: tableDetail.name,
        description: tableDetail.description,
        category: "data" as const,
        source: {
          packageName: "ui-lab-components" as const,
          exportName: "Table",
          packagePath: "src/components/table.tsx",
        },
        relatedComponents: ["card"],
        preview: previews.table || <div />,
      },
    ]
    : []),
  ...experimentalRegistry.map((metadata: ExperimentalComponentMetadata) => ({
    ...metadata,
    source: {
      packageName: "ui-lab-components" as const,
      exportName: metadata.id.charAt(0).toUpperCase() + metadata.id.slice(1),
      packagePath: `src/components/experimental/${metadata.id}`,
    },
    preview: previews[metadata.id] || <div />,
  })),
];
export const getComponentsByCategory = cache(
  (category: ComponentCategory): ComponentMetadata[] => {
    return componentRegistry.filter((c) => c.category === category);
  },
);
export const getComponentsGroupedByCategory = cache(
  (): Record<ComponentCategory, ComponentMetadata[]> => {
    const result: Record<ComponentCategory, ComponentMetadata[]> = {} as Record<
      ComponentCategory,
      ComponentMetadata[]
    >;
    getCategoriesInOrder().forEach((catId) => {
      result[catId] = getComponentsByCategory(catId);
    });
    return result;
  },
);
export const getRelatedComponents = cache((id: string): ComponentMetadata[] => {
  const component = componentRegistry.find((c) => c.id === id);
  if (!component) return [];
  return component.relatedComponents
    .map((id) => componentRegistry.find((c) => c.id === id))
    .filter(Boolean) as ComponentMetadata[];
});
export const getComponentsInCategoryOrder = cache(
  (category: ComponentCategory): ComponentMetadata[] => {
    const componentIds = getComponentsInOrder(category);

    return componentIds
      .map((id: string) =>
        componentRegistry.find((c): c is ComponentMetadata => c.id === id),
      )
      .filter((c): c is ComponentMetadata => c !== undefined);
  },
);

const componentDetails: Record<string, ComponentDetail> = {
  button: buttonDetail,
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
  breadcrumbs: breadcrumbsDetail,
  tooltip: tooltipDetail,
  popover: popoverDetail,
  toast: toastDetail,
  modal: modalDetail,
  slider: sliderDetail,
  progress: progressDetail,
  tabs: tabsDetail,
  menu: menuDetail,
  switch: switchDetail,
  card: cardDetail,
  command: commandDetail,
  confirm: confirmDetail,
  divider: dividerDetail,
  fold: foldDetail,
  gallery: galleryDetail,
  frame: frameDetail,
  scroll: scrollDetail,
  list: listDetail,
};
export const getComponentById = cache(
  (id: string): ComponentDetail | undefined => {
    return componentDetails[id];
  },
);

export const getComponentMetadata = cache(
  (id: string): ComponentMetadata | undefined => {
    return componentRegistry.find((component) => component.id === id);
  },
);
