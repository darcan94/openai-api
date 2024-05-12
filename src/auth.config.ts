import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }){
            const isLoggedIn = !!auth?.user;
            const isOnChatPage = nextUrl.pathname.startsWith('/chat');

            if(isOnChatPage)
                return isLoggedIn;

            return isLoggedIn
                ? Response.redirect(new URL('/chat', nextUrl) )
                : true;
        }
    },
    providers: [],
} satisfies NextAuthConfig