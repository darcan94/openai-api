import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages:{
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: {nextUrl} }){
            const isLoggedIn: boolean = !!auth?.user;
            const isOnChat: boolean = nextUrl.pathname.startsWith('/chat');

            if(isOnChat)
                return isLoggedIn

            return isLoggedIn
                ? Response.redirect(new URL('/chat', nextUrl) )
                : true;
        }
    },
    providers: [],
}satisfies NextAuthConfig;