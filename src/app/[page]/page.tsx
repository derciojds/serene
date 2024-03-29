import { getPage } from '@/lib/shopify/operations/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article',
    },
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <div className={styles.container}>
      <div className={'container'}>
        <div className="spacer"></div>
        <div dangerouslySetInnerHTML={{ __html: page.body }} />
      </div>
    </div>
  );
}
