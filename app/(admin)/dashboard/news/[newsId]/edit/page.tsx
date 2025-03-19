import { EditNewsForm } from '@/components/news';
import { getNewsById } from '@/actions';
import { Suspense } from 'react';
import { EditNewsFormSkeleton } from '@/components/news';

interface EditSubjectFormProps {
  params: Promise<{ newsId: string }>;
}

export default async function EditSubjectPage({
  params,
}: EditSubjectFormProps) {
  const { newsId } = await params;
  const getNewsByIdPromise = getNewsById(newsId);

  return (
    <Suspense fallback={<EditNewsFormSkeleton />}>
      <EditNewsForm getNewsByIdPromise={getNewsByIdPromise} />
    </Suspense>
  );
}
