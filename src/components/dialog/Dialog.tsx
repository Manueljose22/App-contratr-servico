import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dispatch } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


export interface dialogProps{
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<React.SetStateAction<boolean>>;
    setDateBooking: Dispatch<React.SetStateAction<any>>;
    dateBooking: any;
    confirmContract: () => void;
    title: string;
    description: string

}


export const DialogComponent = ({isDialogOpen, title,description, dateBooking,setDateBooking,setIsDialogOpen,confirmContract}: dialogProps) => {


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
              <Input 
                className="mb-3 mt-5"
                type="date" 
                value={dateBooking}
                required={true} 
                onChange={(e) =>  setDateBooking(e.target.value)}
               />
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmContract}>Confirmar</Button>
          </div>
        </DialogContent>
      </Dialog>
  )
}
