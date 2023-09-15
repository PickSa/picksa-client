import { createBrowserRouter } from "react-router-dom";
import LionList from "./pages/LionList";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/pre-lionlist",
        element: <LionList />,
    },
])

export default router;