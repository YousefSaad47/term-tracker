'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-white dark:bg-black">
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
          <AlertTriangle size={80} className="text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Something went wrong!
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
            An unexpected error occurred. Please try again.
          </p>
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
