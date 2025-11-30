import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Outfit', 'system-ui', 'sans-serif'],
				'heading': ['Fredoka', 'Outfit', 'system-ui', 'sans-serif'],
				'professional': ['Poppins', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					dark: 'hsl(var(--secondary-dark))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					light: 'hsl(var(--accent-light))',
					dark: 'hsl(var(--accent-dark))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'ocean-gradient': 'var(--ocean-gradient)',
				'serenity-gradient': 'var(--serenity-gradient)',
				'pink-gradient': 'var(--pink-gradient)',
				'hero-gradient': 'var(--hero-gradient)'
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
				'glow': 'var(--shadow-glow)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				'float-particle': {
					'0%': { 
						transform: 'translate(0, 0) rotate(0deg)',
						opacity: '1'
					},
					'25%': { 
						transform: 'translate(30px, -30px) rotate(90deg)',
						opacity: '0.8'
					},
					'50%': { 
						transform: 'translate(10px, -60px) rotate(180deg)',
						opacity: '0.6'
					},
					'75%': { 
						transform: 'translate(-20px, -40px) rotate(270deg)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'translate(0, 0) rotate(360deg)',
						opacity: '1'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'brush-stroke': {
					'0%, 100%': { 
						transform: 'translateX(0) rotate(0deg)',
						opacity: '1'
					},
					'25%': { 
						transform: 'translateX(-8px) rotate(-15deg)',
						opacity: '0.8'
					},
					'75%': { 
						transform: 'translateX(8px) rotate(15deg)',
						opacity: '0.8'
					}
				},
				'water-ripple': {
					'0%': { 
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': { 
						transform: 'scale(1.2)',
						opacity: '0.6'
					},
					'100%': { 
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'kibble-drop': {
					'0%': { 
						transform: 'translateY(-10px) rotate(0deg)',
						opacity: '0'
					},
					'50%': { 
						transform: 'translateY(5px) rotate(180deg)',
						opacity: '1'
					},
					'100%': { 
						transform: 'translateY(0) rotate(360deg)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'float-particle': 'float-particle 20s ease-in-out infinite',
				'scale-in': 'scale-in 0.3s ease-out',
				'brush-stroke': 'brush-stroke 1.5s ease-in-out infinite',
				'water-ripple': 'water-ripple 2s ease-in-out infinite',
				'kibble-drop': 'kibble-drop 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;