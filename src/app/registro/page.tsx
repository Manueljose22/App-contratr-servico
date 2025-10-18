"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AuthServices } from "@/services/auth/authServices"
import { FormField } from "@/components/form/FormField";
import { useForm } from "react-hook-form"
import { User, Mail, IdCard, Lock } from "lucide-react"
import { PasswordFormField } from "@/components/form/PasswordFormField"
import { SignUpFormData, signUpSchema } from "@/schemas/authSchema"
import {zodResolver} from '@hookform/resolvers/zod'
import { useAuthStore } from "@/store/useAuthStore"





export default function RegistroPage() {
  const { handleSubmit, control, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });
  const router = useRouter();
  const {setUser} = useAuthStore()
  const [userType, setUserType] = useState<"Client" | "Provider">("Client")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)



  const onSubmit = async ({password,confirmpassword, email, fullname, nif}:SignUpFormData) => {
    setError("")

    if (password !== confirmpassword) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const result = await AuthServices.signUp({fullname, email, password, role: userType, nif})
      setUser(result);
      router.push("/servicos");
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Contrata Já</CardTitle>
          <CardDescription className="text-center">Crie sua conta para começar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              label="Nome completo"
              className="space-y-2"
              name="fullname"
              control={control}
              type="text"
              icon={<User size={18} className="text-slate-500" />}
              error={errors.fullname}
            />
            <FormField
              label="Email"
              className="space-y-2"
              name="email"
              control={control}
              type="email"
              icon={<Mail size={18} className="text-slate-500" />}
              error={errors.email}
            />
            <FormField
              className="space-y-2"
              label="Nif"
              name="nif"
              control={control}
              type="text"
              icon={<IdCard size={18} className="text-slate-500" />}
              error={errors.nif}
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

            <PasswordFormField
              className="space-y-2"
              label="Confirme senha"
              control={control}
              name="confirmpassword"
              type="password"
              icon={<Lock size={18} className="text-slate-500" />}
              error={errors.confirmpassword}
            />

            <div className="space-y-3">
              <Label>Tipo de conta</Label>
              <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "Client" | "Provider")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="Client" />
                  <Label htmlFor="client" className="font-normal cursor-pointer">
                    Cliente - Quero contratar serviços
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Provider" id="Crovider" />
                  <Label htmlFor="provider" className="font-normal cursor-pointer">
                    Prestador - Quero oferecer serviços
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={handleSubmit(onSubmit)} type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Fazer login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div >
  )
}
