
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"



export default function HomePage() {
  const router = useRouter()
  const {user} = useAuthStore()
 
  useEffect(() => {
      if (user) {
        router.push("/servicos")
      } else {
        router.push("/login")
      }

  }, [user, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
        <p className="mt-4 text-muted-foreground">Carregando...</p>
      </div>
    </div>
  )
}