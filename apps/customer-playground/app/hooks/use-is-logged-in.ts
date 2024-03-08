import { useSlashID } from "@slashid/react";
import { ROOT_ROUTE_ID } from "~/domain/paths";
import type { TokenLoaderData } from "~/domain/user/types";
import { getLastAuthenticationMethod } from "~/domain/user/user";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";

/**
 * This hook returns whether the user is logged in or not.
 */
export const useIsLoggedIn = () => {
  const { user } = useSlashID();
  const { token } = useRouteLoaderData<TokenLoaderData>(ROOT_ROUTE_ID);
  const isLoggedIn = !!token && !!user;
  const method = getLastAuthenticationMethod(user);
  const isLoggedInWithDirectID = isLoggedIn && method === "direct_id";

  return { isLoggedIn, isLoggedInWithDirectID };
};
