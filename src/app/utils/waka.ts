"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "./auth";

export interface WakaSignupResponse {
  created: boolean;
  api_key: string;
}

export async function getWaka(): Promise<WakaSignupResponse | null> {
  let key = cookies().get("waka-key");
  if (!key) {
    await createWaka();
    key = cookies().get("waka-key");
    if (!key) return null;
  } else {
    console.log("there was alr a waka key: ", key);
  }

  return JSON.parse(key.value) as WakaSignupResponse;
}

async function setWaka(resp: WakaSignupResponse) {
  console.log("setting waka key: ", resp);

  cookies().set("waka-key", JSON.stringify(resp), {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
  });

  console.log("set the waka key!", cookies().get("waka-key"));
}

const errRedir = (err: any) => redirect("/slack-error?err=" + err.toString());

async function createWaka() {
  const newSession = await getSession();
  if (!newSession) return errRedir("No session was set");

  const slackId: string = newSession.payload.sub;
  if (!slackId) return errRedir("No Slack ID in session OpenID payload");

  const slackEmail: string = newSession.payload.email;
  if (!slackEmail) return errRedir("No Slack email in session OpenID payload");

  const password = process.env.AUTH_SECRET || crypto.randomUUID();
  const signup = await fetch("https://waka.hackclub.com/signup", {
    method: "POST",
    headers: {
      Authorization: "Bearer blahaji_rulz_da_world",
    },
    body: new URLSearchParams({
      location: "America/New_York",
      username: slackId,
      email: slackEmail,
      password: password,
      password_repeat: password,
    }),
  });

  const signupResponse = await signup.json();

  console.log("created a new wakatime token: ", signupResponse);

  await setWaka(signupResponse);
}

export async function getWakaSessions(): Promise<any> {
  const waka = await getWaka();
  if (!waka) {
    const err = new Error(
      "While getting sessions, no waka session could be found or created",
    );
    console.error(err);
    throw err;
  }

  const wakaKey = waka.api_key;

  const session = await getSession();
  if (!session)
    throw new Error(
      "No Slack OAuth session found while trying to get WakaTime sessions.",
    );

  const slackId = session.payload.sub;

  const summaryRes = await fetch(
    `https://waka.hackclub.com/api/summary?from=2024-09-19&to=2024-12-30&user=${slackId}`,
    {
      headers: {
        Authorization: `Bearer blahaji_rulz_da_world`,
      },
    },
  );

  return await summaryRes.json();
}

export async function hasRecvFirstHeartbeat(): Promise<boolean> {
  try {
    const sessions = await getWakaSessions();
    return sessions && sessions.projects.length !== 0;
  } catch {
    return false;
  }
}
