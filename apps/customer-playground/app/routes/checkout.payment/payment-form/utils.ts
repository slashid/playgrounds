import type { PaymentDetails } from "~/domain/user/types";

export const mapPaymentDetailsToFormFields = (
  paymentDetails: PaymentDetails
) => {
  return [
    {
      value: paymentDetails.cardHolderName,
      name: "cardHolderName",
      type: "text",
      label: "Cardholder name",
      placeholder: "Type the cardholder name",
    },
    {
      value: paymentDetails.cardNumber,
      name: "cardNumber",
      type: "text",
      label: "Card number",
      placeholder: "1234 1234 1234 1234",
      match: (value: string) => value.length <= 20,
    },
    {
      value: paymentDetails.expirationDate,
      name: "expirationDate",
      type: "text",
      label: "Expiration date",
      placeholder: "MM/YY",
      match: (value: string) => /^\d{2}\/\d{2}$/.test(value),
      fullWidth: false,
    },
    {
      value: paymentDetails.cvc,
      name: "cvc",
      type: "text",
      label: "CVC",
      placeholder: "123",
      match: (value: string) => /^\d{3}$/.test(value),
      fullWidth: false,
    },
  ];
};

export const mapFormDataToPaymentDetails = (
  formData: FormData
): PaymentDetails => {
  return {
    cardHolderName: formData.get("cardHolderName") as string,
    cardNumber: formData.get("cardNumber") as string,
    cvc: formData.get("cvc") as string,
    expirationDate: formData.get("expirationDate") as string,
  };
};
