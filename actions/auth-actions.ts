'use server';

import { signinSchema, signupSchema } from '@/lib/validators';
import { FormState } from '@/types';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateJWT } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';

export const signin = async (_prevState: FormState, formData: FormData) => {
  const formDataObj = Object.fromEntries(formData);

  const validatedFields = signinSchema.safeParse(formDataObj);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        email: formDataObj.email,
        password: formDataObj.password,
      },
    } as FormState;
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      message: 'Invalid email or password',
      inputs: {
        email,
        password,
      },
    } as FormState;
  }

  const accessToken = await generateJWT(user.id, user.role, '1d');

  (await cookies()).set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  });

  return redirect('/');
};

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

export const signout = async () => {
  (await cookies()).delete('access_token');

  redirect('/signin');
};
