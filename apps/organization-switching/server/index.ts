import Fastify from "fastify";
import { OpenAPI } from "../slashid";
import { join } from "path";
import fastifyStatic from "@fastify/static";
import { createAuthenticateHook } from "./auth";
import { env } from "./env";
import { createGroups } from "./groups";
import { getDefaultOrg } from "./endpoints/get-default-org";
import { addEditor, addEditorSchema } from "./endpoints/add-editor";
import { upsertContent, upsertContentSchema } from "./endpoints/upsert-content";
import { getContent } from "./endpoints/get-content";
import { createOrg } from "./endpoints/create-org";
import { configureLogging } from "./logging";
import { sendMobileFallbackEmail, sendMobileFallbackEmailSchema } from "./endpoints/mobile-fallback";

const { ROOT_API_KEY, PORT } = env();
const root = join(__dirname, "../client/dist");
const app = Fastify({
  disableRequestLogging: true,
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        singleLine: true,
      },
    },
  },
});

configureLogging(app);

OpenAPI.HEADERS = {
  "SlashID-API-Key": ROOT_API_KEY,
};

const { authenticate } = createAuthenticateHook(app);
app.register(fastifyStatic, { root });
app.post("/api/org", { onRequest: [authenticate] }, createOrg);
app.get("/api/default-org", { onRequest: [authenticate] }, getDefaultOrg);
app.post(
  "/api/editor",
  { onRequest: [authenticate], schema: addEditorSchema },
  addEditor
);
app.put(
  "/api/content",
  { onRequest: [authenticate], schema: upsertContentSchema },
  upsertContent
);
app.get("/api/content", { onRequest: [authenticate] }, getContent);
app.post(
  "/api/fallback",
  { schema: sendMobileFallbackEmailSchema },
  sendMobileFallbackEmail
)

app.setNotFoundHandler((request, reply) => {
  const url = request.raw.url
  if (url !== undefined && url.startsWith('/api')) {
      throw Fastify.errorCodes.FST_ERR_NOT_FOUND()
  } else {
      void reply.sendFile('index.html')
  }
})

const start = async () => {
  try {
    await createGroups();
    await app.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
