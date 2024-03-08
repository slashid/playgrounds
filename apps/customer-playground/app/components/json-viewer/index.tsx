import React, { useEffect, useRef } from "react";
import { isFalsy } from "~/utils/utils";
import JsonView from "./json-view";

type Props = {
  json: Object | any[];
  isHighlighted?: boolean;
  animationProperties?: React.CSSProperties;
  highlightedElementClassName?: string;
};

const JsonViewer: React.FC<Props> = ({
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

export default JsonViewer;
