import * as RadixToast from "@radix-ui/react-toast";
import clsx from "clsx";
import React from "react";
import { AlertCircle } from "../icon/alert-circle";
import { Check } from "../icon/check";
import { publicVariables } from "../theme/theme.css";
import * as styles from "./toast.css";

type Props = {
  className?: string;
  type?: styles.Variants;
  title?: React.ReactNode;
  duration?: number;
};

export const Toast: React.FC<Props> = ({
  className,
  title,
  type = "success",
  duration = 3000,
}) => {
  return (
    <RadixToast.Provider swipeDirection="up">
      <RadixToast.Root
        className={clsx("sid-toast", styles.toast[type], className)}
        duration={duration}
      >
        <RadixToast.Title className={styles.title}>
          {type === "success" ? (
            <Check fill={publicVariables.color.success} />
          ) : (
            <AlertCircle />
          )}
          <div>{title}</div>
        </RadixToast.Title>
      </RadixToast.Root>
      <RadixToast.Viewport className={styles.viewport} />
    </RadixToast.Provider>
  );
};
