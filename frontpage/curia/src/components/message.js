export default function Message() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 py-16">
            <div className="max-w-xl text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl font-semibold mb-4">Primește notificări când contează</h1>
                <p className="text-gray-700 mb-6">
                    CuriaChronos te anunță automat atunci când apar orice modificări în dosare și când urmează termenul dosarului tău.
                    Nu trebuie să verifici nimic manual, deoarece ești mereu cu un pas înainte.
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                    {[
                        "Notificări pentru ședințele din următoarele 7 zile",
                        "Alertă imediată pentru orice modificare apărută",
                        "Fără griji, fără efort"
                    ].map((text, index) => (
                        <div key={index} className="flex items-center bg-white shadow-md rounded-lg p-4">
                            <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-gray-700 text-start">{text}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <button className="mt-6 px-6 py-3 min-w-36 bg-[--accent] text-[--darker] rounded-lg hover:bg-[--darker] hover:text-[--accent] transition-colors">Descopera</button>
                </div>
            </div>
            <div className="max-w-lg w-full">
                <img src="/message/message.png" alt="Exemplu de notificare prin email" className="w-full" />
            </div>
        </div>
    )
}