import { Panel, Text } from "@slashid/ui";
import { useMemo } from "react";
import { JsonTree } from "./json-tree";
import { content, header, panel, wrapper } from "./style.css";
import { useSlashID } from "@slashid/react";

const JWTToken = () => {
  const { user } = useSlashID();

  const parsedToken = useMemo(() => {
    if (!user) return {};
    return JSON.parse(atob(user.token.split(".")[1]));
  }, [user]);

  return (
    <div hidden={!user} className={wrapper}>
      <div className={header}>
        <Text
          variant={{ size: "base", weight: "semibold", color: "foreground" }}
        >
          JWT token
        </Text>
        <Text variant={{ size: "sm", weight: "medium", color: "secondary" }}>
          Inspect your user token
        </Text>
      </div>
      <Panel
        className={panel}
        variant={{ borderColor: "subtle", background: "soft" }}
        content={
          <div className={content}>
            <JsonTree dataId={"token"} json={{ token: parsedToken }} />
          </div>
        }
      />
    </div>
  );
};

export default JWTToken;
