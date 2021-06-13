import {BreadcrumbObject} from "xng-breadcrumb/lib/types/breadcrumb.config";

export class RouteData {
  breadcrumb?: BreadcrumbObject | string;
  savedMessage?: string;

  constructor(data: Partial<RouteData> = {}) {
    Object.assign(this, data);
  }
}
