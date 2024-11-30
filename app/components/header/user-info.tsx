// "use server";
import { User } from "next-auth";
import Image from "next/image";

export default async function UserInfo({ user }: { user: User }) {
    return user ? (
        <div className="flex gap-4 justify-center items-center">
            <Image
                src={user.image!}
                alt={user.name!}
                width={40}
                height={40}
                className="rounded-full"
            />
            <span>
                {user.name}
            </span>
        </div>
    ) : null;
}