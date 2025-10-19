"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { BookingsServices } from "@/services/bookings/BookingsServices"
import { useAuthStore } from "@/store/useAuthStore"
import { IBookingSavedDTO } from "@/services/bookings/types"
import { PanelStatus } from "@/components/panelStatusTransaction/panelStatus"
import { TabsMenu } from "@/components/tabsMenu/tabsMenu"




export default function HistoricoPage() {
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState<IBookingSavedDTO[] | null>()

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

        <PanelStatus
          transactions={transactions!}
          role={user?.role!}
        />

        <TabsMenu
          handleUpdateStatus={handleUpdateStatus}
          role={user?.role!}
          transactions={transactions!}
        />

      </main>
    </div>
  )
}
