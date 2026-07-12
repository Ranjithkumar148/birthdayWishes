import React, { useState } from "react";

export default function NameInputScreen({ onNext }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a valid name");
      return;
    }
    onNext(name.trim());
  };

  return (
    <div className="glass-container">
      <h2 className="title-glowing">Before we begin...</h2>
      <p className="subtitle">Please Enter Your Name</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-premium"
          placeholder="Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          maxLength={20}
          autoFocus
        />
        {error && (
          <p style={{ color: "#ec4899", marginBottom: "1rem", fontSize: "0.95rem" }}>
            {error}
          </p>
        )}
        <button type="submit" className="btn-premium">
          Continue
        </button>
      </form>
    </div>
  );
}
