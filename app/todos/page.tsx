import LinkButton from "../components/link-button";
import Todos from "../components/todos/todo-list";

export default function Page() {
    return (
        <main className="p-5 md:w-[80%] mx-auto">
            <div className="mb-10">
                <LinkButton path={'/todos/add'}>ADD TODO</LinkButton>
            </div>
            <Todos />
        </main>
    )
}