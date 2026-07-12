import React, { useEffect, useRef } from "react";

export default function LetterScreen({ onNext }) {
  const fullText = `To,
The Future Collector Ma'am,
Happy Birthday! 🎂
Every birthday marks a new beginning, a fresh chapter, and another step towards the dreams we hold close to our hearts.
On your special day, I sincerely wish you good health, endless happiness, and the strength to overcome every challenge that comes your way. I know you're giving your best every single day, and I truly hope your hard work and patience are rewarded with the success you've been waiting for.
The road to a big dream is never easy, but every page you read, every sacrifice you make, and every effort you put in today is shaping a brighter tomorrow.
I hope that one day, the smile you wear after achieving your dream will make every difficult moment worth it.
Until then, keep believing in yourself, stay strong, and never stop moving forward.
Wishing you a year filled with peace, joy, success, and countless beautiful moments.
Happy Birthday once again, Collector Ma'am.
May this year bring you one step closer to everything you've dreamed of.
With Best Wishes,
A Friend`;

  const containerRef = useRef(null);

  useEffect(() => {
    // Reset scroll to top on mount
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="glass-container large" style={{ animation: "slideUpFade 0.8s ease-out" }}>
      <h2 className="title-serif" style={{ textAlign: "center", marginBottom: "1rem", color: "var(--accent-pink)" }}>
        A Heartfelt Wish...
      </h2>
      
      {/* Scrollable Letter Body */}
      <div
        ref={containerRef}
        className="letter-body"
        style={{
          overflowY: "auto",
          padding: "1rem 0.5rem",
          margin: "1rem 0",
          whiteSpace: "pre-line",
          fontSize: "1.05rem",
          lineHeight: "1.7",
          color: "rgba(255, 255, 255, 0.9)",
          fontFamily: "var(--font-sans)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {fullText}
      </div>

      <style>{`
        /* Custom scrollbar styling for a premium feel */
        .letter-body::-webkit-scrollbar {
          width: 6px;
        }
        .letter-body::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .letter-body::-webkit-scrollbar-thumb {
          background: rgba(236, 72, 153, 0.25);
          border-radius: 4px;
        }
        .letter-body::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.5);
        }
      `}</style>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1rem" }}>
        <button
          className="btn-premium"
          onClick={onNext}
          style={{
            marginTop: 0,
          }}
        >
          Close Letter
        </button>
      </div>
    </div>
  );
}
