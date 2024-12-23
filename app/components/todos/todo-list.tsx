import { FetchCompletedTodos, FetchPendingTodos } from "@/app/lib/data"
import ToDo from "./todo-item";

export default async function Todos() {
    const pendingTodos = FetchPendingTodos();
    const completedTodos = FetchCompletedTodos();

    const [pending, completed] = await Promise.all([pendingTodos, completedTodos]);

    return (
        <main>
            <h2 className="mt-10 mb-5">Pending Tasks</h2>
            <ul>
                {
                    pending?.length ?
                        pending.map(todo => (
                            <ToDo todo={todo} key={todo.id} />
                        ))
                        : <div className="min-h-20 grid place-content-center border">No Pending Tasks.</div>
                }
            </ul>

            <h2 className="mt-10 mb-5">Completed Tasks</h2>
            <ul>
                {
                    completed?.length ?
                        completed.map(todo => (
                            <ToDo todo={todo} key={todo.id} />
                        ))
                        : <div className="min-h-20 grid place-content-center border">No Completed Tasks.</div>
                }
            </ul>
        </main>
    )
}