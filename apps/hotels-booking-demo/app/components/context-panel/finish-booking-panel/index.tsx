import { Button, Panel, ShoppingCart, Text } from "@slashid/ui";
import { checkoutCTAPanel, panel } from "./style.css";
import { NavLink } from "@remix-run/react";

const FinishBookingPanel = () => {
  return (
    <Panel
      className={panel}
      title="Forgot something?"
      icon={<ShoppingCart size={14} />}
      content={
        <div className={checkoutCTAPanel}>
          <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
            Complete your previous booking
          </Text>
          <div style={{ width: "max-content" }}>
            <NavLink to="/checkout">
              <Button variant="primarySmall">Finish booking</Button>
            </NavLink>
          </div>
        </div>
      }
    />
  );
};

export default FinishBookingPanel;
