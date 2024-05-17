import { Metadata } from "next";
import SignupForm from "@/app/signup/signupForm";

export const metadata: Metadata = {
    title: 'Sign up',
}

export default function SignupPage(){
    return(
        <main className="flex min-h-screen items-center justify-center
        bg-gradient-to-br from-secondary to-background px-4 py-12 sm:px-6 lg:px-8">
            <SignupForm />
        </main>
    );
}