
type TodoStatus = 'COMPLETED' | 'PENDING';

export type Todo = {
    id: string,
    title: string,
    description: string | null,
    dueDate?: string | null,
    status: TodoStatus,
}