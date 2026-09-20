import { Suspense } from 'react';
import { formatMap, formatari } from '@/config/site';
import ProduseSupabase from './ProduseSupabase.js';

export function generateStaticParams() {
  return formatari.map((format) => ({ format }));
}

export async function generateMetadata({ params }) {
  const { format } = await params;
  const formatName = formatMap[format] || format;

  return {
    title: `Genuri muzicale - ${formatName} | Vinil1.ro`,
    description: `Explorează genurile muzicale disponibile pentru ${formatName.toLowerCase()} pe Vinil1.ro.`,
  };
}

const Page = async ({ params, searchParams }) => {
  const { format } = await params;
  const formatFiltrat = formatMap[format] || null;

  return (
    <>
      <Suspense fallback={
        <div className="productsGrid" style={{ opacity: 0.5, pointerEvents: 'none' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ height: '450px', backgroundColor: '#e0e0e0', borderRadius: '8px' }}></div>
          ))}
        </div>
      }>
        <ProduseSupabase searchParams={searchParams} formatFiltrat={formatFiltrat} format={format} />
      </Suspense>
    </>
  );
};

export default Page;