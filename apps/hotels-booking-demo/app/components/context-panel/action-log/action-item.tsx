import { Eye, Popover, Text } from "@slashid/ui";
import clsx from "clsx";
import React from "react";
import type { ActionType } from "~/domain/user/types";
import ActionItemMessage from "./action-item-message";
import * as styles from "./style.css";

type Props = {
  action: ActionType;
  time: string;
  popoverContainer?: HTMLElement;
  isHighlighted?: boolean;
  animationProperties?: React.CSSProperties;
  highlightedElementClassName?: string;
};

const ActionItem: React.FC<Props> = ({
  action,
  time,
  popoverContainer,
  isHighlighted = false,
  animationProperties = {},
  highlightedElementClassName = "",
}) => {
  return (
    <div
      className={clsx(styles.actionItem, {
        [highlightedElementClassName]: isHighlighted,
        [styles.highlightedActionItem]: isHighlighted,
      })}
      style={animationProperties}
    >
      <Popover
        modal
        className={styles.popoverContent}
        container={popoverContainer}
        trigger={
          <div className={styles.popoverTrigger}>
            <Text
              className={styles.actionTimestamp}
              variant={{ size: "sm", weight: "medium", color: "secondary" }}
            >
              {time}
            </Text>
            <div className={styles.actionWrapper}>
              <Text
                className={styles.actionText}
                variant={{ size: "sm", weight: "semibold", color: "contrast" }}
              >
                {action}
              </Text>
              <Eye className={styles.eyeIcon} />
            </div>
          </div>
        }
      >
        <div className={styles.popoverContentWrapper}>
          <ActionItemMessage action={action} />
        </div>
      </Popover>
    </div>
  );
};

export default ActionItem;
