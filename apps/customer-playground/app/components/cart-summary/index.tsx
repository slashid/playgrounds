import { Text } from "@slashid/ui";
import clsx from "clsx";
import { formatSubtotal } from "~/domain/user/user";
import { useOptimisticCartItems } from "~/hooks/use-optimistic-cart-items";
import { useOptimisticShoppingCartSubtotal } from "~/hooks/use-optimistic-shopping-cart-subtotal";
import { isFalsy } from "~/utils/utils";
import { rightCol, summary, summaryTable } from "./style.css";

interface Props {
  header: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function CartSummary({ header, footer, className }: Props) {
  const cartItems = useOptimisticCartItems();
  const subtotal = useOptimisticShoppingCartSubtotal();

  if (isFalsy(cartItems)) return null;

  return (
    <div className={clsx(summary, className)}>
      <Text
        variant={{
          size: "xl",
          weight: "semibold",
          color: "foreground",
        }}
      >
        {header}
      </Text>
      <div className={summaryTable}>
        <Text
          variant={{
            weight: "semibold",
            color: "secondary",
          }}
        >
          Subtotal
        </Text>
        <Text
          className={rightCol}
          variant={{
            weight: "semibold",
            color: "foreground",
          }}
        >
          {formatSubtotal(subtotal)}
        </Text>
        <Text
          variant={{
            weight: "semibold",
            color: "secondary",
          }}
        >
          Taxes
        </Text>
        <Text
          className={rightCol}
          variant={{
            weight: "semibold",
            color: "foreground",
          }}
        >
          Included
        </Text>
        <Text
          variant={{
            weight: "semibold",
            color: "secondary",
          }}
        >
          Shipping
        </Text>
        <Text
          className={rightCol}
          variant={{
            weight: "semibold",
            color: "foreground",
          }}
        >
          Free
        </Text>
      </div>
      {footer}
    </div>
  );
}
