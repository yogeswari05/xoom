"use client"

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic'



const MeetingPage = () => {
   const { id } = useParams();
   const { user, isLoaded } = useUser();
   const [isSetupComplete, setIsSetupComplete] = useState(false);
   if (!id) return <Loader />;
   const { call, isCallLoading } = useGetCallById(id);
   if (!user) return;
   if (!isLoaded || isCallLoading) return <Loader />;

   return (
      <main className="h-screen w-full">
         <StreamCall call={call}>
            <StreamTheme>
               {!isSetupComplete ? (
                  <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
               ) : (
                  <MeetingRoom />
               )}
            </StreamTheme>
         </StreamCall>
      </main>
   )
}

// export default MeetingPage
export default dynamic (() => Promise.resolve(MeetingPage), {ssr: false})
