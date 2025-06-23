export default function Hero() {
  return (
    <section className="relative flex items-start justify-end bg-transparent text-[--background] py-8 min-[370px]:py-16 h-[28rem] max-h-[28rem]">
      <div className="flex flex-col items-center md:items-end text-center z-10">
        <h1 className="text-4xl md:text-5xl text-center md:text-end max-w-2xl font-extrabold mb-4 min-[370px]:mb-8">Asistentul digital de încredere pentru profesioniștii juridici</h1>
        <p className="text-lg sm:text-xl text-center md:text-end max-w-lg mb-4 min-[370px]:mb-8">Agenda ta juridică, complet automatizată.</p>
        <div className="flex items-center justify-between space-x-4">
          <button className="bg-[--background] text-[--foreground] px-8 py-4 text-md rounded-lg transition-colors duration-400">
            Începe acum
          </button>
        </div>
      </div>
    </section>
  )
}