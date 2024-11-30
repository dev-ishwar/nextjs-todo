import Card from "../card";
import { buttonStyle } from "@/app/lib/styles";
import SocialLogin from "@/app/components/login/social-login";
import Link from "next/link";

export default function LoginForm() {
    return (
        <Card>
            <h1 className="mb-8 p-3 text-xl uppercase bg-foreground text-background rounded-lg">Login</h1>
            <form className="border-b-2 mb-8 pb-8 text-left">
                <div className="flex flex-col gap-5 mx-auto w-[90%] md:w-[70%]">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="rounded-sm px-2 py-1" placeholder="email@example.com" />
                    </div>
                    <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="rounded-sm px-2 py-1" placeholder="password" />
                    </div>
                    <button className={`${buttonStyle} rounded-md`}>Login</button>
                </div>
                <p className="mt-8 text-center">Don&apos;t have an account? <Link href={'/register'} className="underline">Register</Link></p>
            </form>
            <SocialLogin />
        </Card>
    )
}