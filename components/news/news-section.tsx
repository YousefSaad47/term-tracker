import { Suspense } from 'react';
import { NewsCards } from '@/components/news';
import { NewsCardsSkeleton } from '@/components/news';
import { getAllNews } from '@/actions/news-actions';

export default async function NewsSection() {
  const newsPromise = getAllNews();

  return (
    <Suspense fallback={<NewsCardsSkeleton count={3} />}>
      <NewsCards newsPromise={newsPromise} />
    </Suspense>
  );
}
