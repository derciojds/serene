import localFont from 'next/font/local';

export const font = localFont({
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
