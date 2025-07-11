"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showLoginButtons, setShowLoginButtons] = useState(false);

  useEffect(() => {
    axios.post("https://api.curiachronos.ro/api/validateToken", {}, { withCredentials: true })
			.then(response => {
				setShowLoginButtons(!response.data.valid);
				setLoaded(true);
			})
			.catch(() => {
				setShowLoginButtons(true);
				setLoaded(true);
			});
    const handleNavbarScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    const handleColorScroll = () => {
      setInverted(window.scrollY > 500);
    }
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', handleColorScroll);
    handleNavbarScroll();
    handleColorScroll();
    return () => {
      window.removeEventListener('scroll', handleNavbarScroll);
      window.removeEventListener('scroll', handleColorScroll);
    }
  }, []);
  return (
    <nav className={`sticky top-0 z-50 ${inverted ? "text-[--foreground]" : "text-[--background]"} transition-colors duration-200 ${scrolled ? 'bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between h-16 container mx-auto px-4 lg:px-8">
        <Link href="/">
          <p className="text-lg font-semibold">CuriaChronos</p>
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          {
            loaded && showLoginButtons ? (
              <>
                <button onClick={() => window.location.assign("https://app.curiachronos.ro/auth")} className={`text-sm md:text-md bg-transparent ${inverted ? "text-[--foreground]" : "text-[--background]"} border ${inverted ? "border-[--foreground]" : "border-[--background]"} px-2 py-1 md:px-4 md:py-2 rounded-2xl md:rounded-lg ${inverted ? "hover:bg-[--foreground]" : "hover:bg-[--background]"} ${inverted ? "hover:text-[--background]" : "hover:text-[--foreground]"} transition-colors duration-400`}>
                  Conectare
                </button>
                <button onClick={() => window.location.assign("https://app.curiachronos.ro/auth/signup")} className={`text-sm md:text-md ${inverted ? "bg-[--foreground]" : "bg-[--background]"} ${inverted ? "text-[--background]" : "text-[--foreground]"} px-2 py-1 md:px-4 md:py-2 rounded-2xl md:rounded-lg transition-colors duration-400`}>
                  Înregistrare
                </button>
              </>
            ) : loaded && !showLoginButtons ? (
              <button onClick={() => window.location.assign("https://app.curiachronos.ro")} className={`text-sm md:text-md bg-transparent ${inverted ? "text-[--foreground]" : "text-[--background]"} border ${inverted ? "border-[--foreground]" : "border-[--background]"} px-2 py-1 md:px-4 md:py-2 rounded-2xl md:rounded-lg ${inverted ? "hover:bg-[--foreground]" : "hover:bg-[--background]"} ${inverted ? "hover:text-[--background]" : "hover:text-[--foreground]"} transition-colors duration-400`}>
                Intră în aplicație
              </button>
            ) : (
              <button className='hidden'>Ascuns</button>
            )
          }
        </div>
      </div>
    </nav>
  )
}