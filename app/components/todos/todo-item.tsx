import { Todo } from "@/app/lib/definitions";
import { StarBlank, StarFilled } from "@/app/components/stars";
import { CheckboxChecked, CheckboxUnchecked } from "@/app/components/checkboxes";
import Link from "next/link";
import { EditIcon } from "@/app/components/edit-icon";
import { formattedDate } from "@/app/lib/utils";

export default function ToDo({ todo }: Readonly<{ todo: Todo }>) {
    return (
        <li className="flex flex-col p-4 border border-b-1 last-of-type:border-b-0">
            <div className="flex justify-between w-full">
                <h2>{todo.title}</h2>
                {
                    <button type="button">
                        {
                            todo.prioritize
                                ? <StarFilled />
                                : <StarBlank />
                        }
                    </button>
                }
            </div>
            <div className="flex justify-between">
                <div className="">
                    <p className="truncate max-w-[350px]">{todo.description}</p>
                    <p>Due: {formattedDate(todo.dueDate)}</p>
                </div>
                <div className="flex items-center">
                    <button type="button">
                        {
                            todo.status === 'COMPLETED'
                                ? <CheckboxChecked />
                                : <CheckboxUnchecked />
                        }

                    </button>
                    <button type="button" >
                        {
                            todo.status === 'PENDING' &&
                            <Link href={`/todos/${todo.id}/edit`}><EditIcon /></Link>
                        }
                    </button>
                </div>
            </div>
        </li>
    )
}