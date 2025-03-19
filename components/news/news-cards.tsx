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
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black bg-grid-black/[0.04] dark:bg-grid-white/[0.04] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={items} direction="right" speed="fast" />
    </div>
  );
}
