"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { TopicItem, TopicsList } from '@/services/Options';
import { UserButton } from '@stackframe/stack';
import { useQuery } from 'convex/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

// Dynamically import RecordRTC without SSR
const RecordRTC = dynamic(() => import('recordrtc'), { ssr: false });

// Define type for RecordRTC instance
type RecorderType = InstanceType<typeof import('recordrtc')>;

function DiscussionRoom() {
  const params = useParams();
  const roomid = params?.roomid as string;

  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
  const [expert, setExpert] = useState<TopicItem | undefined>();
  const [enableMic, setEnableMic] = useState(false);
  const recorder = useRef<RecorderType | null>(null);
  let silenceTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (DiscussionRoomData) {
      const match = TopicsList.find(item => item.name === DiscussionRoomData.expertName);
      setExpert(match);
    }
  }, [DiscussionRoomData]);

  const connectToServer = async () => {
    setEnableMic(true);

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const RecordRTCInstance = (await import('recordrtc')).default;

        recorder.current = new RecordRTCInstance(stream, {
          type: 'audio',
          mimeType: 'audio/webm;codecs=pcm',
          recorderType: RecordRTCInstance.StereoAudioRecorder,
          timeSlice: 250,
          desiredSampRate: 16000,
          numberOfAudioChannels: 1,
          bufferSize: 4096,
          audioBitsPerSecond: 128000,

          ondataavailable: async (blob: Blob) => {
            clearTimeout(silenceTimeout);

            const buffer = await blob.arrayBuffer();
            // You can handle the buffer here if needed

            silenceTimeout = setTimeout(() => {
              console.log('User stopped talking');
            }, 2000);
          },
        });

        recorder.current.startRecording();
      } catch (err) {
        console.error('Microphone error:', err);
      }
    }
  };

  const disconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    recorder.current?.pauseRecording();
    recorder.current = null;
    setEnableMic(false);
  };

  return (
    <div className="p-4 md:p-2 -mt-16">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
        {DiscussionRoomData?.topic || "Loading..."}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Expert Section */}
        <div className="bg-secondary border rounded-3xl flex flex-col items-center p-6 h-[70vh] w-full lg:w-2/3 gap-4 shadow-md">
          <Image
            src={expert?.avatar || "/globe.svg"}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full h-[100px] w-[100px] object-cover mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {expert?.name || "Expert Name"}
          </h3>
          <div className="mt-auto self-end">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
              <UserButton />
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-secondary border rounded-3xl flex justify-center items-center p-6 h-[70vh] w-full lg:w-1/3 shadow-md">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Chat Section
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        {!enableMic ? (
          <Button onClick={connectToServer}>Connect</Button>
        ) : (
          <Button variant="destructive" onClick={disconnect}>
            Disconnect
          </Button>
        )}
      </div>
    </div>
  );
}

export default DiscussionRoom;
