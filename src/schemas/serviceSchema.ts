import z from "zod"



export const createServiceSchema = z.object({
    name: z.string().min(2, "Título é obrigatorio."),
    price: z.string().min(3, "Preço invalido"),
    description: z.string().optional(),
}) 

export type CreateServiceFormData = z.infer<typeof createServiceSchema>