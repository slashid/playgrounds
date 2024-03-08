import type {
  Product,
  ProductColor,
  ProductSize,
  Room,
} from "~/domain/product/types";
import type { CartItem } from "~/domain/user/types";
import { createCartItem } from "~/domain/user/user";

export interface ItemCardState {
  isAdded: boolean;
  room: Room;
}

export const createInitialState = (
  room: Room,
  isAdded = false
): ItemCardState => ({
  isAdded,
  room: room,
});

export type Action =
  | { type: "SHOW_ADDED_STATE" }
  | { type: "HIDE_ADDED_STATE" }
  | { type: "DECREMENT_QUANTITY" }
  | { type: "INCREMENT_QUANTITY" }
  | { type: "SET_COLOR"; color: ProductColor }
  | { type: "SET_SIZE"; size: ProductSize }
  | { type: "RESET"; product: Product };

export type Dispatch = React.Dispatch<Action>;

export const reducer = (
  draft: ItemCardState,
  action: Action
): ItemCardState => {
  switch (action.type) {
    case "SHOW_ADDED_STATE": {
      draft.isAdded = true;
      return draft;
    }
    case "HIDE_ADDED_STATE": {
      draft.isAdded = false;
      return draft;
    }
    case "DECREMENT_QUANTITY": {
      draft.cartItem.quantity--;
      return draft;
    }
    case "INCREMENT_QUANTITY": {
      draft.cartItem.quantity++;
      return draft;
    }
    case "SET_COLOR": {
      draft.cartItem.color = action.color;
      return draft;
    }
    case "SET_SIZE": {
      draft.cartItem.size = action.size;
      return draft;
    }
    case "RESET": {
      return createInitialState(action.product, draft.isAdded);
    }
    default:
      throw Error("Unknown cartItem action");
  }
};
