export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="md:w-[80%] mx-auto">{children}</div>
    )
}