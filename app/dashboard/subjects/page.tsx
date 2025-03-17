import { getAllSubjects } from '@/actions/subject-actions';
import { SubjectsTable } from '@/components/subjects-table';
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
