import EditTodo from "@/app/components/todos/edit-form";
import { fetchTodoById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function EditTodoPage({
    params
}: Readonly<{
    params: Promise<{ id: string }>
}>) {
    const id = (await params).id;
    const todo = await fetchTodoById(id);
    if (!todo) notFound();
    return (
        <main>
            <EditTodo todo={todo} />
        </main>
    )
}