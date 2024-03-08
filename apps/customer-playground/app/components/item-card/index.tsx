import { Text } from "@slashid/ui";
import Placeholder from "~/domain/product/images/placeholder.svg";
import { findProductById, formatProductPrice } from "~/domain/product/product";
import type { CartItem } from "~/domain/user/types";
import { useProducts } from "~/hooks/use-products";
import { image, imageWrapper, item, header, details } from "./style.css";

type Props = {
  cartItem: CartItem;
};

export default function ItemCard({ cartItem }: Props) {
  const products = useProducts();
  const product = findProductById(products, cartItem.productId);

  return (
    <div className={item} key={cartItem.id}>
      <div
        className={imageWrapper}
        style={{ backgroundImage: `url(${Placeholder})` }}
      >
        <img
          className={image}
          src={cartItem.color.imageSrc}
          alt={product.title}
        />
      </div>
      <div className={header}>
        <Text variant={{ size: "base", weight: "bold", color: "contrast" }}>
          {product.title}
        </Text>
        <Text
          variant={{
            size: "base",
            weight: "semibold",
            color: "secondary",
          }}
        >
          {formatProductPrice(product)}
        </Text>
      </div>
      <div className={details}>
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          Color
        </Text>
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          Size
        </Text>
        <Text variant={{ size: "sm", weight: "semibold", color: "contrast" }}>
          Quantity
        </Text>
        <Text
          variant={{
            size: "sm",
            weight: "semibold",
            color: "foreground",
          }}
        >
          {cartItem.color.name}
        </Text>
        <Text
          variant={{
            size: "sm",
            weight: "semibold",
            color: "foreground",
          }}
        >
          {cartItem.size}
        </Text>
        <Text
          variant={{
            size: "sm",
            weight: "semibold",
            color: "foreground",
          }}
        >
          {cartItem.quantity}
        </Text>
      </div>
    </div>
  );
}
