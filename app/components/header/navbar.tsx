'use client';

import { usePathname } from "next/navigation";
import LinkButton from "@/app/components/link-button";

export default function NavBar() {
    const pathname = usePathname();
    return pathname === '/'
        ? <LinkButton path="/login" classNames="md:h-10 px-3 rounded-lg">Sign In</LinkButton>
        : null;
}