import React from "react";
import Aside from "./Aside";

const Layout = ({ children }) => {
    return (
        <div className="wrapper">
            <Aside />
            <main className="main">{children}</main>
        </div>
    );
};
export default Layout;
