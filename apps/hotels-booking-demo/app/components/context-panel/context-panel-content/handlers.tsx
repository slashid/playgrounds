import {
  isAnyCheckoutPage,
  isCheckoutPage,
  isDirectIdPage,
  isHomePage,
  isLogin,
  isMfaPage,
  isOrderPage,
  isPaymentPage,
  isShippingPage,
  isShoppingCartPage,
  isSummaryPage,
} from "~/domain/paths";
import type { Product, Room } from "~/domain/product/types";
import type {
  CartItems,
  MfaThreshold,
  PaymentDetails,
  ShippingDetails,
} from "~/domain/user/types";
import { hasSubtotalGreaterThanMfaThreshold } from "~/domain/user/user";
import { and, not, or } from "~/utils/function";
import { isTruthy } from "~/utils/utils";
import AbandonedCartFlowPanel from "../abandoned-cart-flow-panel";
import ActionLog from "../action-log";
import CheckoutCTAPanel from "../checkout-cta-panel";
import {
  DiscountPanel,
  HomePageCheckoutFlowPanelWithItems,
  HomePageCheckoutFlowPanelWithoutItems,
  OrderCheckoutFlowPanel,
  PaymentCheckoutFlowPanelWithDetails,
  PaymentCheckoutFlowPanelWithoutDetails,
  ShippingCheckoutFlowPanelWithDetails,
  ShippingCheckoutFlowPanelWithoutDetails,
  ShoppingCartCheckoutFlowPanelWithItems,
  ShoppingCartCheckoutFlowPanelWithoutItems,
  SummaryCheckoutFlowPanel,
} from "../checkout-flow-panel";
import DirectIdPanel from "../direct-id-panel";
import LoginPanel from "../login-panel";
import {
  MfaCtaPanelWithSubtotalGreaterThanMfaThreshold,
  MfaCtaPanelWithSubtotalLessOrEqualThanMfaThreshold,
  MfaExplanationPanel,
} from "../mfa-panel";
import UserAttributes from "../user-attributes";
import WelcomePanel from "../welcome-panel";
import FinishBookingPanel from "../finish-booking-panel";

export type HandlerContext = {
  pathname: string;
  isLoggedIn: boolean;
  isLoggedInWithDirectID: boolean;
  cartItems: CartItems;
  products: Product[];
  shippingDetails: ShippingDetails;
  paymentDetails: PaymentDetails;
  currentBooking: Room;
  mfaThreshold: MfaThreshold;
  isMfaEnabled: boolean;
};

type ContentHandler = {
  id: string;
  test: (context: HandlerContext) => boolean;
  content: JSX.Element;
};

const isInLoginPage = ({ pathname }: HandlerContext) => isLogin(pathname);
const isNotInLoginPage = not(isInLoginPage);
const isInDirectIdPage = ({ pathname }: HandlerContext) =>
  isDirectIdPage(pathname);
const isNotInDirectIdPage = not(isInDirectIdPage);
const isInHomePage = ({ pathname }: HandlerContext) => isHomePage(pathname);
const isInShoppingCartPage = ({ pathname }: HandlerContext) =>
  isShoppingCartPage(pathname);
const isInAnyCheckoutPage = ({ pathname }: HandlerContext) =>
  isAnyCheckoutPage(pathname);
const isInCheckoutShippingPage = ({ pathname }: HandlerContext) =>
  isShippingPage(pathname);
const isInCheckoutPaymentPage = ({ pathname }: HandlerContext) =>
  isPaymentPage(pathname);
const isInCheckoutSummaryPage = ({ pathname }: HandlerContext) =>
  isSummaryPage(pathname);
const isInOrderPage = ({ pathname }: HandlerContext) => isOrderPage(pathname);
const isInMfaPage = ({ pathname }: HandlerContext) => isMfaPage(pathname);

const isUserLoggedIn = ({ isLoggedIn }: HandlerContext) => isLoggedIn;
const isUserLoggedInWithDirectID = ({
  isLoggedInWithDirectID,
}: HandlerContext) => isLoggedInWithDirectID;

