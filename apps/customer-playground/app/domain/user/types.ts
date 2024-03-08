import type { User } from "@slashid/slashid";
import type { PRODUCT_CURRENCY } from "../product/constants";
import type { ProductColor, ProductId, ProductSize } from "../product/types";
import type { Action, OrderStatus } from "./constants";

export type Token = User["token"];

export type TokenLoaderData = {
  token: Token;
};

export type CartItem = {
  id: string;
  productId: ProductId;
  quantity: number;
  color: ProductColor;
  size: ProductSize;
};

export type CartItems = CartItem[];

export type CartItemsLoaderData = {
  cartItems: CartItems;
};

export type Bucket = ReturnType<User["getBucket"]>;

export type ActionItem = {
  id: string;
  action: ActionType;
  timestamp: string;
};

export type ActionLog = ActionItem[];

export type ActionLogLoaderData = {
  actionLog: ActionLog;
};

export type ActionType = (typeof Action)[keyof typeof Action];

export type ShippingDetails = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  countryOrRegion: string;
};

export type ShippingDetailsLoaderData = {
  shippingDetails: ShippingDetails;
};

export type PaymentDetails = {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

export type PaymentDetailsLoaderData = {
  paymentDetails: PaymentDetails;
};

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export type Order = {
  id: string;
  date: string;
  deliveryDate: string;
  status: OrderStatusType;
  subtotal: {
    amount: number;
    currency: typeof PRODUCT_CURRENCY;
  };
  cartItems: CartItems;
  shippingDetails: ShippingDetails;
};

export type Orders = Order[];

export type OrdersLoaderData = {
  orders: Orders;
};

export type OrderLoaderData = {
  order: Order;
};

export type PlaygroundEmail = string;

export type PlaygroundEmailLoaderData = {
  playgroundEmail: PlaygroundEmail;
};

export type MfaThreshold = number;

export type MfaThresholdLoaderData = {
  mfaThreshold: MfaThreshold;
};

export type UserAttributes = {
  cartItems?: CartItems;
  actionLog?: ActionLog;
  shippingDetails?: ShippingDetails;
  paymentDetails?: PaymentDetails;
  orders?: Orders;
  playgroundEmail?: PlaygroundEmail;
  mfaThreshold?: MfaThreshold;
};
