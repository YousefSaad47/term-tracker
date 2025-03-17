import Box from '@/components/ui/box';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Box className="w-sm">{children}</Box>;
}
