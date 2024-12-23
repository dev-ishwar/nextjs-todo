import { auth } from "@/auth";
import NavBar from "@/app/components/header/navbar";
import UserInfo from "@/app/components/header/user-info";
import Logout from "@/app/components/header/logout";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
    const session = await auth();
    const user = session?.user;
    return (
        <header className="flex items-center justify-between p-5 bg-[--color-background-card] ">
            <Link href={'/'} passHref>
                <Image
                    src={'/logo_dark.svg'}
                    width={120}
                    height={50}
                    alt="Logo"
                    className="block dark:hidden"
                />
                <Image
                    src={'/logo_light.svg'}
                    width={120}
                    height={50}
                    alt="Logo"
                    className="hidden dark:block"
                />
            </Link>
            <div className="flex gap-5 items-center">
                <NavBar />
                {
                    user &&
                    <>
                        <UserInfo user={user} />
                        <Logout />
                    </>
                }
            </div>
        </header>
    )
}