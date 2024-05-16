import { Metadata } from "next";
import LoginForm from "@/components/loginForm";

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage(){
    return(
        <main className="flex min-h-screen items-center justify-center
        bg-gradient-to-br from-bg-secondary to-bg-background px-4 py-12 sm:px-6 lg:px-8">
            <LoginForm />
        </main>
    );
}