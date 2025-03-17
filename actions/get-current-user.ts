'use server';

import { verifyJWT } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export const getCurrentUser = async () => {
  const token = (await cookies()).get('access_token')?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: payload.sub,
    },
    omit: {
      password: true,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
};
