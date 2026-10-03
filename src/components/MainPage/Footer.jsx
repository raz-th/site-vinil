import { an_curent, genuri_muzicale, nume } from "../../config/site";
import { TransitionLink } from "../TransitionLink";
import "./Footer.css";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconFacebook = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const IconTwitter = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
);

const IconInstagram = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
);

// ─── ANPCIcon – Sol EU logo placeholder ───────────────────────────────────────
const IconANPC = () => (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="32" height="32" aria-label="ANPC Sol EU">
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="24" y="20" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">SOL</text>
        <text x="24" y="30" textAnchor="middle" fontSize="5.5" fill="currentColor" fontFamily="sans-serif">ANPC</text>
        <text x="24" y="39" textAnchor="middle" fontSize="4.5" fill="currentColor" fontFamily="sans-serif">Romania</text>
    </svg>
);

// ─── Footer column data ────────────────────────────────────────────────────────

const footerData = [
    {
        title: "Magazin",
        links: [
            { label: "Noutăți", href: "#" },
            { label: "Cele mai vândute", href: "#" },
            { label: "Oferte vinil", href: "#" },
            { label: "Pre-comenzi", href: "#" },
        ],
    },
    {
        title: "Servicii clienți",
        links: [
            { label: "Întrebări frecvente", href: "#" },
            { label: "Informații livrare", href: "#" },
            { label: "Returnări & Rambursări", href: "/returnari" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Genuri",
        links: Object.keys(genuri_muzicale).map((v) => ({
            label: genuri_muzicale[v].label,
            href: `/toate/genere/${v}`,
        })),
    },
    {
        title: "Legal",
        links: [
            { label: "Termeni și condiții", href: "/termeni-si-conditii" },
            { label: "Politica de confidențialitate", href: "/politica-de-confidentialitate" },
            { label: "Politica cookies", href: "/politica-cookies" },
            { label: "GDPR – Drepturile tale", href: "/gdpr" },
            { label: "Anulare comandă", href: "/anulare-comanda" },
        ],
    },
];

// ─── Legal notice block ────────────────────────────────────────────────────────
// Replace the placeholder values with your actual company details.

const legalInfo = {
    companyName: nume,                              // e.g. "Vinyl Store SRL"
    cui: "RO########",                              // Cod Unic de Identificare Fiscală
    regCom: "J##/####/####",                        // Număr Registrul Comerțului
    address: "Str. Exemplu nr. 1, București, România",
    anpcSolUrl: "https://reclamatiisal.anpc.ro",     // SAL – Soluționarea Alternativă a Litigiilor
    solEuUrl: "https://europa.eu/youreurope/business/dealing-with-customers/solving-disputes/alternative-dispute-resolution/index_ro.htm", // Platforma europeană SOL
};

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => (
    <>
        <div className="stripe" style={{ marginBottom: 3 }} />
        <footer className="footer">

            <div className="footer__noise" aria-hidden="true" />

            {/* Main link grid */}
            <div className="footer__grid">
                {footerData.map((col, i) => (
                    <div key={i}>
                        <h3 className="footer__col-title">{col.title}</h3>
                        <ul className="footer__links">
                            {col.links.map((link, j) => (
                                <li key={j}>
                                    <TransitionLink href={link.href}>{link.label}</TransitionLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Social + ANPC logos */}
                <div>
                    {/* <h3 className="footer__col-title">Follow Us</h3> */}
                    {/* <div className="footer__social">
                        <TransitionLink href="#" className="footer__social-btn" aria-label="Facebook">
                            <IconFacebook />
                        </TransitionLink>
                        <TransitionLink href="#" className="footer__social-btn" aria-label="Twitter">
                            <IconTwitter />
                        </TransitionLink>
                        <TransitionLink href="#" className="footer__social-btn" aria-label="Instagram">
                            <IconInstagram />
                        </TransitionLink>
                    </div> */}

                    {/* ANPC / SOL EU – obligatoriu pentru magazinele online românești */}
                    <div className="footer__anpc">
                        <TransitionLink 
                            href={legalInfo.anpcSolUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="ANPC – Soluționarea Alternativă a Litigiilor"
                            className="footer__anpc-link"
                        >
                            <img width={250} src="https://gomagcdn.ro/themes/fashion/gfx/sal.png"/>
                            {/* <span>SAL – ANPC</span> */}
                        </TransitionLink>
                        <TransitionLink 
                            href={legalInfo.solEuUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Platforma europeană pentru soluționarea online a litigiilor"
                            className="footer__anpc-link"
                        >
                            <img width={250} src="https://gomagcdn.ro/themes/fashion/gfx/sol.png"/>
                        </TransitionLink>
                    </div>
                </div>
            </div>

            <hr className="footer__divider" />

            {/*
             * Bloc date companie – obligatoriu conform:
             *   • Legea nr. 365/2002 privind comerțul electronic
             *   • OG 130/2000 privind protecția consumatorilor la contractele la distanță
             *   • Legea nr. 227/2015 (Codul fiscal) – afișare CUI/CIF
             */}
            <div className="footer__legal-block">
                <p>
                    <strong>{legalInfo.companyName}</strong> &nbsp;|&nbsp;
                    CUI: {legalInfo.cui} &nbsp;|&nbsp;
                    Reg. Com.: {legalInfo.regCom}
                </p>
                <p>{legalInfo.address}</p>
                <p className="footer__legal-notice">
                    Prețurile afișate includ TVA (19%), conform legislației române în vigoare.
                    Dreptul de retragere se exercită în 14 zile calendaristice de la primirea coletului,
                    conform <abbr title="Ordonanța de Urgență nr. 34/2014 privind drepturile consumatorilor">OUG 34/2014</abbr>.
                    Litigiile pot fi soluționate prin platforma{" "}
                    <TransitionLink href={legalInfo.solEuUrl} target="_blank" rel="noopener noreferrer">SOL&nbsp;UE</TransitionLink>
                    {" "}sau prin{" "}
                    <TransitionLink href={legalInfo.anpcSolUrl} target="_blank" rel="noopener noreferrer">ANPC&nbsp;SAL</TransitionLink>.
                </p>
                <p className="footer__legal-notice">
                    Datele cu caracter personal sunt prelucrate în conformitate cu{" "}
                    <abbr title="Regulamentul (UE) 2016/679 – Regulamentul General privind Protecția Datelor">RGPD</abbr>{" "}
                    și Legea nr. 190/2018. Pentru exercitarea drepturilor (acces, rectificare, ștergere, portabilitate)
                    contactați-ne la{" "}
                    <TransitionLink href="mailto:gdpr@exemplu.ro">gdpr@exemplu.ro</TransitionLink>.
                </p>
            </div>

            <hr className="footer__divider" />

            <p className="footer__bottom">
                © {an_curent} {legalInfo.companyName}. Toate drepturile rezervate.
            </p>
        </footer>
    </>
);

export default Footer;