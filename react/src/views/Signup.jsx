import React, { useRef, useState } from "react";
import Aside from "../components/Aside";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [info, setInfo] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setInfo(`Account was created succesfully`);
            })
            .catch((err) => {
                const response = err.response;
                //validation error
                if (response && response.status === 422) {
                    setInfo(response.data.errors);
                }
            });
    };
    console.log(info);
    return (
        <div className="wrapper">
            <Aside />
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title title--40">Sign up</h1>
                    {info && typeof info === "object" && (
                        <div className="form__info form__info--error">
                            {Object.values(info).map((message, index) => (
                                <p key={index}>{message}</p>
                            ))}
                        </div>
                    )}

                    {info && typeof info === "string" && (
                        <p className="form__info form__info--success">{info}</p>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full name" />
                    <input ref={emailRef} type="email" placeholder="E-mail" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button className="form__btn btn btn--teal">Login</button>
                    <p className="form__message">
                        Already have an acount?{" "}
                        <Link to="/signup"> Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}