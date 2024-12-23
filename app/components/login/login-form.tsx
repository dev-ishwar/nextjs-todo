"use client";

import Card from "../card";
import { buttonStyle } from "@/app/lib/styles";
import SocialLogin from "@/app/components/login/social-login";
import Link from "next/link";
import { loginWithCreds } from "@/app/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "@/app/loading";

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const response = await loginWithCreds(formData);
            if (!!response.error) {
                setError(response.error?.message)
            } else {
                router.push('/');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to login');
            }
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            {error && <p className="text-red-800 text-sm mx-auto mb-5">{error}</p>}
            <form className="border-b-2 mb-8 pb-8 text-left" onSubmit={handleFormSubmit} >
                <div className="flex flex-col gap-5 mx-auto w-[90%] md:w-[70%]">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="rounded-sm p-2" placeholder="email@example.com" />
                    </div>
                    <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="rounded-sm p-2" placeholder="password" />
                    </div>
                    <button className={`${buttonStyle} rounded-sm sm:h-10`} aria-disabled={isLoading} >Login</button>
                </div>
                <p className="mt-8 text-center">Don&apos;t have an account? <Link href={'/register'} className="underline">Register</Link></p>
            </form>
            <SocialLogin />
            {
                isLoading && <Loader />
            }
        </Card>
    )
}