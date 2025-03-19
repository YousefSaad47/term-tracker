import { getAllSubjects } from '@/actions';
import { SubjectsTable } from '@/components/subjects';
import { TableSkeleton } from '@/components/table-skeleton';
import { Suspense } from 'react';

export default function SubjectsPage() {
  const subjectsPromise = getAllSubjects();
  return (
    <Suspense fallback={<TableSkeleton />}>
      <SubjectsTable subjectsPromise={subjectsPromise} />
    </Suspense>
  );
}
