import { useRouteLoaderData as useRemixRouteLoaderData } from "@remix-run/react";
import type { RouteID } from "~/domain/paths";

/**
 * This hook returns the loaderData for the given routeId.
 */
export const useRouteLoaderData = <T>(routeId: RouteID): T => {
  const data = useRemixRouteLoaderData(routeId);

  return (data || {}) as T;
};
