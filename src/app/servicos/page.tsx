"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Search } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { ServiceServices } from "@/services/services/ServiceServices"
import { IServicesSavedDTO } from "@/services/services/types"
import { ServiceCard } from "@/components/cards/service-card"
import { useProtectRoute } from "@/hooks/useProtectRoute"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { DialogComponent } from "@/components/dialog/Dialog"
import { FormModal } from "@/components/formModal/formModal"




export default function ServicosPage() {
  const [search, setSearch] = useState("")
  const [services, setServices] = useState<IServicesSavedDTO[]>([])
  const [filteredServices, setFilteredServices] = useState<IServicesSavedDTO[]>([])
  const { isChecking } = useProtectRoute();
  const { user } = useAuthStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false);




  useEffect(() => {

    const loadServices = async () => {
      try {
        const result = user?.role === "CLIENT" ?
          await ServiceServices.getAll() :
          await ServiceServices.getAllByProvider(user?.userId!);
        setServices(result)
        setFilteredServices(result)

      } catch (error: any) {
        console.error("Erro ao carregar serviços:", error.message)
      }
    }
    loadServices()


  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setFilteredServices(services)
      return
    }


    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.description?.toLowerCase().includes(search.toLowerCase()) ||
      service.provider.user.fullname.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredServices(filtered)
  }, [search, services])


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
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-balance">
              {user?.role !== "PROVIDER" ? "Encontre o serviço perfeito" : "Seus serviços"}
            </h1>

            {user?.role !== "PROVIDER" && (
              <p className="text-muted-foreground text-lg">
                Conecte-se com profissionais qualificados para suas necessidades
              </p>)
            }
          </div>
          <Button onClick={()=> setIsDialogOpen(true)}>
            <Plus /> Adicionar
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar serviços ou prestadores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum serviço encontrado
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredServices.length}{" "}
                {filteredServices.length === 1
                  ? "serviço encontrado"
                  : "serviços encontrados"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </main>

      <FormModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>
    </div>
  )
}
