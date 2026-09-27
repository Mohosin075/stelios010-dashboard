import React from "react";

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ElementType;
  readonly badge?: string | number;
}

export interface NavSection {
  readonly title: string;
  readonly items: readonly NavItem[];
}
