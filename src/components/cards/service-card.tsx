import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { UserCircle } from "lucide-react"
import { IServicesSavedDTO } from "@/services/services/types"


interface ServiceCardProps {
  service: IServicesSavedDTO
}

export function ServiceCard({service}:ServiceCardProps ) {

  return (
    <Link href={`/prestador/${service.providerId}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full overflow-hidden bg-muted">
            <Image
              src={"/placeholder.svg"}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">{service.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{service.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <UserCircle />
            <span className="text-sm font-medium">{service.provider.user.fullname}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 pt-0">
          <div className="w-full">
            <p className="text-2xl font-bold text-primary">{new Intl.NumberFormat("AOA", {style: "currency", currency: "AOA"}).format(service.price)}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
