'use client';

import { Timeline } from '@/components/ui/timeline';
import WeekContent from '@/components/weeks/week-content';
import { FullSubjectType } from '@/types';
import { notFound, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { use, useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

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

  const ref = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(true);
  const { back } = useRouter();

  const scrollToElement = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const threshold = scrollableHeight * 0.75;
      const scrollTop = window.scrollY;
      setShowArrow(scrollTop < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <Button
        variant="secondary"
        className="fixed top-1 right-1 md:top-8 md:right-8 rounded-full z-1"
        onClick={back}
      >
        <FaArrowRight />
      </Button>

      {showArrow && (
        <Button
          variant={'secondary'}
          onClick={scrollToElement}
          className="fixed bottom-1 right-1 md:bottom-8 md:right-8 z-1 rounded-full"
        >
          <FaArrowDown />
        </Button>
      )}

      <Timeline data={timelineData} title={subject?.name as string} />
      <div ref={ref} />
    </div>
  );
};
