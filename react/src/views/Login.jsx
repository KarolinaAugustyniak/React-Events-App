import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import Aside from "../components/Aside";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [info, setInfo] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setInfo(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                console.error(err);
                //validation error
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setInfo(response.data.errors);
                    } else {
                        setInfo({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };
    return (
        <div className="wrapper">
            <Aside />
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title title--40">Login</h1>
                    {info && (
                        <div className="form__info form__info--error">
                            {Object.values(info).map((message, index) => (
                                <p key={index}>{message}</p>
                            ))}
                        </div>
                    )}
                    <input ref={emailRef} type="email" placeholder="E-mail" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="form__btn btn btn--teal">Login</button>
                    <p className="form__message">
                        Don’t have an acount?{" "}
                        <Link to="/signup"> Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
