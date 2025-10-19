import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Calendar, Check, X } from 'lucide-react'
import { StatusBadge } from '../statusBadge/StatusBadge'
import { Separator } from '../ui/separator'
import { IBookingSavedDTO } from '@/services/bookings/types'


interface tabsMenuProps {
  role: "PROVIDER" | "CLIENT";
  handleUpdateStatus: (bookingId: string, status: string) => void;
  transactions: IBookingSavedDTO[] | null;

}



export const TabsMenu = ({ role, transactions, handleUpdateStatus }: tabsMenuProps) => {
  const [filter, setFilter] = useState<"ALL" | "CONFIRMED" | "CANCELED" | "COMPLETED">("ALL");
  const filteredTransactions = filter === "ALL" ? transactions : transactions?.filter((t) => t?.status === filter)

  return (
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
                          {role !== "PROVIDER" ? 'Prestador:' : 'Cliente: '}
                          {role === "PROVIDER" ? transaction.client.user.fullname : transaction.service.provider.user.fullname}
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
  )
}
