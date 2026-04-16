import { an_curent, genuri_muzicale, nume } from "../../config/site";
import "./Footer.css";

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
            { label: "Returnări", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        title: "Genuri",
        links: Object.keys(genuri_muzicale).map((v) => ({ label: genuri_muzicale[v].label, href: `/toate/genere/${v}` })),
    },
    {
        title: "Despre noi",
        links: [
            { label: "Povestea noastră", href: "#" },
            { label: "Artiști parteneri", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Termeni și condiții", href: "#" },
        ],
    },
];

const Footer = () => (
    <>
        <div className="stripe" style={{ marginBottom: 3 }} />
        <footer className="footer">

            <div className="footer__noise" aria-hidden="true" />

            <div className="footer__grid">
                {footerData.map((col, i) => (
                    <div key={i}>
                        <h3 className="footer__col-title">{col.title}</h3>
                        <ul className="footer__links">
                            {col.links.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <h3 className="footer__col-title">Follow Us</h3>
                    <div className="footer__social">
                        <a href="#" className="footer__social-btn" aria-label="Facebook">
                            <IconFacebook />
                        </a>
                        <a href="#" className="footer__social-btn" aria-label="Twitter">
                            <IconTwitter />
                        </a>
                        <a href="#" className="footer__social-btn" aria-label="Instagram">
                            <IconInstagram />
                        </a>
                    </div>
                </div>
            </div>

            <hr className="footer__divider" />

            <p className="footer__bottom">
                © {an_curent} {nume}, All Rights Reserved.
            </p>
        </footer>
    </>
);

export default Footer;