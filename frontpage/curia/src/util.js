const features = [
    {
        title: "Import de dosare",
        description: "Importă nelimitat dosare direct din portal.just.ro, cu actualizare automată în timp real.",
        img: "/features/document.svg"
    },
    {
        title: "Calendar interactiv personalizat",
        description: "Vizualizează toate ședințele programate într-un calendar clar. Pentru fiecare zi află din lista de ședințe ora/poziția la care ești programat și adaugă notițe personalizate pentru fiecare termen.",
        img: "/features/calendar.svg"
    },
    {
        title: "Notificări inteligente",
        description: "Primește automat alerte pentru modificările din dosare și ședințele ce urmează în următoarele 7 zile.",
        img: "/features/notification.svg"
    },
    {
        title: "Vizualizare oră/poziție a dosarelor în ședințele de judecată",
        description: "Accesează lista completă a dosarelor programate simultan la aceeași instanță, pentru o mai bună planificare a zilei.",
        img: "/features/sedinte.svg"
    },
    {
        title: "Căutare și gestionare avansată",
        description: "Caută rapid dosare după orice informație și organizează-le eficient prin funcții de filtrare, actualizare și ștergere.",
        img: "/features/search.svg"
    },
    {
        title: "Siguranță și fiabilitate ridicată",
        description: "Toate datele sunt protejate, iar sistemul funcționează fără întreruperi, asigurându-ți acces rapid și securizat la informații.",
        img: "/features/security.svg"
    }
];

