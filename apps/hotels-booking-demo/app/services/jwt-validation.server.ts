import * as jose from "jose";
import { cache } from "~/utils/cache";
import { WEEK_IN_SECONDS } from "~/utils/constants";
import { getEnvValue } from "./environment-variables";
import { captureException } from "./sentry";

type Jwk = {
  alg: string;
  e: string;
  key_ops: string[];
  kid: string;
  kty: string;
  n: string;
  use: string;
};

type Jwks = {
  keys: Jwk[];
};

const BASE_API_URL = "https://api.slashid.com";

const issuer = BASE_API_URL;
const audience = getEnvValue("SLASHID_ORGANIZATION_ID");
const jwksUrl = `${issuer}/.well-known/jwks.json`;

export async function getJwks() {
  const data = await fetch(jwksUrl);
  const jwks = (await data.json()) as Jwks;

  return jwks;
}

export async function validateJwtToken(token: string) {
  let jwks: Jwks;

  if (cache.has("jwks")) {
    jwks = cache.get("jwks") as Jwks;
  } else {
    jwks = await getJwks();
    cache.set("jwks", jwks, WEEK_IN_SECONDS);
  }

  try {
    const joseJWKS = jose.createLocalJWKSet(jwks);
    const { payload } = await jose.jwtVerify(token, joseJWKS, {
      issuer,
      audience,
    });
    return !!payload;
  } catch (e) {
    captureException(e);
  }

  return false;
}
