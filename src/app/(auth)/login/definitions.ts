import {z} from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email' }).trim(),
    password: z.string().min(1,{ message: 'Enter a valid password'}).trim(),
})

export type LoginFormState = | {
    errors? : {
        email?: string[],
        password?: string[],
    }
    message?: string
} | undefined