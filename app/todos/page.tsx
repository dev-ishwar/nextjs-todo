import { Suspense } from "react";
import LinkButton from "../components/link-button";
import Todos from "../components/todos/todo-list";
import { TodoTableSkeleton } from "../components/skeletons";

export default async function Page() {
    return (
        <main className="p-5 md:w-[80%] mx-auto ">
            <div>
                <LinkButton path={'/todos/add'}>ADD TODO</LinkButton>
            </div>
            <Suspense fallback={<TodoTableSkeleton />}>
                <Todos />
            </Suspense>
        </main>
    )
}