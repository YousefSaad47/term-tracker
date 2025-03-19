'use server';

import { prisma } from '@/lib/prisma';
import { createNewsSchema, updateNewsSchema } from '@/lib/validators';
import { FormState } from '@/types';
import { getCurrentUser } from '@/actions';
import { revalidatePath } from 'next/cache';

export async function getAllNews() {
  try {
    return await prisma.news.findMany();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export async function getNewsById(id: string) {
  try {
    return await prisma.news.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching news by id:', error);
    throw error;
  }
}

export async function createNews(_prevState: FormState, formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;
  if (currentUser.role !== 'ADMIN') return;

  const formDataObj = Object.fromEntries(formData);

  const validatedFields = createNewsSchema.safeParse(formDataObj);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        content: formDataObj.content,
      },
    } as FormState;
  }

  const { content, isPublished } = validatedFields.data;

  try {
    const news = await prisma.news.create({
      data: {
        content: content,
        isPublished,
      },
    });

    revalidatePath('/');
    revalidatePath('/dashboard/news');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
}

export async function updateNews(
  id: string,
  _prevState: FormState,
  formData: FormData
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;
  if (currentUser.role !== 'ADMIN') return;

  const formDataObj = Object.fromEntries(formData);

  const validatedFields = updateNewsSchema.safeParse(formDataObj);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        content: formDataObj.content,
      },
    } as FormState;
  }

  const { content, isPublished } = validatedFields.data;

  try {
    const news = await prisma.news.update({
      where: { id },
      data: {
        content: content,
        isPublished: isPublished ?? false,
      },
    });

    revalidatePath('/');
    revalidatePath('/dashboard/news');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

export async function deleteNews(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;
  if (currentUser.role !== 'ADMIN') return;

  try {
    await prisma.news.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/dashboard/news');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}
