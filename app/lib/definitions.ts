

export type Todo = {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    prioritize: boolean,
    status: 'COMPLETED' | 'PENDING',
}