const faq = [
    {
        title: "Ce este CuriaChronos și cui se adresează?",
        answer: (
          <div className="text-gray-700">
            <p>
              <strong>CuriaChronos</strong> este o <em>aplicație web modernă</em> concepută special pentru profesioniștii din domeniul juridic:
            </p>
            <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
              <li>avocați</li>
              <li>consilieri juridici</li>
              <li>executori judecătorești</li>
              <li>alți specialiști care lucrează cu dosare de instanță</li>
            </ul>
            <br/>
            <p>
              Scopul său este să <strong>centralizeze și automatizeze</strong> procesele repetitive, cum ar fi:
            </p>
            <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
              <li>verificarea modificărilor în dosare</li>
              <li>planificarea ședințelor</li>
              <li>primirea notificărilor relevante</li>
            </ul>
            <br />
            <p>
              Totul este accesibil <strong>direct din orice browser</strong>, iar interfața este gândită să fie <em>intuitivă și eficientă</em>. Poate fi folosită cu ușurință de oricine, indiferent de experiența în utilizarea computerului.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Cum îmi pot adăuga dosarele în aplicație?",
        answer: (<>
            <div className="text-gray-700 space-y-3">
                <p>
                Pentru ca programul să proceseze toate datele dosarelor și să actualizeze modificările acestora din <strong><a target="_blank" href="https://portal.just.ro" className="underline">portal.just.ro</a></strong>, trebuie să completați datele acestora (<strong>X/Y/Z</strong>) în secțiunea <strong className="uppercase">Adăugare dosare</strong> aflată în interfața principală.
                </p>
                <p>
                Toate dosarele astfel introduse vor apărea în secțiunea <strong className="uppercase">Lista de dosare</strong> aflată în interfața principală.
                </p>
                <p>
                Toate dosarele astfel introduse vor avea corespondent imediat în secțiunea <strong className="uppercase">Calendar</strong> aflată în interfața principală.
                </p>
                <p>
                Atunci când adăugați dosarele, pentru cele care au parcurs mai multe cicluri procesuale, aveți posibilitatea să vă alegeți adăugarea lor în lista de dosare, în funcție de interes <em>(la instanța în curs sau la toate instanțele pe rolul cărora s-au aflat)</em>, acestea fiind afișate separat.
                </p>
                <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
            </div>
        </>)
    },
    {
        title: "Ce notificări voi primi?",
        answer: (<>
            <div className="text-gray-700 space-y-3">
            <p>
              Veți fi notificat atunci când în <strong><a target="_blank" href="https://portal.just.ro" className="underline">portal.just.ro</a></strong> se produce o modificare într-un anumit dosar (de exemplu, dacă dosarul nu avea fixat termen de judecată, veți știi că eventual s-a fixat termenul pe care îl așteptați sau dacă un dosar așteptați pronunțarea unei soluții, veți știi că a fost dată acea soluție).
            </p>
            <p>
              Pentru fiecare termen de judecată veți fi notificat cu cel puțin <strong>7 zile înainte</strong> că urmează să aveți înfățișarea în dosarul respectiv.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        </>)
    },
    {
        title: "Cum verific agenda?",
        answer: (
          <div className="text-gray-700 space-y-3">
                <p>
                Secțiunea <strong className="uppercase">Calendar</strong> din interfața principală devine <strong>agenda dumneavoastră digitală</strong> — fiecare dosar programat în ziua respectivă va apărea sub forma unei <span className="text-blue-600 font-semibold">buline albastre</span>.
                </p>
                <p>
                Apăsați data din calendar care vă interesează și veți identifica, pentru fiecare dosar din acea zi:
                <br />
                — numărul dosarului, <br />
                — indicativul instanței și anul, <br />
                — instanța la care trebuie să vă prezentați, <br />
                — <strong>ora programată</strong> a dosarului (fixată în <em>portal.just.ro</em>), <br />
                — lista completă a ședinței, unde vă puteți regăsi <strong>poziția</strong> dosarului, <br />
                — câmpul dedicat <em>notițelor personale</em> pentru a vă pregăti eficient.
                </p>
                <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
            </div>
        )
    },
    {
        title: "Ce pot afla din lista de dosare?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Fiecare termen de judecată cu soluția aferentă.
            </p>
            <p>
              Aveți posibilitatea de a transmite pe email oricui dorești soluția fiecărui termen, apăsând butonul de <strong>partajare</strong> <img src="/faq/parta.png" className="inline h-8 align-middle" alt="Buton partajare" />.
            </p>
            <p>
              Toate detaliile dosarului (<em>părți, istoric de termene, instanța, etc.</em>)
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Cum pot modifica sau șterge un dosar din contul meu?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Modificările se produc automat. Puteți adăuga dosarul pentru altă instanță, dacă ați trecut, de exemplu, într-o cale de atac sau acesta s-a declinat; această adăugare se face din pagina <strong className="uppercase">ADĂUGARE DOSARE</strong>.
            </p>
            <p>
              Puteți șterge dosarul din pagina <strong className="uppercase">LISTA DE DOSARE</strong>, cu ajutorul butonului <strong>"Șterge"</strong> <img src="/faq/del.png" className="inline h-8 align-middle" alt="Buton delete" />.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Ce se întâmplă după ce plătesc?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Dacă ați plătit, toată perioada aleasă <em>(o lună, 6 luni, un an)</em> este acoperită.
            </p>
            <p>
              În funcție de perioada aleasă, veți primi o notificare de la partenerul nostru de plăți, <strong>Stripe</strong>, în legătură cu reînnoirea automată a abonamentului.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Cum modific datele abonamentului?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Dacă vreți să vă modificați datele abonamentului, puteți face asta oricând din pagina principală a aplicației, cu ajutorul butonului <strong>"Modificare Date Abonament"</strong> <img src="/faq/modif.png" className="inline h-8 align-middle" alt="Buton modificare" />, care vă va redirecționa către pagina de gestionare a abonamentului.
            </p>
            <p>
              În portalul de gestionare a abonamentului, aveți posibilitatea să:
            </p>
            <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
              <li><strong>Actualizați metoda de plată</strong> utilizată pentru reînnoirea automată, adăugând un nou card sau înlocuind cardul existent.</li>
              <li><strong>Modificați informațiile de facturare</strong>, precum numele, adresa completă <em>(inclusiv cod poștal și oraș)</em>, numărul de telefon și, dacă este cazul, identificatorul fiscal <em>(CUI/CNP)</em>.</li>
              <li><strong>Vizualizați istoricul facturilor</strong> și descărcați detalii despre plățile efectuate.</li>
              <li><strong>Anulați sau reactivați abonamentul</strong> direct din interfață, în funcție de preferințe.</li>
            </ul>
            <p>
              Totul se realizează <em>rapid și intuitiv</em>, fără pași complicați.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Cum mă dezabonez?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Dacă vreți să vă dezabonați, puteți face asta oricând din pagina principală a aplicației, cu ajutorul butonului <strong>"Modificare Date Abonament"</strong> <img src="/faq/modif.png" className="inline h-8 align-middle" alt="Buton modificare" />, care vă va redirecționa către pagina de gestionare a abonamentului. Aici, apăsând butonul <strong>CANCEL SUBSCRIPTION</strong> <img src="/faq/cancel.png" className="inline h-10 align-middle" alt="Buton cancel abonament" />, abonamentul va rămâne valabil în cursul perioadei alese și va fi anulat la finalul acestei perioade.
            </p>
            <p className="text-red-600 font-semibold">
              ATENȚIE! Dacă anulați abonamentul din orice motive, o nouă abonare presupune reintroducerea tuturor dosarelor.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Ce se întâmplă dacă nu plătesc la timp? Pierd datele?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Dacă plata eșuează, abonamentul e valabil, dar va fi necesară adăugarea unei metode de plată valabile în termen de <strong>3 săptămâni</strong>. Veți fi notificat în acest sens.
            </p>
            <p className="text-red-600 font-semibold">
              ATENȚIE! Dacă în termen de 3 săptămâni o nouă metodă de plată care să fie valabilă nu este adăugată, abonamentul va fi anulat, iar lista dumneavoastră de dosare se va pierde.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Există o perioadă de probă sau acces gratuit?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Aveți o perioadă de probă de <strong>10 zile</strong>, în care puteți utiliza gratuit <em>toate funcționalitățile</em>. La sfârșitul acestei perioade, va fi necesară opțiunea de abonare pentru una dintre perioadele de plată.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    },
    {
        title: "Datele mele sunt în siguranță? Cine are acces la ele?",
        answer: (
          <div className="text-gray-700 space-y-3">
            <p>
              Datele introduse în aplicație sunt <strong>confidențiale</strong> și nu sunt partajate cu terți.
            </p>
            <p>
              Ele sunt salvate într-un mediu securizat, iar accesul este permis doar utilizatorului care le-a înregistrat. <em>Nimeni altcineva nu le poate vizualiza.</em>
            </p>
            <p>
              Comunicarea cu serverul se face prin conexiuni <strong>criptate</strong>, astfel încât toate operațiunile, de la autentificare până la verificarea dosarelor, se desfășoară în siguranță.
            </p>
            <p>
              În plus, aplicația include <strong>măsuri automate de protecție</strong> împotriva accesului neautorizat și a utilizării abuzive.
            </p>
            <p>
              Nu este nevoie de cunoștințe tehnice pentru a vă proteja contul; totul este gândit să funcționeze <em>în mod implicit</em> și să ofere <strong>liniște și siguranță</strong> în utilizare.
            </p>
            <section className="mt-4 pt-4 border-t border-gray-300">
        <h3 className="text-lg font-medium">Aveți întrebări?</h3>
        <p className="text-sm text-gray-700 mt-2">Dacă aveți nelămuriri sau întâmpinați dificultăți la instalare, nu ezitați să ne contactați la adresa <a href="mailto:contact@curiachronos.ro" className="inline underline text-blue-600 hover:text-blue-700">contact@curiachronos.ro</a> sau apăsând butonul de mai jos.</p>
        <a
          href="mailto:contact@curiachronos.ro"
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Contactați-ne
        </a>
      </section>
          </div>
        )
    }
]

export function getFeatures() {
    return features;
}

export function getFAQ() {
    return faq;
}