import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LightRays from "../effects/LightRays";

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070c]">
      
      {/* GLOBAL BACKGROUND RAYS */}
      <LightRays
  raysOrigin="top-center"
  raysColor="#bfc7ff"      // softer violet-white, not pure white
  raysSpeed={0.35}         // slow, cinematic
  lightSpread={0.28}       // 🔥 tight beams
  rayLength={1.6}          // not full screen
  fadeDistance={0.9}       // fade earlier
  saturation={1.35}        // 🔥 stronger color
  followMouse={false}      // reference does NOT follow mouse
  noiseAmount={0.02}       // subtle texture only
  distortion={0.015}       // minimal distortion
/>

      {/* CONTENT ABOVE RAYS */}
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
