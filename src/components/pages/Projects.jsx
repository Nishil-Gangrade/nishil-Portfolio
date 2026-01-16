import React from "react";
import { DiGithubBadge } from "react-icons/di";
import { FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Veero Ki Seva",
    subtitle: "MERN | Razorpay | JWT",
    image: "/projects/veero.png",
    github: "https://github.com/Nishil-Gangrade/Veero-Ki-Seva",
    website: "https://veero-ki-seva.vercel.app/",
  },
  {
    title: "Buzzin",
    subtitle: "MERN | Socket.IO | Gemini API",
    image: "/projects/buzzin.png",
    github: "https://github.com/Nishil-Gangrade/Buzzin",
    website: "https://buzzin-4hx4.onrender.com/",
  },
  {
    title: "IPO-Analysis",
    subtitle: "Python | Pandas | NumPy | Matplotlib | PowerBI",
    image: "/projects/ipo.png",
    github: "https://github.com/Nishil-Gangrade/IPO-Sweet-Spot-Analysis",
    website: "https://github.com/Nishil-Gangrade/IPO-Sweet-Spot-Analysis",
  },
  {
    title: "Zepto vs Blinkit PowerBI Dashboard",
    subtitle: "MERN | Socket.IO | Gemini API",
    image: "/projects/Overview.png",
    github: "https://github.com/Nishil-Gangrade/zepto-vs-blinkit-powerbi-dashboard",
    website: "https://github.com/Nishil-Gangrade/zepto-vs-blinkit-powerbi-dashboard",
  },
];

export default function Projects() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-white mb-8">Projects</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-[#12121c] rounded-2xl p-4 hover:scale-[0.98] transition"
          >
            <img
              src={p.image}
              alt={p.title}
              className="rounded-xl mb-4 h-44 w-full object-cover"
            />

            <h2 className="text-xl font-semibold text-white">{p.title}</h2>
            <p className="text-sm text-indigo-300 mb-3">{p.subtitle}</p>

            <div className="flex gap-4 text-gray-400">
              <a href={p.github} className="hover:text-white flex items-center gap-1">
                <DiGithubBadge className="text-2xl" /> GitHub
              </a>
              <a href={p.website} className="hover:text-white flex items-center gap-1">
                <FaExternalLinkAlt /> Live
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
