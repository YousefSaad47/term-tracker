import { Suspense } from 'react';
import { SubjectTimeLine } from '@/components/subject-timeline';
import { Loader2 } from 'lucide-react';

export async function generateStaticParams() {
  return [
    {
      slug: 'artificial-intelligence',
    },
    {
      slug: 'web-programming',
    },
    {
      slug: 'operating-system-theories',
    },
    {
      slug: 'computer-science-topics',
    },
    {
      slug: 'digital-art',
    },
    {
      slug: 'digital-signals',
    },
  ];
}

interface SubjectPageProps {
  params: Promise<{ slug: string }>;
}

const SubjectsPage: React.FC<SubjectPageProps> = async ({ params }) => {
  return (
    <Suspense
      fallback={<Loader2 className="absolute top-1/2 left-1/2 animate-spin" />}
    >
      <SubjectTimeLine params={params} />
    </Suspense>
  );
};

export default SubjectsPage;
