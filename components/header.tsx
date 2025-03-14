'use client';

import { useState } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { LinkPreview } from '@/components/ui/link-preview';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-black/60 z-[50]">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-3xl font-bold flex items-center gap-4">
          <Logo />
          TermTracker
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <LinkPreview
            url="https://www.hti.edu.eg/?page_id=3897"
            className="font-bold"
          >
            صفحة المعهد الرئيسية
          </LinkPreview>
          <LinkPreview
            url="http://mis.hti.edu.eg/hti/login.jsp"
            className="font-bold"
          >
            موقع التسجيل
          </LinkPreview>
          <LinkPreview
            url="https://drive.google.com/file/d/1776CBrZ31gZUXEzkf-ZxB6Pf50uqIrbk/view"
            className="font-bold"
          >
            جدول الترم التاني
          </LinkPreview>
          <ModeToggle />
        </div>

        <button
          className="md:hidden text-neutral-800 dark:text-neutral-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-black/60 backdrop-blur-md z-[1]">
          <LinkPreview
            url="https://www.hti.edu.eg/?page_id=3897"
            className="font-bold"
          >
            صفحة المعهد الرئيسية
          </LinkPreview>
          <LinkPreview
            url="http://mis.hti.edu.eg/hti/login.jsp"
            className="font-bold"
          >
            موقع التسجيل
          </LinkPreview>
          <ModeToggle />
        </div>
      )}
    </nav>
  );
};

export default Header;
