import type { ControlDef } from './types.js';

export const generatedControls: Record<string, ControlDef[]> = {
  anchor: [],

  badge: [
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' }, { label: 'Danger', value: 'danger' }, { label: 'Info', value: 'info' }], defaultValue: 'default' },
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'dismissible', label: 'Dismissible', type: 'toggle', defaultValue: false },
  ],

  banner: [
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Note', value: 'note' }, { label: 'Info', value: 'info' }, { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' }, { label: 'Danger', value: 'danger' }], defaultValue: 'note' },
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'dismissible', label: 'Dismissible', type: 'toggle', defaultValue: false },
  ],

  button: [
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }, { label: 'Outline', value: 'outline' }, { label: 'Ghost', value: 'ghost' }, { label: 'Danger', value: 'danger' }], defaultValue: 'default' },
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
    { name: 'easing', label: 'Interaction Ease', type: 'select', options: [], defaultValue: 'snappyPop' },
  ],

  card: [],
  code: [],
  date: [],
  list: [],
  menu: [],
  path: [],
  table: [],

  checkbox: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'checked', label: 'Checked', type: 'toggle', defaultValue: false },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
    { name: 'error', label: 'Error', type: 'toggle', defaultValue: false },
    { name: 'label', label: 'Label Text', type: 'text', defaultValue: 'Accept terms' },
  ],

  color: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'showOpacity', label: 'Show Opacity', type: 'toggle', defaultValue: false },
    { name: 'format', label: 'Format', type: 'select', options: [{ label: 'Hex', value: 'hex' }, { label: 'RGB', value: 'rgb' }], defaultValue: 'hex' },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
  ],

  command: [
    { name: 'open', label: 'Open', type: 'toggle', defaultValue: false },
  ],

  confirm: [
    { name: 'triggerLabel', label: 'Trigger Label', type: 'text', defaultValue: 'Delete' },
    { name: 'title', label: 'Title', type: 'text', defaultValue: 'Are you sure?' },
    { name: 'description', label: 'Description', type: 'text', defaultValue: 'This action cannot be undone.' },
  ],

  divider: [
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Solid', value: 'solid' }, { label: 'Dashed', value: 'dashed' }, { label: 'Dotted', value: 'dotted' }], defaultValue: 'solid' },
    { name: 'orientation', label: 'Orientation', type: 'select', options: [{ label: 'Horizontal', value: 'horizontal' }, { label: 'Vertical', value: 'vertical' }], defaultValue: 'horizontal' },
  ],

  expand: [
    { name: 'expanded', label: 'Default Expanded', type: 'toggle', defaultValue: false },
  ],

  flex: [
    { name: 'direction', label: 'Direction', type: 'select', options: [{ label: 'Row', value: 'row' }, { label: 'Column', value: 'column' }], defaultValue: 'row' },
    { name: 'gap', label: 'Gap', type: 'select', options: [{ label: 'Extra Small', value: 'xs' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }, { label: 'Extra Large', value: 'xl' }], defaultValue: 'md' },
    { name: 'justify', label: 'Justify Content', type: 'select', options: [{ label: 'Flex Start', value: 'flex-start' }, { label: 'Center', value: 'center' }, { label: 'Flex End', value: 'flex-end' }, { label: 'Space Between', value: 'space-between' }], defaultValue: 'flex-start' },
    { name: 'align', label: 'Align Items', type: 'select', options: [{ label: 'Flex Start', value: 'flex-start' }, { label: 'Center', value: 'center' }, { label: 'Flex End', value: 'flex-end' }, { label: 'Stretch', value: 'stretch' }], defaultValue: 'stretch' },
  ],

  frame: [
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'Accent', value: 'accent' }], defaultValue: 'default' },
    { name: 'padding', label: 'Padding', type: 'select', options: [{ label: 'None', value: 'none' }, { label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }], defaultValue: 'medium' },
  ],

  gallery: [
    { name: 'columns', label: 'Columns', type: 'select', options: [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }], defaultValue: '3' },
    { name: 'gap', label: 'Gap', type: 'select', options: [{ label: 'None', value: '0' }, { label: 'Small', value: '2' }, { label: 'Medium', value: '4' }, { label: 'Large', value: '6' }], defaultValue: '4' },
  ],

  grid: [
    { name: 'columns', label: 'Columns', type: 'select', options: [{ label: '1 Column', value: '1' }, { label: '2 Columns', value: '2' }, { label: '3 Columns', value: '3' }, { label: '4 Columns', value: '4' }, { label: '5 Columns', value: '5' }, { label: '6 Columns', value: '6' }, { label: 'Auto Fit', value: 'auto-fit' }, { label: 'Auto Fill', value: 'auto-fill' }], defaultValue: '3' },
    { name: 'gap', label: 'Gap', type: 'select', options: [{ label: 'Extra Small', value: 'xs' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }, { label: 'Extra Large', value: 'xl' }], defaultValue: 'md' },
    { name: 'justifyItems', label: 'Justify Items', type: 'select', options: [{ label: 'Start', value: 'start' }, { label: 'Center', value: 'center' }, { label: 'End', value: 'end' }, { label: 'Stretch', value: 'stretch' }], defaultValue: 'stretch' },
    { name: 'alignItems', label: 'Align Items', type: 'select', options: [{ label: 'Start', value: 'start' }, { label: 'Center', value: 'center' }, { label: 'End', value: 'end' }, { label: 'Stretch', value: 'stretch' }, { label: 'Baseline', value: 'baseline' }], defaultValue: 'stretch' },
    { name: 'autoFlow', label: 'Auto Flow', type: 'select', options: [{ label: 'Row', value: 'row' }, { label: 'Column', value: 'column' }, { label: 'Row Dense', value: 'row-dense' }, { label: 'Column Dense', value: 'column-dense' }], defaultValue: 'row' },
  ],

  group: [
    { name: 'orientation', label: 'Orientation', type: 'select', options: [{ label: 'Horizontal', value: 'horizontal' }, { label: 'Vertical', value: 'vertical' }], defaultValue: 'horizontal' },
    { name: 'spacing', label: 'Spacing', type: 'select', options: [{ label: 'Tight', value: 'tight' }, { label: 'Normal', value: 'normal' }, { label: 'Relaxed', value: 'relaxed' }], defaultValue: 'normal' },
    { name: 'isDisabled', label: 'Disabled', type: 'toggle', defaultValue: false },
  ],

  input: [
    { name: 'type', label: 'Type', type: 'select', options: [{ label: 'Text', value: 'text' }, { label: 'Email', value: 'email' }, { label: 'Password', value: 'password' }, { label: 'Number', value: 'number' }], defaultValue: 'text' },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
    { name: 'error', label: 'Error', type: 'toggle', defaultValue: false },
    { name: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Enter text...' },
  ],

  label: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'required', label: 'Required', type: 'toggle', defaultValue: false },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
    { name: 'error', label: 'Error', type: 'toggle', defaultValue: false },
  ],

  mask: [
    { name: 'variant', label: 'Mode', type: 'select', options: [{ label: 'Fade Y (Vertical)', value: 'y' }, { label: 'Fade X (Horizontal)', value: 'x' }, { label: 'Text Gradient', value: 'gradient' }], defaultValue: 'y' },
  ],

  modal: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
  ],

  page: [
    { name: 'maxWidth', label: 'Max Width', type: 'select', options: [{ label: '800px', value: '800px' }, { label: '1024px', value: '1024px' }, { label: '1200px', value: '1200px' }, { label: '1400px', value: '1400px' }, { label: 'Full Width', value: 'none' }], defaultValue: '1400px' },
    { name: 'padding', label: 'Padding', type: 'select', options: [{ label: 'None', value: 'none' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }, { label: 'Extra Large', value: 'xl' }], defaultValue: 'md' },
    { name: 'centered', label: 'Centered', type: 'toggle', defaultValue: true },
    { name: 'fullscreen', label: 'Fullscreen', type: 'toggle', defaultValue: false },
  ],

  panel: [
    { name: 'spacing', label: 'Spacing', type: 'select', options: [{ label: 'None', value: 'none' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'Compact', value: 'compact' }], defaultValue: 'default' },
    { name: 'sticky', label: 'Sticky Header', type: 'toggle', defaultValue: true },
  ],

  popover: [
    { name: 'position', label: 'Position', type: 'select', options: [{ label: 'Top', value: 'top' }, { label: 'Right', value: 'right' }, { label: 'Bottom', value: 'bottom' }, { label: 'Left', value: 'left' }], defaultValue: 'bottom' },
  ],

  progress: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' }, { label: 'Error', value: 'error' }], defaultValue: 'default' },
    { name: 'value', label: 'Value', type: 'select', options: [{ label: '0%', value: '0' }, { label: '25%', value: '25' }, { label: '50%', value: '50' }, { label: '75%', value: '75' }, { label: '100%', value: '100' }], defaultValue: '50' },
    { name: 'indeterminate', label: 'Indeterminate', type: 'toggle', defaultValue: false },
    { name: 'showValue', label: 'Show Value', type: 'toggle', defaultValue: false },
  ],

  radio: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
    { name: 'error', label: 'Error', type: 'toggle', defaultValue: false },
    { name: 'label', label: 'Label Text', type: 'text', defaultValue: 'Option 1' },
    { name: 'easing', label: 'Interaction Ease', type: 'select', options: [], defaultValue: 'snappyPop' },
  ],

  scroll: [
    { name: 'maxHeight', label: 'Max Height', type: 'select', options: [{ label: '200px', value: '200px' }, { label: '300px', value: '300px' }, { label: '400px', value: '400px' }], defaultValue: '300px' },
  ],

  select: [
    { name: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Select an option' },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
  ],

  slider: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
  ],

  switch: [
    { name: 'size', label: 'Size', type: 'select', options: [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }], defaultValue: 'md' },
    { name: 'selected', label: 'Selected', type: 'toggle', defaultValue: false },
    { name: 'isDisabled', label: 'Disabled', type: 'toggle', defaultValue: false },
  ],

  tabs: [
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'Underline', value: 'underline' }], defaultValue: 'default' },
    { name: 'disabled', label: 'Disable Second Tab', type: 'toggle', defaultValue: false },
  ],

  textarea: [
    { name: 'rows', label: 'Rows', type: 'text', defaultValue: '4' },
    { name: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Enter your text here...' },
    { name: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
  ],

  toast: [
    { name: 'variant', label: 'Variant', type: 'select', options: [{ label: 'Default', value: 'default' }, { label: 'Success', value: 'success' }, { label: 'Danger', value: 'danger' }, { label: 'Info', value: 'info' }, { label: 'Warning', value: 'warning' }], defaultValue: 'default' },
    { name: 'position', label: 'Position', type: 'select', options: [{ label: 'Bottom Right', value: 'bottom-right' }, { label: 'Bottom Left', value: 'bottom-left' }, { label: 'Bottom Center', value: 'bottom' }, { label: 'Top Right', value: 'top-right' }, { label: 'Top Left', value: 'top-left' }, { label: 'Top Center', value: 'top' }], defaultValue: 'bottom-right' },
    { name: 'duration', label: 'Duration (ms)', type: 'text', defaultValue: '5000' },
  ],

  tooltip: [
    { name: 'position', label: 'Position', type: 'select', options: [{ label: 'Top', value: 'top' }, { label: 'Right', value: 'right' }, { label: 'Bottom', value: 'bottom' }, { label: 'Left', value: 'left' }], defaultValue: 'top' },
    { name: 'delay', label: 'Delay (ms)', type: 'select', options: [{ label: 'No Delay', value: '0' }, { label: '200ms', value: '200' }, { label: '500ms', value: '500' }], defaultValue: '200' },
  ],
};
