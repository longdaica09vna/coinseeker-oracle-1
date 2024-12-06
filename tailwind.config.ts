import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#1D2234',
        blue: '#1278FA',
        blue2: '#E5F0FF',
        blue3: '#58A1FF',
        grey1: '#F5F5F5',
        grey2: '#E9E9E9',
        grey3: '#B8BFCB',
        grey4: '#707D95',
        primary: '#1278FA',
        dark0: '#141516',
        dark1: '#1B1D1F',
        dark2: '#202428',
        dark3: '#72787E',
        dark4: '#B1B3B9',
        dark5: '#F3F4F5',
        green: '#1AB961',
        red1: '#BB2323',
        mainBg: '#090A0B',
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config

export default config
