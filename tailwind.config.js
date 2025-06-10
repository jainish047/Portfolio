// tailwind.config.js
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        'font-orbitron',
        'font-rajdhani',
    ],
    theme: {
        extend: {
            fontFamily: {
                // orbitron: ['var(--font-orbitron)', 'Orbitron', 'sans-serif'],
                // rajdhani: ['var(--font-rajdhani)', 'Rajdhani', 'sans-serif'],
                orbitron: ['var(--font-orbitron)', 'monospace'], // Orbitron is monospace-like
                rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
                // orbitron: ['"Orbitron"', 'monospace'],
                // rajdhani: ['"Rajdhani"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};