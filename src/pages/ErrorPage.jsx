import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const ErrorPage = () => {
    useEffect(() => {
        document.title = "Erro";
    });

    return (
        <section>
            <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
                <div className="text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-dark-bg px-5 py-10 flex flex-col text-center w-1/4 rounded-md">
                    <span>Ainda não descobrimos essa parte do universo!</span>
                    <Link
                        to="/"
                        className="text-pink font-bold mt-3 flex items-center justify-center gap-3"
                    >
                        <BsFillRocketTakeoffFill />
                        Voltar a segurança
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
