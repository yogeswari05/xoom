"use client"
import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import HomeCard from "./HomeCard"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import TimePicker from "./TimePicker"
import Loader from "./Loader"
import dynamic from 'next/dynamic'


const initialValues = {
   dateTime: new Date(),
   description: '',
   link: '',
};

const MeetingTypeList = () => {
   const { toast } = useToast();
   const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
   const [callDetails, setCallDetails] = useState<Call>();
   const [values, setValues] = useState(initialValues);
   const router = useRouter();
   const client = useStreamVideoClient();
   const { user } = useUser();
   
   const createMeeting = async () => {
      if (!client || !user) {
         console.error("Client or user is undefined", { client, user });
         throw new Error("Client or user not found");
      }
      try {
         if (!values.dateTime) {
            toast({ title: "Please select a date and time" })
            return;
         }
         const id = crypto.randomUUID();
         const call = client.call("default", id);
         if (!call) throw new Error("Failed to create call");

         const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
         const description = values.description || 'Instant meeting';
         
         console.log("id: ", id);
         console.log("Starts at: ", startsAt);
         console.log("description: ", description);
         await call.getOrCreate({
            data: {
               starts_at: startsAt,
               custom: {
                  description,
               }
            }
         });

         setCallDetails(call);
         if (!values.description) {
            router.push(`/meeting/${call.id}`);
         } 
         else {
            router.push('/');
         }
         toast({ title: "Meeting Created" });
      } catch (error) {
         toast({
            title: "Failed to create meeting",
         })
         console.log(error);
      }
   }
   
   const handleDateSelect = (selectedDate: Date | null) => {
      // console.log("Selected Date:", selectedDate);
      if (selectedDate) {
         setValues({
            ...values,
            dateTime: new Date(selectedDate.setHours(values.dateTime.getHours(), values.dateTime.getMinutes())),
         });
      }
   }
   const handleTimeSelect = (selectedTime: Date) => {
      // console.log("Selected Time:", selectedTime);
      setValues({
         ...values,
         dateTime: new Date(values.dateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes())),
      });
   };

   if (!client || !user) return <Loader />;

   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
   
   return (
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
         <HomeCard
            img='/icons/add-meeting.svg'
            className="bg-orange-1"
            alt=""
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={() => setMeetingState('isInstantMeeting')}
         /> 
         <HomeCard
            img='/icons/schedule.svg'
            className="bg-blue-1"
            alt=""
            title="Schedule Meeting"
            description="Plan your meeting"
            handleClick={() => setMeetingState('isScheduleMeeting')}
         /> 
         <HomeCard
            img='/icons/recordings.svg'
            className="bg-purple-1"
            alt=""
            title="View recordings"
            description="Check out your recordings"
            handleClick={() => router.push('/recordings')}
         /> 
         <HomeCard
            img='/icons/join-meeting.svg'
            className="bg-yellow-1"
            alt=""
            title="Join Meeting"
            description="via invitation link"
            handleClick={() => setMeetingState('isJoiningMeeting')}
         /> 

         {!callDetails ? (
            <MeetingModal isOpen={meetingState === 'isScheduleMeeting'} onClose={() => setMeetingState(undefined)}
            title="Create Meeting" handleClick={createMeeting}>
            <div className="flex flex-col gap-2.5">
               <label htmlFor="description" className="text-base font-normal leading-[22px] text-sky-2">Add a description</label>
               <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
               onChange={(e) => setValues({ ...values, description: e.target.value })}/>
            </div>
            <div className="flex w-full flex-col gap-2.5">
               <label className="text-base font-medium text-normal leading-[22px] text-sky-500 mb-2">Select Date and Time </label>
               <Popover>
                  <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",
                        !values.dateTime && "text-muted-foreground")}>
                     <CalendarIcon className="mr-2 h-4 w-4" />
                     {values.dateTime ? format(values.dateTime, "PPP") : <span>Pick a date</span>}
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                 <Calendar mode="single" selected={values.dateTime} onSelect={handleDateSelect} required={true} initialFocus className="bg-dark-2 text-white"/>
                  </PopoverContent>
                  <TimePicker selected={values.dateTime} onChange={handleTimeSelect} />
               </Popover>
            </div>
            </MeetingModal>
         ) : (
            <MeetingModal
               isOpen={meetingState === 'isScheduleMeeting'}
               onClose={() => setMeetingState(undefined)}
               title="Meeting Created"
               handleClick={() => {
                  navigator.clipboard.writeText(meetingLink);   
                  toast({ title: "Meeting Link copied to clipboard" });
               }}
               image={'/icons/checked.svg'}
               buttonIcon="/icons/copy.svg"
               className="text-center"
               buttonText="Copy Meeting Link"
            />
         )}

         <MeetingModal
            isOpen={meetingState === 'isInstantMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Start an instant meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
         />
         <MeetingModal
            isOpen={meetingState === 'isJoiningMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Enter the link here"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => router.push(values.link)}
         >
            <Input
               placeholder="Meeting link"
               className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
               onChange={(e) => setValues({ ...values, link: e.target.value })}
               
            />  
         </MeetingModal>
      </section>
   )
}

// export default MeetingTypeList
export default dynamic (() => Promise.resolve(MeetingTypeList), {ssr: false})
