'use client';

import { useTheme } from 'next-themes';
import { SunDimIcon } from '@/components/ui/sun-dim-icon';
import { MoonIcon } from '@/components/ui/moon-icon';
import { useMounted } from '@/hooks/use-mounted';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { mounted } = useMounted();

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {theme === 'dark' ? (
        <SunDimIcon onClick={toggleTheme} />
      ) : (
        <MoonIcon onClick={toggleTheme} />
      )}
      <span className="sr-only">Toggle theme</span>
    </>
  );
}
