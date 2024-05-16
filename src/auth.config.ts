import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }){
            const isLoggedIn = !!auth?.user;
            const isOnChatPage = nextUrl.pathname.startsWith('/');

            if(isOnChatPage)
                return isLoggedIn;

            return isLoggedIn
                ? Response.redirect(new URL('/', nextUrl) )
                : true;
        }
    },
    providers: [],
} satisfies NextAuthConfig