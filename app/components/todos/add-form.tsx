'use client';
import { addTodo } from "@/app/lib/actions/todo-actions"
import { useActionState } from "react"
import { Button } from "../button";
import LinkButton from "../link-button";
import { buttonStyle } from "@/app/lib/styles";
import Loading from "@/app/loading";

const initialState = {
    errors: {},
    message: "",
}
export default function AddTodo() {
    const [state, formAction, isPending] = useActionState(addTodo, initialState);

    return (
        <>
            {isPending && <Loading />}
            <form action={formAction} className="shadow-x px-10">
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
                            className="block w-full rounded-md border  p-2 text-sm outline-2  "
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
                            className="block w-full  rounded-md border  p-2 text-sm outline-2  "
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
                            className="block w-full rounded-md border placeholder:text-gray-100 p-2 text-sm outline-2  "
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
                </div>
                <div className="flex justify-end gap-5 rounded-b-md border-t-2 border-t-[--color-separator] mt-4 md:mt-6 pt-4 md:pt-6">
                    <LinkButton path="/todos" classNames="rounded-md" aria-disabled={isPending} >Cancel</LinkButton>
                    <Button type="submit" aria-disabled={isPending} className={buttonStyle} >Add</Button>
                </div>
            </form>
        </>
    )
}