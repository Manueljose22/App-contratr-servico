import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Dispatch } from "react";
import { Button } from "../ui/button";


interface DialogProps{
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    confirmContract: () => void;
    title: string;
    description: string

}


export const DialogComponent = ({isDialogOpen, title,description, setIsDialogOpen,confirmContract}: DialogProps) => {


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
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
