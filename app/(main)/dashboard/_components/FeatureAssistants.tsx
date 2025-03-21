"use client";
import { Button } from '@/components/ui/button';
import { ExpertsList } from '@/services/Options';
import { useUser } from '@stackframe/stack';
import Image from 'next/image';


const FeatureAssistants = () => {
    const user = useUser();
  return (
    <div>
        <div className="flex justify-between items-center">
        <div>
        <h2 className="font-bold text-xl">My WorkSpace</h2>
        <h2 className="font-semibold text-2xl">Welcome back, {user?.displayName}</h2>
        </div>
        <Button>Profile</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-10">
          {ExpertsList.map((option, index) => (
            <div key={index} className="p-3 bg-secondary">
              <Image src={option.icon} alt={option.name}
               width={40} 
               height={40}
              className="h-[70px] w-[70px]"
               />
              <h3 className="font-semibold text-lg">{option.name}</h3>
            </div>

          ))}
        </div>
    </div>
  )
}

export default FeatureAssistants