import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./app/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

class CustomError extends AuthError {
    constructor(message: string) {
        super()
        this.message = message
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const parsedCreds = z.object({
                    email: z.string().email(),
                    password: z.string().min(6)
                }).safeParse(credentials)

                if (parsedCreds.success) {
                    const { email, password } = parsedCreds.data;
                    const user = await prisma.user.findUnique({
                        where: { email }
                    });

                    if (!user) throw new CustomError('User not found.')
                    if (!user.password) throw new CustomError('Email not registered here. Check with social login.');

                    const passwordMatch = await bcrypt.compare(password, user?.password);
                    if (!passwordMatch) throw new CustomError('Invalid Credentials.');
                    return user;
                }

                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
})