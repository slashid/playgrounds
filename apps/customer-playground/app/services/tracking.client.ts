import type { SlashID } from "@slashid/slashid";
import { getBooleanEnvValue, getEnvValue } from "./environment-variables";
import ReactGTM from "react-gtm-module";

function ensureGoogleAnalyticsEnabled(callback: (gtmId: string) => void) {
  const gtmId = getEnvValue("GTM_ID");
  const enabled = getBooleanEnvValue("ANALYTICS_ENABLED");

  if (gtmId && enabled) {
    callback(gtmId);
  }
}

function ensureSlashIDAnalyticsEnabled(callback: () => void) {
  const enabled = getBooleanEnvValue("ANALYTICS_ENABLED");

  if (enabled) {
    callback();
  }
}

export function initializeGA() {
  ensureGoogleAnalyticsEnabled((gtmId) => {
    ReactGTM.initialize({
      gtmId,
    });
  });
}

export function pageview(page: string, sid: SlashID) {
  ensureSlashIDAnalyticsEnabled(() => {
    sid.getAnalytics().trackVirtualPageView({});
  });
}
