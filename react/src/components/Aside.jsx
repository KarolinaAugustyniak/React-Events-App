import React, { createContext, useContext, useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import SettingsIcon from "../assets/img/Setting_line_duotone_line.svg";
import MapIcon from "../assets/img/Map_light.svg";
import HomeIcon from "../assets/img/Home_light.svg";
import GuestAvatar from "../assets/img/guestAvatar.svg";
import Logout from "../assets/img/logout.svg";
import Login from "../assets/img/login.svg";
import axiosClient from "../axios-client.js";

export default function Aside({ className }) {
    const { user, token, setUser, setToken } = useStateContext();

    const onLogout = ev => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        if (token) {
            axiosClient.get("/user").then(({ data }) => {
                setUser(data);
            });
        }
    }, []);

    return (
        <aside className={`aside ${className}`}>
            <div className="aside__top">
                <Link to="/" className="aside__logo">
                    <img src={Logo} />
                </Link>
                {token && (
                    <div className="account">
                        <p className="account__name">{user.name}</p>
                        <p className="account__email">{user.email}</p>
                    </div>
                )}

                {!token && (
                    <div className="account">
                        <img src={GuestAvatar} className="account__avatar" />
                        <p className="account__name">Guest</p>
                        <Link to="/login" className="account__login">
                            Login here
                        </Link>
                    </div>
                )}
            </div>
            <nav className="aside__nav">
                <Link to="/dashboard" className="aside__link aside__link--active">
                    <img src={HomeIcon} />
                    Dashboard
                </Link>
                <Link to="/" className="aside__link">
                    <img src={SettingsIcon} />
                    Events
                </Link>
                <Link to="/map" className="aside__link">
                    <img src={MapIcon} />
                    Map
                </Link>
                {/* <Link to="/settings" className="aside__link">
                    <img src={SettingsIcon} />
                    Settings
                </Link>
                <Link to="/account" className="aside__link">
                    <img src={SettingsIcon} />
                    Account
                </Link> */}
            </nav>
            {token && (
                <a href="#" onClick={onLogout} className="aside__link">
                    <img src={Logout} />
                    Logout
                </a>
            )}
            {!token && (
                <Link to="/signup" className="aside__link">
                    <img src={Login} />
                    Sign up
                </Link>
            )}
        </aside>
    );
}
