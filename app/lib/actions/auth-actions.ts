"use server";

// Login Logout Actions

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
    const action = formData.get('action') as string;
    await signIn(action, { redirectTo: "/todos" })
}

export async function doLogout() {
    await signOut({ redirectTo: '/' });
}