export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ id: string }>
}>) {
    const id = (await params).id;
    return (
        <main>View Page {id}</main>
    )
}