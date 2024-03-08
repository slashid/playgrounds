import type { ActionArgs, LoaderArgs } from "@vercel/remix";
import { json, redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";
import { getBooleanEnvValue } from "~/services/environment-variables";
import {
  createUserSession,
  handleFailure,
  validateRequest,
} from "~/services/session.server";
import { getRedirectToFromForm } from "~/utils/utils";
import StepUpAuthFlow from "./step-up-auth-flow";
import { container, formWrapper } from "./style.css";

export const config = { runtime: "edge" };

export async function loader({ request }: LoaderArgs) {
  if (!getBooleanEnvValue("MFA_ENABLED")) return redirect(HOME_PATH);

  await validateRequest(request);
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const token = formData.get("token") as string;

  if (!token) return handleFailure(request);

  const redirectTo = getRedirectToFromForm(formData);

  return createUserSession({ request, token, redirectTo });
}

export default function MfaPage() {
  return (
    <div className={container}>
      <div className={formWrapper}>
        <StepUpAuthFlow />
      </div>
    </div>
  );
}
