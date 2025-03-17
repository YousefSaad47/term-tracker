import EditWeekForm from '@/components/edit-week-form';
import { Suspense } from 'react';
import { EditWeekFormSkeleton } from '@/components/edit-week-form-skeleton';
import { getWeekById } from '@/actions/week-actions';

interface EditWeekPageProps {
  params: Promise<{ weekId: string; id: string }>;
}

export default async function EditWeekPage({ params }: EditWeekPageProps) {
  const { weekId, id } = await params;
  const getWeekByIdPromise = getWeekById(weekId);

  return (
    <Suspense fallback={<EditWeekFormSkeleton />}>
      <EditWeekForm subjectId={id} getWeekByIdPromise={getWeekByIdPromise} />
    </Suspense>
  );
}
