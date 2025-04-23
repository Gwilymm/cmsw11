/** @type {import('tailwindcss').Config} */
export default {
	content: [ './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}' ],
	theme: {
		extend: {
			// Définition des couleurs dans TailwindCSS 4
			colors: {
				// Palette rétro années 80
				cream: '#f5f0e8', // Arrière-plan crème
				night: '#0a0b0c', // Noir profond
				petrol: '#0d4b59', // Bleu pétrole
				rust: '#c74e36', // Rouge/orange rouille
				'pastel-blue': '#88a3bc', // Bleu pastel complémentaire
				'pastel-green': '#a3bc88', // Vert pastel complémentaire

				// Nouvelles couleurs Neo-Memphis
				'neo-pink': '#ffb0bd', // Rose doux néo-memphis
				'neo-yellow': '#ffd166', // Jaune vif néo-memphis
				'neo-blue': '#a5c8e4', // Bleu doux néo-memphis
				'neo-mint': '#bce4d0', // Menthe néo-memphis
				'neo-peach': '#ffcab0', // Pêche néo-memphis
				'neo-lavender': '#dcc7ff', // Lavande néo-memphis
			},
			// Configuration de fonctionnalités personnalisées
			fontFamily: {
				mono: [ '"IBM Plex Mono"', '"Space Mono"', 'VT323', 'monospace' ],
				display: [ '"IBM Plex Mono"', '"Space Mono"', 'monospace' ],
			},
			spacing: {
				'print': '2.5rem', // Espacement généreux inspiré du print
			},
			letterSpacing: {
				'retro': '0.05em',
				'neo': '0.1em',
			},
			backgroundImage: {
				'grid-dots': 'radial-gradient(currentColor 1px, transparent 1px)',
				'grid-lines': 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
				'zigzag': "url(\"data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6 L10 0 L20 6 L30 0 L40 6 L40 12 L30 6 L20 12 L10 6 L0 12 Z' fill='rgba(10, 11, 12, 0.05)' /%3E%3C/svg%3E\")",
				'neo-dots': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgba(10, 11, 12, 0.05)' fill-opacity='0.3'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
				'confetti': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a5c8e4' fill-opacity='0.15'%3E%3Cpath d='M0 0h4v4H0V0zm8 0h4v4H8V0zm8 0h4v4h-4V0z'/%3E%3C/g%3E%3C/svg%3E\")",
			},
			backgroundSize: {
				'grid-dots': '20px 20px',
				'grid-lines': '20px 20px',
				'neo-dots': '20px 20px',
				'confetti': '40px 40px',
			}
		},
	},
	// Définition des classes personnalisées pour TailwindCSS 4
	plugins: [
		function ({ addComponents, addUtilities }) {
			// Ajouter les utilities personnalisés
			addUtilities({
				'.text-shadow-glitch': {
					'text-shadow': '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)',
				},
				'.animate-scanline': {
					'animation': 'scanline 10s linear infinite',
				},
				'.clip-triangle': {
					'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)',
				},
				'.clip-circle': {
					'clip-path': 'circle(50% at 50% 50%)',
				},
				'.clip-rhombus': {
					'clip-path': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
				},
				'.clip-hexagon': {
					'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
				},
				'.neo-border': {
					'border': '2px solid currentColor',
					'box-shadow': '4px 4px 0 currentColor',
				},
				'.neo-border-sm': {
					'border': '1px solid currentColor',
					'box-shadow': '2px 2px 0 currentColor',
				},
				'.paper-cut': {
					'box-shadow': '0 1px 2px rgba(10, 11, 12, 0.1), 0 3px 6px rgba(10, 11, 12, 0.08)',
					'border': '1px solid rgba(10, 11, 12, 0.05)',
				},
				'.paper-cut-soft': {
					'box-shadow': '2px 2px 0 rgba(10, 11, 12, 0.05)',
					'border': '1px solid rgba(10, 11, 12, 0.1)',
				},
			});

			// Ajouter les animations via @keyframes
			addComponents({
				'@keyframes scanline': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' },
				},
				'@keyframes float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'@keyframes pulse-subtle': {
					'0%, 100%': { opacity: '0.8' },
					'50%': { opacity: '0.4' },
				}
			});
		}
	],
}