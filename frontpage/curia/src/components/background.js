export default function Background() {
  return (
    <div id="home" className="absolute inset-0 w-full h-[30rem] overflow-hidden -z-[9999] pointer-events-none">
      <div
        className="absolute inset-0 overflow-hidden"
      >
        <img
          src="/backgrounds/background-2.webp"
          alt="Background"
          className="w-full h-full object-cover brightness-[0.8]"
        />
      </div>
    </div>
  );
}

// de pus laptopu