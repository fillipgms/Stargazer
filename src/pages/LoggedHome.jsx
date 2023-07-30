import React from "react";
import { TopNews, Advertisement, Footer } from "../components";

const LoggedHome = () => {
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
