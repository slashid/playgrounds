import { RouteHandlerMethod } from "fastify";
import { GroupsService } from "../../slashid";
import { ADMIN, COLLABORATOR } from "../../shared";
import { db } from "../db";

export const getContent: RouteHandlerMethod = async (request, reply) => {
  const user = request!.user as { person_id: string; oid: string };

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
    const content = await db.get(user.oid, { valueEncoding: "json" });

    return {
      content,
    };
  } catch {
    return {
      content: null,
    };
  }
};
