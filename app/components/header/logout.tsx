import { doLogout } from "@/app/lib/actions/auth-actions";
import { Button } from "../button";

export default function Logout() {
    return (
        <form action={doLogout}>
            <Button>Logout</Button>
        </form>
    )
}