import React from "react";
import { CiMail } from "react-icons/ci";
import { DiGithubBadge } from "react-icons/di";
import { FaXTwitter } from "react-icons/fa6";

export default function About() {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-white mb-6">
        Hey, I'm Nishil
      </h1>

      <p className="text-lg text-gray-300 leading-relaxed">
        I’m a Computer Science student at VIT Vellore (2022–2026) with strong
        foundations in software engineering, full-stack development, and data
        analytics.
        <br /><br />
        Through internships at{" "}
        <span className="text-white font-medium">Cygnus Capital</span> and{" "}
        <span className="text-white font-medium">DDXP Technologies</span>, I’ve
        built scalable web apps, worked on data-driven insights, and collaborated
        with cross-functional teams.
        <br /><br />
        My interests include{" "}
        <span className="italic text-yellow-500">
          MERN stack, Data Analytics and Generative AI
        </span>
        . Outside coding, I enjoy sports, fitness, and creative work.
      </p>

      <div className="flex gap-5 mt-8 text-3xl text-gray-400">
        <a href="mailto:nishilgangrade2003@gmail.com" className="hover:text-white">
          <CiMail />
        </a>
        <a href="https://github.com/Nishil-Gangrade" className="hover:text-white">
          <DiGithubBadge />
        </a>
        <a href="https://x.com/Ni5hil" className="hover:text-white">
          <FaXTwitter />
        </a>
      </div>
    </div>
  );
}
