import { LinkPreview } from '@/components/ui/link-preview';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { ModeToggle } from '@/components/mode-toggle';
import Logo from '@/components/logo';
import { LuMenu } from 'react-icons/lu';
import Link from 'next/link';
import React, { Suspense } from 'react';
import UserNavigation from '@/components/user-navigation';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonFallback() {
  return (
    <Skeleton className="w-24 h-8 bg-gray-300 dark:bg-neutral-700 rounded-lg" />
  );
}

const links = [
  {
    name: 'صفحة المعهد الرئيسية',
    href: 'https://www.hti.edu.eg/?page_id=3897',
  },
  {
    name: 'موقع التسجيل',
    href: 'http://mis.hti.edu.eg/hti/login.jsp',
  },
  {
    name: 'جدول الترم التاني',
    href: 'https://drive.google.com/file/d/1776CBrZ31gZUXEzkf-ZxB6Pf50uqIrbk/view',
  },
  {
    name: 'dashboard',
    href: '/dashboard',
  },
];

export default function Header() {
  return (
    <header className="max-w-5xl mx-auto flex justify-between items-center py-4 px-5 lg:px-0 relative z-[100]">
      <Link href="/" className="flex items-center gap-3">
        <Logo />
        <h1 className="text-2xl font-medium text-foreground">TermTracker</h1>
      </Link>

      <nav className="hidden md:flex items-center gap-4">
        {links.map((link, i) => (
          <LinkPreview key={i} url={link.href} className="relative">
            {link.name}
          </LinkPreview>
        ))}
        <ModeToggle />
        <Suspense fallback={<SkeletonFallback />}>
          <UserNavigation />
        </Suspense>
      </nav>

      <nav className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="rounded-full p-2">
              <LuMenu size={22} />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <div className="w-full max-w-sm mx-auto flex flex-col gap-3 p-4">
              <DrawerFooter className="space-y-3">
                <DrawerClose asChild>
                  <ModeToggle />
                </DrawerClose>
                {links.map((link, i) => (
                  <DrawerClose asChild key={i}>
                    <LinkPreview url={link.href}>
                      <Button variant="secondary" className="w-full font-bold">
                        {link.name}
                      </Button>
                    </LinkPreview>
                  </DrawerClose>
                ))}
                <DrawerClose asChild>
                  <Suspense fallback={<SkeletonFallback />}>
                    <UserNavigation />
                  </Suspense>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  );
}
