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

    const handleChangePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    }

    return(
        <div className="w-full max-w-sm space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-font">
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                        Name
                    </label>

                    <input
                        className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm
                        outline-1 placeholder-gray-400 sm:text-sm"
                        id="name"
                        type="name"
                        name="name"
                        placeholder="name"/>
                </div>
                {errorMessage?.errors?.name && <p className="text-danger">{errorMessage.errors.name}</p>}

                <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        Email address
                    </label>

                    <input
                        className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm
                        outline-1 placeholder-gray-400 sm:text-sm"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"/>
                </div>
                {errorMessage?.errors?.email && <p className="text-danger">{errorMessage.errors.email}</p>}

                <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                        Password
                    </label>

                    <div className="mt-1 flex items-center">
                        <input
                            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm
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

                <LoginButton/>
            </form>
        </div>
    )
}

function ShowPasswordButton({onclick, active}: {onclick: () => void, active: boolean}){
    return(
        <button onClick={onclick} type='button' className="text-gray-400 hover:text-gray-500">
            <EyeIcon className={`h-5 w-5 ${active ? 'hover:stroke-primary stroke-primary-500': ''}`} />
            <span className="sr-only">Show password</span>
        </button>
    )
}

function LoginButton() {
    const {pending} = useFormStatus();
    return (
        <Button className="flex w-full justify-center rounded-md border border-transparent
                       bg-primary py-3 px-4 text-sm font-medium text-white shadow-sm
                       hover:bg-primary-500 focus:outline-none focus:ring-2
                       focus:ring-indigo-500 focus:ring-offset-2"
                aria-disabled={pending}
                disabled={pending}
                type="submit">
            {pending ? 'Submitting...' : 'Sign Up' }
        </Button>
    );
}