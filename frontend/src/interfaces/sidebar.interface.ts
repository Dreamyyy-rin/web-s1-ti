import { StoreUser } from "@/stores/auth.store";
import { LucideIcon } from "lucide-react";

export interface SidebarUserData extends StoreUser{
  avatar: string | null;
}

export interface SidebarHeaderItemData extends SidebarClickableItemData {
  isExternal: boolean;
}

export interface SidebarClickableItemData {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface RestrictedSidebarClickableItemData
  extends SidebarClickableItemData {
  role: string;
}

export interface SidebarContentData {
  title: string;
  items: Array<RestrictedSidebarClickableItemData>;
}

export interface SidebarFooterData {
  items: Array<SidebarClickableItemData>;
}

export interface SidebarData {
  header: Array<SidebarHeaderItemData>;
  content: Array<SidebarContentData>;
  footer: SidebarFooterData;
  user?: StoreUser | null
}
