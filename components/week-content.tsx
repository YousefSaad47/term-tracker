import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdownComponents = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  a: ({ node, ...props }: any) => (
    <a {...props} className="text-blue-500 hover:underline" />
  ),
};

interface WeekContentProps {
  lectureContent?: string[];
  sectionContent?: string[];
  extraContent?: string[];
}

const WeekContent: React.FC<WeekContentProps> = ({
  lectureContent,
  sectionContent,
  extraContent,
}) => (
  <div className="space-y-4">
    <div>
      <h4 className="text-lg font-bold text-primary">Lecture:</h4>
      <div className="pl-4" dir="auto">
        {lectureContent && lectureContent.length > 0 ? (
          lectureContent.map((content, i) => (
            <div key={i} className="mb-4">
              <ReactMarkdown components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </div>
          ))
        ) : (
          <p>No lecture this week</p>
        )}
      </div>
    </div>
    <div>
      <h4 className="text-lg font-bold text-primary">Section:</h4>
      <div className="pl-4" dir="auto">
        {sectionContent && sectionContent.length > 0 ? (
          sectionContent.map((content, i) => (
            <div key={i} className="mb-4">
              <ReactMarkdown components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </div>
          ))
        ) : (
          <p>No section this week</p>
        )}
      </div>
    </div>
    {extraContent && extraContent.length > 0 && (
      <div className="mt-10" dir="auto">
        {extraContent.map((content, i) => (
          <div key={i} className="mb-4">
            <ReactMarkdown components={markdownComponents}>
              {content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default WeekContent;
