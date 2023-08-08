import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Cards, Footer } from "../components";
import { adminPages } from "../data/dummy";
const Admin = () => {
    const { isAdmin } = useStateContext();

    console.log(isAdmin);

    return (
        <>
            <section className="mb-5">
                <div className="flex md:px-48 px-10 flex-col pt-20 items-center justify-center gap-10">
                    admin
                </div>
            </section>
            <Cards items={adminPages} />
            <Footer />
        </>
    );
};

export default Admin;
