import React, { createContext, useContext, useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import GuestAvatar from "../assets/img/guestAvatar.svg";
import Logout from "../assets/img/logout.svg";
import Login from "../assets/img/login.svg";
import axiosClient from "../axios-client.js";
import AsideLinks from "./AsideLinks.jsx";

export default function Aside({ className }) {
    const { user, token, setUser, setToken } = useStateContext();
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/${user.profile_image}`;

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
                        {user.profile_image && (
                            <img src={imageUrl} alt={user.name} width="110" height="110" className="account__img" />
                        )}
                        <p className="account__name">{user.name}</p>
                        <p className="account__email">{user.username}</p>
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
            <AsideLinks />

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
