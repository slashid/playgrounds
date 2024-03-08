import { FastifySchema, RouteHandlerMethod } from "fastify";
import { GroupsService, OrganizationsService, PersonFieldName, PersonHandleType, PersonsService } from "../../slashid";
import { ADMIN, COLLABORATOR } from "../../shared";
import { sendInviteEmail } from "../email/send-invite-email";
import { checkIfExistingDefaultOrg } from "../common/check-if-existing-default-org";
import { createDefaultOrg } from "../common/create-default-org";
import { storeDefaultOrgIdInAttributes } from "../common/store-default-org-id-in-attributes";
import { env } from "../env";

interface AddEditorBody {
  handle: string;
}

export const addEditorSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      handle: { type: "string" },
    },
  },
};

interface User {
  person_id: string;
  oid: string;
  authentications: {
    handle: {
      type: "email_address",
      value: string
    }
  }[]
}

const { ROOT_ORG_ID } = env()

export const addEditor: RouteHandlerMethod = async (request, reply) => {
  const { handle: value } = request.body as AddEditorBody;
  const user = request.user as User;

  const { result: groups } = await GroupsService.getPersonsPersonIdGroups(
    user.person_id,
    user.oid
  );

  if (!groups.includes(ADMIN)) {
    reply.code(403);
    return {
      message: "Only admins can add editors",
    };
  }

  const handle = {
    type: PersonHandleType.EMAIL_ADDRESS,
    value,
  };

  let invitee: string = null

  try {
    const { result: createPersonResult } = await PersonsService.postPersons(ROOT_ORG_ID, {
      handles: [handle],
      groups: [],
    });

    invitee = createPersonResult.person_id
  } catch {
    request.log.info("Person already exists on root org, moving on")
  }

  try {
    const person_id = await (async () => {
      try {
        const { result: createPersonResult } = await PersonsService.postPersons(user.oid, {
          handles: [handle],
          groups: [COLLABORATOR],
        });
    
        return createPersonResult.person_id
      } catch {
        const { result } = await PersonsService.getPersons(ROOT_ORG_ID, `email_address:${handle.value}`)
  
        return result[0].person_id
      }
    })()

    invitee = person_id

    const hours = (count: number) => 3600 * count

    const { result: directId } = await PersonsService.postPersonsPersonIdDirectId(
      person_id,
      user.oid,
      { duration_secs: hours(24) }
    )

    const { result: org } = await OrganizationsService.getOrganizations(user.oid)

    const from = await (async() => {
      const email = user.authentications.find(auth => auth?.handle?.type === "email_address")

      if (email) return email.handle.value

      try {
        request.log.info("handle missing from token, asking server")
        const { result } = await PersonsService.getPersonsPersonId(user.person_id, ROOT_ORG_ID, [PersonFieldName.HANDLES])

        return result?.handles
          .find(handle => handle.type === "email_address").value ?? "Someone"
      } catch (err) {
        request.log.info("Server-side handle lookup failed")
        request.log.info(err)

        return "Someone"
      }
    })()

    await sendInviteEmail({
      to: handle.value,
      from,
      org,
      directId
    })
  } catch (e) {
    request.log.info("Error inviting person")
    request.log.info(e)
    reply.code(400);
    return {
      message: `There was a problem inviting ${handle.value}`,
    };
  }

  /**
   * If this person is new, we create their personal org here
   * so their new user experience is the same as someone who
   * signs up via the form.
   */
  try {
    const { handles, defaultOrgId } = await checkIfExistingDefaultOrg(request, { person_id: invitee })

    if (!defaultOrgId) {
      const { org } = await createDefaultOrg(request, { person_id: invitee })

      await storeDefaultOrgIdInAttributes(request, { org, handles, person_id: invitee })
    }
  } catch (e: unknown) {
    request.log.info("Experienced issue creating invitees default org")
    request.log.info(e)
  }

  return {
    message: `${handle.value} added as editor`,
  };
};
