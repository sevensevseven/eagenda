export default function Android() {
  return (
    <div className="text-gray-800 space-y-6 max-w-2xl">
      <h2 className="text-2xl font-semibold">Instalare pe Android</h2>

      <section>
        <h3 className="text-lg font-medium underline">Varianta 1 – Cea mai simplă</h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
          <li><strong>Deschideți</strong> aplicația Google Chrome (pictograma rotundă cu patru culori) <img src="/android/chrome.png" className="inline h-10 align-middle" alt="Logo Chrome" />.</li>
          <li>Accesați: <a href="https://app.curiachronos.ro/install" target="_blank" className="text-blue-600 underline">https://app.curiachronos.ro/install</a></li>
          <li>
            Dacă totul funcționează corespunzător:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Veți vedea un buton albastru în centrul paginii cu textul <strong>„Install App”</strong> <img src="/android/inst.png" className="inline h-10 align-middle" alt="Buton install" /> – îl puteți apăsa pentru a instala aplicația.</li>
              <li>Dacă nu vedeți acest buton, este posibil să apară o notificare în partea de sus sau jos a ecranului cu mesajul <em>„Instalați aplicația”</em> sau <em>„Add to Home screen”</em>. Vă rugăm să apăsați pe <strong>„Instalați”</strong>.</li>
              <img src="/android/notif.png" className="h-22 align-middle" alt="Notificare instalare" />
            </ul>
          </li>
          <li>După apăsarea unuia din butoanele specificate mai sus, va fi necesară apăsarea pe „Instalare” sau „Install” pentru a confirma. Aplicația se va instala și va apărea după <strong>10 secunde</strong> pe ecranul telefonului dumneavoastră.</li>
          <img src="/android/confirm.png" className="h-40 align-middle object-contain" alt="Confirmare instalare" />
        </ol>
      </section>

      <section>
        <h3 className="text-lg font-medium underline">Varianta 2 – Dacă nu apare niciun mesaj</h3>
        <p className="text-sm mt-2">Dacă nu vedeți notificarea sau butonul albastru, urmați acești pași:</p>
        <ol className="list-decimal pl-6 mt-2 space-y-2 text-sm text-gray-700">
          <li>Apăsați pe cele trei puncte verticale din colțul din dreapta sus al browserului Chrome.</li>
          <img src="/android/3dots.png" className="h-12 align-middle object-contain" alt="Meniu 3 puncte" />
          <li>Din lista care apare, selectați <em>„Instalați aplicația”</em> sau <em>„Add to Home screen”</em>.</li>
          <img src="/android/buton.png" className="h-80 align-middle object-contain" alt="Buton Install in meniu" />
          <li>Confirmați alegerea.</li>
          <img src="/android/confirm.png" className="h-40 align-middle object-contain" alt="Confirmare instalare" />
          <li>Aplicația va fi adăugată automat pe ecranul principal al dispozitivului dumneavoastră după <strong>10 secunde</strong>.</li>
        </ol>
      </section>

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
  );
}