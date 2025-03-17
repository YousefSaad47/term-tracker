import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LucideAlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-center p-4">
      <LucideAlertTriangle size={80} className="text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
        Ooops! Page Not Found.
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/" className="inline-block">
        <Button variant="outline">Go Home</Button>
      </Link>
    </div>
  );
}
