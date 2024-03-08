import type { SlashID } from "@slashid/slashid";
import ReactGA from "react-ga4";
import { getBooleanEnvValue, getEnvValue } from "./environment-variables";

function ensureGoogleAnalyticsEnabled(callback: (gTagId: string) => void) {
  const gTagId = getEnvValue("GTAG_ID");
  const enabled = getBooleanEnvValue("ANALYTICS_ENABLED");

  if (gTagId && enabled) {
    callback(gTagId);
  }
}

function ensureSlashIDAnalyticsEnabled(callback: () => void) {
  const enabled = getBooleanEnvValue("ANALYTICS_ENABLED");

  if (enabled) {
    callback();
  }
}

export function initializeGA() {
  ensureGoogleAnalyticsEnabled((gTagId) => {
    ReactGA.initialize(gTagId);
  });
}

export function pageview(page: string, sid: SlashID) {
  ensureGoogleAnalyticsEnabled(() => {
    ReactGA.send({ hitType: "pageview", page });
  });

  ensureSlashIDAnalyticsEnabled(() => {
    sid.getAnalytics().trackVirtualPageView({});
  });
}
