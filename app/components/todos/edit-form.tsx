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

    return <form action={formAction} className="shadow-x mx-4">
        <div className="rounded-t-md bg-black/10 p-4 md:p-6">
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
                    className="block w-full bg-black/10 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 "
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
                    className="block w-full bg-black/10  rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 "
                    defaultValue={todo.description}
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
                    className="block w-full bg-black/10 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 "
                    defaultValue={todo.dueDate.toString()}
                    onChange={e => console.log('e: ', e.target.value)}
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
                <legend>Prioritize</legend>

                <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="prioritize" id="yes" value={'yes'} aria-describedby="prioritize-error" defaultChecked={todo.prioritize} />
                        <label htmlFor="yes" className="text-sm font-medium">Yes</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="prioritize" id="no" value={'no'} aria-describedby="prioritize-error" defaultChecked={!todo.prioritize} />
                        <label htmlFor="no" className="text-sm font-medium">No</label>
                    </div>
                </div>
                <div id="prioritize-error" aria-live="polite" aria-atomic="true">
                    {
                        state.errors?.prioritize &&
                        state.errors.prioritize.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                        ))
                    }
                </div>
            </fieldset>
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
        <div className="flex justify-end gap-5 rounded-b-md bg-black/10 border-t-2 border-t-current p-4 md:p-6">
            <LinkButton path="/todos" classNames="rounded-md" >Cancel</LinkButton>
            <Button type="submit" aria-disabled={isPending} className={buttonStyle} >Update</Button>
        </div>
    </form>
}