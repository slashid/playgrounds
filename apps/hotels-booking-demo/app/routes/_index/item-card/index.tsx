import { useFetcher, useLocation, useNavigate } from "@remix-run/react";
import clsx from "clsx";
import produce from "immer";
import { useImmerReducer } from "use-immer";
import SelectedImage from "~/components/selected-image";
import { BOOK_NOW_API_PATH, UPDATE_CART_API_PATH } from "~/domain/paths";
import type { Product, Room } from "~/domain/product/types";
import { Action } from "~/domain/user/constants";
import { appendToActionLog, createCartItem } from "~/domain/user/user";
import { useOptimisticActionLogData } from "~/hooks/use-optimistic-action-log-data";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { delay, stringify } from "~/utils/utils";
import AddedItemState from "./added-item-state";
import { createInitialState, reducer } from "./reducer";
import SelectedItemState from "./selected-item-state";
import { card, boxShadow } from "./style.css";

const addedStateTransitionDuration = 300;
const hideAddedStateDelay = 4000;

interface Props {
  product: Room;
  isSelected: boolean;
  resetSelection: () => void;
}

const ItemCard: React.FC<Props> = ({ product, isSelected, resetSelection }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { submit } = useFetcher();
  const cartItems = useOptimisticCartItems();
  const actionLog = useOptimisticActionLogData();
  const [state, dispatch] = useImmerReducer(
    reducer,
    createInitialState(product)
  );

  const { room, isAdded } = state;

  const addItemToCart = () => {
    const updatedCartItems = produce(cartItems, (draftItems) => {
      const similarItemIndex = draftItems.findIndex(
        (item) =>
          item.productId === cartItem.productId &&
          item.size === cartItem.size &&
          item.color.name === cartItem.color.name
      );

      if (similarItemIndex === -1) {
        // If similar item does not exist in cart, add new item to cart
        draftItems.unshift(createCartItem(cartItem));
      } else {
        // If similar item already exists in cart, add new quantity to existing item
        draftItems[similarItemIndex].quantity += cartItem.quantity;
      }
    });

    submit(
      {
        cartItems: stringify(updatedCartItems),
        actionLog: stringify(
          appendToActionLog(actionLog, Action.CART_ITEM_ADDED)
        ),
        redirectTo: pathname,
      },
      { action: UPDATE_CART_API_PATH, method: "post" }
    );
  };

  const bookNow = async () => {
    submit(
      {
        currentBooking: stringify(product),
      },
      { action: BOOK_NOW_API_PATH, method: "post" }
    );
  };

  const handleAddToCart = async () => {
    // addItemToCart();
    resetSelection();
    dispatch({ type: "SHOW_ADDED_STATE" });
    await delay(addedStateTransitionDuration);
    // dispatch({ type: "RESET", product });
    await delay(hideAddedStateDelay - addedStateTransitionDuration);
    dispatch({ type: "HIDE_ADDED_STATE" });
  };

  return (
    <div className={clsx(card, { [boxShadow]: isSelected || isAdded })}>
      <SelectedImage product={product} />
      {/* <AddedItemState
        open={isAdded}
        transitionDuration={addedStateTransitionDuration}
      /> */}
      <SelectedItemState
        open={isSelected}
        // cartItem={room}
        // product={room}
        handleAddToCart={bookNow}
        dispatch={dispatch}
      />
    </div>
  );
};

export default ItemCard;
