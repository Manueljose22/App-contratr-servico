"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Check, DollarSign, User, X } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { StatusBadge } from "@/components/statusBadge/StatusBadge"
import { BookingsServices } from "@/services/bookings/BookingsServices"
import { useAuthStore } from "@/store/useAuthStore"
import { IBookingSavedDTO } from "@/services/bookings/types"
import { Button } from "@/components/ui/button"




export default function HistoricoPage() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<"ALL" | "CONFIRMED" | "CANCELED" | "COMPLETED">("ALL");
  const [transactions, setTransactions] = useState<IBookingSavedDTO[] | null>()

  const filteredTransactions = filter === "ALL" ? transactions : transactions?.filter((t) => t?.status === filter)



  const loadHostory = async () => {
    try {
      const result = await BookingsServices.getAllByUser();
      setTransactions(result);

    } catch (error: any) {
      console.log("Erro ao carregar transações: ", error.message);
    }
  }

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    if (status === "CANCELED") {
      try {
        await BookingsServices.updateBooking({
          bookingId: bookingId,
          status: "CANCELED",
        });

      } catch (error: any) {
        console.log("Erro ao cancelar contratacao: ", error.message);
      }
    } else {
      try {
        await BookingsServices.updateBooking({
          bookingId: bookingId,
          status: "COMPLETED",
        });
      } catch (error: any) {
        console.log("Erro ao concluir contratacao: ", error.message);
      }
    }
  }


  const stats = {
    total: transactions?.length,
    completed: transactions?.filter((t) => t.status === "COMPLETED").length,
    canceled: transactions?.filter((t) => t.status === "CANCELED").length,
    pending: transactions?.filter((t) => t.status === "CONFIRMED").length,
    totalSpent: transactions?.filter((t) => t.status === "CONFIRMED").reduce((sum, t) =>
      sum + t.service.provider.balance, transactions[0].service.provider.balance),
  }


  useEffect(() => {
    loadHostory();
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Histórico de Transações</h1>
          <p className="text-muted-foreground text-lg">Acompanhe todos os seus serviços contratados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de Serviços</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Concluídos</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pendentes</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{user?.role !== "PROVIDER" ? 'Total Gasto' : 'Total Ganho'}</p>
                  <p className="text-2xl font-bold">{stats?.totalSpent?.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
              <TabsList className="mb-6">
                <TabsTrigger value="ALL">Todos</TabsTrigger>
                <TabsTrigger value="COMPLETED">Concluídos</TabsTrigger>
                <TabsTrigger value="CONFIRMED">Pendentes</TabsTrigger>
                <TabsTrigger value="CANCELED">Cancelados</TabsTrigger>
              </TabsList>

              <TabsContent value={filter!} className="space-y-4">
                {filteredTransactions?.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhuma transação encontrada</p>
                  </div>
                ) : (
                  filteredTransactions?.map((transaction, index) => (
                    <div key={transaction.id}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="h-12 w-12 shrink-0">
                            <AvatarImage
                              src={"/user.png"}
                              alt={transaction.service.provider.user.fullname}
                            />
                            <AvatarFallback>{transaction.service.provider.user.fullname.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{transaction.service.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {user?.role !== "PROVIDER" ? 'Prestador:' : 'Cliente: '}
                              {user?.role === "PROVIDER" ? transaction.client.user.fullname : transaction.service.provider.user.fullname}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(transaction.dateBooking).toLocaleString().split(",")[0]}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          {transaction.status !== "CANCELED" && transaction.status !== "COMPLETED" && (
                            <div className="flex gap-1 mb-4">
                              <Button
                                onClick={() => handleUpdateStatus(transaction.id, "CONFIRMED")}
                                variant={"ghost"}
                                title="Concluir"
                                className="cursor-pointer">
                                <Check size={30} className="text-green-500" />
                              </Button>
                              <Button onClick={() => handleUpdateStatus(transaction.id, "CANCELED")} title="Cancelar" variant={"ghost"} className="cursor-pointer">
                                <X size={30} className="text-red-500" />
                              </Button>
                            </div>
                          )

                          }
                          {StatusBadge(transaction.status)}
                          <p className="text-2xl font-bold text-primary">
                            {new Intl.NumberFormat("AOA", { style: "currency", currency: "AOA" }).format(transaction.service.price)}
                          </p>
                        </div>
                      </div>
                      {index < filteredTransactions.length - 1 && <Separator />}
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
