import type { PRODUCT_CURRENCY, PRODUCT_SIZES } from "./constants";

export type ProductId = string;

export type ProductColor = {
  name: string;
  value: string;
  imageSrc: string;
};

export type ProductSize = typeof PRODUCT_SIZES[number];

export type Product = {
  id: ProductId;
  title: string;
  stockQuantity: number;
  imageSrc: string;
  sizes: typeof PRODUCT_SIZES;
  colors: ProductColor[];
  price: {
    amount: number;
    currency: typeof PRODUCT_CURRENCY;
  };
};

export type ProductLoaderData = {
  products: Product[];
};

export type Room = {
  id: ProductId;
  name: string;
  imageSrc: string;
  price: {
    amount: number;
    currency: typeof PRODUCT_CURRENCY;
  };
};

export type Dates = {
  checkIn: string;
  checkOut: string;
};
