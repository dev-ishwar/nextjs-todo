import { auth } from "@/auth";
import NavBar from "@/app/components/header/navbar";
import UserInfo from "@/app/components/header/user-info";
import Logout from "@/app/components/header/logout";

export default async function Header() {
    const session = await auth();
    const user = session?.user!;
    return (
        <header className="flex items-center justify-between p-5">
            <span>TODO</span>
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