interface NewsCardsSkeletonProps {
  count?: number;
}

export const NewsCardsSkeleton: React.FC<NewsCardsSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <div className="h-[40rem] rounded-md flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-[350px] h-20 rounded-2xl 
              bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 
              dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 
              bg-[length:200%_100%] animate-shimmer"
          />
        ))}
      </div>
    </div>
  );
};
