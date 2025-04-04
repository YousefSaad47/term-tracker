'use client';

import { motion, Variants } from 'motion/react';
import { Spotlight } from '@/components/ui/spotlight';
import { Beam } from '@/components/beam';

const containerVariants: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      staggerChildren: 0.5,
    },
  },
};

const childVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(6px)',
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function HeroSection() {
  return (
    <div className="h-[22rem] md:h-[40rem] w-full rounded-md flex md:items-center md:justify-center dark:bg-black/[0.96] bg-white/[0.96] antialiased bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative overflow-hidden">
      <Beam className="absolute bottom-0 right-1/2 translate-x-1/2 md:top-1/5 md:left-1/2" />
      <Spotlight
        className="top-0 left-40 md:left-1/4 md:-top-20"
        fill="white"
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="p-4 max-w-7xl mx-auto relative z-10  w-full pt-20 md:pt-0"
      >
        <motion.h1
          variants={childVariants}
          dir="rtl"
          className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-secondary to-primary dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 dark:bg-opacity-50"
        >
          دفعة 2022 - الترم الثاني
        </motion.h1>
        <motion.p
          variants={childVariants}
          dir="rtl"
          className="mt-4 font-normal text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-lg text-center mx-auto"
        >
          المكان ده هتلاقي فيه كل اللي يخص الترم التاني! من مواد الدراسة
          والجداول الأسبوعية والكويزات، لحد كلام الدكاترة وتفاصيل المحاضرات. كل
          اللي انت محتاجه عشان تتابع دراستك بسهولة وفي مكان واحد!
        </motion.p>
      </motion.div>
    </div>
  );
}
