import { Navigation } from '@/components/header';
import Providers from '@/lib/query/provider';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { font } from './font';
import './global.scss';
import Template from './template.';

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
        <Providers>
          <Navigation />
          <Suspense>
            <Template>
              <main>{children}</main>
            </Template>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
