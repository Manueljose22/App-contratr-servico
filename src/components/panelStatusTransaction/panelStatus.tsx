import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Calendar, DollarSign, User } from 'lucide-react'
import { IBookingSavedDTO } from '@/services/bookings/types';


interface panelStatusProps {
  transactions: IBookingSavedDTO[] | null; 
  role: "PROVIDER" | "CLIENT";
}


export const PanelStatus = ({role, transactions}: panelStatusProps) => {
  const status = {
    total: transactions?.length,
    completed: transactions?.filter((t) => t.status === "COMPLETED").length,
    canceled: transactions?.filter((t) => t.status === "CANCELED").length,
    pending: transactions?.filter((t) => t.status === "CONFIRMED").length,
    totalSpent: transactions?.filter((t) => t.status === "CONFIRMED").reduce((sum, t) =>
      sum + t.service.provider.balance, transactions[0].service.provider.balance),
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Serviços</p>
              <p className="text-3xl font-bold">{status.total}</p>
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
              <p className="text-3xl font-bold">{status.completed}</p>
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
              <p className="text-3xl font-bold">{status.pending}</p>
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
              <p className="text-sm text-muted-foreground mb-1">{role !== "PROVIDER" ? 'Total Gasto' : 'Total Ganho'}</p>
              <p className="text-2xl font-bold">{status?.totalSpent?.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}
