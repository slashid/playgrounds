import * as Sentry from "@sentry/remix";
import {
  getBooleanEnvValue,
  getEnvValue,
} from "~/services/environment-variables";

export const initializeSentry = () => {
  if (!getBooleanEnvValue("SENTRY_ENABLED")) return;

  Sentry.init({
    dsn: getEnvValue("SENTRY_DSN"),
    environment: getEnvValue("DEPLOY_ENV"),
  });
};

export const captureException = (exception: any, captureContext?: any) => {
  if (getBooleanEnvValue("SENTRY_ENABLED")) {
    Sentry.captureException(exception, captureContext);
  } else {
    console.error(exception);
  }
};

export const identifyUserInSentry = (id: string) => {
  if (!getBooleanEnvValue("SENTRY_ENABLED")) return;
  Sentry.setUser({ id });
};

export const clearUserInSentry = () => {
  if (!getBooleanEnvValue("SENTRY_ENABLED")) return;
  Sentry.setUser(null);
};
