import React, { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const taglines = [
    "I learn. I build. I ship.",
    "I design. I develop. I deliver.",
    "I explore. I solve. I create.",
  ];

  useEffect(() => {
    const current = loopNum % taglines.length;
    const fullText = taglines[current];

    const timer = setTimeout(() => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 900);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }
    }, isDeleting ? 50 : 90);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <section className="h-[80vh] flex items-center justify-center text-center">
      <div>
        <h1 className="text-6xl font-bold text-white">
          Nishil Gangrade
        </h1>

        <p className="mt-4 text-lg font-mono text-yellow-500">
          {text}
          <span className="animate-pulse">|</span>
        </p>
      </div>
    </section>
  );
}
