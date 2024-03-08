import { CheckOnly, Text } from "@slashid/ui";
import clsx from "clsx";
import { itemStateWrapper } from "../style.css";
import { addedText, addedWrapper } from "./style.css";

type Props = {
  open: boolean;
  transitionDuration: number;
};

const AddedItemState: React.FC<Props> = ({ open, transitionDuration }) => {
  const style = {
    "--x-transition-duration": `${transitionDuration}ms`,
  } as React.CSSProperties;

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={clsx(itemStateWrapper, addedWrapper)}
      style={style}
    >
      <Text
        className={addedText}
        variant={{
          size: "base",
          weight: "semibold",
          color: "foreground",
        }}
      >
        <CheckOnly />
        Added
      </Text>
    </div>
  );
};

export default AddedItemState;
