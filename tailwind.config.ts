import type { Config } from 'tailwindcss'
import { colors } from '@entur/tokens'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        textColor: {
            // Text colors
            'blue-main': colors.brand.blue,
            'blue-40': colors.blues.blue40,
            'blue-50': colors.blues.blue50,
            'blue-60': colors.blues.blue60,
            'blue-70': colors.blues.blue70,
            'blue-80': colors.blues.blue80,
            'blue-90': colors.blues.blue90,
            white: colors.brand.white,
            black: colors.misc.black,
            coral: colors.brand.coral,
        },
        backgroundColor: {
            // Background colors
            'blue-main': colors.brand.blue,
            'blue-10': colors.blues.blue10,
            'blue-20': colors.blues.blue20,
            'blue-30': colors.blues.blue30,
            'blue-40': colors.blues.blue40,
            'blue-45': colors.blues.blue45,
            'blue-50': colors.blues.blue50,
            'blue-60': colors.blues.blue60,
            'blue-70': colors.blues.blue70,
            'blue-80': colors.blues.blue80,
            'blue-90': colors.blues.blue90,
            white: colors.brand.white,
            coral: colors.brand.coral,
            lavender: colors.brand.lavender,
            'mint-contrast': colors.validation.mintContrast,
            'lava-contrast': colors.validation.lavaContrast,
            'canary-contrast': colors.validation.canaryContrast,
        },
        borderColor: {
            'blue-20': colors.blues.blue20,
            'blue-60': colors.blues.blue60,
            white: colors.brand.white,
            coral: colors.brand.coral,
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontSize: {
                '55': '55px',
            },
        },
    },
    plugins: [],
}
export default config
