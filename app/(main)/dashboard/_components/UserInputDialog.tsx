
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

  

const UserInputDialog = ({children, ExpertsList}) => {
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
            <Textarea placeholder="Enter your Topic here..."/>
            </div>
            <div className="mt-4 justify-center flex">
                <Button>Submit</Button>
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