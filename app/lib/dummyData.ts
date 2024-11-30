import { Todo } from "./definitions";

export const todos: Todo[] = [
    {
        id: '1',
        title: 'Todo 1',
        description: 'something to do with long description,',
        dueDate: "2024-12-12",
        prioritize: true,
        status: 'PENDING'
    },
    {
        id: '2',
        title: 'Todo 1',
        description: 'something to do, something to do with long description, extra long description',
        dueDate: "2020-01-23",
        prioritize: false,
        status: 'PENDING'
    },
    {
        id: '3',
        title: 'Todo 1',
        description: 'something to do',
        dueDate: "22222-12-20",
        prioritize: false,
        status: 'PENDING'
    }
]