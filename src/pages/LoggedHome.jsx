import React, { useEffect } from "react";
import { TopNews, Advertisement, Footer } from "../components";

const LoggedHome = () => {
    useEffect(() => {
        document.title = "Home";
    });

    return (
        <>
            <section>
                <Advertisement />
                <TopNews />
            </section>
            <Footer />
        </>
    );
};

export default LoggedHome;
