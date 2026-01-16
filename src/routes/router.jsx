import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Projects from "../components/pages/Projects";
import Experience from "../components/pages/Experience";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "experience", element: <Experience /> },
    ],
  },
]);

export default router;
