import { Panel, ScrollArea, Text } from "@slashid/ui";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useOptimisticActionLogData } from "~/hooks/use-optimistic-action-log-data";
import { getTime } from "~/utils/date";
import { useHighlightingAnimation } from "../highlighting-animation/use-highlighting-animation";
import ActionItem from "./action-item";
import * as styles from "./style.css";

type Props = {};

const ActionLog: React.FC<Props> = () => {
  const actionLog = useOptimisticActionLogData();
  const highlightingAnimationConfig = useHighlightingAnimation(
    actionLog,
    "actionLog"
  );
  const actionLogRef = useRef<HTMLDivElement>(null);
  const popoverContainerRef = useRef<HTMLDivElement>(null);
  const [popoverContainerKey, setPopoverContainerKey] = useState("");

  useEffect(() => {
    if (!popoverContainerRef.current) return;
    // We need to re-render Action Items with the popover container element once the DOM is hydrated
    setPopoverContainerKey(uuid());
  }, []);

  const actionItems = useMemo(
    () => (
      <ScrollArea type="scroll">
        <div className={styles.actionItems} key={popoverContainerKey}>
          {actionLog?.map(({ id, action, timestamp }, index, { length }) => (
            <ActionItem
              key={id}
              popoverContainer={popoverContainerRef.current!}
              action={action}
              time={getTime(timestamp)}
              // Only highlight the last action
              {...(index === length - 1 && { ...highlightingAnimationConfig })}
            />
          ))}
        </div>
      </ScrollArea>
    ),
    [highlightingAnimationConfig, actionLog, popoverContainerKey]
  );

  // We need to hide the component instead of returning null to trigger the animation on the next update
  const hide = !actionLog;

  const scrollIntoLastAction = () => {
    const lasActionItem = actionLogRef.current?.querySelector(
      `.${styles.actionItem}:last-child`
    );
    lasActionItem?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
    });
  };

  useEffect(() => {
    if (hide) return;
    // Scroll to the last action when the component is initialy rendered
    scrollIntoLastAction();
  }, [hide]);

  useEffect(() => {
    if (!highlightingAnimationConfig.isHighlighted) return;
    // Scroll to the last action when an action item is highlighted
    scrollIntoLastAction();
  }, [highlightingAnimationConfig.isHighlighted]);

  return (
    <div ref={actionLogRef} hidden={hide} className={styles.actionLog}>
      <div ref={popoverContainerRef} className={styles.popoverContainer} />
      <div className={styles.header}>
        <Text
          variant={{ size: "base", weight: "semibold", color: "foreground" }}
        >
          Action log
        </Text>
        <Text variant={{ size: "sm", weight: "medium", color: "secondary" }}>
          Significant user actions
        </Text>
      </div>
      <Panel
        className={styles.panel}
        variant={{
          borderColor: "subtle",
          background: "soft",
          padding: "noPaddingLeftRight",
        }}
        content={actionItems}
      />
    </div>
  );
};

export default ActionLog;
