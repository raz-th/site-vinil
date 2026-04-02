// import { formatari, genuri_muzicale } from '@/config/site';
// import { FaChevronRight } from 'react-icons/fa';
import FormatPage from './FormatPage';
import './FormatPage.css';

// export function generateStaticParams() {
//   return formatari.map((format) => ({ format }));
// }

// const formatInfo = {
//   vinil: {
//     titlu: 'Viniluri',
//     descriere: 'Descoperă colecția noastră de discuri vinil — de la clasice la noutăți.',
//     img: '/assets/featured/rock.jpg',
//   },
//   cd: {
//     titlu: 'CD-uri',
//     descriere: 'Colecție vastă de CD-uri din toate genurile muzicale.',
//     img: '/assets/featured/jazz.jpg',
//   },
//   caseta: {
//     titlu: 'Casete Audio',
//     descriere: 'Redescoperă sunetul analog al casetelor audio.',
//     img: '/assets/featured/soul.jpg',
//   },
//   dvd: {
//     titlu: 'DVD-uri',
//     descriere: 'Concerte, documentare și filme muzicale pe DVD.',
//     img: '/assets/featured/hiphop.jpg',
//   },
//   bluray: {
//     titlu: 'Blu-ray',
//     descriere: 'Calitate superioară pentru concertele și filmele tale preferate.',
//     img: '/assets/featured/clasic.jpg',
//   },
// };

const Page = async ({ params }) => {
  const { format } = await params;
  
  return(<FormatPage format={format}/>)

  // const info = formatInfo[format] ?? { titlu: format, descriere: '', img: '' };



  // return (
  //   <>
  //     <div className="formatPage">
  //       <div className="formatPageInner">

  //         <nav className="formatBreadcrumb">
  //           <a href="/">Acasă</a>
  //           <span>/</span>
  //           <p style={{ textTransform: "capitalize" }}>{format}</p>
  //         </nav>

  //         <div className="formatHero">
  //           {info.img && (
  //             <img src={info.img} alt={info.titlu} />
  //           )}
  //           <div className="formatHeroOverlay">
  //             <div className="formatHeroContent">
  //               <h1 className="formatHeroTitle">{info.titlu}</h1>
  //               <p className="formatHeroDesc">{info.descriere}</p>
  //               <a href={`/${format}/genere`} className="formatHeroBtn">
  //                 Vezi toate <FaChevronRight />
  //               </a>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="formatSectionHeader">
  //           <h2 className="formatSectionTitle">Genuri</h2>
  //           <span className="formatSectionLine" />
  //         </div>

  //         <div className="formatGenreGrid">
  //           {Object.keys(genuri_muzicale).map((g) => (
  //             <a key={g} href={`/${format}/genere/${g}`} className="formatGenreCard">
  //               {genuri_muzicale[g].label}
  //               <FaChevronRight size={12} />
  //             </a>
  //           ))}
  //         </div>

  //       </div>
  //     </div>
  //     <Footer />
  //   </>
  // );
};

export default Page;