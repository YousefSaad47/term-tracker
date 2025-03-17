'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signout = async () => {
  (await cookies()).delete('access_token');

  redirect('/signin');
};
