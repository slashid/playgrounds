import { useLocation, useSubmit } from "@remix-run/react";
import { useSlashID } from "@slashid/react";
import { DropdownMenu } from "@slashid/ui";
import { LOGOUT_API_PATH } from "~/domain/paths";
import { usePlaygroundEmail } from "~/hooks/use-playground-email";
import { getBooleanEnvValue } from "~/services/environment-variables";
import { dropdown, dropdownContent } from "./style.css";

export default function UserDropdown() {
  const { logOut } = useSlashID();
  const { pathname } = useLocation();
  const submit = useSubmit();
  const playgroundEmail = usePlaygroundEmail();

  const isVerified = false;
  const isKYCEnabled = getBooleanEnvValue("KYC_ENABLED");

  const handleLogOut = () => {
    logOut();
    submit(
      { redirectTo: pathname },
      { action: LOGOUT_API_PATH, method: "post", replace: true }
    );
  };

  return (
    <div className={dropdown}>
      <DropdownMenu
        variant="short"
        label={playgroundEmail}
        contentClassName={dropdownContent}
        contentProps={{
          align: "end",
          alignOffset: 5,
          side: "bottom",
          sideOffset: 10,
        }}
        items={[
          ...(isKYCEnabled && !isVerified
            ? [{ content: "Verify identity" }]
            : []),
          { content: "Log out", onClick: handleLogOut },
        ]}
      />
    </div>
  );
}
