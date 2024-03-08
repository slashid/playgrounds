import { isRouteErrorResponse } from "@remix-run/react";
import { parse } from "./utils";

export function parseError(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return {
      message: error.data,
      status: error.status,
      statusText: error.statusText,
    };
  }

  if (error instanceof Error) {
    return { message: error.message, stack: error.stack };
  }

  return { message: "Unknown Error" };
}

export function getErrorMessage(error: unknown) {
  const { message } = parseError(error);

  if (!message.includes("{")) return message;
  return parse(message);
}
