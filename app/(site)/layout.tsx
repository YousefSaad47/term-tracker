import FooterComp from '@/components/footer';
import Header from '@/components/header';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <FooterComp />
    </>
  );
}
