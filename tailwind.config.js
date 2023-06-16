import { colors } from '@entur/tokens'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        textColor: {
            'blue-main': colors.brand.blue,
            'blue-50': colors.blues.blue50,
            'blue-80': colors.blues.blue80,
        },
        extend: {},
    },
    plugins: [],
}
