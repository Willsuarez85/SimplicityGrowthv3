import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		// Simplicity Brand Colors
  		colors: {
  			// Simplicity custom tokens
  			simplicity: {
  				white: '#FFFFFF',
  				offwhite: '#F7F7F7',
  				charcoal: '#0A0A0A',
  				turquoise: '#09B9B4',  // ACCENT - max 5-8% usage
  				gray: {
  					100: '#F7F7F7',
  					200: '#EAEAEA',
  					300: '#BDBDBD',
  					400: '#8C8C8C',
  					500: '#5C5C5C',
  					600: '#3D3D3D',
  				}
  			},
  			// shadcn/ui compatible
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		// 8pt Grid Spacing System
  		spacing: {
  			'18': '4.5rem',   // 72px
  			'22': '5.5rem',   // 88px
  			'30': '7.5rem',   // 120px
  		},
  		// Simplicity Border Radius
  		borderRadius: {
  			'card': '20px',   // Cards, panels
  			'pill': '999px',  // Buttons, badges
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		// Typography
  		fontFamily: {
  			sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
  		},
  		fontSize: {
  			'body': ['16px', { lineHeight: '1.5' }],
  			'body-lg': ['18px', { lineHeight: '1.6' }],
  		},
  		// Animations
  		keyframes: {
  			'slide-in-right': {
  				'0%': { transform: 'translateX(100%)' },
  				'100%': { transform: 'translateX(0)' },
  			},
  			'slide-out-right': {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(100%)' },
  			},
  		},
  		animation: {
  			'slide-in-right': 'slide-in-right 0.3s ease-out',
  			'slide-out-right': 'slide-out-right 0.3s ease-out',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
