import { redirect } from "@vercel/remix";
import { HOME_PATH } from "~/domain/paths";

export const config = { runtime: "edge" };

export async function loader() {
  return redirect(HOME_PATH);
}
