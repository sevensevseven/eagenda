"use client";

export default function Pricing() {
  const plans = [
    { name: "Lunar", price: "6.99€", duration: "1 lună" },
    { name: "Semestrial", price: "39.99€", duration: "6 luni" },
    { name: "Anual", price: "74.99€", duration: "12 luni" },
  ];

  const features = [
    "Acces gratuit timp de 10 zile",
    "Acces complet la toate funcționalitățile",
    "Notificări automate în timp real",
    "Import nelimitat de dosare",
    "Calendar interactiv cu termenele tale",
  ];

  return (
    <section id="pricing" className="py-16 flex flex-col lg:flex-row-reverse gap-10 lg:gap-20 items-center justify-around">
        <div className="flex flex-col space-y-6 max-w-xl items-center lg:items-start justify-start text-center lg:text-left">
          <h2 className="text-3xl font-semibold">Un singur plan. Fără complicații.</h2>
          <p className="text-gray-700 text-lg">
            Alege perioada de plată care ți se potrivește și ai acces instant la toate funcționalitățile CuriaChronos. Nu există costuri ascunse, taxe suplimentare sau limitări de funcții.
          </p>
          <div className="space-y-4 w-full">
            {features.map((item, idx) => (
              <div key={idx} className={`flex items-start ${idx === 0 ? "bg-green-600" : "bg-white"} shadow-md rounded-lg p-4 ${idx === 0 ? "animate-pulse-scale" : ""}`}>
                <div className={idx === 0 ? "text-white" : "text-green-600"}>
                <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                </div>
                <p className={`${idx === 0 ? "text-white" : "text-gray-700"} text-left`}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-center">
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-6 w-full sm:w-auto">
            <h3 className="text-xl font-bold text-center">Planuri disponibile</h3>
            {plans.map((plan, index) => (
              <div key={plan.name} className="border border-gray-200 rounded-lg shadow-sm p-4 text-center sm:min-w-[360px]">
                <h4 className="text-lg font-semibold mb-1">{plan.name}</h4>
                <p className="text-3xl font-bold text-[--darker]">{plan.price}</p>
                <p className="text-sm text-gray-500">{plan.duration}</p>
                <button onClick={() => window.location.assign(`https://app.curiachronos.ro/auth/signup/${index + 1}`)} className="mt-4 px-4 py-2 bg-[--accent] text-[--darker] rounded hover:bg-[--darker] hover:text-[--accent] transition-colors">
                  Începe acum
                </button>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
