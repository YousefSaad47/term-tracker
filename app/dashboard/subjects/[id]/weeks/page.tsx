import { Suspense } from 'react';
import { WeeksTable } from '@/components/weeks-table';
import { TableSkeleton } from '@/components/table-skeleton';
import { getWeeksBySubject } from '@/actions/week-actions';

interface SubjectWeeksPageProps {
  params: Promise<{ id: string }>;
}

export default async function SubjectWeeksPage({
  params,
}: SubjectWeeksPageProps) {
  const { id } = await params;

  const weeksBySubjectPromise = getWeeksBySubject(id);
  return (
    <Suspense fallback={<TableSkeleton />}>
      <WeeksTable
        subjectId={id}
        weeksBySubjectPromise={weeksBySubjectPromise}
      />
    </Suspense>
  );
}
