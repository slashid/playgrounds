import { WEEK_IN_SECONDS } from "~/utils/constants";
import { stringify } from "~/utils/utils";

const headers = {
  "SlashID-OrgID": process.env.SLASHID_ORGANIZATION_ID || "",
  "SlashID-API-Key": process.env.SLASHID_API_KEY || "",
  "Content-Type": "application/json",
};

const personsUrl = `${process.env.SLASHID_BASE_API_URL}/persons`;

export async function getPersonHandle(personID: string) {
  const url = `${personsUrl}/${personID}/handles`;
  const options = {
    headers,
    method: "GET",
  };

  const data = await fetch(url, options);
  const { result } = await data.json();
  const emailHandle = result.find(({ type }: any) => type === "email_address");

  if (!emailHandle) {
    return result[0]?.value ?? "Handle missing";
  }

  return emailHandle.value;
}

export async function getDirectId(personID: string) {
  const url = `${personsUrl}/${personID}/direct-id`;
  const options = {
    headers,
    method: "POST",
    body: stringify({ duration_secs: WEEK_IN_SECONDS }),
  };

  const data = await fetch(url, options);
  const { result } = await data.json();

  return result;
}

export async function findPersonByHandle(handle: string) {
  const url = `${personsUrl}?handle=email_address:${handle}`;
  const options = {
    headers,
    method: "GET",
  };

  const data = await fetch(url, options);
  const { result } = await data.json();
  const person = result?.length > 0 ? result[0] : undefined;

  return person;
}

export async function createPerson(handle: string) {
  const options = {
    headers,
    method: "POST",
    body: stringify({
      active: true,
      handles: [
        {
          type: "email_address",
          value: handle,
        },
      ],
    }),
  };

  const data = await fetch(personsUrl, options);
  const { result } = await data.json();

  return result;
}
