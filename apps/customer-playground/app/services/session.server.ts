import { createCookieSessionStorage, json, redirect } from "@vercel/remix";
import type { Token } from "~/domain/user/types";
import { DAY_IN_SECONDS } from "~/utils/constants";
import { parseError } from "~/utils/error";
import { timeEnd, timeStart } from "~/utils/log";
import { HOME_PATH, LOGIN_PATH } from "../domain/paths";
import { getCurrentPath, stringify } from "../utils/utils";
import { validateJwtToken } from "./jwt-validation.server";
import { SESSION_COOKIE_NAME } from "./session";

const USER_SESSION_KEY = "token";
const MAX_COOKIE_AGE = DAY_IN_SECONDS;

export type ToastMessage = {
  type: "success" | "error";
  message: string;
};

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: SESSION_COOKIE_NAME,
    httpOnly: false,
    path: HOME_PATH,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
});

function composeLoginPath(redirectTo: string) {
  const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
  return `${LOGIN_PATH}?${searchParams}`;
}

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function createUserSession({
  request,
  token,
  redirectTo,
}: {
  request: Request;
  token: string;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: MAX_COOKIE_AGE,
      }),
    },
  });
}

export async function handleFailure(request: Request) {
  const session = await getSession(request);

  session.flash("error", "Missing or invalid token");

  // Redirect back to the login page with errors.
  return redirect(LOGIN_PATH, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: MAX_COOKIE_AGE,
      }),
    },
  });
}

export async function flashToastMessage(
  request: Request,
  message: string,
  type: "success" | "error" = "success"
) {
  const session = await getSession(request);
  session.flash("toastMessage", { message, type });

  return {
    "Set-Cookie": await sessionStorage.commitSession(session, {
      maxAge: MAX_COOKIE_AGE,
    }),
  };
}

export async function redirectWithToastMessage(
  request: Request,
  redirectTo: string,
  toastMessage: string
) {
  const headers = await flashToastMessage(request, toastMessage);

  // Redirect to new route with toast message.
  return redirect(redirectTo, { headers });
}

export async function getToastMessageWithHeaders(request: Request) {
  const session = await getSession(request);
  const toastMessage: ToastMessage = session.get("toastMessage");

  return {
    toastMessage,
    headers: {
      // we need to commit the session to flash the message after reading it
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: MAX_COOKIE_AGE,
      }),
    },
  };
}

export async function logOutFromSession(
  request: Request,
  redirectTo: string = getCurrentPath(request)
) {
  const session = await getSession(request);

  return redirect(composeLoginPath(redirectTo), {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function getToken(request: Request): Promise<Token> {
  timeStart("getToken");
  try {
    const session = await getSession(request);
    const token = session.get(USER_SESSION_KEY);
    return token;
  } finally {
    timeEnd("getToken");
  }
}

export async function clearSession(request: Request) {
  const session = await getSession(request);
  session.unset(USER_SESSION_KEY);

  return {
    "Set-Cookie": await sessionStorage.commitSession(session, {
      maxAge: 0,
    }),
  };
}

export async function validateToken(request: Request) {
  const token = await getToken(request);
  if (!token) return false;

  return validateJwtToken(token);
}

export async function validateRequest(
  request: Request,
  redirectTo: string = getCurrentPath(request)
) {
  timeStart("validateRequest");
  try {
    const valid = await validateToken(request);
    if (!valid) {
      const headers = await clearSession(request);
      throw redirect(composeLoginPath(redirectTo), {
        headers,
      });
    }
  } finally {
    timeEnd("validateRequest");
  }
}

export async function handleActionError(
  request: Request,
  error: unknown,
  redirectTo?: string
) {
  const parsedError = parseError(error);
  const init = {
    // we need to return the headers here so that the toast message is flashed after reading it
    headers: await flashToastMessage(request, parsedError.message, "error"),
    status: parsedError?.status || 500,
  };

  // this is needed to redirect back to the original route when submitting using useSubmit which causes a redirect within this route loader
  if (redirectTo) return redirect(redirectTo, init);

  return json({ error: stringify(parsedError) }, init);
}
