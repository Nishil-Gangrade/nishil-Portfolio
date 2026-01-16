import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import "./LightRays.css";

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    default: // top-center
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#9aa4ff",
  raysSpeed = 0.6,
  lightSpread = 1.6,
  rayLength = 1.3,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.06,
  noiseAmount = 0.08,
  distortion = 0.04,
  className = "",
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const uniformsRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    containerRef.current.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: `
        precision highp float;

        varying vec2 vUv;

        uniform float iTime;
        uniform vec2 iResolution;

        uniform vec2 rayPos;
        uniform vec2 rayDir;
        uniform vec3 raysColor;
        uniform float raysSpeed;
        uniform float lightSpread;
        uniform float rayLength;
        uniform float fadeDistance;
        uniform float saturation;
        uniform vec2 mousePos;
        uniform float mouseInfluence;
        uniform float noiseAmount;
        uniform float distortion;

        float noise(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
        }

        float rayStrength(vec2 source, vec2 dir, vec2 coord, float seed, float speed) {
          vec2 toCoord = coord - source;
          float dist = length(toCoord);
          vec2 dirNorm = normalize(toCoord);

          float angle = dot(dirNorm, dir);
          angle += distortion * sin(iTime * 2.0 + dist * 0.01);

          float spread = pow(max(angle, 0.0), 1.0 / lightSpread);

          float maxDist = max(iResolution.x, iResolution.y) * rayLength;
          float falloff = clamp((maxDist - dist) / maxDist, 0.0, 1.0);

          float wave = 0.6 + 0.4 * sin(angle * seed + iTime * speed);
          return wave * spread * falloff;
        }

        void main() {
          vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);

          vec2 finalDir = rayDir;
          if (mouseInfluence > 0.0) {
            vec2 mouseScreen = mousePos * iResolution;
            finalDir = normalize(mix(rayDir, normalize(mouseScreen - rayPos), mouseInfluence));
          }

          float r1 = rayStrength(rayPos, finalDir, coord, 24.0, raysSpeed);
          float r2 = rayStrength(rayPos, finalDir, coord, 16.0, raysSpeed * 0.9);

          vec3 color = raysColor * (r1 * 0.42 + r2 * 0.34);


          if (noiseAmount > 0.0) {
            float n = noise(coord * 0.01 + iTime * 0.1);
            color *= mix(1.0, n, noiseAmount);
          }

          if (saturation != 1.0) {
            float g = dot(color, vec3(0.299, 0.587, 0.114));
            color = mix(vec3(g), color, saturation);
          }

          gl_FragColor = vec4(color, color.r);
        }
      `,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      },
    });

    uniformsRef.current = program.uniforms;

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.iResolution.value = [
        w * renderer.dpr,
        h * renderer.dpr,
      ];
      const { anchor, dir } = getAnchorAndDir(
        raysOrigin,
        w * renderer.dpr,
        h * renderer.dpr
      );
      program.uniforms.rayPos.value = anchor;
      program.uniforms.rayDir.value = dir;
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = (t) => {
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.mousePos.value = [
        smoothMouseRef.current.x,
        smoothMouseRef.current.y,
      ];
      renderer.render({ scene: mesh });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  useEffect(() => {
    if (!followMouse) return;
    const move = (e) => {
      const r = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left) / r.width;
      mouseRef.current.y = (e.clientY - r.top) / r.height;

      smoothMouseRef.current.x =
        smoothMouseRef.current.x * 0.9 + mouseRef.current.x * 0.1;
      smoothMouseRef.current.y =
        smoothMouseRef.current.y * 0.9 + mouseRef.current.y * 0.1;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`}
    />
  );
}
