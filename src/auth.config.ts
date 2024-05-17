import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }){
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');
            const isOnSignupPage = nextUrl.pathname.startsWith('/signup');

            if(isLoggedIn){
                if(isOnLoginPage || isOnSignupPage){
                    return Response.redirect(new URL('/', nextUrl));
                }
            }  

            if(isLoggedIn || isOnSignupPage){
                return true;
            }

            return isLoggedIn;
           /* const isOnChatPage = nextUrl.pathname.startsWith('/');

            if(isOnChatPage)
                return isLoggedIn;

            return isLoggedIn
                ? Response.redirect(new URL('/', nextUrl) )
                : true;*/
        }
    },
    providers: [],
} satisfies NextAuthConfig