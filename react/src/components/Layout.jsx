import React, { useState } from "react";
import Aside from "./Aside";
import MenuIcon from "../assets/img/burger.svg";

const Layout = ({ children }) => {
    const [menuActive, setMenuActive] = useState(false);
    const handleClick = () => {
        setMenuActive(current => !current);
    };
    return (
        <div className="wrapper">
            <div onClick={handleClick} className="menu">
                <img src={MenuIcon} width="25" height="25" className="menu__icon" />{" "}
            </div>
            <Aside className={menuActive ? "aside--active" : ""} />
            <main className={`main ${menuActive ? "main--overlay" : null}`}>{children}</main>
        </div>
    );
};
export default Layout;
