import { PersonAttributesService, PersonHandlesService, PersonsService } from "../../slashid";
import { env } from "../env";
import { END_USER_NO_ACCESS, collaboratorGroups } from "./constants";

const { ROOT_ORG_ID } = env();

export const checkIfExistingDefaultOrg = async (request, { person_id }: { person_id: string }) => {
  const [{ result: attrs }, { result: handles }] = await Promise.all([
    PersonAttributesService.getPersonsPersonIdAttributes(
      person_id,
      ROOT_ORG_ID
    ),
    PersonHandlesService.getPersonsPersonIdHandles(person_id, ROOT_ORG_ID),
  ]);

  const defaultOrgId: string = attrs?.[END_USER_NO_ACCESS]?.default_org_id;
  if (defaultOrgId) {
    try {
      await PersonsService.getPersonsPersonId(person_id, defaultOrgId)
    } catch {
      await PersonsService.postPersons(defaultOrgId, { handles, groups: collaboratorGroups })
    }

    request.log.info(
      `Existing personal organization detected, returning (${person_id})`
    );
    return { defaultOrgId, handles };
  }

  return { handles }
}