import type { ComponentType } from "react";

export type TRole = "ADMIN" | "USER" | "AGENT";


export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
  }[];
}