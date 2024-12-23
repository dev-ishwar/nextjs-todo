"use client";

import { deleteTodo, updateTodoStatus } from "@/app/lib/actions/todo-actions";
import { Todo } from "@/app/lib/definitions";
import { CheckCircleIcon, MinusCircleIcon, TrashIcon } from "@/app/lib/icons";
import Loading from "@/app/loading";
import { useActionState, useState } from "react";

export function UpdateTodoStatus({ todo }: Readonly<{ todo: Todo }>) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleStatusUpdate = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('id', todo.id);
        formData.append('status', todo.status === "COMPLETED" ? 'PENDING' : 'COMPLETED');
        const response = await updateTodoStatus(formData);
        setMessage(response.message);
    }

    return (
        <>
            {
                loading && <Loading />
            }
            <button type="button" className="w-[30px]" onClick={handleStatusUpdate}>
                {
                    todo.status === 'COMPLETED'
                        ? <CheckCircleIcon title="Mark Pending" />
                        : <MinusCircleIcon title="Mark Done" />
                }
            </button>
            <div className="sr-only">{message}</div>
        </>
    )
}

export function DeleteTodo({ id }: Readonly<{ id: string }>) {
    const deleteTodoWithId = deleteTodo.bind(null, id);
    const [state, formAction, isPending] = useActionState(deleteTodoWithId, { message: "" })

    return (
        <form action={formAction} className="inline-flex items-center">
            <button className="w-[30px]">
                <TrashIcon />
            </button>
            {
                isPending &&
                <Loading />
            }
            <div className="sr-only">{state.message}</div>
        </form>
    )
}