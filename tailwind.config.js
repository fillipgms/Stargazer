/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                "main-bg": "#f1f1f1",
                "main-dark-bg": "#18181a",
                "dark-bg": "#25252a",
                "half-transparent": "rgba(0, 0, 0, 0.5)",
                glassmorphism: "rgba(217, 217, 217, 0.005);",
            },
            backgroundImage: {
                "banner-bg": "url(./data/banner-bg.png)",
                wallpaper: "url(./data/wallpaper.jpg)",
            },
            boxShadow: {
                "pink-blue-glow": [
                    "19px -8px 48px -15px #F788B6, -7px 15px 48px -15px #7FA2E0",
                ],
            },
            backdropBlur: {
                glassmorphism: "50.5px",
            },
            textColor: {
                black: "#18181a",
                pink: "#f788b6",
                violet: "#6a4199",
                white: "#f1f1f1",
                blue: "#7fa2e0",
            },
        },
    },
    plugins: [],
};
