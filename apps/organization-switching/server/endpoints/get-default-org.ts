import { RouteHandlerMethod } from "fastify";
import { checkIfExistingDefaultOrg } from "../common/check-if-existing-default-org";
import { createDefaultOrg } from "../common/create-default-org";
import { storeDefaultOrgIdInAttributes } from "../common/store-default-org-id-in-attributes";

export const getDefaultOrg: RouteHandlerMethod = async (request, reply) => {
  const { person_id } = request.user as { person_id: string };

  const { handles, defaultOrgId } = await checkIfExistingDefaultOrg(request, { person_id })

  if (defaultOrgId) return { defaultOrgId }

  if (!handles) {
    reply.code(400);
    return {
      message: "User must have at least one handle",
    };
  }

  try {
    const { org } = await createDefaultOrg(request, { person_id })

    await storeDefaultOrgIdInAttributes(request, { org, handles, person_id })
  
    return {
      defaultOrgId: org.id,
    };
  } catch (e: unknown) {
    reply.code(500)
    if (e instanceof Error) {
      return {
        message: e.message
      }
    }

    return {
      message: "There was a problem creating your default org"
    }
  }
};
