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
import Link from 'next/link';
import React, { Suspense } from 'react';
import UserNavigation from '@/components/user-navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuIcon } from '@/components/ui/menu-icon';
import { GithubIcon } from '@/components/ui/github-icon';
import { LinkedinIcon } from '@/components/ui/linkedin-icon';
import { DialogTitle } from '@/components/ui/dialog';

const navigationLinks = [
  {
    name: 'صفحة المعهد الرئيسية',
    href: 'https://www.hti.edu.eg/?page_id=3897',
    category: 'external',
  },
  {
    name: 'موقع التسجيل',
    href: 'http://mis.hti.edu.eg/hti/login.jsp',
    category: 'external',
  },
  {
    name: 'جدول الترم التاني',
    href: 'https://drive.google.com/file/d/1776CBrZ31gZUXEzkf-ZxB6Pf50uqIrbk/view',
    category: 'external',
  },
  {
    name: 'dashboard',
    href: '/dashboard',
    category: 'internal',
  },
];

const LoadingSkeleton = () => (
  <Skeleton className="w-24 h-8 bg-gray-300 dark:bg-neutral-700 rounded-lg" />
);

const BrandLogo = () => (
  <Link
    href="/"
    className="flex items-center gap-3 transition-opacity hover:opacity-90"
  >
    <Logo />
    <h1 className="text-2xl font-medium text-foreground">TermTracker</h1>
  </Link>
);

const SocialLinks = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <a
      href="https://github.com/YousefSaad47/term-tracker"
      target="_blank"
      aria-label="GitHub"
    >
      <GithubIcon />
    </a>
    <a
      href="https://www.linkedin.com/in/yousefsaad47/"
      target="_blank"
      aria-label="LinkedIn"
    >
      <LinkedinIcon />
    </a>
  </div>
);

const DesktopNavigation = () => (
  <nav className="hidden md:flex items-center gap-6">
    <div className="flex items-center gap-4">
      {navigationLinks.map((link, i) => (
        <LinkPreview
          key={i}
          url={link.href}
          className="relative text-foreground hover:text-primary transition-colors"
        >
          {link.name}
        </LinkPreview>
      ))}
    </div>

    <div className="flex items-center gap-4 pl-4 border-l border-border">
      <SocialLinks />
      <ModeToggle />
      <Suspense fallback={<LoadingSkeleton />}>
        <UserNavigation />
      </Suspense>
    </div>
  </nav>
);

const MobileNavigation = () => (
  <nav className="md:hidden">
    <Drawer>
      <DrawerTrigger aria-label="Menu">
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DialogTitle></DialogTitle>
        <div className="w-full max-w-sm mx-auto flex flex-col gap-3 p-4">
          <DrawerFooter className="space-y-3">
            {navigationLinks.map((link, i) => (
              <DrawerClose asChild key={i}>
                <LinkPreview url={link.href}>
                  <Button variant="secondary" className="w-full font-medium">
                    {link.name}
                  </Button>
                </LinkPreview>
              </DrawerClose>
            ))}

            <DrawerClose asChild>
              <div className="flex items-center mx-auto gap-4">
                <SocialLinks />
                <ModeToggle />
              </div>
            </DrawerClose>

            <DrawerClose asChild>
              <Suspense fallback={<LoadingSkeleton />}>
                <UserNavigation />
              </Suspense>
            </DrawerClose>

            <DrawerClose asChild>
              <Button variant="outline" className="w-full mt-2">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  </nav>
);

export default function Header() {
  return (
    <header className="max-w-5xl mx-auto flex justify-between items-center py-4 px-5 lg:px-0 relative z-50">
      <BrandLogo />
      <DesktopNavigation />
      <MobileNavigation />
    </header>
  );
}
