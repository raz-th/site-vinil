import { formatari, genuri_muzicale } from '@/config/site';
import { FaChevronRight } from 'react-icons/fa';
import FormatPage from './FormatPage';
import './FormatPage.css';

export function generateStaticParams() {
  return formatari.map((format) => ({ format }));
}


const formatInfo = {
  vinil: {
    titlu: 'Viniluri',
    descriere: 'Descoperă colecția noastră de discuri vinil — de la clasice la noutăți.',
    img: '/assets/featured/rock.jpg',
  },
  cd: {
    titlu: 'CD-uri',
    descriere: 'Colecție vastă de CD-uri din toate genurile muzicale.',
    img: '/assets/featured/jazz.jpg',
  },
  caseta: {
    titlu: 'Casete Audio',
    descriere: 'Redescoperă sunetul analog al casetelor audio.',
    img: '/assets/featured/soul.jpg',
  },
  dvd: {
    titlu: 'DVD-uri',
    descriere: 'Concerte, documentare și filme muzicale pe DVD.',
    img: '/assets/featured/hiphop.jpg',
  },
  bluray: {
    titlu: 'Blu-ray',
    descriere: 'Calitate superioară pentru concertele și filmele tale preferate.',
    img: '/assets/featured/clasic.jpg',
  },
};

function GenreCard({ genre }) {
  return (
    <a
      href="#"
      className={`genre-card genre-card--${genre.id}${genre.span === 'large' ? ' genre-card--large' : ''}`}
      aria-label={`Browse ${genre.label}`}
    >
      <span className="genre-card__accent" aria-hidden="true" />
      <span className="genre-card__overlay" aria-hidden="true" />
      <div className="genre-card__content">
        <span className="genre-card__index">{genre.index} — {genre.sub}</span>
        <span className="genre-card__name">{genre.label}</span>
      </div>
      <span className="genre-card__arrow" aria-hidden="true">→</span>
    </a>
  )
}

const Page = async ({ params }) => {
  const { format } = await params;

  // return(<FormatPage format={format}/>)

  const info = formatInfo[format] ?? { titlu: format, descriere: '', img: '' };



  return (
    <div className="genre-page">

      <div className="hero">
        <nav className="breadcrumb">
          <a href="/">Acasă</a>
          <span>/</span>
          <a href={`/${format}`} style={{ textTransform: "capitalize" }}>{format}</a>
          <span>/</span>
          <a href={`/${format}/genere`}>Genuri</a>
        </nav>
        <div className="hero-inner">
          <div className="hero-geometry"></div>
          <svg className="hero-fan" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="1">
              <line x1="210" y1="210" x2="420" y2="0" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="390" y2="0" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="360" y2="0" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="330" y2="0" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="300" y2="0" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="270" y2="0" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="420" y2="30" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="420" y2="70" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="420" y2="110" stroke="#C9A84C" strokeWidth="1" />
              <line x1="210" y1="210" x2="420" y2="150" stroke="#C9A84C" strokeWidth="1" />
              <circle cx="210" cy="210" r="80" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
              <circle cx="210" cy="210" r="120" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
              <circle cx="210" cy="210" r="160" stroke="#C9A84C" strokeWidth="0.3" fill="none" />
            </g>
          </svg>

          <svg className="deco-corner-tl" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2 L38 2 L38 6 L6 6 L6 38 L2 38 Z" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
            <path d="M10 10 L28 10 L28 12 L12 12 L12 28 L10 28 Z" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
            <line x1="2" y1="2" x2="10" y2="10" stroke="#C9A84C" strokeWidth="0.5" />
          </svg>
          <svg className="deco-corner-br" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2 L38 2 L38 6 L6 6 L6 38 L2 38 Z" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
            <path d="M10 10 L28 10 L28 12 L12 12 L12 28 L10 28 Z" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
            <line x1="2" y1="2" x2="10" y2="10" stroke="#C9A84C" strokeWidth="0.5" />
          </svg>

          <svg className="hero-record" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" r="88" stroke="#C9A84C" strokeWidth="1" fill="#111" />
            <circle cx="90" cy="90" r="72" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
            <circle cx="90" cy="90" r="60" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
            <circle cx="90" cy="90" r="48" stroke="#C9A84C" strokeWidth="0.3" fill="none" />
            <circle cx="90" cy="90" r="36" stroke="#C9A84C" strokeWidth="0.3" fill="none" />
            <circle cx="90" cy="90" r="24" fill="#1A1714" stroke="#C9A84C" strokeWidth="1" />
            <circle cx="90" cy="90" r="4" fill="#C9A84C" />
          </svg>

          <div className="hero-content">
            <div className="hero-eyebrow">Colecție</div>
            <h1 className="hero-title"><em>Toate</em><br />Formatele</h1>
            <button className="hero-cta">
              <span>Vezi Toate</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="ornament-strip">
        <div className="ornament-line">
          <div className="ornament-line-inner"></div>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <span className="section-label">Genuri Muzicale</span>
          <div className="section-rule"></div>
          <span className="section-number">10 categorii</span>
        </div>

        <div className="genre-grid">

          <div className="genre-card large g-rock">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">01 — Vinil &amp; CD</span>
              <div className="genre-name">Rock</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-jazz">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">02</span>
              <div className="genre-name">Jazz &amp; Blues</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-soul">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">03</span>
              <div className="genre-name">Soul &amp; Funk</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-hiphop">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">04</span>
              <div className="genre-name">Hip-Hop</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-clasica">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">05</span>
              <div className="genre-name">Clasică</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card large g-electronica">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">06</span>
              <div className="genre-name">Electronică</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-soundtracks">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">07 — Coloană Sonoră</span>
              <div className="genre-name">Soundtracks</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-muzica">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">08</span>
              <div className="genre-name">Muzică Românească</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-pop">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">09</span>
              <div className="genre-name">Pop</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

          <div className="genre-card g-copii">
            <div className="genre-accent"></div>
            <div className="genre-overlay"></div>
            <div className="genre-content">
              <span className="genre-icon">10</span>
              <div className="genre-name">Copii</div>
            </div>
            <span className="genre-arrow">→</span>
          </div>

        </div>
      </section>


    </div>
  )
};

export default Page;