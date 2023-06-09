import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Events from "./views/Events.jsx";
import Dashboard from "./views/Dashboard.jsx";
import NotFound from "./views/NotFound.jsx";
import EventView from "./views/EventView.jsx";
import Account from "./views/Account.jsx";
import Map from "./views/Map.jsx";
import Settings from "./views/Settings.jsx";
import UserProfile from "./views/UserProfile.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/",
        element: <Events />
    },
    {
        path: "/account",
        element: <Account />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/map",
        element: <Map />
    },
    {
        path: "/settings",
        element: <Settings />
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "event/:eventID",
        element: <EventView />
    },
    {
        path: "user/:userId",
        element: <UserProfile />
    }
]);

export default router;
