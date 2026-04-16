import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Playfair Display"', 'Georgia', 'serif'],
				body: ['"Source Sans 3"', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				bento: '1.25rem'
			},
			colors: {
				wim: {
					amber: '#D97706',
					'amber-light': '#FDE68A',
					terracotta: '#C2714F',
					'terracotta-light': '#F4A87C',
					sage: '#7C9E7A',
					'sage-light': '#B8D4B6',
					cream: '#FDF6EC',
					'cream-dark': '#F5E8D3',
					brown: '#3D2B1F',
					'brown-light': '#6B4C38'
				}
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				wimmelbuch: {
					primary: '#D97706',
					'primary-content': '#FDF6EC',
					secondary: '#C2714F',
					'secondary-content': '#FDF6EC',
					accent: '#7C9E7A',
					'accent-content': '#FDF6EC',
					neutral: '#3D2B1F',
					'neutral-content': '#FDF6EC',
					'base-100': '#FDF6EC',
					'base-200': '#F5E8D3',
					'base-300': '#EDD9BA',
					'base-content': '#3D2B1F',
					info: '#7C9E7A',
					success: '#7C9E7A',
					warning: '#D97706',
					error: '#C2714F'
				}
			}
		],
		darkTheme: false,
		base: true,
		styled: true,
		utils: true,
		logs: false
	}
};
