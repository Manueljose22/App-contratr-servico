import z from "zod"

export const signInSchema = z.object({
    email: z.string().min(2, "E-mail é obrigatorio."),
    password: z.string().min(6, "Senha é obrigatorio."),

})

export type SignInFormData = z.infer<typeof signInSchema>




export const signUpSchema = z.object({
    fullname: z.string().min(2, "Nome é obrigatorio."),
    email: z.string().min(2, "E-mail é obrigatorio."),
    nif: z.string().min(2, "Número de telefone é obrigatorio."),
    password: z.string().min(6, "No minimo 6 caracteres"),
    confirmpassword: z.string().min(6, "No minimo 6 caracteres"),
}) 

export type SignUpFormData = z.infer<typeof signUpSchema>