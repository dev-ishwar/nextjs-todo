import Link from "next/link";

export default function Home() {
  return (
    <div className="grid p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-xl">Welcome Stranger!!</h1>
        <p><Link href={'/login'} className="underline">Login</Link> to proceed.</p>
      </div>
    </div>
  );
}
