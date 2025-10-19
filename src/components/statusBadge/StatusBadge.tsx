import { Badge } from "../ui/badge"





export const StatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge variant="default" className="bg-accent text-accent-foreground">
            Concluído
          </Badge>
        )
      case "COMFIRMED":
        return <Badge variant="secondary">Confirmado</Badge>
      case "CANCELED":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }