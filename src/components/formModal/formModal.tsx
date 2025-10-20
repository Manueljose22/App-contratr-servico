import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { FormField } from '../form/FormField'
import { useForm } from 'react-hook-form'
import { CreateServiceFormData, createServiceSchema } from '@/schemas/serviceSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ServiceServices } from '@/services/services/ServiceServices'
import { useAuthStore } from '@/store/useAuthStore'
import { Loader2 } from 'lucide-react'
import { AlertMessage } from '../alertMessage/alert'


interface formModalProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsReload: React.Dispatch<React.SetStateAction<boolean>>;

}



export const FormModal = ({ isDialogOpen, setIsDialogOpen, setIsReload }: formModalProps) => {
    const { user } = useAuthStore();
    const [isLoading, setIsloading] = useState<boolean>(false)
    const { control, handleSubmit, formState: { errors } } = useForm<CreateServiceFormData>({
        resolver: zodResolver(createServiceSchema)
    })
    const [message, setMessage] = useState<string | null>(null);



    const createService = async (data: CreateServiceFormData) => {
        try {
            setIsloading(true);

            await ServiceServices.create({
                description: data.description || "",
                name: data.name,
                price: Number(data.price),
                providerId: user?.userId!
            });

            setIsDialogOpen(false)
            setIsReload(true)

        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setIsloading(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Serviço</DialogTitle>
                </DialogHeader>
                <AlertMessage message={message} />
                <div>
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

                <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit(createService)} disabled={isLoading ? true : false}>
                        {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-white" /> : 'Salvar'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
