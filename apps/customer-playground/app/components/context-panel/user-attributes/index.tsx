import { ExternalLink, Panel, Text } from "@slashid/ui";
import React from "react";
import { JsonTree } from "./json-tree";
import { content, header, panel, wrapper } from "./style.css";
import { useOptimisticUserAttributesData } from "./use-optimistic-user-attributes-data";

type Props = {};

const UserAttributes: React.FC<Props> = () => {
  const { hideComponent, userAttributes } = useOptimisticUserAttributesData();

  return (
    <div hidden={hideComponent} className={wrapper}>
      <div className={header}>
        <Text
          variant={{ size: "base", weight: "semibold", color: "foreground" }}
        >
          User attributes
        </Text>
        <Text variant={{ size: "sm", weight: "medium", color: "secondary" }}>
          Safely stored with{" "}
          <ExternalLink href="https://www.slashid.dev/products/vault/">
            <Text
              as="span"
              variant={{ size: "sm", weight: "medium", color: "contrast" }}
            >
              SlashID Data Vault
            </Text>
          </ExternalLink>
        </Text>
      </div>
      <Panel
        className={panel}
        variant={{ borderColor: "subtle", background: "soft" }}
        content={
          <div className={content}>
            {userAttributes.map(({ dataId, data }, index) => (
              <JsonTree key={index} dataId={dataId} json={{ [dataId]: data }} />
            ))}
          </div>
        }
      />
    </div>
  );
};

export default UserAttributes;
