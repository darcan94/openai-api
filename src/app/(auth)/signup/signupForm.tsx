'use client'
import Button from "@/components/ui/Button";
import { useFormState, useFormStatus } from "react-dom"
import { signup } from "@/app/modules/user/application/actions";
import {EyeIcon} from "@/components/ui/Icons";
import {useState} from "react";
import { Link } from "next-view-transitions";

export default function SignupForm(){
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, dispatch] = useFormState(signup, undefined);
    const {pending} = useFormStatus();

    const handleChangePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    }

    return(
        <div className="w-full max-w-sm p-4 bg-background rounded-xl space-y-6">
            <div>
                <h2 className="mt-6 text-center text-xl font-semibold tracking-tight text-font">
                    Create an account.
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    <span>Already have an account? </span>
                    <Link className="font-medium text-primary-500 hover:text-indigo-400" href="/login">
                        Sign in
                    </Link>
                </p>
            </div>

            <form action={dispatch} className="space-y-6">
                <div className="space-y-1">
                    <input
                        className="block w-full rounded-lg bg-gray-100 dark:bg-secondary py-3 px-3 text-sm outline-1 placeholder-gray-400 sm:text-sm"
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Enter your Name"/>
                </div>
                {errorMessage?.errors?.name && <p className="text-danger">{errorMessage.errors.name}</p>}

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
                            className="block bg-transparent w-full py-3 px-3 text-sm outline-1 placeholder-gray-400 sm:text-sm"
                            id="password"
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Password"/>

                        <div className="ml-3 flex">
                            <ShowPasswordButton active={isPasswordVisible} onclick={handleChangePasswordVisibility}/>
                        </div>
                    </div>
                </div>
                {
                    errorMessage?.errors?.password && (
                        <div className="text-danger">
                            <p>Password must be:</p>
                            <ul>
                                {errorMessage.errors.password.map( error => (
                                    <li key={error}> - {error}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                {errorMessage?.message && <p className="text-danger">{errorMessage.message}</p>}

                <Button className="w-full h-12 hover:bg-primary-500 rounded-lg"
                    aria-disabled={pending}
                    disabled={pending}
                    type="submit">
                    {pending ? 'Submitting...' : 'Sign Up' }
                </Button>
            </form>
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