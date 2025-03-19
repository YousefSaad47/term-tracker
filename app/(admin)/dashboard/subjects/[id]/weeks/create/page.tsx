import { getWeeksBySubject } from '@/actions';
import { CreateWeekForm } from '@/components/weeks';

interface CreateWeekPageProps {
  params: Promise<{ id: string }>;
}

export default async function CreateWeekPage({ params }: CreateWeekPageProps) {
  const { id } = await params;
  const getWeeksBySubjectPromise = getWeeksBySubject(id);
  return (
    <CreateWeekForm
      getWeeksBySubjectPromise={getWeeksBySubjectPromise}
      subjectId={id}
    />
  );
}
