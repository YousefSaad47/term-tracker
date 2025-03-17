export function SubjectsGridSkeleton() {
  return (
    <section className="container mx-auto max-w-5xl px-4 relative my-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="min-h-[14rem] rounded-2xl 
              bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 
              dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 
              bg-[length:200%_100%] animate-shimmer"
          />
        ))}
      </div>
    </section>
  );
}
