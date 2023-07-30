import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const PasswordReset = () => {
    const { passworReset, email, setEmail } = useStateContext();

    return (
        <section className="bg-wallpaper bg-cover min-h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-center py-5 md:px-14 rounded-lg shadow-pink-blue-glow flex flex-col gap-4 w-4/5 md:w-fit px-4">
                <h1 className="text-base font-semibold ">
                    Foi explorar e esqueceu a senha?
                </h1>
                <form
                    action="#"
                    className="flex flex-col gap-6"
                    onSubmit={passworReset}
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
                    <input
                        type="submit"
                        value="Enviar"
                        className="cursor-pointer bg-pink w-full flex items-center justify-center py-2 rounded-md"
                    />
                </form>
            </div>
        </section>
    );
};

export default PasswordReset;
