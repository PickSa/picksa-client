import { createBrowserRouter } from "react-router-dom";
import LionList from "./pages/LionList";
import Home from "./pages/Home";
import Evaluate from "./pages/Evaluate";
import Timetable from "./pages/Timetable";
import DocQuest from "./pages/DocQuest";
import LionDetail from "./pages/LionDetail";
import LionListHome from "./pages/LionListHome";
import EvaluateHome from "./pages/EvaluateHome";
import EvaluateDefault from "./pages/EvaluateDefault";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/pre-lionlist",
        element: <LionListHome />,
        children: [
            {
                path: '',
                element: <LionList />
            },
			{
				path: ':id',
				element: <LionDetail />,
			},
		],
    },
    {
        path: "/document-question",
        element: <DocQuest />,
    },
    {
        path: "/evaluate",
        element: <EvaluateHome />,
        children: [
            {
                path: '',
                element: <EvaluateDefault />
            },
			{
				path: ':id',
				element: <Evaluate />,
			},
		],
    },
    {
        path: "/timetable",
        element: <Timetable />,
    },
])

export default router;