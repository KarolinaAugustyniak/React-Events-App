import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Events from "./views/Events.jsx";
import NotFound from "./views/NotFound.jsx";
import EventView from "./views/EventView.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/events",
        element: <Events />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "event/:eventID",
        element: <EventView />,
    },
]);

export default router;
