import { IoWarning, IoCheckmarkCircle, IoInformationCircle } from 'react-icons/io5'
import './styleTermeni.css'
import { PageTransitionReady } from '@/components/PageTransitionReady'

export default function Page() {
    return (
        <div>
           <PageTransitionReady /> 
            <div className="tc-root">
                <div className="tc-hero">
                    <div className='tc-hero-content'>
                        <h1 className="tc-hero-title">Termeni și condiții</h1>
                        <div className="tc-date-badge">Actualizat: Mai 2026</div>
                        <div className="tc-hero-sub">Vă rugăm să citiți cu atenție înainte de a utiliza serviciile noastre.</div>
                    </div>
                </div>

                <div className="tc-body">

                    <div className="tc-toc">
                        <div className="tc-toc-title">Cuprins</div>
                        <ul className="tc-toc-list">
                            <li><a href="#informatii-generale">1. Informații generale</a></li>
                            <li><a href="#utilizarea-platformei">2. Utilizarea platformei</a></li>
                            <li><a href="#comenzi-si-preturi">3. Comenzi și prețuri</a></li>
                            <li><a href="#procesul-de-comanda">4. Procesul de comandă</a></li>
                            <li><a href="#livrare">5. Livrare</a></li>
                            <li><a href="#returnari-si-rambursari">6. Returnări și rambursări</a></li>
                            <li><a href="#garantii">7. Garanții</a></li>
                            <li><a href="#proprietate-intelectuala">8. Proprietate intelectuală</a></li>
                            <li><a href="#raspundere">9. Răspundere</a></li>
                            <li><a href="#gdpr">10. GDPR și protecția datelor</a></li>
                            <li><a href="#reclamatii">11. Reclamații și litigii</a></li>
                            <li><a href="#contact">12. Contact</a></li>
                        </ul>
                    </div>

                    <div className='tc-content'>

                        {/* ARTICOLUL 1 — Informații generale */}
                        <div className="tc-section" id='informatii-generale'>
                            <div className="tc-section-num">Articolul 1</div>
                            <h2 className="tc-section-title">Informații generale</h2>
                            <p className="tc-p">Prezentul document stabilește termenii și condițiile care guvernează utilizarea platformei online <strong>Vinil1.ro</strong>, operată de:</p>
                            <div className="tc-contact-box">
                                <div className="tc-contact-row"><span className="lbl">Denumire</span><span className="val">S.C. Vinil1 S.R.L.</span></div>
                                <div className="tc-contact-row"><span className="lbl">Sediu social</span><span className="val">România (adresă completă disponibilă la solicitare)</span></div>
                                <div className="tc-contact-row"><span className="lbl">Nr. înreg. Reg. Comerțului</span><span className="val">J__/____/____</span></div>
                                <div className="tc-contact-row"><span className="lbl">CUI / CIF</span><span className="val">RO________</span></div>
                                <div className="tc-contact-row"><span className="lbl">Capital social</span><span className="val">______ RON</span></div>
                                <div className="tc-contact-row"><span className="lbl">Cont bancar (IBAN)</span><span className="val">RO__ ____ ____ ____ ____ ____</span></div>
                                <div className="tc-contact-row"><span className="lbl">E-mail</span><span className="val">contact@vinil1.ro</span></div>
                                <div className="tc-contact-row"><span className="lbl">Telefon</span><span className="val">+40 ___ ___ ___</span></div>
                                <div className="tc-contact-row"><span className="lbl">Program</span><span className="val">Luni–Vineri, 09:00–18:00</span></div>
                            </div>
                            <p className="tc-p" style={{ marginTop: '1rem' }}>Platforma este dedicată vânzării de discuri vinil, CD-uri, casete și accesorii audio. Prin accesarea sau utilizarea site-ului, confirmați că ați citit, înțeles și acceptați în totalitate prezentele condiții. Dacă nu sunteți de acord cu oricare dintre prevederi, vă rugăm să nu utilizați platforma.</p>
                            <p className="tc-p">Prezentul document constituie <strong>contractul la distanță</strong> încheiat între Vinil1.ro și client, în conformitate cu O.U.G. nr. 34/2014 și Directiva 2011/83/UE. Contractul se încheie în <strong>limba română</strong>.</p>
                        </div>

                        {/* ARTICOLUL 2 — Utilizarea platformei */}
                        <div className="tc-section" id='utilizarea-platformei'>
                            <div className="tc-section-num">Articolul 2</div>
                            <h2 className="tc-section-title">Utilizarea platformei</h2>
                            <p className="tc-p">Accesul la platforma Vinil1.ro este permis tuturor utilizatorilor. Pentru plasarea comenzilor este necesar un cont de utilizator valid.</p>
                            <ul className="tc-ul">
                                <li>Utilizatorul trebuie să aibă cel puțin 18 ani sau să fie reprezentat de un tutore legal</li>
                                <li>Informațiile furnizate la înregistrare trebuie să fie corecte și actuale; utilizatorul răspunde pentru exactitatea acestora</li>
                                <li>Este interzisă utilizarea platformei în scopuri frauduloase sau ilegale</li>
                                <li>Vinil1.ro își rezervă dreptul de a suspenda conturile care încalcă prezentele condiții</li>
                                <li>Termenii și condițiile acceptate la plasarea comenzii sunt stocați electronic și accesibili oricând la cerere prin e-mail la <strong>contact@vinil1.ro</strong></li>
                            </ul>
                            <div className="tc-notice">
                                <div className='tc-notice-icon'><IoWarning /></div>
                                <div className='tc-notice-content'>
                                    <span>Atenție!</span>
                                    <p>Vinil1.ro nu răspunde pentru utilizarea necorespunzătoare a platformei de către terți sau pentru eventualele erori tehnice independente de voința sa.</p>
                                </div>
                            </div>
                        </div>

                        {/* ARTICOLUL 3 — Comenzi și prețuri */}
                        <div className="tc-section" id='comenzi-si-preturi'>
                            <div className="tc-section-num">Articolul 3</div>
                            <h2 className="tc-section-title">Comenzi și prețuri</h2>
                            <p className="tc-p">Plasarea unei comenzi constituie o ofertă de cumpărare. Contractul de vânzare se consideră încheiat în momentul în care primiți confirmarea comenzii prin e-mail.</p>
                            <ul className="tc-ul">
                                <li>Prețurile afișate includ TVA și sunt exprimate în lei românești (RON)</li>
                                <li>Costurile de livrare sunt afișate separat înainte de finalizarea comenzii; clientul nu este obligat să plătească costuri suplimentare despre care nu a fost informat în prealabil</li>
                                <li>Vinil1.ro își rezervă dreptul de a modifica prețurile fără notificare prealabilă, modificările neafectând comenzile deja confirmate</li>
                                <li>Disponibilitatea produselor este actualizată în timp real, însă pot apărea discrepanțe de stoc</li>
                                <li>În caz de indisponibilitate după confirmarea comenzii, clientul va fi notificat și va primi rambursare integrală în termen de 14 zile</li>
                                <li>Metodele de plată acceptate: card bancar, transfer bancar, ramburs la livrare</li>
                                <li>Achizițiile se realizează exclusiv online sau telefonic; nu se percep tarife suplimentare pentru comenzile telefonice față de prețul afișat pe site</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 4 — Procesul de comandă (NOU) */}
                        <div className="tc-section" id='procesul-de-comanda'>
                            <div className="tc-section-num">Articolul 4</div>
                            <h2 className="tc-section-title">Procesul de comandă</h2>
                            <p className="tc-p">Plasarea unei comenzi pe Vinil1.ro urmează următoarele etape:</p>
                            <ul className="tc-ul">
                                <li><strong>Selectarea produsului</strong> — Navigați în catalog și adăugați produsele dorite în coș.</li>
                                <li><strong>Verificarea coșului</strong> — Revizuiți produsele, cantitățile și prețurile. Puteți modifica sau șterge produse în orice moment înainte de finalizare.</li>
                                <li><strong>Date de livrare și facturare</strong> — Completați datele personale și adresa de livrare. Datele pot fi corectate înainte de confirmarea finală prin butonul „Înapoi" sau prin editarea câmpurilor.</li>
                                <li><strong>Alegerea metodei de plată</strong> — Selectați modalitatea de plată preferată.</li>
                                <li><strong>Recapitulare și confirmare</strong> — Veți vedea un sumar complet al comenzii (produse, prețuri, costuri de livrare, total) înainte de finalizare. Apăsând „Plasează comanda" trimiteți oferta de cumpărare.</li>
                                <li><strong>Confirmare prin e-mail</strong> — Veți primi un e-mail de confirmare cu detaliile comenzii. Contractul se consideră încheiat din acest moment.</li>
                            </ul>
                            <div className="tc-notice">
                                <div className='tc-notice-icon'><IoInformationCircle /></div>
                                <div className='tc-notice-content'>
                                    <span>Corectarea erorilor</span>
                                    <p>Dacă ați introdus date incorecte, puteți corecta orice informație înainte de finalizarea comenzii folosind butoanele de navigare. După plasarea comenzii, contactați-ne imediat la <strong>contact@vinil1.ro</strong> pentru orice modificare.</p>
                                </div>
                            </div>
                        </div>

                        {/* ARTICOLUL 5 — Livrare */}
                        <div className="tc-section" id='livrare'>
                            <div className="tc-section-num">Articolul 5</div>
                            <h2 className="tc-section-title">Livrare</h2>
                            <p className="tc-p">Livrările se efectuează pe teritoriul României prin intermediul companiilor de curierat partenere. Termenul standard de livrare este de <strong>2–5 zile lucrătoare</strong> de la confirmarea plății.</p>
                            <ul className="tc-ul">
                                <li>Costurile de livrare sunt afișate la finalizarea comenzii și variază în funcție de greutate și destinație</li>
                                <li>Comenzile cu valoare mai mare de <strong>250 RON</strong> beneficiază de livrare gratuită</li>
                                <li>Produsele sunt ambalate cu grijă pentru a preveni deteriorarea discurilor în transport</li>
                                <li>Vinil1.ro nu este responsabilă pentru întârzierile cauzate de firma de curierat sau de forța majoră</li>
                                <li>La recepție, verificați integritatea coletului în prezența curierului; orice deteriorare constatată trebuie menționată în procesul-verbal de livrare</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 6 — Returnări și rambursări */}
                        <div className="tc-section" id='returnari-si-rambursari'>
                            <div className="tc-section-num">Articolul 6</div>
                            <h2 className="tc-section-title">Returnări și rambursări</h2>
                            <p className="tc-p">În conformitate cu O.U.G. nr. 34/2014, aveți dreptul de a returna produsele în termen de <strong>14 zile calendaristice</strong> de la primire, <strong>fără a fi necesar un motiv</strong>. Returnarea nu trebuie justificată.</p>
                            <ul className="tc-ul">
                                <li>Produsul trebuie returnat în starea originală, nefolosit, în ambalajul original cu sigiliu intact</li>
                                <li><strong>Costul returnării</strong> cade în sarcina clientului, cu excepția cazurilor în care produsul este defect sau livrat eronat — în aceste situații costul este suportat de Vinil1.ro</li>
                                <li>Rambursarea se efectuează în maximum <strong>14 zile</strong> de la primirea produsului returnat, prin același mijloc de plată utilizat la achiziție</li>
                                <li>Dacă produsul returnat prezintă deteriorări cauzate de manipularea clientului (dincolo de ce e necesar pentru a verifica natura produsului), valoarea rambursată poate fi diminuată proporțional</li>
                            </ul>

                            <h3 className="tc-subsection-title">Produse excluse de la dreptul de retur</h3>
                            <p className="tc-p">Conform prevederilor legale, <strong>nu pot fi returnate</strong>:</p>
                            <ul className="tc-ul">
                                <li>Discuri vinil, CD-uri sau casete cu <strong>sigiliul rupt</strong> (înregistrări audio sigilate care au fost desigilate după livrare)</li>
                                <li>Produse deteriorate din culpa clientului</li>
                                <li>Bunuri confecționate după specificațiile clientului sau personalizate</li>
                                <li>Bunuri care se deteriorează rapid sau al căror termen de valabilitate este scurt</li>
                            </ul>

                            <div className="tc-notice">
                                <div className='tc-notice-icon'><IoWarning /></div>

                                <div className='tc-notice-content'>
                                    <span>Procedură de retur</span>
                                    <p>Pentru inițierea unei returnări, contactați-ne la <strong>contact@vinil1.ro</strong> în termenul de 14 zile. Vă vom furniza instrucțiunile necesare, eticheta de retur și adresa de expediere. Returnările trimise fără notificare prealabilă nu vor fi acceptate.</p>
                                </div>
                            </div>
                        </div>

                        {/* ARTICOLUL 7 — Garanții */}
                        <div className="tc-section" id='garantii'>
                            <div className="tc-section-num">Articolul 7</div>
                            <h2 className="tc-section-title">Garanții</h2>
                            <p className="tc-p">Toate produsele comercializate pe Vinil1.ro beneficiază de <strong>garanție legală de conformitate</strong> conform Legii nr. 449/2003 și Directivei (UE) 2019/771. Vânzătorul este obligat să livreze bunuri conforme cu descrierea și specificațiile prezentate pe site.</p>
                            <ul className="tc-ul">
                                <li>Garanție legală de <strong>2 ani</strong> pentru defecte de conformitate constatate la sau după livrare, pentru bunuri noi</li>
                                <li>Produsele <strong>second-hand</strong> beneficiază de garanție de minimum <strong>1 an</strong>, menționată explicit în descrierea produsului</li>
                                <li>În caz de neconformitate, aveți dreptul la reparare sau înlocuire gratuită, sau la reducere de preț / rezoluțiunea contractului</li>
                                <li>Garanția nu acoperă deteriorările produse de utilizarea necorespunzătoare, uzura normală sau modificările neautorizate</li>
                                <li>Dacă este acordată garanție comercială suplimentară, condițiile acesteia sunt menționate explicit în descrierea produsului</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 8 — Proprietate intelectuală */}
                        <div className="tc-section" id='proprietate-intelectuala'>
                            <div className="tc-section-num">Articolul 8</div>
                            <h2 className="tc-section-title">Proprietate intelectuală</h2>
                            <p className="tc-p">Tot conținutul platformei Vinil1.ro — texte, imagini, logo-uri, design, cod sursă — este proprietatea exclusivă a Vinil1.ro sau este utilizat cu autorizarea deținătorilor de drepturi.</p>
                            <ul className="tc-ul">
                                <li>Este interzisă reproducerea, distribuirea sau modificarea conținutului fără acordul scris prealabil</li>
                                <li>Imaginile copertelor de discuri aparțin caselor de discuri respective și sunt utilizate în scop comercial legitim</li>
                                <li>Orice utilizare neautorizată poate face obiectul unor acțiuni legale</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 9 — Răspundere */}
                        <div className="tc-section" id='raspundere'>
                            <div className="tc-section-num">Articolul 9</div>
                            <h2 className="tc-section-title">Limitarea răspunderii</h2>
                            <p className="tc-p">Vinil1.ro depune toate eforturile pentru a asigura acuratețea informațiilor și disponibilitatea platformei, însă nu poate garanta funcționarea neîntreruptă a serviciilor.</p>
                            <ul className="tc-ul">
                                <li>Nu răspundem pentru daunele indirecte rezultate din utilizarea sau imposibilitatea utilizării platformei</li>
                                <li>Răspunderea noastră este limitată la valoarea produselor comandate și neonorate corespunzător</li>
                                <li>Nu ne asumăm responsabilitatea pentru erorile tehnice ale operatorilor de telecomunicații sau procesatorilor de plăți</li>
                                <li>Aceste limitări nu afectează drepturile legale ale consumatorilor prevăzute de legislația în vigoare</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 10 — GDPR */}
                        <div className="tc-section" id='gdpr'>
                            <div className="tc-section-num">Articolul 10</div>
                            <h2 className="tc-section-title">GDPR și protecția datelor</h2>
                            <p className="tc-p">Vinil1.ro prelucrează datele cu caracter personal în calitate de operator, în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația națională aplicabilă.</p>
                            <ul className="tc-ul">
                                <li>Datele colectate (nume, adresă, e-mail, telefon) sunt utilizate exclusiv pentru procesarea comenzilor și, cu consimțământul dumneavoastră, pentru comunicări comerciale</li>
                                <li>Nu transmitem datele dumneavoastră către terți fără consimțământul explicit, <strong>cu excepția</strong> partenerilor de livrare (curier) și procesatorilor de plăți, strict necesari executării contractului</li>
                                <li>Aveți dreptul la <strong>acces, rectificare, ștergere, portabilitate și opoziție</strong> privind datele personale</li>
                                <li>Cererile privind drepturile GDPR se adresează la: <strong>gdpr@vinil1.ro</strong></li>
                                <li>Aveți dreptul de a depune plângere la <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong> — <strong>www.dataprotection.ro</strong></li>
                                <li>Detalii complete în <strong>Politica de confidențialitate</strong> disponibilă pe site</li>
                            </ul>
                        </div>

                        {/* ARTICOLUL 11 — Reclamații (NOU) */}
                        <div className="tc-section" id='reclamatii'>
                            <div className="tc-section-num">Articolul 11</div>
                            <h2 className="tc-section-title">Reclamații</h2>
                            <p className="tc-p">Orice reclamație privind produsele sau serviciile Vinil1.ro poate fi transmisă pe următoarele căi:</p>
                            <ul className="tc-ul">
                                <li><strong>E-mail:</strong> contact@vinil1.ro — termen de răspuns: maximum <strong>30 de zile calendaristice</strong> de la primire</li>
                                <li><strong>Poștal:</strong> la sediul social al S.C. Vinil1 S.R.L.</li>
                            </ul>
                            <p className="tc-p">Reclamația trebuie să conțină: numele și prenumele, adresa de contact, numărul comenzii, descrierea problemei și, dacă este cazul, fotografii ale produsului.</p>
                            <div className="tc-notice tc-notice-info">
                                <div className='tc-notice-icon'><IoInformationCircle /></div>
                                <div className='tc-notice-content'>
                                    <span>Soluționare alternativă a litigiilor</span>
                                    <p>Dacă nu sunteți mulțumit de răspunsul primit, puteți apela la <strong>ANPC</strong> (<a href="https://anpc.ro" target="_blank" rel="noreferrer">anpc.ro</a>) sau la procedura SAL online (<a href="https://reclamatiisal.anpc.ro" target="_blank" rel="noreferrer">reclamatiisal.anpc.ro</a>). De asemenea, puteți utiliza platforma europeană de soluționare online a litigiilor (ODR) disponibilă la <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.</p>
                                </div>
                            </div>
                        </div>

                        {/* ARTICOLUL 12 — Contact */}
                        <div className="tc-section" style={{ borderBottom: 'none' }} id='contact'>
                            <div className="tc-section-num">Articolul 12</div>
                            <h2 className="tc-section-title">Contact și litigii</h2>
                            <p className="tc-p">
                                Eventualele litigii se vor soluționa pe cale amiabilă. În caz contrar, sunt supuse jurisdicției instanțelor române competente, în conformitate cu legislația în vigoare.
                            </p>
                            <div className="tc-contact-box">
                                <div className="tc-contact-row"><span className="lbl">E-mail general</span><span className="val">contact@vinil1.ro</span></div>
                                <div className="tc-contact-row"><span className="lbl">E-mail GDPR</span><span className="val">gdpr@vinil1.ro</span></div>
                                <div className="tc-contact-row"><span className="lbl">Sediu</span><span className="val">România</span></div>
                                <div className="tc-contact-row"><span className="lbl">Program</span><span className="val">Lun–Vin, 09:00–18:00</span></div>
                                <div className="tc-contact-row"><span className="lbl">ANPC</span><span className="val"><a href="https://anpc.ro" target="_blank" rel="noreferrer">anpc.ro</a></span></div>
                                <div className="tc-contact-row"><span className="lbl">Platformă ODR</span><span className="val"><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a></span></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}