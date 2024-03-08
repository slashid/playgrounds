import { useSlashID } from "@slashid/react";
import { useMemo } from "react";
import * as styles from "./style.css";
import { Panel, Text } from "@slashid/ui";

const IconImpersonation = () => (
  <svg width={16} height={16} viewBox="0 0 24 24">
    <g clipPath="url(.sid-icon-impersonate__clip-path)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        style={{
          fill: "#e6a700",
        }}
        d="M3.997 6.999v2.276c0 4.128 2.797 5.908 4.207 6.544.226.102.339.153.642.178.026.003.073.004.123.004a9.093 9.093 0 0 1-.472-2.972v-.085a2.978 2.978 0 0 1-.837-.275.75.75 0 1 1 .673-1.34c.053.026.108.05.164.07.002-1.33.029-2.04.4-2.686.117-.202.311-.455.476-.62.567-.569 1.207-.742 2.487-1.088a15.82 15.82 0 0 1 2.135-.438c-.007-.44-.036-.71-.169-.955a1.536 1.536 0 0 0-.203-.286c-.243-.265-.552-.373-1.169-.587C11.428 4.382 10.077 4 8.997 4s-2.431.382-3.457.739c-.617.214-.926.322-1.169.587-.073.08-.151.19-.203.286-.17.317-.17.673-.17 1.387Zm4 1.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2 4.524v-2.275c0-.714 0-1.07.17-1.387.053-.096.13-.206.204-.287.243-.265.552-.372 1.17-.586 1.025-.357 2.377-.74 3.456-.74 1.08 0 2.431.383 3.457.74.617.214.926.321 1.169.586.073.08.152.19.203.287.171.316.171.673.171 1.387v2.275c0 4.128-2.797 5.91-4.207 6.545-.226.101-.339.152-.642.178-.062.005-.24.005-.302 0-.303-.026-.416-.077-.642-.178-1.41-.636-4.207-2.417-4.207-6.545Zm4-.525a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3.42 2.164a.75.75 0 0 1 1.007-.334c.417.21.91.21 1.327 0a.75.75 0 0 1 .673 1.34 2.98 2.98 0 0 1-2.673 0 .75.75 0 0 1-.334-1.006Z"
      />
    </g>
    <defs>
      <clipPath className="sid-icon-impersonate__clip-path">
        <path fill="#fff" transform="translate(3.997 4)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export function ImpersonationPanel() {
  const { user } = useSlashID();
  const actClaim = useMemo(() => {
    if (!user) return null;

    const parsedToken = JSON.parse(atob(user.token.split(".")[1]));

    return parsedToken["act"];
  }, [user]);

  if (!actClaim) return null;

  return (
    <Panel
      className={styles.wrapper}
      title="Impersonation"
      icon={<IconImpersonation />}
      content={
        <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
          You are using this app in the impersonation mode.
        </Text>
      }
    />
  );
}
