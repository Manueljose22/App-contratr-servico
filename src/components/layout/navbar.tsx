"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { LogOut, History, Briefcase } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, useState } from "react"
import { IUserSavedDTO } from "@/services/auth/types"
import { AuthServices } from "@/services/auth/authServices"



export function Navbar() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname();
  const [profile, setProfile] = useState<IUserSavedDTO>()

  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  const navLinks = [
    { href: "/servicos", label: "Serviços" },
    { href: "/historico", label: "Histórico" },
  ]

  useEffect(()=>{
    const loadProfile = async () =>{
      const result = await AuthServices.profile();
      setProfile(result)
    }

    loadProfile()
  },[])



  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/servicos" className="text-xl font-bold text-primary">
              Contrata Já
            </Link>
            <div className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <>
              <p className="text-base font-medium"><small>Saldo: {user.role !== "PROVIDER" ?  
                new Intl.NumberFormat("AOA", {style: "currency", currency: "AOA"}).format(profile?.client?.balance!) :
                new Intl.NumberFormat("AOA", {style: "currency", currency: "AOA"}).format(profile?.provider?.balance!)}</small></p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={"/user.png"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        {user.role === "PROVIDER" ? "Prestador" : "Cliente"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/servicos" className="cursor-pointer">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Serviços</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/historico" className="cursor-pointer">
                      <History className="mr-2 h-4 w-4" />
                      <span>Histórico</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
