"use client"
import { api } from '@/convex/_generated/api';
import { TopicsList } from '@/services/Options';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function DiscussionRoom() {
    const { roomid } = useParams();
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
    const [expert, setExpert] = useState();

    useEffect(() => {
      if(DiscussionRoomData) {
        const Expert = TopicsList.find(items => items.name === DiscussionRoomData.expertName);
        console.log(Expert);
        setExpert(Expert);
      }
    }, [DiscussionRoomData])
    

  return (
    <div>
      <h2 className='text-lg font-bold'>
        {DiscussionRoomData?.topic}
      </h2>
      <div className='mt-5 grid grid-cols-1 lg:grid-cols-4 gap-10'>
      <div className='lg:col-end-3'>
        <Image src={TopicsList?.avatar} alt="Avatar" width={100} height={100} 
        className="rounded-full h-[80px] w-[80px] object-cover" />
      </div>
    </div>
    </div>
  )
}

export default DiscussionRoom