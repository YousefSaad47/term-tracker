import { EditSubjectForm } from '@/components/subjects';
import { getSubjectById } from '@/actions';
import { Suspense } from 'react';
import { EditSubjectFormSkeleton } from '@/components/subjects';

interface EditSubjectFormProps {
  params: Promise<{ id: string }>;
}

export default async function EditSubjectPage({
  params,
}: EditSubjectFormProps) {
  const { id } = await params;
  const getsubjectByIdPromise = getSubjectById(id);

  return (
    <Suspense fallback={<EditSubjectFormSkeleton />}>
      <EditSubjectForm getsubjectByIdPromise={getsubjectByIdPromise} />
    </Suspense>
  );
}
