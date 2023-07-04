import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import Layout from "../components/Layout";
import Illustration from "../assets/img/login_illustration.png";
import Arrow from "../assets/img/Arrow_right.svg";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [info, setInfo] = useState(null);
    const { setUser, setToken } = useStateContext();

    const navigate = useNavigate();

    const onSubmit = ev => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        setInfo(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                navigate("/dashboard");
            })
            .catch(err => {
                const response = err.response;
                console.error(err);
                //validation error
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setInfo(response.data.errors);
                    } else {
                        setInfo({
                            email: [response.data.message]
                        });
                    }
                } else {
                    setInfo("Something went wrong. Try again later.");
                }
            });
    };

    console.log(info);
    return (
        <Layout>
            <div className="main__wrapper">
                <form onSubmit={onSubmit} className="form">
                    <h1 className="form__title title title--40">Login</h1>
                    {info && (
                        <div className="form__info form__info--error">
                            <p>{info.email}</p>
                        </div>
                    )}
                    <input ref={emailRef} type="email" className="form__input" placeholder="E-mail" />
                    <input ref={passwordRef} type="password" placeholder="Password" className="form__input" />
                    <button className="form__btn btn btn--teal">
                        Login
                        <img src={Arrow} />
                    </button>
                    <p className="form__message">
                        Don’t have an acount?{" "}
                        <Link to="/signup" className="form__link">
                            Register here
                        </Link>
                    </p>
                </form>
                <img src={Illustration} className="login-img" />
            </div>
        </Layout>
    );
}
