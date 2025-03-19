export const EditNewsFormSkeleton = () => {
  return (
    <div className="container space-y-4 max-w-md animate-shimmer">
      <div className="flex flex-col space-y-2">
        <div className="h-4 w-24 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
        <div className="h-48 w-full bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <div className="h-4 w-24 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
        <div className="h-10 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
      </div>

      <div className="flex justify-center mt-8">
        <div className="h-10 w-40 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
      </div>
    </div>
  );
};
