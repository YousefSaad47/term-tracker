import Link from 'next/link';
import { Cpu, Code, PenTool, Signal, BookOpen, Server } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { getAllSubjects } from '@/actions';
import { Subject } from '@prisma/client';

interface GridItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

function GridItem({ href, icon, title, description }: GridItemProps) {
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
}

export async function SubjectsGridContent() {
  const subjects: Subject[] = await getAllSubjects();

  const iconMap: { [key: string]: React.ReactNode } = {
    'artificial-intelligence': (
      <Cpu className="h-6 w-6 text-black dark:text-neutral-400" />
    ),
    'web-programming': (
      <Code className="h-6 w-6 text-black dark:text-neutral-400" />
    ),
    'digital-art': (
      <PenTool className="h-6 w-6 text-black dark:text-neutral-400" />
    ),
    'digital-signals': (
      <Signal className="h-6 w-6 text-black dark:text-neutral-400" />
    ),
    'computer-science-topics': (
      <BookOpen className="h-6 w-6 text-black dark:text-neutral-400" />
    ),
    'operating-system-theories': (
      <Server className="h-6 w-6 text-black dark:text-neutral-400" />
    ),
  };

  return (
    <section className="container mx-auto max-w-5xl px-4 relative my-24">
      <div className="absolute w-[110%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white blur-[200px] opacity-10 rounded-3xl" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {subjects.map((subject) => (
          <GridItem
            key={subject.id}
            href={`/subjects/${subject.slug}`}
            icon={
              iconMap[subject.slug] || (
                <Code className="h-6 w-6 text-black dark:text-neutral-400" />
              )
            }
            title={subject.name}
            description={subject.description}
          />
        ))}
      </ul>
    </section>
  );
}
