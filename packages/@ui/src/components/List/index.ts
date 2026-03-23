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
export type { ListActionDef } from './list.types';
export type {
  ListRef,
  ListNavigateCallbacks,
  ListContainerProps,
  ListHeaderProps,
  ListItemProps,
  ListCheckboxProps,
  ListMediaProps,
  ListDescProps,
  ListActionGroupProps,
  ListDividerProps,
  ListFooterProps,
} from './list.types';
