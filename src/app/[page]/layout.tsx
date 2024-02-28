import { Footer } from '@/components/footer';
import { Suspense } from 'react';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>{children}</Suspense>
      <Footer />
    </>
  );
}
