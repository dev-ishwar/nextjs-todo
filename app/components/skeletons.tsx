export const TodoTableSkeleton = () => {
    return (
        <main>
            <ul>
                <li className="flex animate-pulse justify-between p-4 bg-[--color-background-hover] border border-[--color-separator] border-b-0 last-of-type:border-b-[1px] hover:bg-[--color-background-hover] first-of-type:mt-10 mb-2 rounded-sm min-h-20"></li>
                <li className="flex animate-pulse justify-between p-4 bg-[--color-background-hover] border border-[--color-separator] border-b-0 last-of-type:border-b-[1px] hover:bg-[--color-background-hover] first-of-type:mt-10 mb-2 rounded-sm min-h-20"></li>
            </ul>
        </main>
    )
}