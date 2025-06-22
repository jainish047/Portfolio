export default function Home() {
  return (
    <div className="min-h-screen p-8 space-y-6">
      <h1 className="font-orbitron font-extrabold text-white text-3xl">This is Orbitron</h1>

      <p className="font-rajdhani text-white text-3xl">rThis is Rajdhani</p>

      {/* Debug Section */}
      <div className="bg-yellow-900/50 p-6 border border-yellow-400 rounded">
        <h2 className="text-yellow-400 font-bold mb-4 text-xl">
          🔍 Font Debug Test
        </h2>

        {/* Test 1: Orbitron */}
        <div className="mb-4 p-4 bg-blue-900/30 border border-blue-400 rounded">
          <p className="text-blue-300 text-sm mb-2">
            Should be ORBITRON (futuristic, tech-like):
          </p>
          <h1 className="font-orbitron font-bold text-3xl text-white">
            GALACTIC PORTFOLIO - Orbitron Font
          </h1>
        </div>

        {/* Test 2: Rajdhani */}
        <div className="mb-4 p-4 bg-green-900/30 border border-green-400 rounded">
          <p className="text-green-300 text-sm mb-2">
            Should be RAJDHANI (clean, modern):
          </p>
          <p className="font-rajdhani text-2xl text-white">
            Welcome to my space - Rajdhani Font
          </p>
        </div>

        {/* Test 3: Default */}
        <div className="mb-4 p-4 bg-red-900/30 border border-red-400 rounded">
          <p className="text-red-300 text-sm mb-2">Default system font:</p>
          <p className="text-2xl text-white">
            Default system font for comparison
          </p>
        </div>

        {/* Test 4: Inline styles to force fonts */}
        <div className="mb-4 p-4 bg-purple-900/30 border border-purple-400 rounded">
          <p className="text-purple-300 text-sm mb-2">
            Forced with inline styles:
          </p>
          <h2
            style={{ fontFamily: '"Orbitron"' }}
            className="text-2xl text-white mb-2"
          >
            Inline Orbitron Font
            Inline Rajdhani Font
          </h2>
          <h2
            style={{ fontFamily: '"Rajdhani"' }}
            className="text-2xl text-white"
          >
            Inline Orbitron Font
            Inline Rajdhani Font
          </h2>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-white font-bold mb-2">What to look for:</h3>
        <ul className="text-gray-300 space-y-1 list-disc ml-6">
          <li>
            <strong>Orbitron:</strong> Should look futuristic, tech-like, with
            unique letter shapes
          </li>
          <li>
            <strong>Rajdhani:</strong> Should look clean and modern, different
            from default
          </li>
          <li>
            <strong>Default:</strong> Your system&aposs standard font
          </li>
          <li>If all look the same, fonts aren&apost loading</li>
          <li>
            If inline styles work but Tailwind classes don&apost, there&aposs a config
            issue
          </li>
        </ul>
      </div>
    </div>
  );
}
