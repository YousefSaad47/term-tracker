'use server';

import { signinSchema } from '@/lib/validators';
import { FormState } from '@/types';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateJWT } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
