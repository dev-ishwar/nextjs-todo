import EditTodo from "@/app/components/todos/edit-form";
// import { fetchTodoById } from "@/app/lib/data";
import { todos } from "@/app/lib/dummyData";

export default async function EditTodoPage({
    params
}: Readonly<{
    params: Promise<{ id: string }>
}>) {
    const id = (await params).id;
    console.log(id);
    // const todo = await fetchTodoById(id);
    const todo = todos[1]
    return (
        <main>
            <EditTodo todo={todo} />
        </main>
    )
}