import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

import { initializeSentry } from "./services/sentry";
import { SlashID } from "./services/slash-id";
import { getTokenFromSession } from "./services/session";
import { initializeGA } from "./services/tracking.client";

initializeSentry();
initializeGA();

function hydrate() {
  const storedToken = getTokenFromSession();

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <SlashID initialToken={storedToken}>
          <RemixBrowser />
        </SlashID>
      </StrictMode>
    );
  });
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
