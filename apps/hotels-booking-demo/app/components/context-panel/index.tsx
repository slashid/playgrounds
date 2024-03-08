import { Collapse, Collapsible, Expand } from "@slashid/ui";
import ContextPanelContent from "./context-panel-content";
import { collapsible, contextPanel, trigger } from "./style.css";

export default function ContextPanel() {
  return (
    <aside className={contextPanel}>
      <Collapsible
        variant="horizontal"
        className={collapsible}
        triggerClassName={trigger}
        defaultOpen={true}
        content={<ContextPanelContent />}
        triggerLeft={<Expand />}
        triggerRight={<Collapse />}
      />
    </aside>
  );
}
