import type { BaseUser } from "@slashid/slashid";
import { SSR } from "@slashid/slashid";
import produce from "immer";
import { v4 as uuid } from "uuid";
import type {
  ActionItem,
  ActionLog,
  ActionType,
  Bucket,
  CartItem,
  CartItems,
  MfaThreshold,
  Order,
  Orders,
  PaymentDetails,
  PlaygroundEmail,
  ShippingDetails,
  Token,
  UserAttributes,
} from "~/domain/user/types";
import { getEnvValue } from "~/services/environment-variables";
import { getDate } from "~/utils/date";
import { timeEnd, timeStart } from "~/utils/log";
import { PRODUCT_CURRENCY } from "../product/constants";
import { findProductById } from "../product/product";
import type { Product } from "../product/types";
import { getPersonHandle } from "./api";
import { DefaultBucketName, MAX_ACTION_LOG_LENGTH } from "./constants";

export function createCartItem(cartItem: CartItem): CartItem {
  return produce(cartItem, (draftCartItem) => {
    draftCartItem.id = uuid();
  });
}

export function calculateSubtotal(
  cartItems: CartItems,
  products: Product[]
): number {
  return cartItems.reduce((sum, item) => {
    const product = findProductById(products, item.productId);
    return sum + product.price.amount * item.quantity;
  }, 0);
}

export function hasSubtotalGreaterThanMfaThreshold(
  cartItems: CartItems,
  products: Product[],
  mfaThreshold: MfaThreshold
) {
  return calculateSubtotal(cartItems, products) > mfaThreshold;
}

export function formatSubtotal(subtotal: number) {
  return `${PRODUCT_CURRENCY}${subtotal.toFixed(2)}`;
}

export function calculateSumOfQuantities(cartItems: CartItems): number {
  return cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
}

export function getUser(token: Token): BaseUser {
  const user = new SSR.User(token, {
    baseURL: getEnvValue("SLASHID_BASE_API_URL"),
  });
  return user;
}

export function getUserBucket(token: Token): Bucket {
  timeStart("getUserBucket");
  try {
    if (!token) throw new Error("Missing or invalid token");

    const user = getUser(token);
    const bucket = user.getBucket(DefaultBucketName.end_user_read_write);

    return bucket;
  } finally {
    timeEnd("getUserBucket");
  }
}

export async function getUserAttributes(token: Token) {
  timeStart("getUserAttributes");
  try {
    const bucket = getUserBucket(token);
    return bucket.get<UserAttributes>();
  } finally {
    timeEnd("getUserAttributes");
  }
}

export async function setUserAttributes(
  token: Token,
  attributes: UserAttributes
) {
  timeStart("setUserAttributes");
  try {
    const bucket = getUserBucket(token);
    return bucket.set(attributes);
  } finally {
    timeEnd("setUserAttributes");
  }
}

export function getCartItems(attributes: UserAttributes): CartItems {
  return (attributes?.cartItems || []) as CartItems;
}

export async function updateCartItems(
  token: Token,
  cartItems: CartItems,
  actionLog: ActionLog
) {
  return setUserAttributes(token, { cartItems, actionLog });
}

export function createActionItem(action: ActionType): ActionItem {
  return {
    action,
    id: uuid(),
    timestamp: getDate(),
  };
}

export function getActionLog(attributes: UserAttributes): ActionLog {
  const actionLog = attributes?.actionLog;

  if (!actionLog) return [];

  if (!Array.isArray(actionLog)) return [];

  return actionLog as ActionLog;
}

export function appendToActionLog(actionLog: ActionLog, action: ActionType) {
  const updatedActionLog = [
    ...(actionLog || []),
    createActionItem(action),
  ].slice(-MAX_ACTION_LOG_LENGTH);

  return updatedActionLog;
}

export async function handleLoginSuccess(
  token: Token,
  actionLog: ActionLog,
  actionType: ActionType
) {
  const updatedActionLog = appendToActionLog(actionLog, actionType);
  return setUserAttributes(token, { actionLog: updatedActionLog });
}

export function getShippingDetails(attributes: UserAttributes) {
  return attributes?.shippingDetails as ShippingDetails;
}

