import { PersonsService, PersonAttributesService } from "../../slashid";
import { env } from "../env";
import { END_USER_NO_ACCESS, collaboratorGroups } from "./constants";

const { ROOT_ORG_ID } = env();

export const storeDefaultOrgIdInAttributes = async (request, { org, person_id, handles }) => {
  const attributes = {
    [END_USER_NO_ACCESS]: { default_org_id: org.id },
  };

  request.log.info(
    `Adding person to personal organization and storing the id in attributes (${person_id})`
  );

  await PersonsService.postPersons(org.id, { handles, groups: collaboratorGroups })

  await PersonAttributesService.putPersonsPersonIdAttributes(
    person_id,
    ROOT_ORG_ID,
    attributes
  )
}