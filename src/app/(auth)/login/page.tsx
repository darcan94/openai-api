import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/loginForm";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage(){
    return(
        <main className="flex min-h-screen items-center justify-center
        bg-gradient-to-br from-secondary px-2 to-background">
            <LoginForm > 
                <div>
                    <h2 className="mt-6 text-center text-xl text-font">
                        Sign in to your account.
                    </h2>
                    <p className="mt-2 text-center text-sm text-font">
                        <span>Or </span>
                        <Link className="font-medium text-primary-500 hover:text-primary-700 no-underline" href="/signup">
                            Sign up
                        </Link>
                    </p>
                </div>
            </LoginForm>
        </main>
    );
}