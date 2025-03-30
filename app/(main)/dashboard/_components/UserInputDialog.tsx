
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { api } from "@/convex/_generated/api"
import { TopicsList } from "@/services/Options"
import { DialogClose } from "@radix-ui/react-dialog"
import { useMutation } from "convex/react"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"



const UserInputDialog = ({ children, ExpertsList }) => {

  const [selected, setSelected] = useState();
  const [topic, setTopic] = useState();
  const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);
  const [loading, setLoading] = useState(false);

  const onClickNext = async() => {
    setLoading(true);
    const result = await createDiscussionRoom({
      topic: topic,
      coachingOption: ExpertsList.name,
      expertName: selected
    })
    console.log(result);
    setLoading(false);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ExpertsList.name}</DialogTitle>
            <DialogDescription asChild>
              <div>
                <h2 className="font-semibold text-black">
                  Enter the Topic
                </h2>
                <div className="mt-2">
                  <Textarea placeholder="Enter your Topic here..."
                  className="mt-2" onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-black mt-4">
                    Enter Master whom you want to learn
                  </h2>
                  <div className="grid grid-cols-3 gap-6 md:grid-cols-3 mt-3">
                    {TopicsList.map((option, index) => (
                      <div key={index} onClick={() => setSelected(option.name)} className={`${selected === option.name && 'border-2'} p-1 rounded-2xl`}>
                        <Image src={option.avatar} alt={option.name}
                          width={100} height={100}
                          className="rounded-2xl h-[80px] w-[80px] object-cover hover:scale-105 transition-all" />
                        <h2 className="text-center ">
                          {option.name}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 justify-end gap-5 flex ">
                  <DialogClose asChild>
                  <Button variant={'ghost'}>Cancel</Button>
                  </DialogClose>
                 
                  <Button disabled={(!topic || !selected|| loading)} onClick={onClickNext}>
                    {loading&&<LoaderCircle className="animate-spin" />}
                    Next</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default UserInputDialog