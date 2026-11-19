import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            // PLACEHOLDER : à remplacer par la palette extraite du logo.
            // Tout le design lit ces tokens, un seul endroit à modifier.
            colors: {
                brand: {
                    50: '#effaf7',
                    100: '#d7f3ec',
                    200: '#b1e6d9',
                    300: '#7fd2c0',
                    400: '#4ab8a4',
                    500: '#2a9d8a',
                    600: '#1f7f70',
                    700: '#1d665b',
                    800: '#1b524b',
                    900: '#19443f',
                },
                accent: {
                    400: '#f6a04d',
                    500: '#f28c28',
                    600: '#d9731a',
                },
            },
        },
    },

    plugins: [forms],
};