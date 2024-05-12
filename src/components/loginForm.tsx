'use client'
import { Button } from "@/components/ui/Button";
import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "@/app/modules/user/application/actions";

export default function LoginForm(){
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    return(
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 dark:bg-secondary px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl">
                    Please log in to continue.
                </h1>
                <div className="w-full">
                    <div>
                        <label htmlFor="email" className="mb-3 mt-5 block text-xs font-medium text-font">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"/>
                        </div>
                    </div>
                    {errorMessage?.errors?.email && <p className="text-danger">{errorMessage.errors.email}</p>}

                    <div className="mt-4">
                        <label className="mb-3 mt-5 block text-xs font-medium text-font" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"/>
                        </div>
                    </div>
                        {
                            errorMessage?.errors?.password && (
                                <div className="text-red-600">
                                    <p>Password must be:</p>
                                    <ul>
                                        {errorMessage.errors.password.map((error: any) => (
                                            <li key={error}> - {error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }
                </div>
                <LoginButton/>

            </div>
        </form>
    )
}

function LoginButton() {
    const {pending} = useFormStatus();
    return (
        <Button className="mt-4 w-full text-white rounded-lg flex justify-between p-4 bg-primary"
                aria-disabled={pending}
                disabled={pending}
                type="submit">
            {pending ? 'Submitting...' : 'Sign In' }
        </Button>
    );
}