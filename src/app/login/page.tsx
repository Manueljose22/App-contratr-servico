"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from "@/store/useAuthStore"
import { AuthServices } from "@/services/auth/authServices"
import { PasswordFormField } from "@/components/form/PasswordFormField"
import { useForm } from "react-hook-form"
import { SignInFormData, signInSchema } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { FormField } from "@/components/form/FormField"
import { useToast } from "@/components/ui/use-toast"







export default function LoginPage() {
  const { handleSubmit, control, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  });
  const { toast } = useToast()
  const router = useRouter()
  const { setUser } = useAuthStore();
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const onSubmit = async (data: SignInFormData) => {
    setError("")
    setIsLoading(true)

    try {
      const result = await AuthServices.signIn(data)
      setUser(result)
      
      toast({
      title: "Login efetuado!",
      description: "Bem-vindo de volta 👋",
    })

      if (result.role === "CLIENT") {
        router.replace("/servicos");
      } else {
        router.replace("/historico");
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Contrata Já</CardTitle>
          <CardDescription className="text-center">Entre na sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              label="Email ou Nif"
              className="space-y-2"
              name="email"
              control={control}
              type="text"
              icon={<Mail size={18} className="text-slate-500" />}
              error={errors.email}
            />

            <PasswordFormField
              className="space-y-2"
              label="Senha"
              control={control}
              name="password"
              type="password"
              icon={<Lock size={18} className="text-slate-500" />}
              error={errors.password}
            />
            <Button onClick={handleSubmit(onSubmit)} className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Não tem uma conta?{" "}
            <Link href="/registro" className="text-primary hover:underline font-medium">
              Criar conta
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
