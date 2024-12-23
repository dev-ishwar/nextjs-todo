"use client";
import { useRouter } from "next/navigation";
import { buttonStyle } from "./lib/styles";

const NotFound = () => {
    const router = useRouter();
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <div>
                <h1 className="inline-block text-2xl pr-5 mr-5 border-r-2 border-r-[--color-separator]">404</h1>
                <h2 className="inline-block">This page could not be found.</h2>
            </div>
            <button className={`${buttonStyle} mt-5`} onClick={() => router.push('/')} >Back to Homepage</button>
        </main>
    )
}

export default NotFound;