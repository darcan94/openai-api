import { Metadata } from "next";
import LoginForm from "@/app/modules/user/ui/loginForm";
import {auth} from "../../../auth";
import {redirect} from "next/navigation";
import {Session} from "next-auth";

export const metadata: Metadata = {
    title: 'Login',
}

export default async function LoginPage(){
    const session: Session | null = await auth();
    console.log(session);
    if(session){
        redirect('/chat');
    }

    return(
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">

                </div>
                <LoginForm />
            </div>
        </main>
    );
}