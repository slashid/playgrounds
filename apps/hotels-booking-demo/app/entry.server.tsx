import type { RemixServerProps } from "@remix-run/react";
import { RemixServer } from "@remix-run/react";
import { handleRequest } from "@vercel/remix";
import { initializeSentry } from "./services/sentry";
import { getToken } from "./services/session.server";
import { SlashID } from "./services/slash-id";

type EntryContext = RemixServerProps["context"];

const ABORT_DELAY = 5000;

initializeSentry();

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const token = await getToken(request);
  const remixServer = (
    <SlashID initialToken={token}>
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />
    </SlashID>
  );
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer
  );
}
