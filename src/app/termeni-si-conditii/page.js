import './styleTermeni.css'

export default function Page() {
    return (
        <div>
            <h2 className="sr-only" style={{position:'absolute',width:1,height:1,overflow:'hidden',clip:'rect(0,0,0,0)'}}>Termeni și condiții Vinil1.ro</h2>

            <div className="tc-root">
              

                <div className="tc-hero">
                    <div className="tc-hero-label">Document legal</div>
                    <h1 className="tc-hero-title">Termeni și condiții</h1>
                    <div className="tc-date-badge">Actualizat: Mai 2026</div>
                    <div className="tc-hero-sub">Vă rugăm să citiți cu atenție înainte de a utiliza serviciile noastre.</div>
                </div>

                <div className="tc-body">

                    <div className="tc-toc">
                        <div className="tc-toc-title">Cuprins</div>
                        <ul className="tc-toc-list">
                            <li><a href="#">1. Informații generale</a></li>
                            <li><a href="#">2. Utilizarea platformei</a></li>
                            <li><a href="#">3. Comenzi și prețuri</a></li>
                            <li><a href="#">4. Livrare</a></li>
                            <li><a href="#">5. Returnări și rambursări</a></li>
                            <li><a href="#">6. Garanții</a></li>
                            <li><a href="#">7. Proprietate intelectuală</a></li>
                            <li><a href="#">8. Răspundere</a></li>
                            <li><a href="#">9. GDPR și protecția datelor</a></li>
                            <li><a href="#">10. Contact</a></li>
                        </ul>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 1</div>
                        <h2 className="tc-section-title">Informații generale</h2>
                        <p className="tc-p">Prezentul document stabilește termenii și condițiile care guvernează utilizarea platformei online <strong>Vinil1.ro</strong>, operată de S.C. Vinil1 S.R.L., cu sediul în România.</p>
                        <p className="tc-p">Prin accesarea sau utilizarea site-ului, confirmați că ați citit, înțeles și acceptați în totalitate prezentele condiții. Dacă nu sunteți de acord cu oricare dintre prevederi, vă rugăm să nu utilizați platforma.</p>
                        <ul className="tc-ul">
                            <li>Societate înregistrată în România conform legislației în vigoare</li>
                            <li>Cod unic de înregistrare comunicat la solicitare</li>
                            <li>Platformă dedicată vânzării de discuri vinil, CD-uri, casete și accesorii audio</li>
                        </ul>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 2</div>
                        <h2 className="tc-section-title">Utilizarea platformei</h2>
                        <p className="tc-p">Accesul la platforma Vinil1.ro este permis tuturor utilizatorilor. Pentru plasarea comenzilor este necesar un cont de utilizator valid.</p>
                        <ul className="tc-ul">
                            <li>Utilizatorul trebuie să aibă cel puțin 18 ani sau să fie reprezentat de un tutore legal</li>
                            <li>Informațiile furnizate la înregistrare trebuie să fie corecte și actuale</li>
                            <li>Este interzisă utilizarea platformei în scopuri frauduloase sau ilegale</li>
                            <li>Vinil1.ro își rezervă dreptul de a suspenda conturile care încalcă prezentele condiții</li>
                        </ul>
                        <div className="tc-notice">
                            <p>Vinil1.ro nu răspunde pentru utilizarea necorespunzătoare a platformei de către terți sau pentru eventualele erori tehnice independente de voința sa.</p>
                        </div>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 3</div>
                        <h2 className="tc-section-title">Comenzi și prețuri</h2>
                        <p className="tc-p">Plasarea unei comenzi constituie o ofertă de cumpărare. Contractul de vânzare se consideră încheiat în momentul în care primiți confirmarea comenzii prin e-mail.</p>
                        <ul className="tc-ul">
                            <li>Prețurile afișate includ TVA și sunt exprimate în lei românești (RON)</li>
                            <li>Vinil1.ro îți rezervă dreptul de a modifica prețurile fără notificare prealabilă, modificările neafectând comenzile deja confirmate</li>
                            <li>Disponibilitatea produselor este actualizată în timp real, însă pot apărea discrepanțe de stoc</li>
                            <li>În caz de indisponibilitate după confirmarea comenzii, clientul va fi notificat și va primi rambursare integrală</li>
                            <li>Metodele de plată acceptate: card bancar, transfer bancar, ramburs la livrare</li>
                        </ul>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 4</div>
                        <h2 className="tc-section-title">Livrare</h2>
                        <p className="tc-p">Livrările se efectuează pe teritoriul României prin intermediul companiilor de curierat partenere. Termenul standard de livrare este de <strong>2–5 zile lucrătoare</strong> de la confirmarea plății.</p>
                        <ul className="tc-ul">
                            <li>Costurile de livrare sunt afișate la finalizarea comenzii și variază în funcție de greutate și destinație</li>
                            <li>Comenzile cu valoare mai mare de 250 RON beneficiază de livrare gratuită</li>
                            <li>Produsele sunt ambalate cu grijă pentru a preveni deteriorarea discurilor în transport</li>
                            <li>Vinil1.ro nu este responsabilă pentru întârzierile cauzate de firma de curierat sau de forța majoră</li>
                            <li>La recepție, verificați integritatea coletului în prezența curierului</li>
                        </ul>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 5</div>
                        <h2 className="tc-section-title">Returnări și rambursări</h2>
                        <p className="tc-p">În conformitate cu legislația europeană privind drepturile consumatorilor (O.U.G. nr. 34/2014), aveți dreptul de a returna produsele achiziționate în termen de <strong>14 zile calendaristice</strong> de la primire, fără a fi necesar un motiv.</p>
                        <ul className="tc-ul">
                            <li>Produsul trebuie returnat în starea originală, nefolosit, în ambalajul original cu sigiliu intact</li>
                            <li>Costul returnării cade în sarcina clientului, cu excepția cazurilor în care produsul este defect sau livrat eronat</li>
                            <li>Rambursarea se efectuează în maximum 14 zile de la primirea returnării, prin același mijloc de plată utilizat</li>
                            <li>Nu se acceptă returnarea discurilor vinil cu sigiliul rupt sau al produselor deteriorate din vina clientului</li>
                        </ul>
                        <div className="tc-notice">
                            <p>Pentru inițierea unei returnări, contactați-ne la adresa de e-mail dedicată. Vom furniza instrucțiunile necesare și eticheta de retur.</p>
                        </div>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 6</div>
                        <h2 className="tc-section-title">Garanții</h2>
                        <p className="tc-p">Toate produsele comercializate pe Vinil1.ro beneficiază de garanție legală de conformitate conform legislației române și europene în vigoare.</p>
                        <ul className="tc-ul">
                            <li>Garanție legală de 2 ani pentru defecte de conformitate constatate la livrare</li>
                            <li>Produsele second-hand beneficiază de garanție de minimum 1 an, menționată explicit în descriere</li>
                            <li>Garanția nu acoperă deteriorările produse de utilizarea necorespunzătoare</li>
                        </ul>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 7</div>
                        <h2 className="tc-section-title">Proprietate intelectuală</h2>
                        <p className="tc-p">Tot conținutul platformei Vinil1.ro — texte, imagini, logo-uri, design, cod sursă — este proprietatea exclusivă a Vinil1.ro sau este utilizat cu autorizarea deținătorilor de drepturi.</p>
                        <ul className="tc-ul">
                            <li>Este interzisă reproducerea, distribuirea sau modificarea conținutului fără acordul scris prealabil</li>
                            <li>Imaginile copertelor de discuri aparțin caselor de discuri respective și sunt utilizate în scop comercial legitim</li>
                            <li>Orice utilizare neautorizată poate face obiectul unor acțiuni legale</li>
                        </ul>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 8</div>
                        <h2 className="tc-section-title">Limitarea răspunderii</h2>
                        <p className="tc-p">Vinil1.ro depune toate eforturile pentru a asigura acuratețea informațiilor și disponibilitatea platformei, însă nu poate garanta funcționarea neîntreruptă a serviciilor.</p>
                        <ul className="tc-ul">
                            <li>Nu răspundem pentru daunele indirecte rezultate din utilizarea sau imposibilitatea utilizării platformei</li>
                            <li>Răspunderea noastră este limitată la valoarea produselor comandate și neonorate corespunzător</li>
                            <li>Nu ne asumăm responsabilitatea pentru erorile tehnice ale operatorilor de telecomunicații sau plăți</li>
                        </ul>
                    </div>

                    <div className="tc-section">
                        <div className="tc-section-num">Articolul 9</div>
                        <h2 className="tc-section-title">GDPR și protecția datelor</h2>
                        <p className="tc-p">Vinil1.ro prelucrează datele cu caracter personal în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația națională aplicabilă.</p>
                        <ul className="tc-ul">
                            <li>Datele colectate sunt utilizate exclusiv pentru procesarea comenzilor și comunicări comerciale consimțite</li>
                            <li>Nu transmitem datele dumneavoastră către terți fără consimțământul explicit, cu excepția partenerilor de livrare și procesatorilor de plăți</li>
                            <li>Aveți dreptul la acces, rectificare, ștergere și portabilitate a datelor personale</li>
                            <li>Cererile privind drepturile GDPR se adresează la: <strong>gdpr@vinil1.ro</strong></li>
                            <li>Detalii complete în <strong>Politica de confidențialitate</strong> disponibilă pe site</li>
                        </ul>
                    </div>

                    <div className="tc-section" style={{borderBottom:'none'}}>
                        <div className="tc-section-num">Articolul 10</div>
                        <h2 className="tc-section-title">Contact și litigii</h2>
                        <p className="tc-p">Eventualele litigii se vor soluționa pe cale amiabilă. În caz contrar, sunt supuse jurisdicției instanțelor române competente.</p>
                        <p className="tc-p">Consumatorii pot apela la platformele de soluționare alternativă a litigiilor (SAL/ANPC) sau la platforma europeană ODR disponibilă la <strong>ec.europa.eu/consumers/odr</strong>.</p>
                        <div className="tc-contact-box">
                            <div className="tc-contact-row"><span className="lbl">E-mail</span><span className="val">contact@vinil1.ro</span></div>
                            <div className="tc-contact-row"><span className="lbl">GDPR</span><span className="val">gdpr@vinil1.ro</span></div>
                            <div className="tc-contact-row"><span className="lbl">Sediu</span><span className="val">România</span></div>
                            <div className="tc-contact-row"><span className="lbl">Program</span><span className="val">Lun–Vin, 09:00–18:00</span></div>
                        </div>
                    </div>

                </div>

                <div className="tc-footer">
                    © 2026 Vinil1.ro · Toate drepturile rezervate · Versiunea documentului: Mai 2026
                </div>
            </div>
        </div>
    )
}