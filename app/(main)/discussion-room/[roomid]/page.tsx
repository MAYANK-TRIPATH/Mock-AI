"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { TopicItem, TopicsList } from '@/services/Options';
import { UserButton } from '@stackframe/stack';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function DiscussionRoom() {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
  const [expert, setExpert] = useState<TopicItem | undefined>();

  useEffect(() => {
    if (DiscussionRoomData) {
      const match = TopicsList.find(item => item.name === DiscussionRoomData.expertName);
      setExpert(match);
    }
  }, [DiscussionRoomData]);

  return (
    <div className="p-4 md:p-2 -mt-16">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
        {DiscussionRoomData?.topic || "Loading..."}
      </h2>

      <div className="flex flex-cols gap-12">
        {/* Expert Section */}
        <div className="bg-secondary border rounded-3xl flex flex-col items-center p-6 h-[70vh] w-full gap-4 shadow-md">
          <Image
            src={expert?.avatar || "/globe.svg"}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full h-[100px] w-[100px] object-cover mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-700">
            {expert?.name || "Expert Name"}
          </h3>
          <div className="mt-auto self-end">
            <div className="p-3 bg-gray-100 rounded-xl shadow-md">
              <UserButton />
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-secondary border rounded-3xl flex justify-center items-center p-6 w-[50vh] shadow-md">
          <p className="text-gray-600 text-center">
            Chat Section 
          </p>
        </div>
      </div>
      <div className='mt-5 flex items-center justify-center'>
          <Button>Connect</Button>
        </div>
    </div>
  );
}

export default DiscussionRoom;
