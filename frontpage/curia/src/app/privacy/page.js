export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold">Politica de Confidențialitate CuriaChronos</h1>
      <p className="text-sm text-gray-500">Data ultimei actualizări: 23 iunie 2025</p>

      <section>
        <h2 className="text-xl font-semibold">1. Informații generale</h2>
        <p>1.1. Această Politică de Confidențialitate („Politica”) descrie modul în care CuriaChronos, o aplicație dezvoltată de Nuvio Digital SRL („noi”, „CuriaChronos”), colectează, utilizează, stochează și protejează datele cu caracter personal ale utilizatorilor („date personale”).</p>
        <p>1.2. Prin utilizarea platformei CuriaChronos, sunteți de acord cu colectarea și prelucrarea datelor conforme cu această Politică.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Datele cu caracter personal colectate</h2>
        <p>2.1. Date de identificare și contact</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Nume, prenume</li>
          <li>Adresă de email</li>
          <li>Parolă (criptată)</li>
        </ul>
        <p>2.2. Date de utilizare a serviciului</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Dosarele importate din portal.just.ro (inclusiv numerele și detaliile dosarelor)</li>
          <li>Notele adăugate de utilizator</li>
          <li>Programările de ședințe (date, ore, instanțe)</li>
        </ul>
        <p>2.3. Date tehnice și de conexiune</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Adresa IP</li>
          <li>Informații despre browser și dispozitiv</li>
          <li>Cookie-uri și tehnologii similare</li>
        </ul>
        <p>2.4. Date de plată</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Informații minimal necesare prelucrate de Stripe (nu stocăm direct datele cardului)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Scopurile și temeiurile prelucrării</h2>
        <p>3.1. Executarea contractului și furnizarea serviciilor:</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Gestionarea contului și autentificarea (bază: art. 6(1)(b) GDPR)</li>
          <li>Sincronizarea automată și manuală a dosarelor cu portal.just.ro</li>
        </ul>
        <p>3.2. Conformitate legală și securitate:</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Respectarea obligațiilor legale și de audit (bază: art. 6(1)(c) GDPR)</li>
          <li>Prevenirea și detectarea fraudelor, rate limiting (bază: art. 6(1)(f) GDPR – interes legitim)</li>
        </ul>
        <p>3.3. Comunicare și suport:</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Trimiterea de notificări prin email (ședințe, modificări)</li>
          <li>Răspuns la întrebări și solicitări de suport (bază: art. 6(1)(f) GDPR – interes legitim)</li>
        </ul>
        <p>3.4. Marketing și îmbunătățirea serviciului (opțional, cu consimțământ):</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Anchete de satisfacție, comunicări comerciale (bază: art. 6(1)(a) GDPR)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Divulgarea și transferul datelor</h2>
        <p>4.1. Furnizori de servicii terți:</p>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Stripe (procesare plăți)</li>
          <li>MailJet (trimitere email-uri)</li>
          <li>portal.just.ro (sursă de date juridice)</li>
        </ul>
        <p>4.2. Transferuri în afara SEE:</p>
        <p>Toți furnizorii terți menționați mai sus sunt supuși unor acorduri de prelucrare conforme cu GDPR și, acolo unde este cazul, clauze-cadru UE.</p>
        <p>4.3. Obligații legale:</p>
        <p>Putem divulga date personale autorităților competente atunci când legea ne obligă.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Durata stocării și ștergerea datelor</h2>
        <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
          <li>5.1. Datele din contul utilizatorului și dosarele asociate vor fi păstrate pe durata contractului și încă 2 ani după încetarea acestuia, conform reglementărilor fiscale și de răspundere profesională.</li>
          <li>5.2. Datele tehnice și de log (IP, interogări API) vor fi stocate pentru o perioadă de maximum 1 an, apoi vor fi anonimizate sau șterse.</li>
          <li>5.3. La cererea expresă a utilizatorului, datele personale pot fi șterse în orice moment, cu excepția celor care sunt necesare conform obligațiilor legale sau care trebuie păstrate pentru finalizarea procedurilor de plată.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Securitatea datelor</h2>
        <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
          <li>6.1. Toate comunicațiile dintre client și server sunt criptate TLS/HTTPS.</li>
          <li>6.2. Parolele sunt criptate și stocate.</li>
          <li>6.3. Măsuri automate de protecție împotriva accesului neautorizat și a utilizării abuzive.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Drepturile persoanelor vizate</h2>
        <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
          <li>Drept de acces: puteți solicita confirmarea prelucrării datelor și copiii ale acestora.</li>
          <li>Drept de rectificare: puteți corecta datele inexacte.</li>
          <li>Drept de ștergere („dreptul de a fi uitat”): puteți solicita ștergerea datelor, în limitele legale.</li>
          <li>Drept de restricționare a prelucrării: puteți cere limitarea utilizării datelor.</li>
          <li>Drept de portabilitate: primiți datele într-un format structurat, uzual, și le puteți transmite altui operator.</li>
          <li>Drept de opoziție: vă puteți opune prelucrării bazate pe interes legitim.</li>
          <li>Retragerea consimțământului: pentru prelucrări bazate pe consimțământ.</li>
          <li>Pentru exercitarea oricărui drept, ne puteți contacta la: <a href="mailto:contact@curiachronos.ro" className="text-blue-600 underline">contact@curiachronos.ro</a></li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">8. Utilizarea cookie-urilor și tehnologii similare</h2>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>8.1. Folosim cookie-uri strict necesare pentru funcționarea platformei.</li>
          <li>8.3. Nu folosim cookie-uri de tracking pentru publicitate terță parte.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">9. Modificări ale Politicii</h2>
        <p>9.1. Putem actualiza această Politică periodic; modificările vor fi publicate pe site și notificate prin email cu cel puțin 30 de zile înainte.</p>
        <p>9.2. Vă recomandăm să revizuiți ocazional această pagină pentru informații actualizate.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">10. Legislație aplicabilă</h2>
        <p>10.1. Prelucrarea datelor cu caracter personal se realizează în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația națională aplicabilă în România.</p>
      </section>

      <p>
        Prin continuarea utilizării CuriaChronos, confirmați că ați citit și acceptat această Politică de Confidențialitate.
      </p>
      <p>
        Pentru întrebări și suport, vă rugăm să ne contactați la: <a href="mailto:support@curiachronos.ro" className="text-blue-600 underline">contact@curiachronos.ro</a>
      </p>
    </div>
  );
}