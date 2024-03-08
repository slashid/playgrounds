const environment = () => process.env;

const pick = (obj: any, keys: any) =>
  keys.reduce((acc: any, key: string) => {
    acc[key] = obj[key];
    return acc;
  }, {});

const PUBLIC_ENV_VAR_NAMES = [
  "SLASHID_ORGANIZATION_ID",
  "SLASHID_BASE_API_URL",
  "SLASHID_OIDC_CLIENT_ID",
  "SENTRY_ENABLED",
  "SENTRY_DSN",
  "DEPLOYMENT_URL",
  "DEPLOY_ENV",
  "ANALYTICS_ENABLED",
  "GTM_ID",
  "PERFORMANCE_LOGGING_ENABLED",
  "KYC_ENABLED",
  "MFA_ENABLED",
] as const;

export type PublicEnvVariables = Record<
  (typeof PUBLIC_ENV_VAR_NAMES)[number],
  string
>;

function getPublicEnvVariables() {
  return pick(environment(), PUBLIC_ENV_VAR_NAMES) as PublicEnvVariables;
}

export { environment, getPublicEnvVariables };
