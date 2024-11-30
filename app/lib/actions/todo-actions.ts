'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    title: z.string({
        invalid_type_error: 'Enter task name',
    })
        .min(1, { message: 'Enter title' }),
    description: z.string({
        invalid_type_error: 'Enter task description'
    })
        .min(1, { message: 'Enter description' }),
    dueDate: z.string().date(),
    prioritize: z.string({
        invalid_type_error: "Select priority"
    }),
    status: z.enum(['COMPLETED', 'PENDING'], {
        invalid_type_error: 'Please select a task status'
    }),
})

const AddTodo = FormSchema.omit({ id: true, status: true });
const EditTodo = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        title?: string[],
        description?: string[],
        dueDate?: string[],
        prioritize?: string[],
        status?: string[],
    },
    message?: string | null,
}

export async function addTodo(prevState: State, formdata: FormData) {
    // validate form using zod
    const validatedFields = AddTodo.safeParse({
        title: formdata.get('title'),
        description: formdata.get('description'),
        dueDate: formdata.get('dueDate'),
        prioritize: formdata.get('prioritize'),
    })

    // Return early if form validation fails
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to add todo."
        }
    }

    // prepare data for insertion into DB
    const { title, description, dueDate, prioritize } = validatedFields.data;
    const status = 'PENDING';
    const priority = prioritize === 'yes';
    const dateISOString = dueDate; //default YYYY-MM-DD format returned from Date field
    try {
        await sql`INSERT INTO todos (title, description, dueDate, prioritize, status) VALUES (${title}, ${description}, ${dateISOString}, ${priority}, ${status})`
    } catch (error) {
        return {
            message: 'DB Error. Failed to add todo.'
        }
    }

    revalidatePath('/todos');
    redirect('/todos');
}

export async function editTodo(id: string, prevState: State, formdata: FormData) {
    const validatedFields = EditTodo.safeParse({
        title: formdata.get('title'),
        description: formdata.get('description'),
        dueDate: formdata.get('dueDate'),
        prioritize: formdata.get('prioritize'),
        status: formdata.get('status'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update todo.'
        }
    }

    console.log("validatedFields.data : ", validatedFields.data)
    const { title, description, dueDate, prioritize, status } = validatedFields.data;
    const dateISOString = dueDate;  //default YYYY-MM-DD format returned from Date field
    try {
        await sql`
        UPDATE todos
        SET title = ${title}, description = ${description}, dueDate = ${dateISOString}, prioritize = ${prioritize}, status = ${status}
        WHERE id = ${id}
        `;
    } catch (error) {
        return {
            message: 'DB Error. Failed to update todo.'
        }
    }

    revalidatePath('/todos');
    redirect('/todos');
}

export async function deleteTodo(id: string) {
    try {
        await sql`
        DELETE FROM todos where id = ${id}
        `;
        revalidatePath('/todos');
        return { message: 'Todo Deleted' };
    } catch (error) {
        return {
            message: 'DB Error. Failed to delete todo.'
        }
    }
}