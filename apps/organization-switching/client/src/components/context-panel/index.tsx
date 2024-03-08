import { ArrowRight, Button, Collapse, Collapsible, Expand } from "@slashid/ui";
import { ContextPanelContent } from "./context-panel-content";
import {
  collapsible,
  contextPanel,
  footer,
  trigger,
  signupCTA,
  buttonText,
} from "./style.css";

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
      <div className={footer}>
        <div /> {/* TODO add source code link */}
        <div className={signupCTA}>
          <a
            target="_blank"
            href="https://console.slashid.dev/signup"
            style={{ textDecoration: "none" }}
          >
            <Button variant="primarySmall">
              <span className={buttonText}>Go to Console</span>
              <ArrowRight />
            </Button>
          </a>
        </div>
      </div>
    </aside>
  );
}
