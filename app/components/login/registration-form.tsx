"use client";

import Card from "../card";
import { buttonStyle } from "@/app/lib/styles";
import SocialLogin from "@/app/components/login/social-login";
import Link from "next/link";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });

            if(response.status === 201) router.push('/login');

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className="border-b-2 mb-8 pb-8 text-left">
                <div className="flex flex-col gap-5 mx-auto w-[90%] md:w-[70%]">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="name">Name</label>
                        <input type="name" name="name" id="name" className="rounded-sm px-2 py-1" placeholder="name" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="rounded-sm px-2 py-1" placeholder="email@example.com" />
                    </div>
                    <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="rounded-sm px-2 py-1" placeholder="password" />
                    </div>
                    <button className={`${buttonStyle} rounded-md`}>Register</button>
                </div>
                <p className="mt-8 text-center">Already have an account? <Link href={'/login'} className="underline">Login</Link></p>
            </form>
            <SocialLogin />
        </Card>
    )
}