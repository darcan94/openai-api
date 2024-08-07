'use client'
import { useFormState, useFormStatus } from "react-dom"
import { authenticate, login } from "@/app/modules/user/application/actions";
import {EyeIcon} from "@/components/ui/Icons";
import {useState} from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function LoginForm(){
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const {pending} = useFormStatus();

    const handleChangePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    }

    return(
        <div className="w-full max-w-sm p-4 bg-white dark:bg-background rounded-xl space-y-6 shadow-lg">
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

            <form action={dispatch} className="space-y-6">
                <div className="space-y-1">
                    <input
                        className="block w-full rounded-lg bg-gray-100 dark:bg-secondary py-3 px-3 text-sm outline-1 placeholder-gray-400 sm:text-sm"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"/>
                </div>
                {errorMessage?.errors?.email && <p className="text-danger">{errorMessage.errors.email}</p>}

                <div className="space-y-1">                   
                    <div className="mt-1 flex items-center rounded-lg bg-gray-100 dark:bg-secondary">
                        <input
                            className="block bg-transparent w-full py-3 px-3 text-sm
                            outline-1 placeholder-gray-400 sm:text-sm"
                            id="password"
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Password"/>

                        <div className="ml-3 flex">
                            <ShowPasswordButton active={isPasswordVisible} onclick={handleChangePasswordVisibility}/>
                        </div>
                    </div>
                </div>
                {errorMessage?.errors?.password && <p className="text-danger">{errorMessage.errors.password}</p>}
                {errorMessage?.message && <p className="text-danger">{errorMessage.message}</p>}

                <button 
                    className="w-full p-2 bg-primary hover:bg-primary-700 rounded-lg text-white"
                    aria-disabled={pending}
                    disabled={pending}
                    type="submit">
                        {pending ? 'Submitting...' : 'Sign In' }
                </button>
            </form>

            <div className="flex items-center text-font before:content-[''] after:content-[''] before:flex-grow after:flex-grow before:border-t after:border-t before:font after:font">
             <span className="text-sm px-2">Or sign in with</span>
            </div>

            <div className="space-y-3">
                <form action="#">
                    <button 
                        className='flex items-center justify-center w-full rounded-lg border border-gray-100 dark:border-font py-3 px-4 text-sm font-medium text-font hover:bg-gray-100 dark:hover:bg-secondary' 
                        type="submit">
                            <Image loading="lazy" className="w-5" height="2" width="2" alt="provider-logo" src="https://authjs.dev/img/providers/google.svg"/>
                            <span className='grow'>Signin in with Google</span>
                    </button>
                </form>

                <form action={login}>
                    <button 
                        className='flex items-center justify-center w-full rounded-lg border border-gray-100 dark:border-font py-3 px-4 text-sm font-medium text-font hover:bg-gray-100 dark:hover:bg-secondary' 
                        type="submit">
                            <Image loading="lazy" className="w-5" height="2" width="2" alt="provider-logo" src="https://authjs.dev/img/providers/github.svg"/>
                            <span className='grow'>Signin in with GitHub</span>
                    </button>
                </form>                
            </div>
        </div>
    )
}

function ShowPasswordButton({onclick, active}: {onclick: () => void, active: boolean}){
    return(
        <button onClick={onclick} type='button' className="text-font px-4 hover:text-gray-500">
            <EyeIcon className={`h-4 w-4 ${active ? 'hover:stroke-primary stroke-primary-500': ''}`} />
            <span className="sr-only">Show password</span>
        </button>
    )
}