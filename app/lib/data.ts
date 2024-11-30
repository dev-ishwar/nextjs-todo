import { sql } from "@vercel/postgres";
import { todos } from "./dummyData";
import { Todo } from "./definitions";


export async function FetchTodos() {
    // try {
    //     const data = await sql<Todo>`SELECT * FROM todos`;
    //     return data.rows;
    // } catch (error) {
    //     throw new Error('Failed to fetch todos');
    // }
    return todos
}

export async function fetchTodoById(id: string) {
    try {
        const data = await sql<Todo>`SELECT * FROM todos where id = ${id}`;
        return data.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch todo');
    }
}