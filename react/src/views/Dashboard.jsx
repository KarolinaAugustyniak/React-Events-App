import React from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const date = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return (
        <Layout className="dashboard">
            <div className="dashboard__left">
                <p>Hello {user.name}</p>
                <p>Today is {formattedDate}</p>
            </div>
        </Layout>
    );
}
