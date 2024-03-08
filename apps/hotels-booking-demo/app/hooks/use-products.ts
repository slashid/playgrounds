import { ROOT_ROUTE_ID } from "~/domain/paths";
import type { ProductLoaderData } from "~/domain/product/types";
import { useRouteLoaderData } from "./use-route-loader-data";

/**
 * This hook is used to get the products data from the root route.
 */
export const useProducts = () => {
  const { products } = useRouteLoaderData<ProductLoaderData>(ROOT_ROUTE_ID);

  return products;
};
