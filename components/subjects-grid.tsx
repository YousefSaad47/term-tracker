'use client';

import Link from 'next/link';
import { Cpu, Code, PenTool, Signal, BookOpen, Server } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export function SubjectsGrid() {
  return (
    <section className="container mx-auto max-w-5xl px-4 relative my-24">
      <div className="absolute w-[110%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white blur-[200px] opacity-10 rounded-3xl" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <GridItem
            key={card.id}
            href={`/subjects/${card.slug}`}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </ul>
    </section>
  );
}

interface GridItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ href, icon, title, description }: GridItemProps) => {
  return (
    <li className="min-h-[14rem] list-none">
      <Link href={href}>
        <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
            <div className="flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border border-gray-600 p-2">
                {icon}
              </div>
              <div className="space-y-3">
                <h3 className="pt-0.5 text-xl font-semibold font-sans md:text-2xl text-black dark:text-white">
                  {title}
                </h3>
                <p className="font-sans text-sm md:text-base text-black dark:text-neutral-400">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const cards = [
  {
    id: 1,
    slug: 'artificial-intelligence',
    icon: <Cpu className="h-6 w-6 text-black dark:text-neutral-400" />,
    title: 'الذكاء الاصطناعي AI',
    description: 'استكشف أساسيات وتطبيقات الذكاء الاصطناعي.',
  },
  {
    id: 2,
    slug: 'web-programming',
    icon: <Code className="h-6 w-6 text-black dark:text-neutral-400" />,
    title: 'برمجة الويب',
    description: 'تعلم أحدث تقنيات برمجة الويب وتصميمه.',
  },
  {
    id: 3,
    slug: 'digital-art',
    icon: <PenTool className="h-6 w-6 text-black dark:text-neutral-400" />,
    title: 'رسم بالحاسب',
    description: 'اكتشف تقنيات الرسم الرقمي وأدوات التصميم.',
  },
  {
    id: 4,
    slug: 'digital-signals',
    icon: <Signal className="h-6 w-6 text-black dark:text-neutral-400" />,
    title: 'معالجة الاشارات الرقمية',
    description: 'تعرف على مفاهيم وتقنيات معالجة الإشارات الرقمية.',
  },
  {
    id: 5,
    slug: 'computer-science-topics',
    icon: <BookOpen className="h-6 w-6 text-black dark:text-neutral-400" />,
    title: 'موضوعات مختارة في علوم الحاسب',
    description: 'ناقش موضوعات متنوعة ومهمة في علوم الحاسب.',
  },
  {
    id: 6,
    slug: 'operating-system-theories',
    icon: <Server className="h-6 w-6 text-black dark:text-neutral-400" />,
    title: 'نظريات نظم التشغيل OS',
    description: 'استكشف النظريات والتصاميم التي تقوم عليها نظم التشغيل.',
  },
];
