"use client";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
   const { user, isLoaded } = useUser(); // clerk can give the current user 

   useEffect(() => {
      const setupVideoClient = async () => {
         if (!isLoaded || !user) return;

         if (!apiKey) throw new Error('Stream API key is missing');
         if (!tokenProvider) throw new Error('Token provider is missing');

         const client = new StreamVideoClient({
            apiKey,
            user, // the user id from clerk
            tokenProvider, // the imported tokenProvider
         });
         // console.log(client.)
         setVideoClient(client); // updating the state

      };

      setupVideoClient().catch((error) => {
         console.error('Error setting up video client:', error);
      });
   }, [user, isLoaded]);  
   
   if (!videoClient) return <Loader />;

   return (
      <StreamVideo client={videoClient}>
         {children}
      </StreamVideo>
   );
};

export default StreamVideoProvider;