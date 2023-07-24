import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useStateContext } from "../contexts/ContextProvider";

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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-center py-5 px-10 rounded-lg shadow-pink-blue-glow flex flex-col gap-4">
            <h1 className="text-base font-semibold">Entre com sua conta</h1>
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
                        id="outlined_success"
                        aria-describedby="outlined_success_help"
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-pink appearance-none  focus:outline-none focus:ring-0 focus:border-pink peer border-2"
                        placeholder=" "
                    />
                    <label
                        for="outlined_success"
                        class="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
                    >
                        E-mail
                    </label>
                </div>
                <div class="relative">
                    <input
                        id="outlined_success"
                        aria-describedby="outlined_success_help"
                        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-pink appearance-none  focus:outline-none focus:ring-0 focus:border-pink peer border-2"
                        placeholder=" "
                        onChange={(e) => setPassword(e.target.value)}
                        type={inputType ? "text" : "password"}
                    />
                    <label
                        for="outlined_success"
                        class="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
                    >
                        Senha
                    </label>
                </div>

                <span className="relative after:content-[''] after:block after:h-[2px] after:bg-pink after:absolute after:right-0 after:top-1/2 after:w-2/5 before:content-[''] before:block before:h-[2px] before:bg-pink before:absolute before:left-0 before:top-1/2 before:w-2/5">
                    ou
                </span>

                <button
                    className="flex items-center justify-center gap-3 bg-[#fff] py-3 px-5 rounded-full"
                    onClick={loginGoogle}
                >
                    <FcGoogle />
                    Entre com sua conta Google
                </button>

                <input
                    type="submit"
                    value="Entrar"
                    className="cursor-pointer bg-pink w-full flex items-center justify-center py-2 rounded-md"
                />
            </form>
        </div>
    );
};

export default Login;
