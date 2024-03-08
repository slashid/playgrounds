import * as RadixForm from "@radix-ui/react-form";
import { clsx } from "clsx";
import React from "react";
import { Text } from "../text";
import * as styles from "./form.css";

type Field = {
  value: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  showLabel?: boolean;
  valueMissingMsg?: string;
  patternMismatchMsg?: string;
  fullWidth?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  match?: (value: string) => boolean;
};

type Props = {
  fields: Field[];
  submitButton: React.ReactNode;
  backButton?: React.ReactNode;
  className?: string;
  footerClassName?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onClearServerErrors?: () => void;
  onFieldValueChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
};

export const Form: React.FC<Props> = ({
  fields,
  submitButton,
  backButton,
  className,
  footerClassName,
  onSubmit,
  onClearServerErrors,
  onFieldValueChange,
}) => {
  // if (!fields.length) return null;

  return (
    <RadixForm.Root
      className={clsx("sid-form", className)}
      onSubmit={onSubmit}
      onClearServerErrors={onClearServerErrors}
    >
      <div className={styles.formGroup}>
        {fields.map(
          ({
            value,
            name,
            type,
            placeholder,
            label,
            showLabel = true,
            valueMissingMsg,
            patternMismatchMsg,
            fullWidth = true,
            required = true,
            match = () => true,
          }) => (
            <RadixForm.Field
              key={name}
              name={name}
              className={styles.field}
              style={{ gridColumn: fullWidth ? "1/span 2" : "auto" }}
            >
              <div className={styles.fieldWrapper}>
                {showLabel && (
                  <RadixForm.Label>
                    <Text
                      variant={{
                        size: "xs",
                        weight: "semibold",
                        color: "contrast",
                      }}
                    >
                      {label}
                    </Text>
                  </RadixForm.Label>
                )}
                <Text
                  variant={{
                    weight: "semibold",
                    color: "foreground",
                  }}
                >
                  <RadixForm.Control asChild>
                    <input
                      className={styles.input}
                      value={value}
                      placeholder={placeholder}
                      type={type}
                      required={required}
                      onChange={(event) => onFieldValueChange?.(event, name)}
                    />
                  </RadixForm.Control>
                </Text>
              </div>
              <RadixForm.Message match="valueMissing">
                <Text
                  variant={{
                    weight: "semibold",
                    color: "error",
                  }}
                >
                  {valueMissingMsg ||
                    `Please enter your ${label.toLowerCase()}`}
                  .
                </Text>
              </RadixForm.Message>
              <RadixForm.Message match="typeMismatch">
                <Text
                  variant={{
                    weight: "semibold",
                    color: "error",
                  }}
                >
                  Please provide a valid {label.toLowerCase()}.
                </Text>
              </RadixForm.Message>
              <RadixForm.Message match={(value) => !match(value)}>
                <Text
                  variant={{
                    weight: "semibold",
                    color: "error",
                  }}
                >
                  {patternMismatchMsg ||
                    `Please provide a valid ${label.toLowerCase()}`}
                  .
                </Text>
              </RadixForm.Message>
            </RadixForm.Field>
          )
        )}
      </div>
      <div className={footerClassName}>
        {backButton}
        <RadixForm.Submit className={styles.submitButton}>
          {submitButton}
        </RadixForm.Submit>
      </div>
    </RadixForm.Root>
  );
};
