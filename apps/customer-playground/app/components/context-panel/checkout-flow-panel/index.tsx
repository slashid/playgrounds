import { Panel, ShoppingCart, Text } from "@slashid/ui";
import { panel } from "./style.css";

type Props = {
  children: React.ReactNode;
};

const CheckoutFlowPanel = ({ children }: Props) => {
  return (
    <Panel
      className={panel}
      title="Checkout flow"
      icon={<ShoppingCart size={14} />}
      content={
        <Text variant={{ size: "sm", weight: "medium", color: "contrast" }}>
          {children}
        </Text>
      }
    />
  );
};

export const HomePageCheckoutFlowPanelWithItems = () => {
  return (
    <CheckoutFlowPanel>
      Try going to the shopping cart and proceed with your checkout from there.
    </CheckoutFlowPanel>
  );
};

export const HomePageCheckoutFlowPanelWithoutItems = () => {
  return (
    <CheckoutFlowPanel>
      Try adding some items to cart by clicking on an item.
    </CheckoutFlowPanel>
  );
};

export const ShoppingCartCheckoutFlowPanelWithItems = () => {
  return <CheckoutFlowPanel>Proceed with your checkout.</CheckoutFlowPanel>;
};

export const ShoppingCartCheckoutFlowPanelWithoutItems = () => {
  return (
    <CheckoutFlowPanel>
      Your shopping cart is still empty. <br />
      Click on “Go shopping” and try adding some items to the cart.
    </CheckoutFlowPanel>
  );
};

export const ShippingCheckoutFlowPanelWithoutDetails = () => {
  return (
    <CheckoutFlowPanel>
      Customers must set up their shipping details to complete their checkout.
      Click on a field to quickly fill in all.
    </CheckoutFlowPanel>
  );
};

export const ShippingCheckoutFlowPanelWithDetails = () => {
  return (
    <CheckoutFlowPanel>
      Press “Continue” to save the shipping details. SlashID will store this
      person-bound data for you.
    </CheckoutFlowPanel>
  );
};

export const PaymentCheckoutFlowPanelWithoutDetails = () => {
  return (
    <CheckoutFlowPanel>
      Customers must set up their payment details to complete their checkout.
      Click on a field to quickly fill in all.
    </CheckoutFlowPanel>
  );
};

export const PaymentCheckoutFlowPanelWithDetails = () => {
  return (
    <CheckoutFlowPanel>
      Press “Continue” to save the payment details. SlashID will store this
      person-bound data for you.
    </CheckoutFlowPanel>
  );
};

export const SummaryCheckoutFlowPanel = () => {
  return (
    <CheckoutFlowPanel>You can now complete your purchase.</CheckoutFlowPanel>
  );
};

export const OrderCheckoutFlowPanel = () => {
  return (
    <CheckoutFlowPanel>
      Purchase completed! Continue shopping to try another flow.
    </CheckoutFlowPanel>
  );
};

export default CheckoutFlowPanel;
