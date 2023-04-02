import React from "react";

const Header = () => {
    const signed = false;

    return (
        <header className="absolute right-0 z-10 text-white">
            {signed ? (
                <div>Bem vindo</div>
            ) : (
                <div className="flex gap-3 py-3 px-4">
                    <button className="border py-2 px-4 rounded-full bg-glassmorphism backdrop-blur-glassmorphism font-bold">
                        Iniciar Seção
                    </button>
                    <button className="border py-2 px-4 rounded-full bg-main-bg text-black font-bold">
                        Criar conta
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
