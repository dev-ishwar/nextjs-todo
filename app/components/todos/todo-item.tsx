import { Todo } from "@/app/lib/definitions";
import Link from "next/link";
import { formattedDate } from "@/app/lib/utils";
import { DeleteTodo, UpdateTodoStatus } from "./buttons";
import { PencilSquareIcon } from "@/app/lib/icons";

export default function ToDo({ todo }: Readonly<{ todo: Todo }>) {
    return (
        <li className="flex justify-between p-4 bg-[--color-background-hover] border border-[--color-separator] border-b-1 hover:bg-[--color-background-hover] mb-2 rounded-sm">
            <div className="flex flex-col">
                <h2 className="text-lg">{todo.title}</h2>
                <p className="text-sm truncate max-w-[350px]">{todo.description}</p>
                <p className="text-sm">Due: {todo.dueDate ? formattedDate(todo.dueDate) : null}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
                {
                    todo.status === 'PENDING' &&
                    <Link href={`/todos/${todo.id}/edit`} className="w-[30px]"><PencilSquareIcon /></Link>
                }
                <UpdateTodoStatus todo={todo} />
                <DeleteTodo id={todo.id} />
            </div>
        </li>
    )
}