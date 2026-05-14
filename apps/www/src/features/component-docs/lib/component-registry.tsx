"use client";

import React from "react";
import ButtonVariants from "@private/components/button/01-variants";
import ButtonJoinedToggle from "@private/components/button/02-joined-toggle";
import ButtonIcons from "@private/components/button/03-icons";
import ButtonMultiActions from "@private/components/button/04-multi-actions";
import ButtonSubStackActions from "@private/components/button/05-sub-stack-actions";
import ButtonSplitActionButton from "@private/components/button/06-split-action-button";
import ButtonSplitButton from "@private/components/button/07-split-button";
import ButtonButtonGroup from "@private/components/button/08-button-group";
import SwitchBasic from "@private/components/switch/01-basic-switch";
import SwitchSettings from "@private/components/switch/02-settings-panel";
import SwitchDisabled from "@private/components/switch/03-disabled-state";
import SwitchSmall from "@private/components/switch/04-small-size";
import SwitchControlled from "@private/components/switch/05-controlled-toggle";
import CheckboxBasicStates from "@private/components/checkbox/01-basic-states";
import CheckboxHelperText from "@private/components/checkbox/02-helper-text";
import CheckboxControlled from "@private/components/checkbox/03-controlled";
import CheckboxGroup from "@private/components/checkbox/04-group";
import CheckboxIndeterminate from "@private/components/checkbox/05-indeterminate";
import CheckboxConsentForm from "@private/components/checkbox/06-consent-form";
import GroupBasicGroup from "@private/components/group/01-basic-group";
import GroupCreateProject from "@private/components/group/02-create-project";
import GroupFilterBar from "@private/components/group/03-filter-bar";
import GroupDocumentationSearch from "@private/components/group/04-documentation-search";
import GroupEmailSignup from "@private/components/group/05-email-signup";
import GroupCopyCommand from "@private/components/group/06-copy-command";
import GroupDeleteConfirmation from "@private/components/group/07-delete-confirmation";
import GroupSliderIntegration from "@private/components/group/08-slider-integration";
import ProgressBasicProgress from "@private/components/progress/01-basic-progress";
import ProgressStorageQuota from "@private/components/progress/02-storage-quota";
import ProgressOnboardingSteps from "@private/components/progress/03-onboarding-steps";
import ProgressIndeterminate from "@private/components/progress/04-indeterminate";
import ProgressSkillLevels from "@private/components/progress/05-skill-levels";
import buttonExamplesJson from "ui-lab-registry/components/Button/examples.json";
import switchExamplesJson from "ui-lab-registry/components/Switch/examples.json";
import checkboxExamplesJson from "ui-lab-registry/components/Checkbox/examples.json";
import groupExamplesJson from "ui-lab-registry/components/Group/examples.json";
import progressExamplesJson from "ui-lab-registry/components/Progress/examples.json";
import { buttonDetail as _buttonDetail } from "ui-lab-registry/components/Button";
import { dateDetail } from "ui-lab-registry/components/Date";
import { anchorDetail } from "ui-lab-registry/components/Anchor";
import { bannerDetail } from "ui-lab-registry/components/Banner";
import { badgeDetail } from "ui-lab-registry/components/Badge";
import { pathDetail } from "ui-lab-registry/components/Path";
import { cardDetail } from "ui-lab-registry/components/Card";
import { checkboxDetail as _checkboxDetail } from "ui-lab-registry/components/Checkbox";
import { colorDetail } from "ui-lab-registry/components/Color";
import { dividerDetail } from "ui-lab-registry/components/Divider";
import { flexDetail } from "ui-lab-registry/components/Flex";
import { expandDetail } from "ui-lab-registry/components/Expand";
import { galleryDetail } from "ui-lab-registry/components/Gallery";
import { gridDetail } from "ui-lab-registry/components/Grid";
import { groupDetail as _groupDetail } from "ui-lab-registry/components/Group";
import { inputDetail } from "ui-lab-registry/components/Input";
import { labelDetail } from "ui-lab-registry/components/Label";
import { menuDetail } from "ui-lab-registry/components/Menu";
import { toastDetail } from "ui-lab-registry/components/Toast";
import { modalDetail } from "ui-lab-registry/components/Modal";
import { pageDetail } from "ui-lab-registry/components/Page";
import { maskDetail } from "ui-lab-registry/components/Mask";
import { popoverDetail } from "ui-lab-registry/components/Popover";
import { confirmDetail } from "ui-lab-registry/components/Confirm";
import { progressDetail as _progressDetail } from "ui-lab-registry/components/Progress";
import { radioDetail } from "ui-lab-registry/components/Radio";
import { commandDetail } from "ui-lab-registry/components/Command";
import { scrollDetail } from "ui-lab-registry/components/Scroll";
import { selectDetail } from "ui-lab-registry/components/Select";
import { sliderDetail } from "ui-lab-registry/components/Slider";
import { switchDetail as _switchDetail } from "ui-lab-registry/components/Switch";
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
  categoryMap as registryCategoryMap,
  componentRegistry as registryData,
  type ComponentCategory,
  type ComponentMetadata as RegistryMetadata,
  getComponentsInOrder,
  getCategoriesInOrder as getRegistryCategoriesInOrder,
  getCategoryIcon as getRegistryCategoryIcon,
} from "ui-lab-registry";
import {
  siteOnlyComingSoonCategories,
  type SiteComponentCategory,
  type SiteComponentCategoryDefinition,
} from "./coming-soon";

