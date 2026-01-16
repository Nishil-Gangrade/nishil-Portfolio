import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `relative font-medium text-sm tracking-wide transition
     ${
       location.pathname === path
         ? "text-yellow-500"
         : "text-gray-400 hover:text-gray-200"
     }`;

  return (
    <header className="pt-8 pb-14 flex justify-center">
      <nav className="flex gap-8">
        <Link to="/" className={linkClass("/")}>am</Link>
        <Link to="/about" className={linkClass("/about")}>about</Link>
        <Link to="/projects" className={linkClass("/projects")}>projects</Link>
        <Link to="/experience" className={linkClass("/experience")}>experience</Link>
      </nav>
    </header>
  );
}
