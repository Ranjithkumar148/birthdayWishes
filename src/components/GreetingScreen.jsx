import React, { useState, useEffect } from "react";

export default function GreetingScreen({ name, onNext }) {
  const lines = [
    `Hello, ${name} ❤️`,
    "The world became a little more beautiful the day you were born.",
    "Every smile you share,\nEvery kindness you show,\nMakes this world a happier place.",
    "You are truly special."
  ];

  const [visibleLines, setVisibleLines] = useState(["", "", "", ""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setTypingComplete(true);
      return;
    }

    const currentLineText = lines[currentLineIndex];
    
    if (currentCharIndex < currentLineText.length) {
      const typingTimer = setTimeout(() => {
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLineText.substring(0, currentCharIndex + 1);
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 40); // speed of typing (40ms per char)
      return () => clearTimeout(typingTimer);
    } else {
      // Pause slightly between lines, then start the next line
      const lineBreakTimer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 600); // 600ms delay between lines
      return () => clearTimeout(lineBreakTimer);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="glass-container large" style={{ textAlign: "center" }}>
      <div style={{ minHeight: "260px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1.2rem" }}>
        
        {/* Line 1 - Heading style */}
        {visibleLines[0] && (
          <h2 className={`title-serif ${currentLineIndex === 0 && !typingComplete ? "typewriter-cursor" : ""}`}>
            {visibleLines[0]}
          </h2>
        )}

        {/* Line 2 - Special body text */}
        {visibleLines[1] && (
          <p 
            className={`${currentLineIndex === 1 && !typingComplete ? "typewriter-cursor" : ""}`}
            style={{ fontSize: "1.25rem", color: "var(--accent-pink)", fontWeight: "500", lineHeight: "1.6" }}
          >
            {visibleLines[1]}
          </p>
        )}

        {/* Line 3 - Poem style */}
        {visibleLines[2] && (
          <p 
            className={`${currentLineIndex === 2 && !typingComplete ? "typewriter-cursor" : ""}`}
            style={{ 
              fontSize: "1.15rem", 
              color: "var(--text-secondary)", 
              lineHeight: "1.8", 
              whiteSpace: "pre-line", 
              fontStyle: "italic" 
            }}
          >
            {visibleLines[2]}
          </p>
        )}

        {/* Line 4 - Final touch */}
        {visibleLines[3] && (
          <p 
            className={`${currentLineIndex === 3 && !typingComplete ? "typewriter-cursor" : ""}`}
            style={{ fontSize: "1.4rem", color: "#fff", fontWeight: "600", marginTop: "1rem" }}
          >
            {visibleLines[3]}
          </p>
        )}
      </div>

      {typingComplete && (
        <button 
          className="btn-premium animate-pulse-slow" 
          onClick={onNext}
          style={{ animation: "slideUpFade 0.8s ease-out" }}
        >
          See Something Special ❤️
        </button>
      )}
    </div>
  );
}
