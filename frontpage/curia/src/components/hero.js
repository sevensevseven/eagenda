export default function Hero() {
  return (
    <section className="relative flex items-start justify-end bg-transparent text-[--background] py-16 h-[34rem] max-h-[34rem]">
      <div className="flex flex-col items-center md:items-end text-center z-10">
        {/* TODO: DE TERMINAT */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center md:text-end max-w-2xl font-extrabold mb-8">Asistentul digital de încredere pentru profesioniștii juridici</h1>
        <p className="text-sm sm:text-lg text-center md:text-end max-w-lg mb-8">Lorem aliquip elit elit nisi qui incididunt culpa reprehenderit nulla dolore do veniam qui. Ex in ex nostrud pariatur elit officia elit laboris elit esse. Mollit sint nostrud consequat irure quis.</p>
        <div className="flex items-center justify-between space-x-4">
          <button className="bg-[--background] text-[--foreground] px-8 py-4 text-md rounded-lg transition-colors duration-400">
            Începe acum
          </button>
        </div>
      </div>
    </section>
  )
}