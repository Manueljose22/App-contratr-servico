"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Loader2, Mail } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { Navbar } from "@/components/layout/navbar"
import { ServiceServices } from "@/services/services/ServiceServices"
import { IServicesSavedDTO } from "@/services/services/types"
import Link from "next/link"
import { BookingsServices } from "@/services/bookings/BookingsServices"
import { DialogComponent } from "@/components/dialog/Dialog"
import { useProtectRoute } from "@/hooks/useProtectRoute"



export default function PrestadorPage() {
  const {isChecking} = useProtectRoute("CLIENT");
  const params = useParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const [providerServices, setPrividerServices] = useState<IServicesSavedDTO[]>()
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadServicesProvider = async () => {
    try {
      const result = await ServiceServices.getAllByProvider(params.id as string)
      setPrividerServices(result)

    } catch (error: any) {

    }
  }

  const handleContractService = async (serviceId: string, price: number) => {
    if (!user) {
      router.push("/login")
      return
    }

    try {
      await BookingsServices.create({
        clientId: user.userId,
        providerId: params.id as string,
        serviceId: serviceId || '',
        price: price
      })

      router.push("servicos")

    } catch (error: any) {
      if (error.message) {
        alert(error.message)
      } else {
        setIsDialogOpen(true)
      }
    }

  }

  useEffect(() => {
    loadServicesProvider()
  }, [params.id])

   if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32 shrink-0">
                <AvatarImage src={"/user.png"} alt={providerServices?.[0]?.provider.user.fullname} />
                <AvatarFallback className="text-3xl">{providerServices?.[0]?.provider.user.fullname.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{providerServices?.[0]?.provider.user.fullname}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Link href={`mailto:${providerServices?.[0]?.provider.user.email}`}>
                        <Mail className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Serviços Oferecidos</h2>
          <Separator className="mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providerServices?.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={"/service.png"}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg leading-tight">{service.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-primary">{new Intl.NumberFormat("AOA", { style: "currency", currency: "AOA" }).format(service.price)}</p>
                  <Button onClick={() => handleContractService(service.id, service.price)}>Contratar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <DialogComponent
        title={"Confirmar Contratação"}
        description={"Você está prestes a solicitar este serviço. O prestador entrará em contato para combinar os detalhes."}
        confirmContract={() => setIsDialogOpen(false)}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  )
}
