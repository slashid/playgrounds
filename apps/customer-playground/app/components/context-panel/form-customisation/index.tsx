import { Panel, Text, Input, Button } from "@slashid/ui";
import React, { useContext } from "react";
import { content, header, panel, colorPicker, wrapper } from "./style.css";
import { CustomisationContext } from "~/context/customisation";

type Props = {};

const FormCustomisation: React.FC<Props> = () => {
  const { values, setValue, reset } = useContext(CustomisationContext);
  return (
    <div className={wrapper}>
      <div className={header}>
        <Text
          variant={{ size: "base", weight: "semibold", color: "foreground" }}
        >
          Customise the Form
        </Text>
        <Text variant={{ size: "sm", weight: "medium", color: "secondary" }}>
          See how the form customisation works in real time.
        </Text>
      </div>
      <Panel
        className={panel}
        variant={{ borderColor: "subtle", background: "soft" }}
        content={
          <div className={content}>
            <Input
              id="title"
              name="title"
              label="Title"
              type="text"
              value={values.title}
              onChange={(e) => setValue("title", e.target.value)}
            />
            <Input
              id="subtitle"
              name="subtitle"
              label="Subitle"
              type="text"
              value={values.subtitle}
              onChange={(e) => setValue("subtitle", e.target.value)}
            />
            <Input
              id="buttonText"
              name="buttonText"
              label="Button text"
              type="text"
              value={values.buttonText}
              onChange={(e) => setValue("buttonText", e.target.value)}
            />
            <Input
              id="borderRadius"
              name="borderRadius"
              label="Border radius"
              type="text"
              value={values.borderRadius}
              onChange={(e) => setValue("borderRadius", e.target.value)}
            />
            <div className={colorPicker}>
              <Text
                variant={{
                  size: "xs",
                  color: "contrast",
                  weight: "bold",
                }}
              >
                Primary color
              </Text>
              <input
                type="color"
                value={values.primaryColor}
                onChange={(e) => setValue("primaryColor", e.target.value)}
              />
            </div>
            <Input
              id="logoURL"
              name="logoURL"
              label="Logo URL"
              placeholder="Provide a custom logo URL"
              type="text"
              value={values.logoURL}
              onChange={(e) => setValue("logoURL", e.target.value)}
            />
            <div style={{ maxWidth: 80 }}>
              <Button variant="primarySmall" onClick={reset}>
                Reset
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default FormCustomisation;
