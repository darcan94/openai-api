import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "@/app/modules/user/application/actions";
import bcrypt from 'bcrypt';
import github from "next-auth/providers/github";

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
             async authorize(credentials: any) {
                 const { email, password } = credentials;
                 const user = await getUser(email);
                 if(!user) return null;
                 const passwordsMatch = await bcrypt.compare(password, user.password);
                 if(passwordsMatch) return user;

                 console.warn('Invalid Credentials');
                 return null;
            },
        }),
        github
    ],
});