export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface UserAction {
  label: string;
  icon?: string;
  onClick: () => void;
}

export interface HeaderProps {
  logo?: React.ReactNode;
  logoText?: string;
  navItems?: NavItem[];
  actions?: UserAction[];
  onSearchChange?: (query: string) => void;
  sticky?: boolean;
  className?: string;
}
