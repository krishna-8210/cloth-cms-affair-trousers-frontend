import React, { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface TopNavItemBase {
  id: number;
  label: string;
  link: string;
  type: string;
}

export interface TopNavPopupItem extends TopNavItemBase {
  element: React.ReactNode;
}

export type TopNavItem = TopNavItemBase | TopNavPopupItem;

export type api_arg_type = {
  data: any,
  id: string,
  query: string
}

export type datalist_type = {
  list: any | null,
  status: 'loaded' | 'loading',
  loading:boolean
}
export type dataDetails_type = {
  data: any | null,
  status: 'loaded' | 'loading',
  loading:boolean
}