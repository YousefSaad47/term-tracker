import { getCurrentUser } from '@/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signout } from '@/actions';
import React from 'react';

export default async function UserNavigation() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return (
      <form action={signout}>
        <Button type="submit" className="w-full" variant="destructive">
          Sign Out
        </Button>
      </form>
    );
  } else {
    return (
      <Button asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
    );
  }
}
