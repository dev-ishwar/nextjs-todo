'use client';
import { editTodo, State } from "@/app/lib/actions/todo-actions"
import { useActionState } from "react"
import { Button } from "../button";
import LinkButton from "../link-button";
import { buttonStyle } from "@/app/lib/styles";
import { Todo } from "@/app/lib/definitions";

const initialState: State = {
    errors: {},
    message: null,
}
export default function EditTodo({
    todo
}: {
    todo: Todo
}) {
    const editTodoWithId = editTodo.bind(null, todo.id)
    const [state, formAction, isPending] = useActionState(editTodoWithId, initialState);

    return <form action={formAction} className="shadow-x px-10">
        <div className="rounded-t-md">
            <div className="mt-4">
                <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium"
                >Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    aria-describedby="title-error"
                    placeholder="Enter title"
                    className="block w-full rounded-md border p-2 text-sm outline-2 "
                    defaultValue={todo.title}
                />
                <div id="title-error" aria-live="polite" aria-atomic="true">
                    {
                        state.errors?.title &&
                        state.errors.title.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                        ))
                    }
                </div>
            </div>
            <div className="mt-4">
                <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium"
                >Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    aria-describedby="description-error"
                    placeholder="Enter description"
                    className="block w-full  rounded-md border p-2 text-sm outline-2 "
                    defaultValue={todo.description ?? ""}
                />
                <div id="description-error" aria-live="polite" aria-atomic="true">
                    {
                        state.errors?.description &&
                        state.errors.description.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                        ))
                    }
                </div>
            </div>
            <div className="mt-4">
                <label
                    htmlFor="dueDate"
                    className="mb-2 block text-sm font-medium"
                >Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    aria-describedby="dueDate-error"
                    className="block w-full rounded-md border p-2 text-sm outline-2"
                    defaultValue={todo.dueDate ?? ""}
                />
                <div id="dueDate-error" aria-live="polite" aria-atomic="true">
                    {
                        state.errors?.dueDate &&
                        state.errors.dueDate.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                        ))
                    }
                </div>
            </div>
            <fieldset className="mt-4">
                <legend>Status</legend>
                <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="status" id="completed" value={'COMPLETED'} aria-describedby="status-error" defaultChecked={todo.status === 'COMPLETED'} />
                        <label htmlFor="completed" className="text-sm font-medium">Complete</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="status" id="pending" value={'PENDING'} aria-describedby="status-error" defaultChecked={todo.status === 'PENDING'} />
                        <label htmlFor="pending" className="text-sm font-medium">Pending</label>
                    </div>
                </div>
                <div id="status-error" aria-live="polite" aria-atomic="true">
                    {
                        state.errors?.status &&
                        state.errors.status.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                        ))
                    }
                </div>
            </fieldset>
        </div>
        <div className="flex justify-end gap-5 rounded-b-md border-t-2 border-t-[--color-separator] mt-4 md:mt-6 pt-4 md:pt-6">
            <LinkButton path="/todos" aria-disabled={isPending} classNames="rounded-md" >Cancel</LinkButton>
            <Button type="submit" aria-disabled={isPending} className={buttonStyle} >Update</Button>
        </div>
    </form>
}