"use client";
import { cn } from "@/lib/utils";
import Image from "next/image"

interface HomeCardProps {
   img: string;
   className: string;
   alt: string;
   title: string;
   description: string;
   handleClick?: () => void;
}

const HomeCard = ({ img, className, alt, title, description, handleClick }: HomeCardProps) => {
   return (
      <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)}
         onClick={() => handleClick && handleClick()}>
         <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image src={`${img}`} alt={alt} width={27} height={27} />
         </div>
         <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-extralight">{title}</h1>
            <p className="text-lg">{description}</p>
         </div>
      </div>
   );
};

export default HomeCard