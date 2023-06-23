import React from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import EventsCta from "../components/EventsCta.jsx";
import SavedEvents from "../components/SavedEvents.jsx";
import Notifications from "../components/Notifications.jsx";

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
        day: "numeric"
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return (
        <Layout>
            <div className="dashboard">
                <div className="dashboard__left">
                    <div className="dashboard__hello">
                        <p className="title title--30">Hello {user.name},</p>
                        <p>Today is {formattedDate}</p>
                    </div>
                    {/* <EventsCta /> */}
                    {/* <SavedEvents /> */}
                    <Notifications />
                </div>
            </div>
        </Layout>
    );
}
