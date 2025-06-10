import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-transparent text-[--background]">
      <div className="flex items-center justify-between h-16">
        <Link href="/">
          <p className="text-lg font-semibold">CuriaChronos</p>
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="text-sm md:text-md bg-transparent text-[--background] border border-[--background] px-2 py-1 md:px-4 md:py-2 rounded-2xl md:rounded-lg hover:bg-[--background] hover:text-[--foreground] transition-colors duration-400">
            Conectare
          </button>
          <button className="text-sm md:text-md bg-[--background] text-[--foreground] px-2 py-1 md:px-4 md:py-2 rounded-2xl md:rounded-lg transition-colors duration-400">
            Înregistrare
          </button>
        </div>
      </div>
    </nav>
  )
}