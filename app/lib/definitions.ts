
type TodoStatus = 'COMPLETED' | 'PENDING';
type TodoType = 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY';

export type Todo = {
    id: string,
    title: string,
    description: string | null,
    dueDate?: string | null,
    status: TodoStatus,
}