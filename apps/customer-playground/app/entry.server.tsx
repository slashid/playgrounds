import type { RemixServerProps } from "@remix-run/react";
import { RemixServer } from "@remix-run/react";
import { handleRequest } from "@vercel/remix";
import { initializeSentry } from "./services/sentry";

type EntryContext = RemixServerProps["context"];

const ABORT_DELAY = 5000;

initializeSentry();

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const remixServer = (
    <RemixServer
      context={remixContext}
      url={request.url}
      abortDelay={ABORT_DELAY}
    />
  );
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer
  );
}
