'use server';

import { prisma } from '@/lib/prisma';
import { createWeekSchema, updateWeekSchema } from '@/lib/validators';
import { getCurrentUser } from '@/actions/get-current-user';
import { FormState } from '@/types';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { getSubjectSlug } from './subject-actions';

export async function getWeeksBySubject(subjectId: string) {
  try {
    return await prisma.week.findMany({
      where: { subjectId },
      orderBy: { weekNumber: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching weeks for subject:', error);
    throw error;
  }
}

export async function getWeekById(id: string) {
  try {
    return await prisma.week.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching week:', error);
    throw error;
  }
}

export const createWeek = async (
  subjectId: string,
  _prevState: FormState,
  formData: FormData
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;
  if (currentUser.role !== 'ADMIN') return;

  const formDataObj = Object.fromEntries(formData);

  try {
    const validatedFields = createWeekSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        inputs: {
          weekNumber: Number(formDataObj.weekNumber),
        },
      } as FormState;
    }

    const { weekNumber, content, isPublished } = validatedFields.data;

    await prisma.week.create({
      data: {
        weekNumber: weekNumber,
        content: content as string,
        isPublished,
        subjectId,
        userId: currentUser.id,
      },
    });

    const slug = await getSubjectSlug(subjectId);

    revalidatePath(`/dashboard/subjects/${subjectId}/weeks`);
    revalidatePath(`/subjects/${slug}`);

    return {
      success: true,
    };
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;
    if (err.code === 'P2002') {
      return {
        message: 'Week number already exists for this subject',
        inputs: {
          weekNumber: Number(formDataObj.weekNumber),
          content: formDataObj.content as string,
        },
      } as FormState;
    }
    console.error('Error creating week:', error);
    return {
      message: 'Something went wrong',
    } as FormState;
  }
};

export const updateWeek = async (
  weekId: string,
  subjectId: string,
  _prevState: FormState,
  formData: FormData
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;
  if (currentUser.role !== 'ADMIN') return;

  const formDataObj = Object.fromEntries(formData);

  try {
    const validatedFields = updateWeekSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        inputs: {
          weekNumber: Number(formDataObj.weekNumber),
          content: formDataObj.content,
        },
      } as FormState;
    }

    const { weekNumber, content, isPublished } = validatedFields.data;

    await prisma.week.update({
      where: { id: weekId },
      data: {
        weekNumber,
        content,
        isPublished: isPublished ?? false,
      },
    });

    const slug = await getSubjectSlug(subjectId);

    revalidatePath(`/dashboard/subjects/${subjectId}/weeks`);
    revalidatePath(`/subjects/${slug}`);

    return {
      success: true,
    };
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;
    if (err.code === 'P2002') {
      return {
        message: 'Week number already exists for this subject',
        inputs: {
          weekNumber: Number(formDataObj.weekNumber),
          content: String(formDataObj.content),
        },
      } as FormState;
    }
    console.error('Error updating week:', error);
    return {
      message: 'Something went wrong',
    } as FormState;
  }
};

export async function deleteWeek(id: string, subjectId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;
  if (currentUser.role !== 'ADMIN') return;

  try {
    await prisma.week.delete({
      where: { id },
    });

    const slug = await getSubjectSlug(subjectId);

    revalidatePath(`/dashboard/subjects/${subjectId}/weeks`);
    revalidatePath(`/subjects/${slug}`);
  } catch (error) {
    console.error('Error deleting week:', error);
    throw error;
  }
}
