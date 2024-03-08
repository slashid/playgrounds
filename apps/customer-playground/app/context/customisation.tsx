import {
  createContext,
  type ReactNode,
  useState,
  useCallback,
  useEffect,
} from "react";

type CustomisationValues = {
  title: string;
  subtitle: string;
  buttonText: string;
  borderRadius: string;
  primaryColor: string;
  logoURL: string;
};

type CustomisationContextType = {
  values: CustomisationValues;
  setValue: (key: keyof CustomisationValues, value: string) => void;
  reset: () => void;
};

const DEFAULT_CONTEXT_VALUES = {
  title: "Welcome to SlashID Store",
  subtitle: "Sign in to your account",
  buttonText: "Continue",
  borderRadius: "16px",
  primaryColor: "#2A6AFF",
  logoURL: "",
};

export const CustomisationContext = createContext<CustomisationContextType>({
  values: {
    title: "",
    subtitle: "",
    buttonText: "",
    borderRadius: "",
    primaryColor: "",
    logoURL: "",
  },
  setValue: () => {},
  reset: () => {},
});

type Props = {
  children: ReactNode;
};

const STORAGE_KEY = "@slashid-ui/CUSTOMISATION_VALUES";

const getStoredCustomisationValues = (): CustomisationValues | null => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return null;
    const values = JSON.parse(storedValue);
    return values;
  } catch {
    return null;
  }
};

export const CustomisationProvider = ({ children }: Props) => {
  const [values, setValues] = useState<CustomisationValues>(
    getStoredCustomisationValues() ?? {
      ...DEFAULT_CONTEXT_VALUES,
    }
  );

  const setValue = useCallback(
    (key: keyof CustomisationValues, value: string) => {
      setValues((v) => ({ ...v, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => {
    setValues({ ...DEFAULT_CONTEXT_VALUES });
  }, []);

  useEffect(() => {
    const loginWidgetRoot = document.querySelector("#form-wrapper");
    if (loginWidgetRoot) {
      // @ts-expect-error TypeScript doesn't recognize the `styles` value, although it works
      loginWidgetRoot.style.setProperty(
        "--sid-color-primary",
        values.primaryColor
      );
      // @ts-expect-error as above
      loginWidgetRoot.style.setProperty(
        "--sid-color-primary-hover",
        values.primaryColor
      );
      // @ts-expect-error as above
      loginWidgetRoot.style.setProperty(
        "--sid-button-border-radius",
        values.borderRadius
      );
    }
  }, [values]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  return (
    <CustomisationContext.Provider value={{ values, setValue, reset }}>
      {children}
    </CustomisationContext.Provider>
  );
};
