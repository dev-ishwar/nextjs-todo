import Link from "next/link";
import { buttonStyle } from "@/app/lib/styles";

export default function LinkButton({
    children,
    path,
    classNames
}: Readonly<{
    children: React.ReactNode,
    path: string,
    classNames?: string
}>) {
    return (
        <Link
            href={path}
            className={`${buttonStyle} ${classNames}`}
        >{children}</Link>
    )
}