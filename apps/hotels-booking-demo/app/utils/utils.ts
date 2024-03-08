import {
  HOME_PATH,
  isCheckoutPage,
  isDirectIdPage,
  isLogin,
} from "../domain/paths";

export function getCurrentPath(request: Request) {
  return new URL(request.url).pathname;
}

export function getCurrentParam(request: Request, paramName: string) {
  return new URL(request.url).searchParams.get(paramName);
}

export function isLoginRoute(request: Request) {
  return isLogin(getCurrentPath(request));
}

export function isDirectIdRoute(request: Request) {
  return isDirectIdPage(getCurrentPath(request));
}

export function isCheckoutRoute(request: Request) {
  return isCheckoutPage(getCurrentPath(request));
}

export function getRedirectToFromParams(searchParams: URLSearchParams) {
  return searchParams.get("redirectTo") || HOME_PATH;
}

export function getRedirectToFromForm(formData: FormData) {
  return safeRedirect(formData.get("redirectTo"));
}

export function parse(value: any, fallback: any = null) {
  return JSON.parse(value?.toString() || JSON.stringify(fallback));
}

export function stringify(value: any) {
  return JSON.stringify(value || "");
}

export function isEqual(value: any, other: any) {
  return stringify(value) === stringify(other);
}

export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = HOME_PATH
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isTruthy(value: any) {
  return Array.isArray(value) ? value.length > 0 : !!value;
}

export function isFalsy(value: any) {
  return !isTruthy(value);
}
