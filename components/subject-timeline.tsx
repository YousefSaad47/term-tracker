import { use } from 'react';
import { Timeline } from '@/components/ui/timeline';
import WeekContent from './week-content';
import { FullSubjectType } from '@/types';
import { notFound } from 'next/navigation';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface SubjectTimeLineProps {
  getSubjectbySlugPromise: Promise<FullSubjectType>;
}

export const SubjectTimeLine: React.FC<SubjectTimeLineProps> = ({
  getSubjectbySlugPromise,
}) => {
  const subject = use(getSubjectbySlugPromise);

  if (!subject) {
    notFound();
  }

  const timelineData: TimelineEntry[] = [
    {
      title: 'Intro',
      content: (
        <WeekContent content={subject?.intro || 'No introduction provided.'} />
      ),
    },
  ];

  if (subject?.weeks && subject.weeks.length > 0) {
    const weekEntries = subject.weeks
      .filter((week) => week.isPublished)
      .map((week) => ({
        title: `Week ${week.weekNumber}`,
        content: <WeekContent content={week.content} />,
      }));
    timelineData.push(...weekEntries);
  }

  return (
    <div className="w-full">
      <Timeline data={timelineData} title={subject?.name as string} />
    </div>
  );
};
