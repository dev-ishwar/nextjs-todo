import prisma from "./prisma";

export async function FetchTodos() {
    try {
        const data = await prisma.task.findMany();
        return data;
    } catch (error) {
        console.log('err: ', error)
        throw new Error('Failed to fetch todos');
    }
}

export async function FetchPendingTodos() {
    try {
        const data = await prisma.task.findMany({
            where: { status: "PENDING" }
        });
        return data;
    } catch (error) {
        console.log('err: ', error)
        throw new Error('Failed to fetch todos');
    }
}

export async function FetchCompletedTodos() {
    try {
        const data = await prisma.task.findMany({
            where: { status: "COMPLETED" }
        });
        return data;
    } catch (error) {
        console.log('err: ', error)
        throw new Error('Failed to fetch todos');
    }
}

export async function fetchTodoById(id: string) {
    try {
        const data = await prisma.task.findUnique({
            where: {
                id: id,
            }
        })
        console.log('task by id: ', data)
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch todo');
    }
}