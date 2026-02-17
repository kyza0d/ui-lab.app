import { Container as ListRoot, Header as ListHeader, ActionGroup as ListActionGroup, Divider as ListDivider, Footer as ListFooter } from './List';
import { Item } from './List.Item';
import { Checkbox } from './List.Checkbox';
import { Media } from './List.Media';
import { Desc } from './List.Desc';

const List = Object.assign(ListRoot, {
  Header: ListHeader,
  Item,
  Checkbox,
  Media,
  Desc,
  ActionGroup: ListActionGroup,
  Divider: ListDivider,
  Footer: ListFooter,
});

export { List };
export { Item as ListItem, Checkbox as ListCheckbox, Media as ListMedia, Desc as ListDesc };
export { ListHeader, ListActionGroup, ListDivider, ListFooter };
export type {
  ListRef,
  ListNavigateCallbacks,
  ListContainerProps,
  ListHeaderProps,
  ListItemProps,
  ListCheckboxProps,
  ListMediaProps,
  ListDescProps,
  ActionGroupComponentProps,
  ListActionGroupProps,
  ListDividerProps,
  FooterComponentProps,
  ListFooterProps,
} from './list.types';
