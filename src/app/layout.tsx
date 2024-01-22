import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { font } from './font';
import './global.scss';

export const metadata: Metadata = {
  title: 'Serene',
  description: 'Indulge in luxury with mood-enhancing perfumes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <Suspense>
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
