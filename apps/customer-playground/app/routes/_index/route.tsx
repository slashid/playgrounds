import { SlashAnimation, Text } from "@slashid/ui";
import type { LoaderArgs } from "@vercel/remix";
import { json } from "@vercel/remix";
import { validateRequest } from "~/services/session.server";
import ItemList from "./item-list";
import { subHeading, wrapper } from "./style.css";

export const config = { runtime: "edge" };

export async function loader({ request }: LoaderArgs) {
  await validateRequest(request);
  return json({});
}

export default function Index() {
  return (
    <div>
      <div className={wrapper}>
        <SlashAnimation as="h1" title={"Get your Slash style"} />
      </div>
      <div className={subHeading}>
        <Text variant={{ size: "xl", weight: "semibold", color: "foreground" }}>
          Cool and Comfy — pick both.
        </Text>
      </div>
      <ItemList />
    </div>
  );
}
