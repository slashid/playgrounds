import { Button, Panel, ShoppingCart, Text } from "@slashid/ui";
import { EventName, publish } from "~/hooks/use-pub-sub";
import { checkoutCTAPanel, panel } from "./style.css";

const CheckoutCTAPanel = () => {
  const handleClick = () => {
    publish(EventName.FILL_CHECKOUT_FORM);
  };

  return (
    <Panel
      className={panel}
      title="Tired of typing?"
      icon={<ShoppingCart size={14} />}
      content={
        <div className={checkoutCTAPanel}>
          <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
            In a rush? Fill the form with dummy data.
          </Text>
          <div style={{ width: "max-content" }}>
            <Button variant="primarySmall" onClick={handleClick}>
              Fill
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default CheckoutCTAPanel;
