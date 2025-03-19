import { Suspense } from 'react';
import { SubjectTimeLine } from '@/components/subjects';
import { Loader2 } from 'lucide-react';
import { getSubjectBySlug, getAllSubjects } from '@/actions';

export async function generateStaticParams() {
  const subjects = await getAllSubjects();
  return subjects.map((subject) => ({
    slug: subject.slug,
  }));
}

interface SubjectPageProps {
  params: Promise<{ slug: string }>;
}

const SubjectsPage: React.FC<SubjectPageProps> = async ({ params }) => {
  const { slug } = await params;
  const getsubjectbySlugPromise = getSubjectBySlug(slug);

  return (
    <Suspense
      fallback={<Loader2 className="absolute top-1/2 left-1/2 animate-spin" />}
    >
      <SubjectTimeLine getSubjectbySlugPromise={getsubjectbySlugPromise} />
    </Suspense>
  );
};

export default SubjectsPage;
