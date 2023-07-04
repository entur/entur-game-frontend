import { colors } from '@entur/tokens'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        textColor: {
            // Text colors
            'blue-main': colors.brand.blue,
            'blue-40': colors.blues.blue40,
            'blue-50': colors.blues.blue50,
            'blue-60': colors.blues.blue60,
            'blue-80': colors.blues.blue80,
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
        },
        extend: {},
    },
    plugins: [],
}