export function getDummyShippingDetails(): ShippingDetails {
  return {
    firstName: "Ella",
    lastName: "Taylor",
    addressLine1: "456 Oak Avenue",
    addressLine2: "Apt. 10",
    postalCode: "98765",
    city: "Springfield",
    countryOrRegion: "California",
  };
}

export function getEmptyShippingDetails(): ShippingDetails {
  return {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    countryOrRegion: "",
  };
}

export async function updateShippingDetails(
  token: Token,
  shippingDetails: ShippingDetails,
  actionLog: ActionLog
) {
  timeStart("updateShippingDetails");
  try {
    return setUserAttributes(token, { shippingDetails, actionLog });
  } finally {
    timeEnd("updateShippingDetails");
  }
}

export function getPaymentDetails(attributes: UserAttributes) {
  return attributes?.paymentDetails as PaymentDetails;
}

export function getDummyPaymentDetails(): PaymentDetails {
  return {
    cardHolderName: "Ella Taylor",
    cardNumber: "1234 5678 9012 3456",
    expirationDate: "03/23",
    cvc: "123",
  };
}

export function getDefaultPaymentDetails({
  firstName,
  lastName,
}: ShippingDetails): PaymentDetails {
  return {
    cardHolderName: `${firstName} ${lastName}`,
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  };
}

export async function updatePaymentDetails(
  token: Token,
  paymentDetails: PaymentDetails,
  actionLog: ActionLog
) {
  return setUserAttributes(token, { paymentDetails, actionLog });
}

export function createOrder(order: Order): Order {
  return produce(order, (draftOrder) => {
    draftOrder.id = uuid();
  });
}

export function getOrders(attributes: UserAttributes) {
  return attributes?.orders as Orders;
}

export function findOrderById(orders: Orders, orderId: string) {
  const order = orders.find((order) => order.id === orderId);

  if (!order) throw new Error(`Order with id ${orderId} not found`);
  return order;
}

export function formatOrderSubtotal({ currency, amount }: Order["subtotal"]) {
  return `${currency}${amount.toFixed(2)}`;
}

export async function updateOrders(
  token: Token,
  orders: Orders,
  actionLog: ActionLog
) {
  return setUserAttributes(token, { orders, cartItems: [], actionLog });
}

export function getPlaygroundEmail(attributes: UserAttributes) {
  return attributes?.playgroundEmail as PlaygroundEmail;
}

export async function getUserHandle(user?: BaseUser): Promise<string> {
  if (!user) return "";

  const handle = user.authentications
    .filter((method) => method?.handle?.type === "email_address")
    .at(-1)?.handle.value as string;

  return handle || getPersonHandle(user?.ID);
}

export function getLastAuthenticationMethod(user?: BaseUser): string {
  if (!user) return "";
  return user?.authentications.at(-1)?.method || "";
}

export function hasSingleAuthenticationOnly(token: Token): boolean {
  const user = getUser(token);
  return user.authentication.length === 1;
}

export function getOtherAuthenticationFactors(
  user?: BaseUser
): BaseUser["authentication"] {
  if (!user) return [];

  const currentFactors = [...new Set(user.authentication)];
  const availableFactors = [
    "webauthn",
    "email_link",
    "otp_via_sms",
    "oidc",
  ] as typeof currentFactors;
  const otherFactors = availableFactors.filter(
    (factor) => !currentFactors.includes(factor)
  );

  return otherFactors;
}

export async function updatePlaygroundEmail(
  token: Token,
  playgroundEmail?: PlaygroundEmail
) {
  timeStart("updatePlaygroundEmail");
  try {
    if (!playgroundEmail) return;
    return setUserAttributes(token, { playgroundEmail });
  } finally {
    timeEnd("updatePlaygroundEmail");
  }
}

export function getMfaThreshold(attributes: UserAttributes) {
  return attributes?.mfaThreshold as MfaThreshold;
}

export async function updateMfaThreshold(
  token: Token,
  mfaThreshold: MfaThreshold,
  actionLog: ActionLog
) {
  return setUserAttributes(token, { mfaThreshold, actionLog });
}
