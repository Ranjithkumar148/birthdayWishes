import React from "react";

export default function WelcomeScreen({ onNext }) {
  return (
    <div className="glass-container animate-pulse-slow">
      <h1 className="title-glowing">✨ This Page Is Special For You ✨</h1>
      <p className="subtitle">
        "This surprise has been prepared with lots of best wishes."
      </p>
      <button className="btn-premium" onClick={onNext}>
        Open Your Surprise
      </button>
    </div>
  );
}
