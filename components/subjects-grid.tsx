import { Suspense } from 'react';
import { SubjectsGridSkeleton } from './subjects-grid-skeleton';
import { SubjectsGridContent } from './subjects-grid-content';

export default function SubjectsGrid() {
  return (
    <Suspense fallback={<SubjectsGridSkeleton />}>
      <SubjectsGridContent />
    </Suspense>
  );
}
