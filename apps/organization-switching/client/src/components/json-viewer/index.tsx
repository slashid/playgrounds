import React, { useEffect, useRef } from "react";
import JsonView from "./json-view";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTruthy = (value: any) =>
  Array.isArray(value) ? value.length > 0 : !!value;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFalsy = (value: any) => !isTruthy(value);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: object | any[];
  isHighlighted?: boolean;
  animationProperties?: React.CSSProperties;
  highlightedElementClassName?: string;
};

export const JsonViewer: React.FC<Props> = ({
  json,
  isHighlighted = false,
  animationProperties = {},
  highlightedElementClassName = "",
}) => {
  const jsonViewerRef = useRef<HTMLDivElement>(null);

  // We need to hide the component instead of returning null to trigger the animation on the next update
  const hideComponent = Object.values(json).every(isFalsy);

  useEffect(() => {
    if (isHighlighted) {
      const highlightedElement = jsonViewerRef.current?.querySelector(
        `.${highlightedElementClassName}`
      );
      highlightedElement?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isHighlighted, highlightedElementClassName]);

  return (
    <div ref={jsonViewerRef} style={animationProperties} hidden={hideComponent}>
      <JsonView
        json={json}
        isHighlighted={isHighlighted}
        highlightedElementClassName={highlightedElementClassName}
      />
    </div>
  );
};
