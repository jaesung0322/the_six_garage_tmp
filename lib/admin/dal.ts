import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH } from "./config";
import { getSession } from "./session";
import type { SessionPayload } from "./token";

export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session) {
    redirect(ADMIN_LOGIN_PATH);
  }
  return session;
});
