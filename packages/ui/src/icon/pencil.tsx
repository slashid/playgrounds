type Props = {
  className?: string;
};

export const Pencil: React.FC<Props> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.03233 1.50335C9.94857 0.641786 11.4341 0.641786 12.3503 1.50335L13.5945 2.67336C14.5108 3.53493 14.5108 4.9318 13.5945 5.79337L7.80295 11.2394C7.41422 11.605 6.90132 11.8305 6.35378 11.8768L3.30813 12.1339C2.72525 12.1831 2.23716 11.7242 2.2895 11.1761L2.56296 8.31212C2.61213 7.79724 2.85201 7.31495 3.24074 6.94941L9.03233 1.50335ZM10.7048 6.4827L8.29927 4.22069L4.31908 7.96341C4.18302 8.09135 4.09906 8.26015 4.08186 8.44036L3.87119 10.6466L6.2174 10.4485C6.40904 10.4323 6.58855 10.3534 6.72461 10.2254L10.7048 6.4827Z"
      fill="#142049"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.28957 15.119C2.28957 14.7141 2.63867 14.3858 3.06932 14.3858H13.5059C13.9365 14.3858 14.2856 14.7141 14.2856 15.119C14.2856 15.524 13.9365 15.8523 13.5059 15.8523H3.06932C2.63867 15.8523 2.28957 15.524 2.28957 15.119Z"
      fill="#142049"
    />
  </svg>
);
