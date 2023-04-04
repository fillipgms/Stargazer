import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";

const Advertisement = () => {
    const { screenSize, setScreenSize } = useStateContext();

    setScreenSize(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Link to="/guide">
            <section className="md:ml-6 text-white text-center relative bg-pink-sky md:py-32 py-10 bg-cover">
                <div className="w-9/12 mx-auto">
                    <h3 className="text-2xl font-bold mb-3 bg-cover">
                        Viajando para o Desconhecido
                    </h3>
                    {screenSize >= 900 ? (
                        <h5>
                            Vamos te guiar através deste universo desconhecido
                            com explicações simples. De moedas populares a
                            tendências de mercado, nossos guias são a porta de
                            entrada para o mundo das criptomoedas. Explore e se
                            torne um verdadeiro astronauta cripto agora mesmo!
                        </h5>
                    ) : (
                        ""
                    )}
                </div>
            </section>
        </Link>
    );
};

export default Advertisement;
