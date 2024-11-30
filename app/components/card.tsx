export default function Card({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            className="p-5 border border-current shadow-2xl md:max-w-[50%] mx-auto my-5 text-center rounded-md"
        >
            {children}
        </div>
    )
}