import { Container as ListRoot, Header as ListHeader, ActionGroup as ListActionGroup, Divider as ListDivider, Footer as ListFooter } from './List';
import { Item } from './List.Item';
import { Checkbox, CheckboxIndicator, Switch, Input, Select } from './List.Controls';
import { Media } from './List.Media';
import { Desc } from './List.Desc';

const List = Object.assign(ListRoot, {
  Header: ListHeader,
  Item,
  Checkbox,
  CheckboxIndicator,
  Switch,
  Input,
  Select,
  Media,
  Desc,
  ActionGroup: ListActionGroup,
  Divider: ListDivider,
  Footer: ListFooter,
});

export { List };
export { 
  Item as ListItem, 
  Checkbox as ListCheckbox, 
  CheckboxIndicator as ListCheckboxIndicator,
  Switch as ListSwitch,
  Input as ListInput,
  Select as ListSelect,
  Media as ListMedia, 
  Desc as ListDesc 
};
export { ListHeader, ListActionGroup, ListDivider, ListFooter };
export type { ListActionDef } from './list.types';
export type {
  ListRef,
  ListNavigateCallbacks,
  ListContainerProps,
  ListHeaderProps,
  ListItemProps,
  ListCheckboxProps,
  ListCheckboxIndicatorProps,
  ListSwitchProps,
  ListInputProps,
  ListSelectProps,
  ListMediaProps,
  ListDescProps,
  ActionGroupComponentProps,
  ListActionGroupProps,
  ListDividerProps,
  FooterComponentProps,
  ListFooterProps,
} from './list.types';
