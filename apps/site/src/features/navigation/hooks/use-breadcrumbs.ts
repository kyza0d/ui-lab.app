import { useMemo } from "react";
import { generateBreadcrumbs, type BreadcrumbItem } from "../lib/breadcrumb-utils";

export function useBreadcrumbs(pathname: string): BreadcrumbItem[] {
  return useMemo(() => {
    return generateBreadcrumbs(pathname);
  }, [pathname]);
}
