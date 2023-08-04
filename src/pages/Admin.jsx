import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
const Admin = () => {
    const { isAdmin } = useStateContext();

    console.log(isAdmin);

    return <div>Admin</div>;
};

export default Admin;
