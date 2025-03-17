import { cn } from '@/lib/utils';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={cn('container mx-auto min-h-[50vh] mt-20', className)}>
      {children}
    </div>
  );
};

export default Box;
