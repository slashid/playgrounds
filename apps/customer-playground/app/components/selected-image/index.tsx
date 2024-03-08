import Placeholder from "~/domain/product/images/placeholder.svg";
import type { Product } from "~/domain/product/types";
import type { CartItem } from "~/domain/user/types";
import { image, imageWrapper } from "./style.css";

type Props = {
  cartItem: CartItem;
  product: Product;
};

const SelectedImage: React.FC<Props> = ({ cartItem, product }) => {
  const src = cartItem.color.imageSrc;
  const srcSet = product.colors
    .map(({ imageSrc }) => imageSrc)
    .filter((imageSrc) => imageSrc !== src);

  return (
    <div
      className={imageWrapper}
      style={{ backgroundImage: `url(${Placeholder})` }}
    >
      <img className={image} src={src} alt={product.title} />
      {srcSet.map((img) => (
        <img hidden key={img} className={image} src={img} alt={product.title} />
      ))}
    </div>
  );
};

export default SelectedImage;
