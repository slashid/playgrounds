import { SlashIDProvider } from "@slashid/react";
import type { ReactNode } from "react";
import { getBooleanEnvValue, getEnvValue } from "./environment-variables";

type Props = {
  children: ReactNode;
  initialToken?: string;
};

export const SlashID = ({ initialToken, children }: Props) => {
  return (
    <SlashIDProvider
      baseApiUrl={getEnvValue("SLASHID_BASE_API_URL")}
      oid={getEnvValue("SLASHID_ORGANIZATION_ID")}
      initialToken={initialToken}
      analyticsEnabled={getBooleanEnvValue("ANALYTICS_ENABLED")}
    >
      {children}
    </SlashIDProvider>
  );
};
