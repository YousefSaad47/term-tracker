'use client';

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { NEWS } from '@/lib/constants';

export function News() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black bg-grid-black/[0.04] dark:bg-grid-white/[0.04] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={NEWS} direction="right" speed="normal" />
    </div>
  );
}
