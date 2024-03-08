import { useSearchParams, useSubmit } from "@remix-run/react";
import { ConfigurationProvider, StepUpAuth, useSlashID } from "@slashid/react";
import { type User } from "@slashid/slashid";
import { ThemeRoot } from "@slashid/ui";
import { MFA_PATH } from "~/domain/paths";
import { getOtherAuthenticationFactors } from "~/domain/user/user";
import { getEnvValue } from "~/services/environment-variables";
import { getRedirectToFromParams } from "~/utils/utils";

export default function StepUpAuthFlow() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const { user } = useSlashID();

  const handleSuccess = async ({ token }: User) => {
    submit(
      {
        token,
        redirectTo: getRedirectToFromParams(searchParams),
      },
      { action: MFA_PATH, method: "post", replace: true }
    );
  };

  return (
    <ConfigurationProvider>
      <ThemeRoot theme="light">
        <StepUpAuth
          factors={getOtherAuthenticationFactors(user).map((factor) => {
            if (factor === "oidc") {
              return {
                method: factor,
                options: {
                  client_id: getEnvValue("SLASHID_OIDC_CLIENT_ID"),
                  provider: "google",
                  ux_mode: "popup",
                },
              };
            }

            return { method: factor };
          })}
          text={{
            "success.subtitle": "You will be redirected shortly.",
          }}
          onSuccess={handleSuccess}
        />
      </ThemeRoot>
    </ConfigurationProvider>
  );
}
