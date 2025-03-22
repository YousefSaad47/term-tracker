'use server';

import { prisma } from '@/lib/prisma';
import { createSubjectSchema, subjectUpdateSchema } from '@/lib/validators';
import { getCurrentUser } from '@/actions';
import { FormState } from '@/types';
import { revalidatePath, unstable_cache } from 'next/cache';
import { Prisma } from '@prisma/client';

export const getAllSubjects = unstable_cache(
  async function getAllSubjects() {
    try {
      return await prisma.subject.findMany();
    } catch (error) {
      console.error('Error fetching all subjects:', error);
      throw error;
    }
  },
  ['subjects'],
  { revalidate: 86400, tags: ['subjects'] }
);

export const getSubjectById = async (id: string) => {
  try {
    return await prisma.subject.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching subject by id:', error);
    throw error;
  }
};

export const createSubject = async (
  _prevState: FormState,
  formData: FormData
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  if (currentUser.role !== 'ADMIN') {
    return;
  }

  const formDataObj = Object.fromEntries(formData);

  try {
    const validatedFields = createSubjectSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        inputs: {
          name: formDataObj.name,
          description: formDataObj.description,
          slug: formDataObj.slug,
        },
      } as FormState;
    }

    const { slug, name, intro, description } = validatedFields.data;

    await prisma.subject.create({
      data: {
        intro,
        slug,
        description,
        name,
        userId: currentUser.id,
      },
    });

    revalidatePath('/dashboard/subjects');
    revalidatePath('/');
    revalidatePath(`/subjects/${slug}`);

    return {
      success: true,
    };
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;

    if (err.code === 'P2002') {
      return {
        message: 'slug already exists',
        inputs: {
          slug: formDataObj.slug,
          name: formDataObj.name,
          description: formDataObj.description,
        },
      } as FormState;
    }

    console.error('Error creating subject:', error);
    return {
      message: 'Something went wrong',
    } as FormState;
  }
};

export const updateSubject = async (
  subjectId: string,
  _prevState: FormState,
  formData: FormData
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  if (currentUser.role !== 'ADMIN') {
    return;
  }

  const formDataObj = Object.fromEntries(formData);

  try {
    const validatedFields = subjectUpdateSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        inputs: {
          name: formDataObj.name,
          slug: formDataObj.slug,
          description: formDataObj.description,
        },
      } as FormState;
    }

    const { name, slug, intro, description } = validatedFields.data;

    await prisma.subject.update({
      where: { id: subjectId },
      data: {
        name,
        slug,
        intro,
        description,
      },
    });

    revalidatePath(`/dashboard/subjects/${subjectId}/edit`);
    revalidatePath('/dashboard/subjects');
    revalidatePath('/');
    revalidatePath(`/subjects/${slug}`);

    return {
      success: true,
    };
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;

    if (err.code === 'P2002') {
      return {
        message: 'slug already exists',
        inputs: {
          slug: formDataObj.slug,
          name: formDataObj.name,
          description: formDataObj.description,
        },
      } as FormState;
    }

    console.error('Error updating subject:', error);
    return {
      message: 'Something went wrong',
    } as FormState;
  }
};

export async function deleteSubject(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  if (currentUser.role !== 'ADMIN') {
    return;
  }

  try {
    const { slug } = await prisma.subject.delete({
      where: { id },
    });
    revalidatePath('/dashboard/subjects');
    revalidatePath('/');
    revalidatePath(`/subjects/${slug}`);
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
}

export async function getSubjectBySlug(slug: string) {
  try {
    return await prisma.subject.findUnique({
      where: { slug },
      include: {
        weeks: { orderBy: { weekNumber: 'asc' } },
      },
    });
  } catch (error) {
    console.error('Error fetching subject by slug:', error);
    throw error;
  }
}

export async function getSubjectSlug(subjectId: string) {
  try {
    const result = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { slug: true },
    });
    return result?.slug;
  } catch (error) {
    console.error('Error fetching subject slug:', error);
    throw error;
  }
}
