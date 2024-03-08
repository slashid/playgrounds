import { FastifyInstance } from "fastify";

const now = () => Date.now();

export const configureLogging = (fastify: FastifyInstance) => {
  fastify.addHook("onRequest", (req, reply, done) => {
    (reply as unknown as { startTime: number }).startTime = now();
    req.log.info({ url: req.raw.url, id: req.id }, "received request");
    done();
  });

  fastify.addHook("onResponse", (req, reply, done) => {
    req.log.info(
      {
        url: req.raw.url,
        statusCode: reply.raw.statusCode,
        durationMs:
          now() - (reply as unknown as { startTime: number }).startTime,
      },
      "request completed"
    );
    done();
  });
};
