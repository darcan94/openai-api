import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; 
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "@/app/modules/user/application/actions";
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
             authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(8)})
                    .safeParse(credentials);

                if(parsedCredentials.success){
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if(!user) return null;
                    
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if(passwordsMatch) return user;
                }
                console.warn('Invalid Credentials');
                return null;
            },
        })
    ],
});