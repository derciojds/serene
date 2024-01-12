import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './global.scss';

const basisGrotesqueArabicPro = localFont({
  src: [
    {
      path: '../assets/fonts/BasisGrotesqueArabicPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BasisGrotesqueArabicPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BasisGrotesqueArabicPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BasisGrotesqueArabicPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BasisGrotesqueArabicPro-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
});

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
      <body className={basisGrotesqueArabicPro.className}>{children}</body>
    </html>
  );
}
