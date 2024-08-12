import { Metadata } from "next";
import SignupForm from "@/app/(auth)/signup/signupForm";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
    title: 'Sign up',
}

export default function SignupPage(){
    return(
        <main className="flex min-h-screen items-center justify-center
        bg-gradient-to-br from-secondary to-background px-4 py-12 sm:px-6 lg:px-8">
            <SignupForm>
                <div>
                    <h2 className="mt-6 text-center text-xl tracking-tight text-font">
                        Create an account.
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        <span>Already have an account? </span>
                        <Link className="font-medium text-primary-500 hover:text-primary-700 no-underline" href="/login">
                            Sign in
                        </Link>
                    </p>
                </div>
            </SignupForm>
        </main>
    );
}