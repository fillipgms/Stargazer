import React, { useEffect } from "react";
import { TopNews, Advertisement, Footer, TopCrypto } from "../components";

const LoggedHome = () => {
    useEffect(() => {
        document.title = "Home";
    });

    return (
        <>
            <section>
                <TopCrypto />
                <Advertisement />
                <TopNews />
            </section>
            <Footer />
        </>
    );
};

export default LoggedHome;
