import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: ({ auth, request: { nextUrl } }) => {
            const isLoggedIn = !!auth?.user;
            const isProtectedRoute = nextUrl.pathname.includes('/todos');
            const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname.includes('/login') || nextUrl.pathname.includes('/register');

            if (isProtectedRoute) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/todos', nextUrl))
            } else if (isPublicRoute) {
                return true;
            }
            return true;
        }
    },
    providers: [],
} as NextAuthConfig;