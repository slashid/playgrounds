import { stringify } from "~/utils/utils";
import type { PublicEnvVariables } from "./environment.server";
import { environment } from "./environment.server";

declare global {
  interface Window {
    ENV: PublicEnvVariables;
  }
}

function EnvironmentVariables(props: PublicEnvVariables) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${stringify(props)}`,
      }}
    />
  );
}

function getEnvValue(envVariableName: keyof PublicEnvVariables) {
  if (typeof window !== "undefined" && !window.ENV) {
    throw new Error(
      `Missing the <EnvironmentVariables /> component at the root of your app.`
    );
  }

  const envValue =
    typeof window === "undefined"
      ? environment()[envVariableName]
      : window.ENV[envVariableName];

  return envValue || "";
}

function getBooleanEnvValue(
  envVariableName: keyof PublicEnvVariables
): boolean {
  const envValue = getEnvValue(envVariableName);

  if (envValue === "true") return true;
  return false;
}

export { EnvironmentVariables, getEnvValue, getBooleanEnvValue };
