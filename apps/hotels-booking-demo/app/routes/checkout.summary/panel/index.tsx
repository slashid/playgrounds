import { Pencil } from "@slashid/ui";
import clsx from "clsx";
import NavLink from "~/components/navlink";
import { CART_PATH, PAYMENT_PATH, SHIPPING_PATH } from "~/domain/paths";
import { link, panel } from "./style.css";

const pathnames = [CART_PATH, SHIPPING_PATH, PAYMENT_PATH] as const;
type Pathname = (typeof pathnames)[number];

type Props = {
  className?: string;
  pathname: Pathname;
  children: React.ReactNode;
};

const Panel: React.FC<Props> = ({ className, pathname, children }) => {
  return (
    <div className={clsx(panel, className)}>
      <div>{children}</div>
      <div>
        <NavLink to={pathname} prefetch="intent" className={link}>
          <Pencil />
        </NavLink>
      </div>
    </div>
  );
};

export default Panel;
