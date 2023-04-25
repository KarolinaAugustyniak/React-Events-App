import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Events from "./views/Events.jsx";
import NotFound from "./views/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Events />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
