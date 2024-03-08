const min = 0;
const max = 10000;

export const getFormFields = (value: string) => {
  return [
    {
      value,
      name: "mfaThreshold",
      type: "number",
      label: "MFA Threshold",
      showLabel: false,
      placeholder: "Threshold",
      patternMismatchMsg: `Please provide a value between ${min} and ${max}`,
      match: (value: string) => {
        const numberValue = Number(value);
        return numberValue >= min && numberValue <= max;
      },
    },
  ];
};
