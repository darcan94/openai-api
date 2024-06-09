import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } } : any ): any {
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
        },
        async jwt({ token, user }) {
            if (user) {
              token = { ...token, id: user.id }
            }

            return token
        },
        async session({ session, token }) {
            if (token) {
              const { id } = token as { id: string }
              const { user } = session
      
              session = { ...session, user: { ...user, id } }
            }

            return session
          }
    },
    providers: [],
    session: {
        maxAge:  60 * 60 // 1 hour
    }
} satisfies NextAuthConfig