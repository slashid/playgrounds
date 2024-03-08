import { Text } from "@slashid/ui";
import clsx from "clsx";
import * as React from "react";
import { JsonView as ReactJsonView, defaultStyles } from "react-json-view-lite";
import {
  basicChildStyle,
  container,
  expander,
  label,
  value,
} from "./style.css";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: object | any[];
  isHighlighted?: boolean;
  highlightedElementClassName?: string;
};

const JsonView: React.FC<Props> = ({
  json,
  isHighlighted = false,
  highlightedElementClassName = "",
}) => {
  return (
    <Text
      as="div"
      variant={{
        fontFamily: "sourceCodePro",
        size: "sm",
        weight: "semibold",
        color: "primary",
      }}
    >
      <ReactJsonView
        data={json}
        shouldInitiallyExpand={(level) => level < 3}
        style={{
          ...defaultStyles,
          container: clsx(container, {
            [highlightedElementClassName]: isHighlighted,
          }),
          basicChildStyle,
          expander,
          nullValue: value,
          undefinedValue: value,
          numberValue: value,
          stringValue: value,
          booleanValue: value,
          otherValue: value,
          label,
        }}
      />
    </Text>
  );
};

export default JsonView;
