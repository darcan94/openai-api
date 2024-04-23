import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: {nextUrl} }){
            const isLoggedIn = !!auth?.user;
            const isOnChat = nextUrl.pathname.startsWith('/chat');
            if(isOnChat){
                return isLoggedIn; // If false, redirect unauthenticated users to login page
            }else if(isLoggedIn){
                return Response.redirect(new URL('/chat', nextUrl));
            }
            return true;
        }
    },
    providers: [],
}satisfies NextAuthConfig;