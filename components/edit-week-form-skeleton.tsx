'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function EditWeekFormSkeleton() {
  return (
    <div className="container space-y-6 max-w-md p-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-1/4" />
      </div>
      <div className="mt-8">
        <Skeleton className="h-6 w-40 mx-auto" />{' '}
        <div className="space-y-2 mt-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
