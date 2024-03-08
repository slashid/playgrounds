import { Panel, Text, ExternalLink } from "@slashid/ui";
import { attributesPanel, content, header } from "./style.css";
import { JsonTree } from "./json-tree";
import { useAtomValue } from "jotai";
import { defaultOrgIdAtom } from "../../../atoms";

export const UserAttributesPanel = () => {
  const default_org_id = useAtomValue(defaultOrgIdAtom);

  return (
    <div>
      <Text
        variant={{ size: "base", weight: "semibold", color: "foreground" }}
        className={header}
      >
        User attributes
      </Text>
      <Text variant={{ size: "sm", weight: "medium", color: "secondary" }}>
        In this demo we keep track of your personal organization using the{" "}
        <ExternalLink href="https://www.slashid.dev/products/vault/">
          <Text
            as="span"
            variant={{ size: "sm", weight: "medium", color: "contrast" }}
          >
            SlashID Data Vault
          </Text>
        </ExternalLink>
        .
      </Text>
      <Panel
        className={attributesPanel}
        variant={{ borderColor: "subtle", background: "soft" }}
        content={
          <div className={content}>
            <JsonTree
              dataId={"no_animation"}
              json={{
                ["end_user_no_access"]: {
                  default_org_id,
                },
              }}
            />
          </div>
        }
      />
    </div>
  );
};
