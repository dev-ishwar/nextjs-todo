export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="md:w-[70%] my-10 mx-auto bg-[--color-background-card] py-10 rounded-md">
            {children}
        </div>
    )
}