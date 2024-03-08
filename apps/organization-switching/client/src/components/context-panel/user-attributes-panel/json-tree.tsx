import { JsonViewer } from "../../json-viewer";
import { useHighlightingAnimation } from "../highlighting-animation/use-highlighting-animation";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: object | any[];
  dataId: string;
};

export function JsonTree({ json, dataId }: Props) {
  const highlightingAnimationConfig = useHighlightingAnimation(json, dataId);

  const animation =
    dataId === "no_animation" ? {} : highlightingAnimationConfig;

  return <JsonViewer json={json} {...animation} />;
}
