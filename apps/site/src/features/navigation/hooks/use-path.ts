import { useMemo } from "react";
import { generateBreadcrumbs, type BreadcrumbItem } from "../lib/breadcrumb-utils";

export function usePath(pathname: string): BreadcrumbItem[] {
  return useMemo(() => {
    return generateBreadcrumbs(pathname);
  }, [pathname]);
}
