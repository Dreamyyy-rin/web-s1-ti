import { LucideIcon } from "lucide-react";

export interface SidebarUserData{
  name: string| null;
  email: string | null;
  avatar: string | null;
}

export interface SidebarHeaderItemData extends SidebarClickableItemData{
  isExternal: boolean;
}

export interface SidebarClickableItemData {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface SidebarContentData{
  title: string;
  items: Array<SidebarClickableItemData>
  
}

export interface SidebarFooterData {
  user: SidebarUserData;
  items: Array<SidebarClickableItemData>
}

export interface SidebarData {
  header: Array<SidebarHeaderItemData>;
  content: Array<SidebarContentData>;
  footer: SidebarFooterData  
}
