export const DefaultBucketName = {
  end_user_read_write: "end_user_read_write",
};

export const Action = {
  SIGN_IN: "Sign in",
  SIGN_UP: "Sign up",
  CART_ITEM_ADDED: "Shopping cart: Item added",
  CART_ITEM_UPDATED: "Shopping cart: Item updated",
  CART_ITEM_DELETED: "Shopping cart: Item deleted",
  SHIPPING_DETAILS_UPDATED: "Checkout: shipping details saved",
  PAYMENT_DETAILS_UPDATED: "Checkout: payment details saved",
  ORDER_COMPLETED: "Checkout: order completed",
  MFA_THRESHOLD_UPDATED: "MFA Threshold updated",
} as const;

export const OrderStatus = {
  IN_PREPARATION: "In preparation",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
} as const;

export const MAX_ACTION_LOG_LENGTH = 25;
export const DEFAULT_MFA_THRESHOLD = 100;
