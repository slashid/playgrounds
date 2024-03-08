import { Collapse, Collapsible, Expand, Button, ArrowRight } from "@slashid/ui";
import ContextPanelContent from "./context-panel-content";
import {
  collapsible,
  contextPanel,
  trigger,
  footer,
  signupCTA,
  buttonText,
} from "./style.css";
import { NavLink } from "@remix-run/react";
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
          <NavLink
            target="_blank"
            to="https://console.slashid.dev/signup"
            style={{ textDecoration: "none" }}
          >
            <Button variant="primarySmall">
              <span className={buttonText}>Go to Console</span>
              <ArrowRight />
            </Button>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
