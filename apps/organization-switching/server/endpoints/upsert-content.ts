import { FastifySchema, RouteHandlerMethod } from "fastify";
import { GroupsService } from "../../slashid";
import { ADMIN, COLLABORATOR } from "../../shared";
import { db } from "../db";

interface UpsertContentBody {
  content: string;
}

export const upsertContentSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      content: { type: "string" },
    },
  },
};

export const upsertContent: RouteHandlerMethod = async (request, reply) => {
  const { content } = request.body as UpsertContentBody;
  const user = request.user as { person_id: string; oid: string };

  const { result: groups } = await GroupsService.getPersonsPersonIdGroups(
    user.person_id,
    user.oid
  );

  if (![ADMIN, COLLABORATOR].some((group) => groups.includes(group))) {
    reply.code(403);
    return {
      message: "Insufficient permissions",
    };
  }

  try {
    await db.put(user.oid, content);

    return {
      message: "Content stored successfully",
    };
  } catch {
    reply.code(500);

    return {
      message: "Error storing content",
    };
  }
};
