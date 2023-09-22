import { createBrowserRouter } from "react-router-dom";
import LionList from "./pages/LionList";
import Home from "./pages/Home";
import Evaluate from "./pages/Evaluate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/pre-lionlist",
        element: <LionList />,
    },
    {
        path: "/evaluate",
        element: <Evaluate />,
    },
])

export default router;