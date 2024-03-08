import JsonViewer from "~/components/json-viewer";
import { useHighlightingAnimation } from "../highlighting-animation/use-highlighting-animation";

type Props = {
  json: Object | any[];
  dataId: string;
};

export function JsonTree({ json, dataId }: Props) {
  const highlightingAnimationConfig = useHighlightingAnimation(json, dataId);

  return <JsonViewer json={json} {...highlightingAnimationConfig} />;
}
