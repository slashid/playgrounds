import { PRODUCT_CURRENCY, PRODUCT_SIZES } from "./constants";
import a1 from "./images/lg/a1.png";
import a2 from "./images/lg/a2.png";
import b1 from "./images/lg/b1.png";
import b2 from "./images/lg/b2.png";
import c1 from "./images/lg/c1.png";
import d1 from "./images/lg/d1.png";
import type { Product } from "./types";

const products: Product[] = [
  {
    id: "8a890963-42fb-47f4-9b58-eeef56ad0039",
    title: "Logo T-shirt",
    stockQuantity: 10,
    imageSrc: a1,
    sizes: PRODUCT_SIZES,
    colors: [
      {
        imageSrc: a1,
        name: "Grey",
        value: "#E4E3E1",
      },
      {
        imageSrc: a2,
        name: "Blue",
        value: "#3E3E65",
      },
    ],
    price: {
      amount: 25,
      currency: PRODUCT_CURRENCY,
    },
  },
  {
    id: "8c3dce34-5018-4eb9-a13a-c5e4d46cf4f6",
    title: "Logo Hoodie",
    stockQuantity: 20,
    imageSrc: b1,
    sizes: PRODUCT_SIZES,
    colors: [
      {
        imageSrc: b1,
        name: "Blue",
        value: "#3E3E65",
      },
      {
        imageSrc: b2,
        name: "Grey",
        value: "#E4E3E1",
      },
    ],
    price: {
      amount: 60,
      currency: PRODUCT_CURRENCY,
    },
  },
  {
    id: "4b32c98a-f17c-4389-b33b-7bde18c98cef",
    title: "Slash T-shirt",
    stockQuantity: 50,
    imageSrc: c1,
    sizes: PRODUCT_SIZES,
    colors: [
      {
        imageSrc: c1,
        name: "Blue",
        value: "#2A6AFF",
      },
    ],
    price: {
      amount: 30,
      currency: PRODUCT_CURRENCY,
    },
  },
  {
    id: "b009c19c-9e82-4fd0-b6d1-bbb161c0bc3c",
    title: "Logo Light Jacket",
    stockQuantity: 25,
    imageSrc: d1,
    sizes: PRODUCT_SIZES,
    colors: [
      {
        imageSrc: d1,
        name: "Grey",
        value: "#E4E3E1",
      },
    ],
    price: {
      amount: 35,
      currency: PRODUCT_CURRENCY,
    },
  },
];

export function getProducts() {
  return products;
}

export function findProductById(products: Product[], id: string) {
  const product = products.find((product) => product.id === id);

  if (!product) throw new Error(`Product with id ${id} not found`);
  return product;
}

export function formatProductPrice({ price: { currency, amount } }: Product) {
  return `${currency}${amount.toFixed(2)}`;
}
