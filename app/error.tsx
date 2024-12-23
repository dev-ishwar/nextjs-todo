"use client";
import { buttonStyle } from "./lib/styles";

export default function ErrorPage({
    error,
    reset
}: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>) {
    return (
        <main className="h-screen grid place-content-center gap-3 justify-items-center">
            <h1>Oops!!</h1>
            <p>{error.message}</p>
            <button className={buttonStyle} onClick={reset} type="button" >Try Again</button>
        </main>
    )
}