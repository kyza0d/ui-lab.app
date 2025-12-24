export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  submenu?: SidebarItem[];
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  collapsible?: boolean;
  width?: "sm" | "md" | "lg";
  className?: string;
  onItemClick?: (item: SidebarItem) => void;
}
