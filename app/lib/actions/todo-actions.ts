'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import prisma from '../prisma';

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
    status: z.enum(['COMPLETED', 'PENDING'], {
        invalid_type_error: 'Please select a task status'
    }),
})

const AddTodo = FormSchema.omit({ id: true, status: true });
const EditTodo = FormSchema.omit({ id: true });
const UpdateStatus = FormSchema.pick({ id: true, status: true });

export type State = {
    errors?: {
        title?: string[],
        description?: string[],
        dueDate?: string[],
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
    })

    // Return early if form validation fails
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to add todo."
        }
    }

    // prepare data for insertion into DB
    const { title, description, dueDate } = validatedFields.data;
    const status = 'PENDING';

    try {
        // await sql`INSERT INTO todos (title, description, dueDate, status) VALUES (${title}, ${description}, ${dateISOString}, ${priority}, ${status})`
        const session = await auth();
        if (!session?.user?.email) {
            return {
                message: 'Session error. Please login again to continue.'
            }
        }
        await prisma.task.create({
            data: {
                title: title,
                description: description,
                dueDate: dueDate,
                status: status,
                user: { connect: { email: session?.user?.email } }
            },
        })
    } catch (error) {
        console.log('error: ', error);
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
        status: formdata.get('status'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update todo.'
        }
    }
    const { title, description, dueDate, status } = validatedFields.data;

    try {
        await prisma.task.update({
            where: { id: id },
            data: {
                title: title,
                description: description,
                dueDate: dueDate,
                status: status,
            }
        })
    } catch (error) {
        console.log('error: ', error)
        return {
            message: 'DB Error. Failed to update todo.'
        }
    }

    revalidatePath('/todos');
    redirect('/todos');
}

export async function deleteTodo(id: string, prevState: State, formData: FormData) {
    try {
        await prisma.task.delete({
            where: { id: id }
        })
        revalidatePath('/todos');
        return { message:  `Task deleted successfully.` };
    } catch (error) {
        console.log('error: ', error)
        return { message:  `Failed to delete task` };
    }
}

export async function updateTodoStatus(formdata: FormData) {
    try {
        const validatedFields = UpdateStatus.safeParse({
            id: formdata.get('id'),
            status: formdata.get('status')
        })

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing status. Failed to update status.'
            }
        }

        const { id, status } = validatedFields.data;
        await prisma.task.update({
            where: { id: id },
            data: { status: status }
        });
        revalidatePath("/todos");
        return {
            message: `Task updated successfully`
        }
    } catch (error) {
        return {
            message: error instanceof Error ? error.message : 'DB Error. Failed to update todo.'
        }
    }
}