"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
   const user = await currentUser();
   // console.log("use details from tokenProvider", user);
   if (!user) throw new Error("User not authenticated");
   if (!apiKey) throw new Error("Stream API key is not provided");
   if (!apiSecret) throw new Error("Stream API secret is not provided");

   const client = new StreamClient(apiKey, apiSecret);

   const expirationTime = Math.floor(Date.now() / 1000) + 3600;
   const issuedAt = Math.floor(Date.now() / 1000) - 60;

   const token = client.generateUserToken({
      user_id: user.id,
      expiration: expirationTime,
      issued_at: issuedAt,
   });
   return token;
}