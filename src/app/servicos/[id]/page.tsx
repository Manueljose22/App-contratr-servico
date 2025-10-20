"use client"

import { AlertMessage } from "@/components/alertMessage/alert";
import { FormField } from "@/components/form/FormField";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateServiceFormData, createServiceSchema } from "@/schemas/serviceSchema";
import { ServiceServices } from "@/services/services/ServiceServices";
import { IServicesSavedDTO } from "@/services/services/types";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";





export default function UpdateServicePage() {
    const params = useParams();
    const serviceId = params.id as string;
    const router = useRouter()

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<CreateServiceFormData>({
        resolver: zodResolver(createServiceSchema)
    })

    const { user } = useAuthStore();
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null);


    const updateSerice = async (data: CreateServiceFormData) => {
        try {
            setIsloading(true);
            await ServiceServices.upadte(serviceId, {
                description: data.description || "",
                name: data.name,
                price: Number(data.price)
            });

            router.push("/servicos")
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setIsloading(false)
        }
    }



    useEffect(() => {
        const loadService = async () => {
            const result = await ServiceServices.getById(serviceId)
            setValue("name", result.name)
            setValue("description", result.description || '')
            setValue("price", result.price.toString())
        }
        loadService()
    }, [serviceId])

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Actualizar Serviço</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlertMessage message={message} />
                        <div className="">
                            <FormField
                                className='space-y-2'
                                label={'Título *'}
                                control={control}
                                name={'name'}
                                type={'text'}
                                error={errors.name}
                            />
                            <FormField
                                className='space-y-2'
                                label={'Preço *'}
                                name={'price'}
                                type={'number'}
                                control={control}
                                error={errors.price}
                            />
                            <FormField
                                className='space-y-2'
                                label={'Descricão'}
                                name={'description'}
                                type={'text'}
                                control={control}
                                error={errors.description}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex space-y-2  justify-end">
                        <div className="flex gap-2 items-center">
                            <Button variant="outline">
                                Cancelar
                            </Button>
                            <Button onClick={handleSubmit(updateSerice)} disabled={isLoading ? true : false}>
                                {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-white" /> : 'Actualizar'}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}