export type { SiteComponentCategory };

interface ComponentMetadata extends RegistryMetadata {
  preview: React.ReactNode;
  experimental?: boolean;
}

export const categoryMap = {
  ...registryCategoryMap,
  ...siteOnlyComingSoonCategories,
} as Record<SiteComponentCategory, SiteComponentCategoryDefinition>;

export const getCategoriesInOrder = (): SiteComponentCategory[] => [
  ...getRegistryCategoriesInOrder(),
  ...Object.keys(siteOnlyComingSoonCategories),
] as SiteComponentCategory[];

export const getCategoryIcon = (category: SiteComponentCategory): React.ReactNode => {
  if (category in siteOnlyComingSoonCategories) return null;

  return getRegistryCategoryIcon(category as ComponentCategory);
};

export const componentRegistry: ComponentMetadata[] = Object.entries(registryData).map(
  ([id, metadata]) => ({
    ...metadata,
    preview: previews[id] || <div />,
  }),
);

const getComponentsByCategory =
  (category: SiteComponentCategory): ComponentMetadata[] => {
    return componentRegistry.filter((c) => c.category === category);
  };

export const getComponentsGroupedByCategory =
  (): Record<SiteComponentCategory, ComponentMetadata[]> => {
    const result: Record<SiteComponentCategory, ComponentMetadata[]> = {} as Record<
      SiteComponentCategory,
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
  (category: SiteComponentCategory): ComponentMetadata[] => {
    const componentIds = getComponentsInOrder(category as ComponentCategory);

    return componentIds
      .map((id: string) =>
        componentRegistry.find((c): c is ComponentMetadata => c.id === id),
      )
      .filter((c): c is ComponentMetadata => c !== undefined);
  };

const privateButtonExamples = [
  { id: '01-variants', Component: ButtonVariants },
  { id: '02-multi-actions', Component: ButtonMultiActions },
  { id: '03-joined-toggle', Component: ButtonJoinedToggle },
  { id: '04-sub-stack-actions', Component: ButtonSubStackActions },
  { id: '05-split-action-button', Component: ButtonSplitActionButton },
  { id: '06-icons', Component: ButtonIcons },
  { id: '07-split-button', Component: ButtonSplitButton },
  { id: '08-button-group', Component: ButtonButtonGroup },
];

const buttonDetail = {
  ..._buttonDetail,
  examples: [
    ..._buttonDetail.examples,
    ...privateButtonExamples.map((ex, i) => {
      const json = (buttonExamplesJson as Record<string, { title: string; description: string; code: string }>)[ex.id];
      return {
        id: `private-${i + 1}`,
        title: json?.title ?? ex.id,
        description: json?.description,
        code: json?.code ?? '',
        preview: React.createElement(ex.Component),
      };
    }),
  ],
};

const privateSwitchExamples = [
  { id: '01-basic-switch', Component: SwitchBasic },
  { id: '02-settings-panel', Component: SwitchSettings },
  { id: '03-disabled-state', Component: SwitchDisabled },
  { id: '04-small-size', Component: SwitchSmall },
  { id: '05-controlled-toggle', Component: SwitchControlled },
];

const switchDetail = {
  ..._switchDetail,
  examples: [
    ..._switchDetail.examples,
    ...privateSwitchExamples.map((ex, i) => {
      const json = (switchExamplesJson as Record<string, { title: string; description: string; code: string }>)[ex.id];
      return {
        id: `private-${i + 1}`,
        title: json?.title ?? ex.id,
        description: json?.description,
        code: json?.code ?? '',
        preview: React.createElement(ex.Component),
      };
    }),
  ],
};

const privateCheckboxExamples = [
  { id: '01-basic-states', Component: CheckboxBasicStates },
  { id: '02-helper-text', Component: CheckboxHelperText },
  { id: '03-controlled', Component: CheckboxControlled },
  { id: '04-group', Component: CheckboxGroup },
  { id: '05-indeterminate', Component: CheckboxIndeterminate },
  { id: '06-consent-form', Component: CheckboxConsentForm },
];

const checkboxDetail = {
  ..._checkboxDetail,
  examples: [
    ..._checkboxDetail.examples,
    ...privateCheckboxExamples.map((ex, i) => {
      const json = (checkboxExamplesJson as Record<string, { title: string; description: string; code: string }>)[ex.id];
      return {
        id: `private-${i + 1}`,
        title: json?.title ?? ex.id,
        description: json?.description,
        code: json?.code ?? '',
        preview: React.createElement(ex.Component),
      };
    }),
  ],
};

const privateGroupExamples = [
  { id: '01-basic-group', Component: GroupBasicGroup },
  { id: '02-create-project', Component: GroupCreateProject },
  { id: '03-filter-bar', Component: GroupFilterBar },
  { id: '04-documentation-search', Component: GroupDocumentationSearch },
  { id: '05-email-signup', Component: GroupEmailSignup },
  { id: '06-copy-command', Component: GroupCopyCommand },
  { id: '07-delete-confirmation', Component: GroupDeleteConfirmation },
  { id: '08-slider-integration', Component: GroupSliderIntegration },
];

const groupDetail = {
  ..._groupDetail,
  examples: [
    ..._groupDetail.examples,
    ...privateGroupExamples.map((ex, i) => {
      const json = (groupExamplesJson as Record<string, { title: string; description: string; code: string }>)[ex.id];
      return {
        id: `private-${i + 1}`,
        title: json?.title ?? ex.id,
        description: json?.description,
        code: json?.code ?? '',
        preview: React.createElement(ex.Component),
      };
    }),
  ],
};

const privateProgressExamples = [
  { id: '01-basic-progress', Component: ProgressBasicProgress },
  { id: '02-storage-quota', Component: ProgressStorageQuota },
  { id: '03-onboarding-steps', Component: ProgressOnboardingSteps },
  { id: '04-indeterminate', Component: ProgressIndeterminate },
  { id: '05-skill-levels', Component: ProgressSkillLevels },
];

const progressDetail = {
  ..._progressDetail,
  examples: [
    ..._progressDetail.examples,
    ...privateProgressExamples.map((ex, i) => {
      const json = (progressExamplesJson as Record<string, { title: string; description: string; code: string }>)[ex.id];
      return {
        id: `private-${i + 1}`,
        title: json?.title ?? ex.id,
        description: json?.description,
        code: json?.code ?? '',
        preview: React.createElement(ex.Component),
      };
    }),
  ],
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
