import {
  CHECKOUT_PATH,
  PAYMENT_PATH,
  SHIPPING_PATH,
  SUMMARY_PATH,
  removeTrailingSlash,
} from "~/domain/paths";

export const pathnames = [SHIPPING_PATH, PAYMENT_PATH, SUMMARY_PATH] as const;
export const CHECKOUT_FULL_PATH = `${CHECKOUT_PATH}/`;

export type Pathname = (typeof pathnames)[number];

export const getFlatPathname = (nestedPath: string) => {
  return removeTrailingSlash(nestedPath).replace(CHECKOUT_FULL_PATH, "");
};

export const getNestedPathname = (flatPath: string) => {
  return `${CHECKOUT_FULL_PATH}${flatPath}`;
};

export const breadcrumbsPathnames = pathnames.map(getFlatPathname);

export const isValidPathname = (pathname: string) => {
  return breadcrumbsPathnames.includes(removeTrailingSlash(pathname));
};

export const getPreviousPathname = (currentPathname: string) => {
  const index = breadcrumbsPathnames.indexOf(
    removeTrailingSlash(currentPathname)
  );

  if (index <= 0) return "";
  return breadcrumbsPathnames[index - 1];
};

export const getNextPathname = (currentPathname: string) => {
  const index = breadcrumbsPathnames.indexOf(
    removeTrailingSlash(currentPathname)
  );

  if (index < 0 || index === breadcrumbsPathnames.length - 1) return "";
  return breadcrumbsPathnames[index + 1];
};
