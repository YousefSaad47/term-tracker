import { getAllNews } from '@/actions';
import { NewsTable } from '@/components/news';
import { TableSkeleton } from '@/components/table-skeleton';
import { Suspense } from 'react';

export default function NewsPage() {
  const newsPromise = getAllNews();
  return (
    <Suspense fallback={<TableSkeleton />}>
      <NewsTable newsPromise={newsPromise} />
    </Suspense>
  );
}