const hasCartItems = ({ cartItems }: HandlerContext) => cartItems.length > 0;
const hasNoCartItems = not(hasCartItems);
const hasShoppingCartSubtotalGreaterThanMfaThreshold = ({
  cartItems,
  products,
  mfaThreshold,
}: HandlerContext) =>
  hasSubtotalGreaterThanMfaThreshold(cartItems, products, mfaThreshold);
const hasShoppingCartSubtotalLessOrEqualThanMfaThreshold = not(
  hasShoppingCartSubtotalGreaterThanMfaThreshold
);

const hasShippingDetails = ({ shippingDetails }: HandlerContext) =>
  isTruthy(shippingDetails);
const hasNoShippingDetails = not(hasShippingDetails);
const hasPaymentDetails = ({ paymentDetails }: HandlerContext) =>
  isTruthy(paymentDetails);
const hasNoPaymentDetails = not(hasPaymentDetails);

const hasMfaEnabled = ({ isMfaEnabled }: HandlerContext) => isMfaEnabled;

const hasCurrentBooking = ({ currentBooking }: HandlerContext) =>
  isTruthy(currentBooking);

const welcomePanelHandler: ContentHandler = {
  id: "welcome-panel",
  test: isInLoginPage,
  content: <WelcomePanel />,
};

const loginPanelHandler: ContentHandler = {
  id: "login-panel",
  test: isInLoginPage,
  content: <LoginPanel />,
};

const homePageCheckoutFlowPanelWithItemsHandler: ContentHandler = {
  id: "home-page-checkout-flow-panel",
  test: and(isInHomePage, isUserLoggedIn, hasCartItems),
  content: <HomePageCheckoutFlowPanelWithItems />,
};

const homePageCheckoutFlowPanelWithoutItemsHandler: ContentHandler = {
  id: "home-page-checkout-flow-panel",
  test: and(isInHomePage, isUserLoggedIn, hasNoCartItems),
  content: <HomePageCheckoutFlowPanelWithoutItems />,
};

const shoppingCartCheckoutFlowPanelWithItemsHandler: ContentHandler = {
  id: "shopping-cart-checkout-flow-panel",
  test: and(isInShoppingCartPage, isUserLoggedIn, hasCartItems),
  content: <ShoppingCartCheckoutFlowPanelWithItems />,
};

const shoppingCartCheckoutFlowPanelWithoutItemsHandler: ContentHandler = {
  id: "shopping-cart-checkout-flow-panel",
  test: and(isInShoppingCartPage, isUserLoggedIn, hasNoCartItems),
  content: <ShoppingCartCheckoutFlowPanelWithoutItems />,
};

const shippingCheckoutFlowPanelWithDetailsHandler: ContentHandler = {
  id: "shipping-checkout-flow-panel",
  test: and(isInCheckoutShippingPage, isUserLoggedIn, hasShippingDetails),
  content: <ShippingCheckoutFlowPanelWithDetails />,
};

const shippingCheckoutFlowPanelWithoutDetailsHandler: ContentHandler = {
  id: "shipping-checkout-flow-panel",
  test: and(isInCheckoutShippingPage, isUserLoggedIn, hasNoShippingDetails),
  content: <ShippingCheckoutFlowPanelWithoutDetails />,
};

const paymentCheckoutFlowPanelWithDetailsHandler: ContentHandler = {
  id: "payment-checkout-flow-panel",
  test: and(isInCheckoutPaymentPage, isUserLoggedIn, hasPaymentDetails),
  content: <PaymentCheckoutFlowPanelWithDetails />,
};

const paymentCheckoutFlowPanelWithoutDetailsHandler: ContentHandler = {
  id: "payment-checkout-flow-panel",
  test: and(isInCheckoutPaymentPage, isUserLoggedIn, hasNoPaymentDetails),
  content: <PaymentCheckoutFlowPanelWithoutDetails />,
};

const checkoutCTAPanelHandler: ContentHandler = {
  id: "checkout-cta-panel",
  test: or(
    // and(isInCheckoutShippingPage, isUserLoggedIn, hasNoShippingDetails),
    and(isInCheckoutPaymentPage, hasNoPaymentDetails)
  ),
  content: <CheckoutCTAPanel />,
};

