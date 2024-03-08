import { ROOT_ROUTE_ID } from "~/domain/paths";
import type { PlaygroundEmailLoaderData } from "~/domain/user/types";
import { useRouteLoaderData } from "./use-route-loader-data";

/**
 * This hook is used to get the playground email from the route loader data.
 */
export const usePlaygroundEmail = () => {
  const { playgroundEmail } =
    useRouteLoaderData<PlaygroundEmailLoaderData>(ROOT_ROUTE_ID);

  return playgroundEmail;
};
