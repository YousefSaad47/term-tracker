import { MDWrapper } from '../md-wrapper';

interface WeekContentProps {
  content?: string;
}

const WeekContent: React.FC<WeekContentProps> = ({ content }) => (
  <div dir="rtl" className="markdown-content">
    {content ? (
      <MDWrapper content={content} />
    ) : (
      <p className="text-muted-foreground">لا يوجد محتوى لهذا الأسبوع.</p>
    )}
  </div>
);

export default WeekContent;
