import { HeroSection } from '@/components/hero-section';
import { InstallPrompt } from '@/components/install-prompt';
import { NewsSection } from '@/components/news';
import { SubjectsGrid } from '@/components/subjects';

export default function Home() {
  return (
    <>
      <HeroSection />

      <SubjectsGrid />

      <NewsSection />

      <InstallPrompt />
    </>
  );
}
