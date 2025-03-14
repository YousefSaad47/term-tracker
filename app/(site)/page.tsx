import { SubjectsGrid } from '@/components/subjects-grid';
import { HeroSection } from '@/components/hero-section';
import { InstallPrompt } from '@/components/install-prompt';
import { News } from '@/components/news';

export default function Home() {
  return (
    <>
      <HeroSection />

      <SubjectsGrid />

      <News />

      <InstallPrompt />
    </>
  );
}
