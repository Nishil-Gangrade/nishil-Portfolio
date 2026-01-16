import React from "react";
import { FaBriefcase } from "react-icons/fa";

export default function Experience() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <FaBriefcase className="text-indigo-300 text-2xl" />
        <h1 className="text-2xl font-semibold text-white">Experience</h1>
      </div>

      <article className="bg-[#12121c] rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-white">
          DDXP Technologies
        </h2>
        <p className="text-sm text-gray-400 mb-3">
          Data Analytics Intern • May 2025 – July 2025
        </p>

        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
          <li>Worked with SQL, Python & Excel on real datasets.</li>
          <li>Created Power BI dashboards for KPI analysis.</li>
          <li>Converted raw data into actionable insights.</li>
        </ul>
      </article>
      <br></br>
      <article className="bg-[#12121c] rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-white">
          Cygnus Capital
        </h2>
        <p className="text-sm text-gray-400 mb-3">
          Software Developer Intern • May 2024 – July 2024
        </p>

        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
          <li>Engineered responsive UI for OPRATE, an equity platform for leveraged Indian stock trades.</li>
          <li>Programmed frontend modules using React.js, TypeScript and Tailwind CSS to enhance trader workflows.</li>
          <li>Collaborated with product team to translate trading requirements into intuitive dashboards & features.</li>
        </ul>
      </article>
    </div>
  );
}