const summaryCheckoutFlowPanelHandler: ContentHandler = {
  id: "summary-checkout-flow-panel",
  test: and(isInCheckoutSummaryPage, isUserLoggedIn),
  content: <SummaryCheckoutFlowPanel />,
};

const orderCheckoutFlowPanelHandler: ContentHandler = {
  id: "order-checkout-flow-panel",
  test: and(isInOrderPage, isUserLoggedIn),
  content: <OrderCheckoutFlowPanel />,
};

const abandonedCartFlowPanelHandler: ContentHandler = {
  id: "abandoned-cart-flow-panel",
  test: and(isUserLoggedIn, hasCartItems),
  content: <AbandonedCartFlowPanel />,
};

const directIdPanelHandler: ContentHandler = {
  id: "direct-id-panel",
  test: isUserLoggedInWithDirectID,
  content: <DirectIdPanel />,
};

const discountPanelHandler: ContentHandler = {
  id: "discount-panel",
  test: and(isUserLoggedIn, isInAnyCheckoutPage),
  content: <DiscountPanel />,
};

const mfaCtaPanelWithSubtotalLessOrEqualThanMfaThresholdHandler: ContentHandler =
  {
    id: "mfa-panel",
    test: and(
      or(isInHomePage, isInShoppingCartPage),
      hasMfaEnabled,
      hasCartItems,
      hasShoppingCartSubtotalLessOrEqualThanMfaThreshold
    ),
    content: <MfaCtaPanelWithSubtotalLessOrEqualThanMfaThreshold />,
  };

const mfaCtaPanelWithSubtotalGreaterThanMfaThresholdHandler: ContentHandler = {
  id: "mfa-panel",
  test: and(
    or(isInHomePage, isInShoppingCartPage),
    hasMfaEnabled,
    hasShoppingCartSubtotalGreaterThanMfaThreshold
  ),
  content: <MfaCtaPanelWithSubtotalGreaterThanMfaThreshold />,
};

const mfaExplanationPanelHandler: ContentHandler = {
  id: "mfa-panel",
  test: and(isInMfaPage, hasMfaEnabled),
  content: <MfaExplanationPanel />,
};

const actionLogHandler: ContentHandler = {
  id: "action-log",
  test: and(isNotInLoginPage, isNotInDirectIdPage),
  content: <ActionLog />,
};

const userAttributesHandler: ContentHandler = {
  id: "user-attributes",
  test: and(isNotInLoginPage, isNotInDirectIdPage),
  content: <UserAttributes />,
};

const finishBookingHandler: ContentHandler = {
  id: "finish-booking",
  test: and(isInHomePage, hasCurrentBooking),
  content: <FinishBookingPanel />,
};

// Content handlers are evaluated in order, so the first ones that return true will be used.
export const contentHandlers = [
  // welcomePanelHandler,
  // loginPanelHandler,
  // homePageCheckoutFlowPanelWithItemsHandler,
  // homePageCheckoutFlowPanelWithoutItemsHandler,
  // shoppingCartCheckoutFlowPanelWithItemsHandler,
  // shoppingCartCheckoutFlowPanelWithoutItemsHandler,
  // shippingCheckoutFlowPanelWithDetailsHandler,
  // shippingCheckoutFlowPanelWithoutDetailsHandler,
  // paymentCheckoutFlowPanelWithDetailsHandler,
  // paymentCheckoutFlowPanelWithoutDetailsHandler,
  checkoutCTAPanelHandler,
  // summaryCheckoutFlowPanelHandler,
  // orderCheckoutFlowPanelHandler,
  // abandonedCartFlowPanelHandler,
  directIdPanelHandler,
  discountPanelHandler,
  // mfaCtaPanelWithSubtotalLessOrEqualThanMfaThresholdHandler,
  // mfaCtaPanelWithSubtotalGreaterThanMfaThresholdHandler,
  // mfaExplanationPanelHandler,
  // finishBookingHandler,
  // actionLogHandler,
  userAttributesHandler,
];
