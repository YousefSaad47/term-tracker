'use server';

import { prisma } from '@/lib/prisma';
import { createNewsSchema, updateNewsSchema } from '@/lib/validators';
import { FormState } from '@/types';
import { revalidatePath, unstable_cache } from 'next/cache';
import { RATE_LIMIT_MESSAGE, withRateLimit } from '@/lib/rate-limit';
import { withAdmin, type CurrentUser } from '@/lib/admin';

export const getAllNews = unstable_cache(
  async function getAllNews() {
    try {
      return await prisma.news.findMany();
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },
  ['news'],
  { revalidate: 86400, tags: ['news'] }
);

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

async function createNewsAction(
  _currentUser: CurrentUser,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
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

export const createNews = withRateLimit(
  'createNews',
  withAdmin(createNewsAction),
  { message: RATE_LIMIT_MESSAGE } as FormState
);

async function updateNewsAction(
  _currentUser: CurrentUser,
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
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

export const updateNews = withRateLimit(
  'updateNews',
  withAdmin(updateNewsAction),
  { message: RATE_LIMIT_MESSAGE } as FormState
);

async function deleteNewsAction(
  _currentUser: CurrentUser,
  id: string
): Promise<{ success: boolean; message?: string } | undefined> {
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

export const deleteNews = withRateLimit(
  'deleteNews',
  withAdmin(deleteNewsAction),
  {
    success: false,
    message: RATE_LIMIT_MESSAGE,
  }
);
