import { Button, Text, ToggleButton } from "@slashid/ui";
import clsx from "clsx";
import type {
  Product,
  ProductColor,
  ProductSize,
} from "~/domain/product/types";
import type { CartItem } from "~/domain/user/types";
import type { Dispatch } from "../reducer";
import { itemStateWrapper } from "../style.css";
import {
  addToCartBtn,
  colorBox,
  colorWrapper,
  quantityText,
  quantityWrapper,
  selectedWrapper,
  sizeWrapper,
} from "./style.css";

type Props = {
  cartItem: CartItem;
  product: Product;
  open: boolean;
  handleAddToCart: () => Promise<void>;
  dispatch: Dispatch;
};

const SelectedItemState: React.FC<Props> = ({
  cartItem,
  product,
  open,
  handleAddToCart,
  dispatch,
}) => {
  const { color, size, quantity } = cartItem;
  const { colors, sizes, stockQuantity } = product;
  const isQuantityIncrementDisabled = quantity >= stockQuantity;
  const isQuantityDecrementDisabled = quantity <= 1;

  const decrementQuantity = () => {
    if (isQuantityDecrementDisabled) return;
    dispatch({ type: "DECREMENT_QUANTITY" });
  };

  const incrementQuantity = () => {
    if (isQuantityIncrementDisabled) return;
    dispatch({ type: "INCREMENT_QUANTITY" });
  };

  const handleColorChange = (color: ProductColor) => {
    dispatch({ type: "SET_COLOR", color });
  };

  const handleSizeChange = (size: ProductSize) => {
    dispatch({ type: "SET_SIZE", size });
  };

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={clsx(itemStateWrapper, selectedWrapper)}
    >
      <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
        Color
      </Text>
      <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
        Size
      </Text>
      <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
        Quantity
      </Text>
      <div className={colorWrapper}>
        {colors.map((colorOption) => (
          <ToggleButton
            key={colorOption.name}
            onClick={() => handleColorChange(colorOption)}
            active={color.value === colorOption.value}
          >
            <span
              className={colorBox}
              style={{ backgroundColor: colorOption.value }}
            ></span>
          </ToggleButton>
        ))}
      </div>
      <div className={sizeWrapper}>
        {sizes.map((sizeOption) => (
          <ToggleButton
            key={sizeOption}
            onClick={() => handleSizeChange(sizeOption)}
            active={size === sizeOption}
          >
            {sizeOption}
          </ToggleButton>
        ))}
      </div>
      <div className={quantityWrapper}>
        <ToggleButton
          disabled={isQuantityDecrementDisabled}
          onClick={decrementQuantity}
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
          onClick={incrementQuantity}
        >
          +
        </ToggleButton>
      </div>
      <Button
        variant="primaryMedium"
        className={addToCartBtn}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default SelectedItemState;
