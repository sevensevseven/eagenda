export default function IOS() {
  return (
    <div className="text-gray-800 space-y-4 max-w-2xl">
      <h2 className="text-2xl font-semibold">Instalare pe dispozitiv iOS</h2>
      <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
        <li><strong>Deschideți</strong> aplicația Safari (pictograma cu o busolă) <img src="/ios/safari.png" className="inline h-10 align-middle" alt="Logo Safari" />.</li>
        <li>Accesați adresa: <a href="https://app.curiachronos.ro" target="_blank" className="text-blue-600 underline">https://app.curiachronos.ro</a></li>
        <li><strong>Apăsați</strong> pe butonul de partajare – este reprezentat printr-un pătrat cu o săgeată care iese în sus (situat în partea de jos a ecranului).</li>
        <img src="/ios/parta1.jpg" className="h-24 align-middle object-contain" alt="Instructiuni buton partajare" />
        <li>Derulați opțiunile care apar și apăsați pe <em>„Adăugați pe ecranul principal”</em> („Add to Home Screen”).</li>
        <img src="/ios/adaugare.jpg" className="h-80 align-middle object-contain" alt="Instructiuni adaugare home screen" />
        <li>Confirmați alegerea apăsând pe <strong>„Adăugați”</strong> în colțul din dreapta sus.</li>
        <img src="/ios/add.jpg" className="h-52 align-middle object-contain" alt="Instructiuni adaugare home screen 2" />
        <li>Aplicația va apărea pe ecranul principal, alături de celelalte aplicații ale dumneavoastră.</li>
      </ol>
    </div>
  );
}