/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                "main-bg": "#f1f1f1",
                "main-dark-bg": "#18181a",
                "dark-bg": "#25252a",
                "black-bg": "#18181A",
                "half-transparent": "rgba(0, 0, 0, 0.5)",
                glassmorphism: "rgba(217, 217, 217, 0.005);",
                pink: "#f788b6",
                violet: "#6a4199",
                white: "#f1f1f1",
                blue: "#7fa2e0",
            },
            backgroundImage: {
                "banner-bg": "url(./data/banner-bg.png)",
                wallpaper: "url(./data/wallpaper.jpg)",
                "pink-sky": "url(./data/pink_sky.png)",
            },
            boxShadow: {
                "pink-blue-glow": [
                    "19px -8px 48px -15px #F788B6, -7px 15px 48px -15px #7FA2E0",
                ],
                "black-gray-shadow": [
                    "-18px -18px 20px #1A1C1E, 18px 18px 20px #2A2D32",
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
