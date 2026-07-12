import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function CelebrationScreen({ name, musicPlaying, onPlayMusic, onNext }) {
  const canvasRef = useRef(null);
  const [balloons, setBalloons] = useState([]);

  // Generate balloons
  useEffect(() => {
    const balloonColors = ["#ec4899", "#8b5cf6", "#fbbf24", "#3b82f6", "#10b981", "#ef4444"];
    
    // Generate 15 balloons
    const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: `b-${i}`,
      left: `${Math.random() * 90 + 5}%`,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 6 + 8}s`,
      scale: Math.random() * 0.4 + 0.8,
    }));

    setBalloons(newBalloons);
  }, []);

  // Confetti effect
  useEffect(() => {
    if (!musicPlaying) return;

    // Direct fire on load
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Continuous side-bursts
    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [musicPlaying]);

  // Canvas Fireworks effect
  useEffect(() => {
    if (!musicPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    let fireworks = [];

    class Firework {
      constructor(sx, sy, tx, ty) {
        this.x = sx;
        this.y = sy;
        this.sx = sx;
        this.sy = sy;
        this.tx = tx;
        this.ty = ty;
        this.distanceToTarget = Math.hypot(tx - sx, ty - sy);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = Math.random() * 50 + 50;
      }

      update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.acceleration;
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = Math.hypot(this.x + vx - this.sx, this.y + vy - this.sy);

        if (this.distanceTraveled >= this.distanceToTarget) {
          createParticles(this.tx, this.ty);
          fireworks.splice(index, 1);
        } else {
          this.x += vx;
          this.y += vy;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, ${this.brightness}%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 8 + 1;
        this.friction = 0.95;
        this.gravity = 0.15;
        this.hue = Math.random() * 360;
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
      }

      update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
          particles.splice(index, 1);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    const createParticles = (x, y) => {
      let particleCount = 40;
      while (particleCount--) {
        particles.push(new Particle(x, y));
      }
    };

    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      let i = fireworks.length;
      while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
      }

      let j = particles.length;
      while (j--) {
        particles[j].draw();
        particles[j].update(j);
      }

      if (Math.random() < 0.04 && fireworks.length < 5) {
        const startX = Math.random() * canvas.width;
        const targetX = Math.random() * canvas.width;
        const targetY = Math.random() * (canvas.height / 2);
        fireworks.push(new Firework(startX, canvas.height, targetX, targetY));
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [musicPlaying]);

  return (
    <>
      {/* Background Canvas for Fireworks */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Floating balloons (behind the glass container, but above the background) */}
      {musicPlaying &&
        balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="floating-element"
            style={{
              left: balloon.left,
              bottom: "-100px",
              animationName: "floatUp",
              animationDuration: balloon.duration,
              animationDelay: balloon.delay,
              transform: `scale(${balloon.scale})`,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "50px",
                height: "65px",
                background: balloon.color,
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                position: "relative",
                boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)",
              }}
            >
              {/* Balloon knot */}
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: `8px solid ${balloon.color}`,
                  position: "absolute",
                  bottom: "-4px",
                  left: "19px",
                }}
              />
              {/* Balloon string */}
              <div
                style={{
                  width: "2px",
                  height: "80px",
                  background: "rgba(255, 255, 255, 0.25)",
                  position: "absolute",
                  bottom: "-84px",
                  left: "24px",
                }}
              />
            </div>
          </div>
        ))}



      {/* Main Glass Card */}
      <div className="glass-container" style={{ zIndex: 10, position: "relative" }}>
        {!musicPlaying ? (
          <div style={{ padding: "2rem 0" }}>
            <h2 className="title-glowing">Your Surprise is Ready!</h2>
            <p className="subtitle">
              Click the button below to play the celebration music and begin.
            </p>
            <button
              className="btn-premium animate-pulse-slow"
              onClick={onPlayMusic}
              style={{ fontSize: "1.2rem", padding: "1.2rem 3rem" }}
            >
              ▶️ Play Birthday Music
            </button>
          </div>
        ) : (
          <div style={{ animation: "slideUpFade 1s ease-out" }}>
            <h1 className="title-celebration title-serif" style={{ margin: "0.5rem 0 1.5rem 0", letterSpacing: "1px" }}>
              🎂 Happy Birthday, <span className="name-highlight">{name} 🌟</span> 🎂
            </h1>

            {/* Premium Happy Birthday Image */}
            <div
              style={{
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                margin: "1.5rem 0",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(236, 72, 153, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                aspectRatio: "16 / 9",
                background: "rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/happy_birthday.png"
                alt="Happy Birthday Surprise"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <p className="subtitle" style={{ margin: "1.5rem 0 2rem 0", fontSize: "1.1rem" }}>
              Today is all about you. May your day be filled with laughter, love, and sweet moments!
            </p>

            <button className="btn-premium" onClick={onNext}>
              My Birthday Wishes
            </button>
          </div>
        )}
      </div>

      {/* Decorative Sparkling Stars (CSS animated) */}
      {musicPlaying && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}>
          <div style={{ position: "absolute", top: "15%", left: "10%", animation: "sparkleSpin 4s infinite", fontSize: "1.5rem" }}>✨</div>
          <div style={{ position: "absolute", top: "25%", right: "12%", animation: "sparkleSpin 5s infinite 1s", fontSize: "2rem" }}>✨</div>
          <div style={{ position: "absolute", bottom: "30%", left: "15%", animation: "sparkleSpin 3.5s infinite 2s", fontSize: "1.2rem" }}>✨</div>
          <div style={{ position: "absolute", bottom: "15%", right: "8%", animation: "sparkleSpin 6s infinite 0.5s", fontSize: "1.8rem" }}>✨</div>
        </div>
      )}
    </>
  );
}
