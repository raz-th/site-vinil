import { IoShieldCheckmark, IoInformationCircle, IoLockClosed, IoEye } from 'react-icons/io5'
import '../termeni-si-conditii/styleTermeni.css' 

export default function PoliticaConfidentialitate() {
    return (
        <div>
            <div className="tc-root">
                <div className="tc-hero">
                    <div className='tc-hero-content'>
                        <h1 className="tc-hero-title">Politică de confidențialitate</h1>
                        <div className="tc-date-badge">Actualizat: Mai 2026</div>
                        <div className="tc-hero-sub">Protecția datelor dumneavoastră este prioritatea noastră principală.</div>
                    </div>
                </div>

                <div className="tc-body">

                    <div className="tc-toc">
                        <div className="tc-toc-title">Cuprins</div>
                        <ul className="tc-toc-list">
                            <li><a href="#colectarea-datelor">1. Colectarea informațiilor personale</a></li>
                            <li><a href="#utilizarea-datelor">2. Utilizarea informațiilor personale</a></li>
                            <li><a href="#partajarea-datelor">3. Partajarea informațiilor cu terți</a></li>
                            <li><a href="#publicitate-comportamentala">4. Publicitate comportamentală</a></li>
                            <li><a href="#drepturi-gdpr">5. Drepturile dumneavoastră (GDPR)</a></li>
                            <li><a href="#cookies">6. Utilizarea modulelor Cookie</a></li>
                            <li><a href="#pastrarea-datelor">7. Păstrarea datelor</a></li>
                            <li><a href="#contact">8. Contact și solicitări</a></li>
                        </ul>
                    </div>

                    <div className='tc-content'>

                        {/* ARTICOLUL 1 — Colectarea datelor */}
                        <div className="tc-section" id='colectarea-datelor'>
                            <div className="tc-section-num">Articolul 1</div>
                            <h2 className="tc-section-title">Colectarea informațiilor personale</h2>
                            <p className="tc-p">Când vizitați Vinil1.ro, colectăm anumite informații despre dispozitivul dumneavoastră, interacțiunea cu site-ul și informații necesare pentru procesarea achizițiilor.</p>
                            
                            <h3 className="tc-subsection-title">Informații despre dispozitiv</h3>
                            <ul className="tc-ul">
                                <li><strong>Exemple de date:</strong> versiunea browserului, adresa IP, fusul orar, informații despre cookie-uri, ce pagini vizualizați și modul în care interacționați cu site-ul.</li>
                                <li><strong>Scop:</strong> încărcarea corectă a site-ului și efectuarea de analize de utilizare pentru optimizarea magazinului.</li>
                                <li><strong>Sursă:</strong> Colectate automat prin fișiere log, tag-uri și pixeli.</li>
                            </ul>

                            <h3 className="tc-subsection-title">Informații despre comandă</h3>
                            <ul className="tc-ul">
                                <li><strong>Exemple de date:</strong> nume, adresa de facturare, adresa de livrare, informații de plată (inclusiv numere de card), adresa de e-mail și numărul de telefon.</li>
                                <li><strong>Scop:</strong> furnizarea produselor, procesarea plății, organizarea livrării, emiterea facturilor și comunicarea cu dumneavoastră.</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 2 — Utilizarea datelor */}
                        <div className="tc-section" id='utilizarea-datelor'>
                            <div className="tc-section-num">Articolul 2</div>
                            <h2 className="tc-section-title">Utilizarea informațiilor personale</h2>
                            <p className="tc-p">Utilizăm informațiile dumneavoastră personale pentru a vă oferi serviciile noastre, care includ: oferirea produselor spre vânzare, procesarea plăților, expedierea comenzii și informarea despre produse noi sau oferte.</p>
                            
                            <div className="tc-notice">
                                <div className='tc-notice-icon'><IoShieldCheckmark /></div>
                                <div className='tc-notice-content'>
                                    <span>Temei legal</span>
                                    <p>Prelucrăm datele dumneavoastră în baza necesității de a executa contractul de vânzare-cumpărare sau pentru a respecta obligațiile legale (contabilitate/fiscalitate).</p>
                                </div>
                            </div>
                        </div>

                        {/* ARTICOLUL 3 — Partajarea datelor */}
                        <div className="tc-section" id='partajarea-datelor'>
                            <div className="tc-section-num">Articolul 3</div>
                            <h2 className="tc-section-title">Partajarea informațiilor cu terți</h2>
                            <p className="tc-p">Partajăm informațiile dumneavoastră cu furnizori de servicii pentru a ne ajuta să operăm magazinul și să ne îndeplinim contractele cu dumneavoastră:</p>
                            <ul className="tc-ul">
                                <li><strong>Shopify:</strong> Utilizăm platforma Shopify pentru a găzdui magazinul nostru online.</li>
                                <li><strong>Procesatori de plăți:</strong> (ex. Netopia, Stripe) pentru securizarea tranzacțiilor bancare.</li>
                                <li><strong>Firme de curierat:</strong> Partajăm numele, adresa și telefonul pentru livrarea coletelor.</li>
                                <li><strong>Autorități:</strong> Putem partaja informații pentru a respecta legile și reglementările aplicabile sau pentru a răspunde unei citații legal emise.</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 4 — Publicitate */}
                        <div className="tc-section" id='publicitate-comportamentala'>
                            <div className="tc-section-num">Articolul 4</div>
                            <h2 className="tc-section-title">Publicitate comportamentală</h2>
                            <p className="tc-p">Așa cum este descris mai sus, utilizăm informațiile dumneavoastră pentru a vă oferi reclame direcționate sau comunicări de marketing pe care credem că le-ați considera interesante.</p>
                            <ul className="tc-ul">
                                <li>Utilizăm <strong>Google Analytics</strong> pentru a înțelege cum folosesc clienții noștri site-ul.</li>
                                <li>Puteți renunța la publicitatea direcționată accesând setările platformelor respective (Facebook, Google, Bing).</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 5 — Drepturi GDPR */}
                        <div className="tc-section" id='drepturi-gdpr'>
                            <div className="tc-section-num">Articolul 5</div>
                            <h2 className="tc-section-title">Drepturile dumneavoastră (GDPR)</h2>
                            <p className="tc-p">Dacă sunteți rezident al Spațiului Economic European (SEE), aveți următoarele drepturi privind datele dumneavoastră:</p>
                            <div className="tc-contact-box">
                                <div className="tc-contact-row"><span className="lbl">Acces</span><span className="val">Dreptul de a primi o copie a datelor pe care le deținem.</span></div>
                                <div className="tc-contact-row"><span className="lbl">Rectificare</span><span className="val">Dreptul de a corecta datele inexacte.</span></div>
                                <div className="tc-contact-row"><span className="lbl">Ștergere</span><span className="val">Dreptul de a solicita "ștergerea uitată" a datelor.</span></div>
                                <div className="tc-contact-row"><span className="lbl">Portabilitate</span><span className="val">Dreptul de a transfera datele către alt furnizor.</span></div>
                            </div>
                            <p className="tc-p" style={{ marginTop: '1rem' }}>Pentru exercitarea acestor drepturi, vă rugăm să ne contactați la <strong>gdpr@vinil1.ro</strong>.</p>
                        </div>

                        {/* ARTICOLUL 6 — Cookies */}
                        <div className="tc-section" id='cookies'>
                            <div className="tc-section-num">Articolul 6</div>
                            <h2 className="tc-section-title">Utilizarea modulelor Cookie</h2>
                            <p className="tc-p">Un cookie este o cantitate mică de informații care este descărcată pe computerul sau dispozitivul dumneavoastră atunci când vizitați site-ul nostru.</p>
                            <ul className="tc-ul">
                                <li>Folosim cookie-uri funcționale, de performanță și de publicitate.</li>
                                <li>Acestea îmbunătățesc experiența de navigare (reținerea produselor în coș, autentificarea).</li>
                                <li>Puteți controla și gestiona cookie-urile din setările browserului dumneavoastră, însă blocarea lor poate afecta funcționalitatea site-ului.</li>
                            </ul>
                            <div className="tc-notice">
                                <div className='tc-notice-icon'><IoInformationCircle /></div>
                                <div className='tc-notice-content'>
                                    <span>Notă</span>
                                    <p>Nu modificăm practicile de colectare a datelor de pe site-ul nostru atunci când vedem un semnal "Do Not Track" din browserul dumneavoastră.</p>
                                </div>
                            </div>
                        </div>

                        {/* ARTICOLUL 7 — Pastrarea datelor */}
                        <div className="tc-section" id='pastrarea-datelor'>
                            <div className="tc-section-num">Articolul 7</div>
                            <h2 className="tc-section-title">Păstrarea datelor</h2>
                            <p className="tc-p">Atunci când plasați o comandă prin intermediul site-ului, vom păstra informațiile despre comandă pentru arhivele noastre, cu excepția cazului în care și până când ne cereți să ștergem aceste informații.<br/>Facturile fiscale vor fi păstrate conform termenelor legale impuse de legislația din România (de regulă 10 ani).</p>
                        </div>

                        {/* ARTICOLUL 8 — Contact */}
                        <div className="tc-section" style={{ borderBottom: 'none' }} id='contact'>
                            <div className="tc-section-num">Articolul 8</div>
                            <h2 className="tc-section-title">Contact și solicitări</h2>
                            <p className="tc-p">
                                Pentru mai multe informații despre practicile noastre de confidențialitate sau dacă doriți să depuneți o plângere, vă rugăm să ne contactați:
                            </p>
                            <div className="tc-contact-box">
                                <div className="tc-contact-row"><span className="lbl">Responsabil date</span><span className="val">DPO Vinil1.ro</span></div>
                                <div className="tc-contact-row"><span className="lbl">E-mail GDPR</span><span className="val">gdpr@vinil1.ro</span></div>
                                <div className="tc-contact-row"><span className="lbl">Adresă</span><span className="val">România, (Adresa Sediului Social)</span></div>
                                <div className="tc-contact-row"><span className="lbl">Autoritate</span><span className="val">ANSPDCP (dataprotection.ro)</span></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}