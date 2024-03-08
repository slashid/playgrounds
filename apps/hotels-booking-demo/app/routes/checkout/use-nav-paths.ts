import { useLocation } from "@remix-run/react";
import {
  getFlatPathname,
  getNestedPathname,
  getNextPathname,
  getPreviousPathname,
} from "./steps";

/**
 * This hook returns the previous and next paths for the current checkout step.
 */

export function useNavPaths() {
  const { pathname } = useLocation();

  const currentPathname = getFlatPathname(pathname);
  const previousPathname = getPreviousPathname(currentPathname);
  const previousNestedPathname = getNestedPathname(previousPathname);
  const nextPathname = getNextPathname(currentPathname);
  const nextNestedPathname = getNestedPathname(nextPathname);

  return {
    previousPathname,
    previousNestedPathname,
    nextPathname,
    nextNestedPathname,
  };
}
