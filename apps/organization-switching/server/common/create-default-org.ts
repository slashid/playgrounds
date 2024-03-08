import { Organization } from "@slashid/slashid";
import { OrganizationsService, PersonsService } from "../../slashid";
import { env } from "../env";

const { ROOT_ORG_ID } = env();

export const createDefaultOrg = async (request, { person_id }: { person_id: string }) => {
  let org: Organization | null = null;

  request.log.info(`Creating personal organization (${person_id})`);

  type RequestError = {
    body: Awaited<
      ReturnType<typeof OrganizationsService.postOrganizationsSuborganizations>
    >;
  };
  const { result, errors } =
    await OrganizationsService.postOrganizationsSuborganizations(
      ROOT_ORG_ID,
      "all_regions",
      120,
      {
        admins: [],
        persons_org_id: ROOT_ORG_ID,
        groups_org_id: ROOT_ORG_ID,
        sub_org_name: person_id,
      }
    ).catch((e: RequestError) => e.body);

  const nameConflict = errors?.some((error) => error.httpcode === 409);
  const consistencyTimeout = errors?.some((error) => error.httpcode === 408);

  if (result) org = result;

  if (nameConflict) {
    request.log.info(
      `Name conflict detected, trying to lookup personal organization (${person_id})`
    );

    try {
      const { result } = await PersonsService.getPersonsPersonIdOrganizations(
        person_id,
        ROOT_ORG_ID
      );

      const defaultOrg = result.find((org) => org.org_name === person_id);
      if (!defaultOrg) throw new Error();

      request.log.info(`Organization lookup success (${person_id})`);

      org = defaultOrg;
    } catch {
      request.log.info(`Organization lookup failed, exiting (${person_id})`);

      throw new Error("There was a problem creating your personal organization, please try again later")
    }
  }

  if (consistencyTimeout) {
    request.log.info(`Organization creation timeout, exiting (${person_id})`);

    throw new Error("Organization creation is taking an unusually long time, please try again later")
  }

  if (!org) {
    throw new Error("There was a problem creating your personal organization, please try again later")
  }

  return {
    org
  }
}