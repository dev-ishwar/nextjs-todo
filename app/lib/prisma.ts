import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const PrismaClientSingleton = () => {
    return new PrismaClient({log: ['query', 'info', 'warn', 'error']});
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
} & typeof global;

if(process.env.NODE_ENV === "production") {
    prisma = PrismaClientSingleton();
} else {
    prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();
}

export default prisma;