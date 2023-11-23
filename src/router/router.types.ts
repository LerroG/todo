import type { VueElement } from "vue";
import type { AppLayoutsEnum } from "@/layouts/layouts.types";

declare module "vue-router" {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
  }
}

export enum RouteNamesEnum {
  home = "home",
  addEdit = "add-edit",
  two = "two",
  three = "three",
  four = "four",
  five = "five",
  six = "six",
}
