import Cookies from "js-cookie";

export const SESSION_COOKIE_NAME = "__session";

const getSessionCookie = () => {
  return Cookies.get(SESSION_COOKIE_NAME);
};

const getToken = (sessionCookie: string) => {
  const sessionCookieJson = atob(sessionCookie);

  if (!sessionCookieJson) {
    return undefined;
  }

  const { token } = JSON.parse(sessionCookieJson);
  return token;
};

export const getTokenFromSession = () => {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie) {
    return undefined;
  }

  return getToken(sessionCookie);
};
