import React, { createContext, useContext, useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import SearchIcon from "../assets/img/Setting_line_duotone_line.svg";
import Logout from "../assets/img/Logout.svg";
import axiosClient from "../axios-client.js";

export default function Aside() {
    const { user, token, setUser } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    });

    return (
        <aside className="aside">
            <div className="aside__top">
                <Link to="/" className="aside__logo">
                    <img src={Logo} />
                </Link>
                <div className="account">
                    <p className="account__name">{user.name}</p>
                    <p className="account__email">{user.email}</p>
                </div>
            </div>
            <nav className="aside__nav">
                <Link to="/" className="aside__link aside__link--active">
                    <img src={SearchIcon} />
                    Dashboard
                </Link>
                <Link to="/" className="aside__link">
                    <img src={SearchIcon} />
                    Settings
                </Link>
                <Link to="/" className="aside__link">
                    <img src={SearchIcon} />
                    Settings
                </Link>
                <Link to="/" className="aside__link">
                    <img src={SearchIcon} />
                    Settings
                </Link>
            </nav>
            <a href="#" onClick={onLogout} className="aside__link">
                <img src={Logout} />
                Logout
            </a>
        </aside>
    );
}
