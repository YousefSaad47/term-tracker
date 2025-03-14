'use client';

import { use } from 'react';
import { Timeline } from '@/components/ui/timeline';
import {
  WEB_PROGRAMMING_DATA,
  AI_DATA,
  COMPUTER_SCIENCE_TOPICS,
  DIGITAL_ART,
  DIGITAL_SIGNALS,
  OPERATING_SYSTEM_THEORIES,
} from '@/lib/constants';

interface SubjectTimeLineProps {
  params: Promise<{ slug: string }>;
}

export const SubjectTimeLine: React.FC<SubjectTimeLineProps> = ({ params }) => {
  const slug = use(params).slug;

  let data;
  let title;
  if (slug === 'artificial-intelligence') {
    data = AI_DATA;
    title = 'Artificial Intelligence';
  } else if (slug === 'web-programming') {
    data = WEB_PROGRAMMING_DATA;
    title = 'Web Programming';
  } else if (slug === 'operating-system-theories') {
    data = OPERATING_SYSTEM_THEORIES;
    title = 'Operating System Theories';
  } else if (slug === 'computer-science-topics') {
    data = COMPUTER_SCIENCE_TOPICS;
    title = 'Computer Science Topics';
  } else if (slug === 'digital-ary') {
    data = DIGITAL_ART;
    title = 'Digital ARY';
  } else {
    data = DIGITAL_SIGNALS;
    title = 'Digital Signals';
  }
  return (
    <div className="w-full">
      <Timeline data={data!} title={title!} />
    </div>
  );
};
