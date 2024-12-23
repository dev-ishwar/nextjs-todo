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

export async function loginWithCreds(formData: FormData) {
    try {
        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });

        return res;
    } catch (error: any) {
        if (error.type === "AuthError") {
            return { 
                error: { message: error.message }
            }
        }
        return { error: { message: 'Failed to login', error: error } }
    }
}