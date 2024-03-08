import {
  Form,
  ConfigurationProvider,
  defaultOrganization
} from "@slashid/react";
import { useEffect, useState } from "react";
import {
  container,
  formWrapper
} from "./style.css";
import { useSetAtom } from "jotai";
import { LoginPanel } from "../../components/context-panel/login-panel";
import { WelcomePanel } from "../../components/context-panel/welcome-panel";
import { SubOrgPanel } from "../../components/context-panel/suborg-panel";
import {
  contextPanelContentAtom,
  defaultOrgIdAtom,
} from "../../atoms";
import { Loading } from "../../components/loading";
import { useParams } from "react-router-dom";

export const Login = () => {
  const { orgId: paramsOrgId } = useParams()
  const setContextPanelContent = useSetAtom(contextPanelContentAtom);
  const setDefaultOrgId = useSetAtom(defaultOrgIdAtom);
  const [firstTime, setFirstTime] = useState<boolean>(false);

  useEffect(() => {
    setContextPanelContent(
      <>
        <WelcomePanel />
        <LoginPanel />
        <SubOrgPanel />
      </>
    );
  }, [setContextPanelContent]);

  if (firstTime) {
    return (
      <Loading />
    );
  }
  return (
    <ConfigurationProvider
      factors={[
        { method: "webauthn" },
        { method: "email_link" },
        {
          method: "oidc",
          options: {
            provider: "google",
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          },
        },
        {
          method: "oidc",
          options: {
            provider: "github",
            client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
          },
        },
      ]}
      text={{
        "initial.title": "Welcome to SlashID Notes",
        "initial.handle.phone.email": "Type your email address",
        "authenticating.retryPrompt": "Didn’t receive the link?",
        "authenticating.retry": "Resend",
        "success.subtitle": "You will be redirected shortly.",
      }}
    >
      <div className={container}>
        <div className={formWrapper}>
          <Form
            middleware={[
              defaultOrganization(async ({ user }) => {
                const headers: HeadersInit = {
                  authorization: `Bearer ${user.token}`,
                };

                const timeout = setTimeout(() => {
                  setFirstTime(true);
                }, 1000);

                const { defaultOrgId } = await fetch("/api/default-org", {
                  headers,
                }).then((result) => result.json());

                clearTimeout(timeout);

                const orgs = await user.getOrganizations()
                
                // prefer org id in params if it's a valid org
                if (paramsOrgId && orgs.some(org => org.id === paramsOrgId)) {
                  return paramsOrgId
                }

                return defaultOrgId;
              }),
              async ({ user }) => {
                setDefaultOrgId(user?.oid);
                return user;
              },
            ]}
          />
        </div>
      </div>
    </ConfigurationProvider>
  );
};
