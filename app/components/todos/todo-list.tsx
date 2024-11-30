import { FetchTodos } from "@/app/lib/data"
import ToDo from "./todo-item";

export default async function Todos() {
    const todos = await FetchTodos();
    return (
        <main className="">
            <ul>
                {
                    todos.map(todo => (
                        <ToDo todo={todo} key={todo.id} />
                    ))
                }
            </ul>
        </main>
    )
}