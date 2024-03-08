import { createCookie } from "@vercel/remix";

export const bucketCookie = createCookie("bucket", {
  maxAge: 604_800, // 1 week
});
