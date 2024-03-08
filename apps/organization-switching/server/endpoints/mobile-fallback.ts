import { FastifySchema, RouteHandlerMethod } from "fastify";
import { sendMobileFallbackEmail as sendEmail } from "../email/send-mobile-fallback-email";
import { PersonsService, PersonHandle, PersonHandleType } from "../../slashid";
import { env } from "../env";
import { checkIfExistingDefaultOrg } from "../common/check-if-existing-default-org";
import { createDefaultOrg } from "../common/create-default-org";
import { storeDefaultOrgIdInAttributes } from "../common/store-default-org-id-in-attributes";

interface MobileFallbackBody {
  email: string;
}

export const sendMobileFallbackEmailSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
    },
  },
};

const { ROOT_ORG_ID } = env()

export const sendMobileFallbackEmail: RouteHandlerMethod = async (request, reply) => {
  const { email } = request.body as MobileFallbackBody;

  request.log.info("Sending mobile fallback with direct id")

  const handle: PersonHandle = {
    type: PersonHandleType.EMAIL_ADDRESS,
    value: email
  };

  const person_id: string = await (async () => {
    try {
      const { result: createPersonResult } = await PersonsService.postPersons(ROOT_ORG_ID, {
        handles: [handle],
        groups: [],
      });
  
      return createPersonResult.person_id
    } catch {
      const { result } = await PersonsService.getPersons(ROOT_ORG_ID, `email_address:${email}`)
  
      return result[0].person_id
    }
  })()

  const defaultOrgId = await (async () => {
    const { handles, defaultOrgId: existingDefaultOrgId } = await checkIfExistingDefaultOrg(request, { person_id })

    if (existingDefaultOrgId) return existingDefaultOrgId

    const { org } = await createDefaultOrg(request, { person_id })

    await storeDefaultOrgIdInAttributes(request, { org, handles, person_id })

    return org.id
  })()

  const hours = (count: number) => 3600 * count

  const { result: directId } = await PersonsService.postPersonsPersonIdDirectId(
    person_id,
    ROOT_ORG_ID,
    { duration_secs: hours(24) }
  )
  
  try {
    request.log.info(`Sending mobile fallback email to ${email} with direct id`)
    await sendEmail({
      to: email,
      directId,
      orgId: defaultOrgId
    })
  } catch (err) {
    request.log.info(err)
    reply.code(400)
    return {
      message: `Failure sending mobile fallback email to ${email}`
    }
  }

  return {
    message: `Mobile fallback email sent to ${email}`,
  };
};
