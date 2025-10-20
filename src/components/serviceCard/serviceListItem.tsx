
import Link from "next/link"
import { Card } from "../ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { IServicesSavedDTO } from "@/services/services/types"
import { Pencil, X } from "lucide-react"
import { ServiceServices } from "@/services/services/ServiceServices"




type ServiceListProps = {
  service: IServicesSavedDTO;
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
}




export const ServiceListItem = ({ service, setIsReload }: ServiceListProps) => {
  

  const handleDelete = async (id: string) => {
    await ServiceServices.delete(id);
    setIsReload(true)
  }


  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow m-0 p-0 mb-5">
      <div className="flex flex-col lg:flex-row">
        <div className="relative flex-shrink-0">
          <Image
            src={"/service.png"}
            alt={service.name}
            width={200}
            height={200}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-xl mb-2">{service.name}</h3>

              <div className="flex flex-col">
                <div className="my-2">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{service.description}</p>
                </div>
                <div className="my-2">
                  <p className="text-2xl font-bold text-primary">{new Intl.NumberFormat("AOA", { style: "currency", currency: "AOA" }).format(service.price)}</p>
                </div>
              </div>
            </div>
            <div>
              <Button title="Excluir" variant={"ghost"}>
               <Link href={`/servicos/${service.id}`}>
                   <Pencil className="text-green-500" /> 
               </Link>
              </Button>
              <Button className="cursor-pointer" title="Editar" onClick={() => handleDelete(service.id)} variant={"ghost"}>
                <X className="text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

