import type { ShippingDetails } from "~/domain/user/types";

export const mapShippingDetailsToFormFields = (
  shippingDetails: ShippingDetails
) => {
  return [
    {
      value: shippingDetails.firstName,
      name: "firstName",
      type: "text",
      label: "First name",
      placeholder: "Type your first name",
      fullWidth: false,
    },
    {
      value: shippingDetails.lastName,
      name: "lastName",
      type: "text",
      label: "Last name",
      placeholder: "Type your last name",
      fullWidth: false,
    },
    {
      value: shippingDetails.addressLine1,
      name: "addressLine1",
      type: "text",
      label: "House number and street",
      placeholder: "1 Main Street",
    },
    {
      value: shippingDetails.addressLine2,
      name: "addressLine2",
      type: "text",
      label: "Apartment, suite, other",
      placeholder: "Apt. 1",
      required: false,
    },
    {
      value: shippingDetails.postalCode,
      name: "postalCode",
      type: "text",
      label: "Postal code",
      placeholder: "12345",
      fullWidth: false,
      match: (value: string) => /^\d{5}$/.test(value),
    },
    {
      value: shippingDetails.city,
      name: "city",
      type: "text",
      label: "City",
      placeholder: "Anytown",
      fullWidth: false,
    },
    {
      value: shippingDetails.countryOrRegion,
      name: "countryOrRegion",
      type: "text",
      label: "Country or region",
      placeholder: "Anycountry",
    },
  ];
};

export const mapFormDataToShippingDetails = (
  formData: FormData
): ShippingDetails => {
  return {
    addressLine1: formData.get("addressLine1") as string,
    addressLine2: formData.get("addressLine2") as string,
    city: formData.get("city") as string,
    countryOrRegion: formData.get("countryOrRegion") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    postalCode: formData.get("postalCode") as string,
  };
};
