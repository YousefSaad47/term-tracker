'use client';

import { Spotlight } from './ui/spotlight';
import { useTheme } from 'next-themes';

export function HeroSection() {
  const { theme } = useTheme();

  if (theme === undefined) {
    return null;
  }

  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center dark:bg-black/[0.96] bg-white/[0.96] antialiased bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-1/4 md:-top-20"
        fill={theme === 'dark' ? 'white' : 'gray'}
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1
          dir="rtl"
          className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-secondary to-primary dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 dark:bg-opacity-50"
        >
          دفعة 2022 - الترم الثاني
        </h1>
        <p
          dir="rtl"
          className="mt-4 font-normal text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-lg text-center mx-auto"
        >
          المكان اللي هتلاقي فيه كل حاجة تخص الترم التاني! مواد الدراسة، الجداول
          الأسبوعية، الكويزات، وكمان كلام الدكاترة وتفاصيل المحاضرات. كل اللي
          محتاجه عشان تتابع دراستك بسهولة وفي مكان واحد!
        </p>
      </div>
    </div>
  );
}
