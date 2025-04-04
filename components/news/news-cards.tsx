import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { News } from '@prisma/client';

interface NewsCardsProps {
  newsPromise: Promise<News[]>;
}

export async function NewsCards({ newsPromise }: NewsCardsProps) {
  const news = await newsPromise;

  const items = news
    .filter((item) => item.isPublished)
    .map((item) => ({
      quote: item.content,
    }));

  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black bg-grid-black/[0.03] dark:bg-grid-white/[0.03] items-center justify-center relative overflow-hidden">
      <div className="absolute w-[50%] h-[50%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full blur-[150px] opacity-10" />
      <InfiniteMovingCards items={items} direction="right" speed="fast" />
    </div>
  );
}
