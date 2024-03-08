import { JsonViewer } from "../../json-viewer";
import { useHighlightingAnimation } from "../highlighting-animation/use-highlighting-animation";

type Props = {
  json: object | unknown[];
  dataId: string;
};

export function JsonTree({ json, dataId }: Props) {
  const highlightingAnimationConfig = useHighlightingAnimation(json, dataId);

  return <JsonViewer json={json} {...highlightingAnimationConfig} />;
}
