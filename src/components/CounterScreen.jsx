import React, { useState, useEffect } from "react";
import { CONFIG } from "../config";

export default function CounterScreen({ onNext }) {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const birthday = new Date(CONFIG.birthdayDate);

    const updateCounter = () => {
      const now = new Date();
      const diff = now - birthday; // difference in milliseconds

      if (diff > 0) {
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        setTimePassed({ days, hours, minutes, seconds });
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    // Show button after exactly 3 seconds
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="glass-container large">
      <h2 className="title-glowing" style={{ marginBottom: "0.5rem" }}>
        Every Second is a Blessing...
      </h2>
      <p className="subtitle" style={{ marginBottom: "2rem" }}>
        Time elapsed since your beautiful journey began on 13-02-2002:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
          margin: "1.5rem 0",
        }}
      >
        <div className="counter-box">
          <div className="counter-val">{timePassed.days.toLocaleString()}</div>
          <div className="counter-lbl">Total Days</div>
        </div>
        <div className="counter-box">
          <div className="counter-val">{timePassed.hours.toLocaleString()}</div>
          <div className="counter-lbl">Total Hours</div>
        </div>
        <div className="counter-box">
          <div className="counter-val">{timePassed.minutes.toLocaleString()}</div>
          <div className="counter-lbl">Total Minutes</div>
        </div>
        <div className="counter-box">
          <div className="counter-val">{timePassed.seconds.toLocaleString()}</div>
          <div className="counter-lbl">Total Seconds</div>
        </div>
      </div>

      <style>{`
        .counter-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .counter-box:hover {
          transform: translateY(-4px);
          border-color: rgba(236, 72, 153, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }
        .counter-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #fff 0%, var(--accent-pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.3rem;
          font-family: var(--font-sans);
          letter-spacing: -0.5px;
        }
        .counter-lbl {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        @media (max-width: 500px) {
          .counter-val {
            font-size: 1.4rem;
          }
          .counter-lbl {
            font-size: 0.75rem;
          }
        }
      `}</style>

      <div style={{ height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {showButton && (
          <button
            className="btn-premium"
            onClick={onNext}
            style={{
              animation: "slideUpFade 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              boxShadow: "0 0 25px rgba(236, 72, 153, 0.6)",
            }}
          >
            ✨ Click Here ✨
          </button>
        )}
      </div>
    </div>
  );
}
