import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const UserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "email is required" }),
    password: z.string().min(8, "Password must be minimum 8 characters long"),
})

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = UserSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ user: null, message: "User already exists with provided email." }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        const { password: userPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest, message: 'User created successfully.' }, {
            status: 201,
        })
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Error. Failed to create user.' },
            { status: 500 }
        )
    }
}