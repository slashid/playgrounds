// route ids
export const ROOT_ROUTE_ID = "root";
export const HOME_ROUTE_ID = "routes/_index";
export const LOGIN_ROUTE_ID = "routes/login";
export const CART_ROUTE_ID = "routes/cart";
export const CHECKOUT_ROUTE_ID = "routes/checkout";
export const SHIPPING_ROUTE_ID = `${CHECKOUT_ROUTE_ID}.shipping` as const;
export const PAYMENT_ROUTE_ID = `${CHECKOUT_ROUTE_ID}.payment` as const;
export const SUMMARY_ROUTE_ID = `${CHECKOUT_ROUTE_ID}.summary` as const;
export const ORDER_ID_ROUTE_ID = "routes/order.$id" as const;
export const DIRECT_ID_ROUTE_ID = "routes/direct-id";
// all route ids need to be listed here to avoid making mistakes when calling route hooks
export const ALL_ROUTE_IDS = [
  ROOT_ROUTE_ID,
  HOME_ROUTE_ID,
  LOGIN_ROUTE_ID,
  CART_ROUTE_ID,
  CHECKOUT_ROUTE_ID,
  SHIPPING_ROUTE_ID,
  PAYMENT_ROUTE_ID,
  SUMMARY_ROUTE_ID,
  ORDER_ID_ROUTE_ID,
  DIRECT_ID_ROUTE_ID,
] as const;
export type RouteID = (typeof ALL_ROUTE_IDS)[number];

// routes for pages
export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const CART_PATH = "/cart";
export const CHECKOUT_PATH = "/checkout";
export const SHIPPING_PATH = `${CHECKOUT_PATH}/shipping` as const;
export const PAYMENT_PATH = `${CHECKOUT_PATH}/payment` as const;
export const SUMMARY_PATH = `${CHECKOUT_PATH}/summary` as const;
export const ORDER_PATH = "/order";
export const DIRECT_ID_PATH = "/direct-id";
export const MFA_PATH = "/mfa";
// routes for api resources
export const LOGOUT_API_PATH = "/logout";
export const UPDATE_CART_API_PATH = "/update-cart";
export const UPDATE_SHIPPING_API_PATH = "/update-shipping";
export const UPDATE_PAYMENT_API_PATH = "/update-payment";
export const UPDATE_ORDERS_API_PATH = "/update-orders";
export const UPDATE_MFA_THRESHOLD_API_PATH = "/update-mfa-threshold";
export const ABANDONED_CART_API_PATH = "/abandoned-cart";
export const MOBILE_FALLBACK_DIRECT_ID_PATH = "/mobile-fallback-direct-id";
// all paths need to be listed here to avoid making mistakes when calling route hooks
export const ALL_PATHS = [
  HOME_PATH,
  LOGIN_PATH,
  CART_PATH,
  CHECKOUT_PATH,
  SHIPPING_PATH,
  PAYMENT_PATH,
  SUMMARY_PATH,
  ORDER_PATH,
  DIRECT_ID_PATH,
  MFA_PATH,
  LOGOUT_API_PATH,
  UPDATE_CART_API_PATH,
  UPDATE_SHIPPING_API_PATH,
  UPDATE_PAYMENT_API_PATH,
  UPDATE_ORDERS_API_PATH,
  UPDATE_MFA_THRESHOLD_API_PATH,
  ABANDONED_CART_API_PATH,
  MOBILE_FALLBACK_DIRECT_ID_PATH,
] as const;
export type RoutePath = (typeof ALL_PATHS)[number];

export function removeTrailingSlash(path: string) {
  if (["", "/"].includes(path)) return path;
  return path.replace(/\/$/, "");
}

export function isLogin(pathname: string) {
  return removeTrailingSlash(pathname) === LOGIN_PATH;
}

export function isHomePage(pathname: string) {
  return pathname === HOME_PATH;
}

export function isShoppingCartPage(pathname: string) {
  return removeTrailingSlash(pathname) === CART_PATH;
}

export function isCheckoutPage(pathname: string) {
  return removeTrailingSlash(pathname) === CHECKOUT_PATH;
}

export function isShippingPage(pathname: string) {
  return removeTrailingSlash(pathname) === SHIPPING_PATH;
}

export function isPaymentPage(pathname: string) {
  return removeTrailingSlash(pathname) === PAYMENT_PATH;
}

export function isSummaryPage(pathname: string) {
  return removeTrailingSlash(pathname) === SUMMARY_PATH;
}

export function isOrderPage(pathname: string) {
  return pathname.startsWith(ORDER_PATH);
}

export function isDirectIdPage(pathname: string) {
  return removeTrailingSlash(pathname) === DIRECT_ID_PATH;
}

export function isMfaPage(pathname: string) {
  return removeTrailingSlash(pathname) === MFA_PATH;
}
