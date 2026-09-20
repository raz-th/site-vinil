import { Suspense } from 'react';
import { formatari, formatMap, genuri_muzicale } from '@/config/site';
import GenereSupabase from './GenereSupabase'; 

const genuriParams = Object.keys(genuri_muzicale);

export function generateStaticParams() {
    const result = [];
    formatari.forEach(format => {
        genuriParams.forEach(id => {
            result.push({ format, id });
        });
    });
    return result;
}

export async function generateMetadata({ params }) {
    const { format, id } = await params;
    const formatName = formatMap[format] || format;
    const genreName = id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return {
        title: `${genreName} - ${formatName} | Vinil1.ro`,
        description: `${formatName} de ${genreName} disponibile în stoc pe Vinil1.ro.`,
    };
}

const Page = async ({ params, searchParams }) => {
    return (
        <Suspense fallback={
            <div className="genrePage">
                <div className="genrePageInner">
                   <div style={{ padding: '20px', width: '100%' }}>
                      {/* Placeholder pentru layout să nu sară pagina (CLS = 0) */}
                      <div className="productsGrid" style={{ opacity: 0.5, pointerEvents: 'none', marginTop: '60px' }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} style={{ height: '450px', backgroundColor: '#e0e0e0', borderRadius: '8px' }}></div>
                        ))}
                      </div>
                   </div>
                </div>
            </div>
        }>
            <GenereSupabase params={params} searchParams={searchParams} />
        </Suspense>
    );
};

export default Page;