import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    console.log({ name, email, password });
    
    return new NextResponse('User has been created.', {
        status: 201
    })
}