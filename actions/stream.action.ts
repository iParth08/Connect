"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User not found or not logged in");
  if (!apiKey) throw new Error("STREAM API KEY MISSING");
  if (!apiSecret) throw new Error("STREAM API SECRET MISSING");

  const streamClient = new StreamClient(apiKey, apiSecret);

  const expiresAt = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issuedAt = Math.floor(new Date().getTime() / 1000) - 60;

  const token = streamClient.generateUserToken({
    user_id: user.id,
    validity_in_seconds: expiresAt - issuedAt,
  });

  return token;
};
