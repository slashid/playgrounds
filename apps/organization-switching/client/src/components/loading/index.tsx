import { subtitle, subtitleContainer, welcome, welcomeContainer } from "./style.css"
import { Text, Spinner } from "@slashid/ui";

export const Loading = () => {
  return (
    <div className={welcomeContainer}>
      <div className={welcome}>
        <Text
          variant={{
            size: "3xl-title",
            weight: "bold",
          }}
        >
          Welcome
        </Text>
        <div className={subtitleContainer}>
          <Spinner
            variant={{
              color: "primary",
              size: "small",
            }}
          />
          <Text className={subtitle}>
            One moment while we get your notes ready...
          </Text>
        </div>
      </div>
    </div>
  )
}