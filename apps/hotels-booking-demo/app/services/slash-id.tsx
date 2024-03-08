import { SlashIDProvider } from "@slashid/react";
import type { ReactNode } from "react";
import { getEnvValue } from "./environment-variables";

type Props = {
  children: ReactNode;
  initialToken?: string;
};

export const SlashID = ({ initialToken, children }: Props) => {
  return (
    <SlashIDProvider
      oid={getEnvValue("SLASHID_ORGANIZATION_ID")}
      initialToken={initialToken}
      analyticsEnabled
    >
      {children}
    </SlashIDProvider>
  );
};
