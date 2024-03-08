import { useLocation, useSubmit } from "@remix-run/react";
import { Close, Text, ToggleButton } from "@slashid/ui";
import produce from "immer";
import debounce from "lodash.debounce";
import SelectedImage from "~/components/selected-image";
import { UPDATE_CART_API_PATH } from "~/domain/paths";
import { findProductById, formatProductPrice } from "~/domain/product/product";
import { Action } from "~/domain/user/constants";
import type { CartItem, CartItems } from "~/domain/user/types";
import { appendToActionLog } from "~/domain/user/user";
import { useOptimisticActionLogData } from "~/hooks/use-optimistic-action-log-data";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useProducts } from "~/hooks/use-products";
import { stringify } from "~/utils/utils";
import {
  card,
  colorBox,
  deleteBtn,
  itemCardFooter,
  price,
  quantityText,
  quantityWrapper,
  title,
  toggleWrapper,
} from "./style.css";

const CartItemActionTypes = [
  Action.CART_ITEM_UPDATED,
  Action.CART_ITEM_DELETED,
] as const;

type CartItemActionType = (typeof CartItemActionTypes)[number];

interface Props {
  cartItem: CartItem;
}

const ItemCard: React.FC<Props> = ({ cartItem }) => {
  // we had to use useSubmit here because useFetcher was not working for deleteItem
  const submit = useSubmit();
  const products = useProducts();
  const cartItems = useOptimisticCartItems();
  const actionLog = useOptimisticActionLogData();
  const { pathname } = useLocation();

  const { productId, quantity } = cartItem;
  const product = findProductById(products, productId);
  const isQuantityIncrementDisabled = quantity >= product.stockQuantity;
  const isQuantityDecrementDisabled = quantity === 1;

  const submitCartItems = (
    updatedCartItems: CartItems,
    action: CartItemActionType = Action.CART_ITEM_UPDATED
  ) => {
    submit(
      {
        cartItems: stringify(updatedCartItems),
        actionLog: stringify(appendToActionLog(actionLog, action)),
        redirectTo: pathname,
      },
      { action: UPDATE_CART_API_PATH, method: "post" }
    );
  };

  const updateCartItem = (cartItem: CartItem) => {
    const updatedCartItems = produce(cartItems, (draftItems) => {
      const index = draftItems.findIndex((item) => item.id === cartItem.id);
      if (index !== -1) draftItems[index] = cartItem;
    });

    submitCartItems(updatedCartItems);
  };

  const deleteItem = () => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== cartItem.id
    );

    submitCartItems(updatedCartItems, Action.CART_ITEM_DELETED);
  };

  const handleDecrementQuantity = debounce(() => {
    if (isQuantityDecrementDisabled) return;

    updateCartItem({ ...cartItem, quantity: quantity - 1 });
  }, 50);

  const handleIncrementQuantity = debounce(() => {
    if (isQuantityIncrementDisabled) return;

    updateCartItem({ ...cartItem, quantity: quantity + 1 });
  }, 50);

  return (
    <div>
      <div className={card}>
        <ToggleButton className={deleteBtn} onClick={deleteItem}>
          <Close />
        </ToggleButton>
        <SelectedImage cartItem={cartItem} product={product} />
      </div>
      <div className={itemCardFooter}>
        <Text
          className={title}
          variant={{ size: "base", weight: "bold", color: "contrast" }}
        >
          {product.title}
        </Text>
        <Text
          className={price}
          variant={{
            size: "base",
            weight: "semibold",
            color: "secondary",
          }}
        >
          {formatProductPrice(product)}
        </Text>
        <div className={toggleWrapper}>
          <ToggleButton readOnly disabled>
            <span
              className={colorBox}
              style={{ backgroundColor: cartItem.color.value }}
            />
          </ToggleButton>
          <ToggleButton readOnly disabled>
            <Text
              variant={{
                weight: "semibold",
                color: "foreground",
              }}
            >
              {cartItem.size}
            </Text>
          </ToggleButton>
        </div>
        <div className={quantityWrapper}>
          <ToggleButton
            disabled={isQuantityDecrementDisabled}
            onClick={handleDecrementQuantity}
          >
            -
          </ToggleButton>
          <Text
            className={quantityText}
            variant={{
              size: "base",
              weight: "semibold",
              color: "foreground",
            }}
          >
            {quantity}
          </Text>
          <ToggleButton
            disabled={isQuantityIncrementDisabled}
            onClick={handleIncrementQuantity}
          >
            +
          </ToggleButton>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
