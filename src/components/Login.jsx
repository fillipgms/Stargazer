import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

const Login = () => {
    const {
        signInUser,
        email,
        setEmail,
        password,
        setPassword,
        loginError,
        signInGoogle,
    } = useStateContext();

    const [inputType, setInputType] = useState(false);

    const handleChange = () => {
        setInputType(!inputType);
    };

    async function loginGoogle() {
        await signInGoogle();
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-center py-5 md:px-14 rounded-lg shadow-pink-blue-glow flex flex-col gap-4 w-4/5 md:w-fit px-4">
            <h1 className="text-base font-semibold text-black">
                Entre com sua conta
            </h1>
            <form
                action="#"
                className="flex flex-col gap-6"
                onSubmit={signInUser}
            >
                <div class="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="outlined_email"
                        aria-describedby="outlined_email_help"
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-pink appearance-none  focus:outline-none focus:ring-0 focus:border-pink peer border-2"
                        placeholder=" "
                    />
                    <label
                        for="outlined_email"
                        class="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
                    >
                        E-mail
                    </label>
                </div>
                <div>
                    <div className="relative">
                        <input
                            id="outlined_senha"
                            aria-describedby="outlined_senha_help"
                            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-pink appearance-none  focus:outline-none focus:ring-0 focus:border-pink peer border-2"
                            placeholder=" "
                            onChange={(e) => setPassword(e.target.value)}
                            type={inputType ? "text" : "password"}
                        />
                        <label
                            for="outlined_senha"
                            class="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
                        >
                            Senha
                        </label>
                    </div>

                    <Link
                        className="text-pink ml-auto flex justify-end font-semibold mt-1 text-sm"
                        to={"/passwordreset"}
                    >
                        Esqueceu a senha?
                    </Link>
                </div>

                {loginError ? (
                    <span className="text-pink font-semibold">
                        Erro:{" "}
                        <span className="text-black font-medium">
                            {loginError}
                        </span>
                    </span>
                ) : (
                    ""
                )}

                <span className="relative after:content-[''] after:block after:h-[2px] after:bg-pink after:absolute after:right-0 after:top-1/2 after:w-2/5 before:content-[''] before:block before:h-[2px] before:bg-pink before:absolute before:left-0 before:top-1/2 before:w-2/5 text-black">
                    ou
                </span>

                <button
                    className="flex items-center justify-center gap-3 bg-[#fff] py-3 px-5 rounded-full text-black font-medium shadow-sm"
                    onClick={loginGoogle}
                >
                    <FcGoogle />
                    Entre com sua conta Google
                </button>

                <input
                    type="submit"
                    value="Entrar"
                    className="cursor-pointer bg-pink w-full flex items-center justify-center py-2 rounded-md text-white font-medium"
                />
            </form>
        </div>
    );
};

export default Login;
