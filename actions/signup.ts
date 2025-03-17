'use server';

import { prisma } from '@/lib/prisma';
import { signupSchema } from '@/lib/validators';
import { FormState } from '@/types';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { signin } from './signin';

export const signup = async (_prevState: FormState, formData: FormData) => {
  const formDataObj = Object.fromEntries(formData);

  const validatedFields = signupSchema.safeParse(formDataObj);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        name: formDataObj.name,
        email: formDataObj.email,
        password: formDataObj.password,
      },
    } as FormState;
  }

  const { name, email, password } = validatedFields.data;

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
  } catch (error) {
    const err = error as Prisma.PrismaClientKnownRequestError;

    if (err.code === 'P2002') {
      return {
        message: 'Email is already in use',
        inputs: {
          name: formDataObj.name,
          email: formDataObj.email,
          password: formDataObj.password,
        },
      } as FormState;
    }
  }

  await signin(_prevState, formData);
};
