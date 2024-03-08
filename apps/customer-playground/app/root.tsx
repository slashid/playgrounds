import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { useSlashID } from "@slashid/react";
import slashIdReactStyles from "@slashid/react/style.css";
import { ThemeRoot } from "@slashid/ui";
import slashIdUiStyles from "@slashid/ui/style.css";
import type { LoaderArgs, MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { useEffect } from "react";
import { ErrorBoundary as ErrorBoundaryContent } from "./components/error-boundary";
import Layout from "./components/layout";
import MobileFallback from "./components/mobile-fallback";
import { getProducts } from "./domain/product/product";
import {
  getActionLog,
  getCartItems,
  getMfaThreshold,
  getOrders,
  getPaymentDetails,
  getPlaygroundEmail,
  getShippingDetails,
  getUserAttributes,
} from "./domain/user/user";
import { EnvironmentVariables } from "./services/environment-variables";
import { getPublicEnvVariables } from "./services/environment-variables/environment.server";
import {
  getToastMessageWithHeaders,
  getToken,
} from "./services/session.server";
import { pageview } from "./services/tracking.client";
import { body, uiTheme } from "./styles/style.css";
import { getErrorMessage } from "./utils/error";
import { isDirectIdRoute, isLoginRoute, stringify } from "./utils/utils";
import { SlashID } from "./services/slash-id";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "/id Customer Playground",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: slashIdReactStyles },
    { rel: "stylesheet", href: slashIdUiStyles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Inter:500,600,700",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Source+Code+Pro:600",
    },
  ];
}

export async function loader({ request }: LoaderArgs) {
  const env = getPublicEnvVariables();
  const { toastMessage, headers } = await getToastMessageWithHeaders(request);

  try {
    if (isDirectIdRoute(request) || isLoginRoute(request)) {
      return json(
        { toastMessage, env },
        // we need to return the headers here so that the toast message is flashed after reading it
        { headers }
      );
    }

    const token = await getToken(request);
    const attributes = await getUserAttributes(token);

    return json(
      {
        token,
        toastMessage,
        playgroundEmail: getPlaygroundEmail(attributes),
        products: getProducts(),
        cartItems: getCartItems(attributes),
        actionLog: getActionLog(attributes),
        shippingDetails: getShippingDetails(attributes),
        paymentDetails: getPaymentDetails(attributes),
        orders: getOrders(attributes),
        mfaThreshold: getMfaThreshold(attributes),
        env,
      },
      // we need to return the headers here so that the toast message is flashed after reading it
      { headers }
    );
  } catch (error) {
    throw new Error(stringify({ message: getErrorMessage(error), env }));
  }
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { token } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={body}>
        <SlashID initialToken={token}>{children}</SlashID>
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const { sid, sdkState } = useSlashID();
  const { env } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (sid && sdkState === "ready") {
      pageview(location.pathname, sid);
    }
  }, [location.pathname, sid, sdkState]);

  return (
    <RootDocument>
      <EnvironmentVariables {...env} />
      <ThemeRoot className={uiTheme}>
        <MobileFallback />
        <Layout>
          <Outlet />
        </Layout>
      </ThemeRoot>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </RootDocument>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const data = getErrorMessage(error);
  const env = data?.env || {};

  return (
    <RootDocument>
      <EnvironmentVariables {...env} />
      <ThemeRoot className={uiTheme}>
        <ErrorBoundaryContent />
      </ThemeRoot>
      <Scripts />
    </RootDocument>
  );
}
