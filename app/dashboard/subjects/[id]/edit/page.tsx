import EditSubjectForm from '@/components/edit-subject-form';
import { getSubjectById } from '@/actions/subject-actions';
import { Suspense } from 'react';
import { EditSubjectFormSkeleton } from '@/components/edit-subject-form-skeleton';

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
