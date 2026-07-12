import React, { useEffect, useState } from "react";

export default function FinalScreen() {
  const [sparkles, setSparkles] = useState([]);
  const [fadeCard, setFadeCard] = useState(false);

  // Generate floating sparkles continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-30), // Limit array length to avoid memory bloat
        {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 90 + 5}%`,
          duration: `${Math.random() * 4 + 5}s`,
          scale: Math.random() * 0.5 + 0.5,
        },
      ]);
    }, 400);

    // Slowly start fading out the card after 6 seconds
    const fadeTimer = setTimeout(() => {
      setFadeCard(true);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <>
      {/* Floating Sparkles Container */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="floating-element"
            style={{
              left: sparkle.left,
              bottom: "-50px",
              animationName: "floatUp",
              animationDuration: sparkle.duration,
              animationTimingFunction: "linear",
              transform: `scale(${sparkle.scale})`,
              opacity: 0.8,
            }}
          >
            <div style={{ fontSize: "1.8rem", filter: "drop-shadow(0 0 5px rgba(251, 191, 36, 0.4))" }}>✨</div>
          </div>
        ))}
      </div>

      {/* Thank you Card Container */}
      <div
        className="glass-container"
        style={{
          transition: "opacity 3s ease-in-out, transform 3s ease-in-out",
          opacity: fadeCard ? 0 : 1,
          transform: fadeCard ? "scale(0.95) translateY(-20px)" : "scale(1) translateY(0)",
          zIndex: 10,
        }}
      >
        <h1 className="title-glowing">Thank You</h1>
        <p className="subtitle" style={{ fontSize: "1.2rem", color: "#fff" }}>
          Thank you for taking a moment to enjoy this little surprise.
        </p>
        <p className="subtitle" style={{ fontStyle: "italic" }}>
          "May your smile always shine as brightly as today."
        </p>
        <h2 className="title-serif" style={{ fontSize: "1.8rem", color: "var(--accent-pink)", marginTop: "1.5rem" }}>
          Happy Birthday Once Again! 🎂✨
        </h2>
      </div>

      {/* Secondary final fade-in text that shows after the card fades out */}
      {fadeCard && (
        <div
          style={{
            position: "absolute",
            zIndex: 5,
            textAlign: "center",
            animation: "slideUpFade 3s ease-out forwards",
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.2rem",
              fontStyle: "italic",
              background: "linear-gradient(135deg, #fff 0%, var(--accent-pink) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.3))",
            }}
          >
            Keep Smiling... Always
          </p>
        </div>
      )}
    </>
  );
}
