'use client';

import ReactLenis from '@studio-freight/react-lenis';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return pathname !== '/products' ? <ReactLenis root>{children}</ReactLenis> : <>{children}</>;
}
