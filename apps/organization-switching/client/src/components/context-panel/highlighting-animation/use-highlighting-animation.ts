import { useEffect, useRef, useState } from "react";
import { highlightedElement } from "./style.css";

const numberOfFrames = 5;
const frameDuration = 400;
const animationDuration = numberOfFrames * frameDuration;
const animationDelay = 400;

type HighlightingAnimationConfig = {
  isHighlighted: boolean;
  animationProperties: React.CSSProperties;
  highlightedElementClassName: string;
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringify = (value: any) => {
  return JSON.stringify(value || "");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEqual = (value: any, other: any) => {
  return stringify(value) === stringify(other);
};

/**
 * This hook is used to animate the highlighting of an element when the accociated given data changes.
 * It returns the necessary props to be passed to the element to be highlighted.
 */
export const useHighlightingAnimation = <T>(
  data: T,
  dataId: string
): HighlightingAnimationConfig => {
  const prevDataRef = useRef({ [dataId]: data });
  const [isHighlighted, setIsHighlighted] = useState(false);

  const animate = async () => {
    setIsHighlighted(true);
    // Wait for the animation to finish after the delay + the total animation duration
    await delay(animationDuration + animationDelay);
    setIsHighlighted(false);
  };

  useEffect(() => {
    if (isEqual(prevDataRef.current[dataId], data)) return;

    // Only animate if the data has changed
    animate();
    // Update the ref with the new data to prevent triggering the animation on the next render
    prevDataRef.current[dataId] = data;
  }, [data, dataId]);

  const animationProperties = {
    "--x-animation-duration": `${animationDuration}ms`,
    "--x-animation-delay": `${animationDelay}ms`,
  } as React.CSSProperties;

  return {
    isHighlighted,
    animationProperties,
    highlightedElementClassName: highlightedElement,
  };
};
