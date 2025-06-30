export default function Footer() {
  return (
    <footer className="bg-[--foreground] text-gray-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">CuriaChronos</h2>
          <p className="text-sm">Asistentul digital de încredere pentru profesioniștii juridici.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Navigare</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#features" className="hover:text-white transition-colors">Funcționalități</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Prețuri</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">Întrebări frecvente</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="text-sm space-y-1">
            <li>Email: <a href="mailto:contact@curiachronos.ro" className=" underline">contact@curiachronos.ro</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="text-sm space-y-1">
            <li><a href="/terms" className="hover:text-white transition-colors">Termeni și condiții</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Politica de confidențialitate</a></li>
            <li><a href="https://anpc.ro/" target="_blank" className="hover:text-white transition-colors">
                <img src="/footer/anpc.png" className="rounded-md max-w-40" />
            </a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-500">&copy; {new Date().getFullYear()} CuriaChronos. Toate drepturile rezervate.</div>
    </footer>
  );
}
