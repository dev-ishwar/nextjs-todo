export default function Card({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            className="md:max-w-[50%] mx-auto my-5 text-center p-10 rounded-sm bg-[--color-background-card]"
        >
            {children}
        </div>
    )
}