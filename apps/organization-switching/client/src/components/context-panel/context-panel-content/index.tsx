import { ScrollArea, Text } from "@slashid/ui";
import { contentHeader, contentWrapper } from "./style.css";
import { useAtomValue } from "jotai";
import { contextPanelContentAtom } from "../../../atoms";

export const ContextPanelContent = () => {
  const content = useAtomValue(contextPanelContentAtom);

  return (
    <div className={contentWrapper}>
      <Text
        className={contentHeader}
        variant={{ size: "sm", weight: "semibold", color: "foreground" }}
      >
        Context panel
      </Text>
      <ScrollArea type="scroll">{content}</ScrollArea>
    </div>
  );
};
