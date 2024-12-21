import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = (type: 'ended' | 'upcoming' | 'recordings') => {
   const [calls, setCalls] = useState<Call[]>([])
   const [isLoading, setIsLoading] = useState(false);
   const client = useStreamVideoClient();
   const { user } = useUser();
   useEffect(() => {
      const loadCalls = async () => {
         if (!client || !user?.id) return;
         setIsLoading(true);
         try {
            const { calls } = await client.queryCalls({
               sort: [{ field: 'starts_at', direction: -1 }],
               limit: 100,
               watch: true,
               filter_conditions: {
                  starts_at: { $exists: true },
                  $or: [
                     { created_by_user_id: user.id },
                     { members: { $in: [user.id]}}
                  ]
               }
            });
            setCalls(calls);
         } catch (error) {
            console.log(error);
         } finally {
            setIsLoading(false);
         }
      }
      loadCalls();
      // console.log(`${calls.length} calls............: `, calls);
   }, [client, user?.id]);

   const now = new Date();
   const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
      return (startsAt && new Date(startsAt) < now || !!endedAt);
   })
   const upcomingCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
      return (startsAt && new Date(startsAt) > now);
   })
   
   // console.log('Upcoming calls: ', upcomingCalls);
   // console.log('Ended calls: ', endedCalls);
   console.log('Calls............: ', calls);

   return {
      endedCalls,
      upcomingCalls,
      callRecordings: calls,
      isLoading,
   }
}