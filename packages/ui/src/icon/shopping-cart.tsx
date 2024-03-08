import { publicVariables } from "../theme/theme.css";

type Props = {
  size?: number;
};

export const ShoppingCart: React.FC<Props> = ({ size = 16 }) => {
  if (size === 14) return <ShoppingCartSize14 />;

  return <ShoppingCartSize16 />;
};

const ShoppingCartSize14 = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.7821 10.3026L12.0879 3.30263C11.9864 2.27951 11.1265 1.5 10.0984 1.5H7.00012H3.90235C2.87422 1.5 2.01358 2.27951 1.91212 3.30263L1.21792 10.3026C1.10121 11.4794 2.02556 12.5 3.20815 12.5H7.00012H10.7918C11.9744 12.5 12.8988 11.4794 12.7821 10.3026Z"
      fill={publicVariables.color.primary}
    />
    <path
      d="M12.7821 10.3026L12.0879 3.30263C11.9864 2.27951 11.1265 1.5 10.0984 1.5H7.00012H3.90235C2.87422 1.5 2.01358 2.27951 1.91212 3.30263L1.21792 10.3026C1.10121 11.4794 2.02556 12.5 3.20815 12.5H7.00012H10.7918C11.9744 12.5 12.8988 11.4794 12.7821 10.3026Z"
      fill="white"
      fillOpacity="0.48"
    />
    <path
      d="M12.7821 10.3026L12.0879 3.30263C11.9864 2.27951 11.1265 1.5 10.0984 1.5H7.00012H3.90235C2.87422 1.5 2.01358 2.27951 1.91212 3.30263L1.21792 10.3026C1.10121 11.4794 2.02556 12.5 3.20815 12.5H7.00012H10.7918C11.9744 12.5 12.8988 11.4794 12.7821 10.3026Z"
      stroke={publicVariables.color.primary}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.7821 10.3026L12.0879 3.30263C11.9864 2.27951 11.1265 1.5 10.0984 1.5H7.00012H3.90235C2.87422 1.5 2.01358 2.27951 1.91212 3.30263L1.21792 10.3026C1.10121 11.4794 2.02556 12.5 3.20815 12.5H7.00012H10.7918C11.9744 12.5 12.8988 11.4794 12.7821 10.3026Z"
      stroke="white"
      strokeOpacity="0.48"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.4001 4C9.4001 4.63652 9.14724 5.24697 8.69715 5.69706C8.24707 6.14714 7.63662 6.4 7.0001 6.4C6.36358 6.4 5.75313 6.14714 5.30304 5.69706C4.85295 5.24697 4.6001 4.63652 4.6001 4"
      stroke={publicVariables.color.primary}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.4001 4C9.4001 4.63652 9.14724 5.24697 8.69715 5.69706C8.24707 6.14714 7.63662 6.4 7.0001 6.4C6.36358 6.4 5.75313 6.14714 5.30304 5.69706C4.85295 5.24697 4.6001 4.63652 4.6001 4"
      stroke={publicVariables.color.background}
      strokeOpacity="0.8"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShoppingCartSize16 = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_725_4422)">
      <path
        d="M14.5785 11.554L13.8273 3.95404C13.7008 2.6748 12.6256 1.69995 11.3401 1.69995H8.00004H4.66041C3.37493 1.69995 2.29897 2.6748 2.17253 3.95404L1.42132 11.554C1.27594 13.0248 2.43128 14.3 3.90919 14.3H8.00004H12.0906C13.5685 14.3 14.7239 13.0248 14.5785 11.554Z"
        fill="white"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 4.5C10.75 5.21608 10.4603 5.90284 9.94454 6.40919C9.42882 6.91554 8.72935 7.2 8 7.2C7.27065 7.2 6.57118 6.91554 6.05546 6.40919C5.53973 5.90284 5.25 5.21608 5.25 4.5"
        stroke={publicVariables.color.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_725_4422">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
