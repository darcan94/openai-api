import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/loginForm";

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage(){
    return(
        <main className="flex min-h-screen items-center justify-center
        bg-gradient-to-br from-secondary px-2 to-background">
            <LoginForm />
        </main>
    );
}