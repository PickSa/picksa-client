import { createBrowserRouter } from "react-router-dom";
import LionList from "./pages/LionList";
import Home from "./pages/Home";
import Evaluate from "./pages/Evaluate";
import Timetable from "./pages/Timetable";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/pre-lionlist",
        element: <Timetable />,
    },
    {
        path: "/evaluate",
        element: <Evaluate />,
    },
    {
        path: "/timetable",
        element: <Timetable />,
    },
])

export default router;