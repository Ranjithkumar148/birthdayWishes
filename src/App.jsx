import React, { useState, useEffect, useRef } from "react";
import { CONFIG } from "./config";
import WelcomeScreen from "./components/WelcomeScreen";
import NameInputScreen from "./components/NameInputScreen";
import CounterScreen from "./components/CounterScreen";
import CelebrationScreen from "./components/CelebrationScreen";
import LetterScreen from "./components/LetterScreen";
import FinalScreen from "./components/FinalScreen";

// Helper to extract YouTube video ID from URL
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [bgParticles, setBgParticles] = useState([]);
  
  const audioRef = useRef(null);
  const currentSongUrl = step >= 6 ? CONFIG.letterSong : CONFIG.birthdaySong;
  const youtubeId = getYouTubeId(currentSongUrl);
  const isYouTube = !!youtubeId;

  // Generate background particles on mount
  useEffect(() => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 15 + 15}s`,
    }));
    setBgParticles(particles);
  }, []);

  // Handle music playing
  const handlePlayMusic = () => {
    setMusicPlaying(true);
    if (!isYouTube && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay blocked by browser. Interaction required.", err);
      });
    }
  };

  // Handle song changes when transitioning between step 5 and step 6
  useEffect(() => {
    if (musicPlaying) {
      if (!isYouTube && audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch((err) => {
          console.warn("Audio transition playback failed:", err);
        });
      }
    }
  }, [currentSongUrl, isYouTube, musicPlaying]);

  // Automatically attempt playback when step 5 opens
  useEffect(() => {
    if (step === 5) {
      handlePlayMusic();
    }
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeScreen onNext={() => setStep(2)} />;
      case 2:
        return (
          <NameInputScreen
            onNext={(enteredName) => {
              setName(enteredName);
              setStep(4);
            }}
          />
        );
      case 4:
        return <CounterScreen onNext={() => setStep(5)} />;
      case 5:
        return (
          <CelebrationScreen
            name={name}
            musicPlaying={musicPlaying}
            onPlayMusic={handlePlayMusic}
            onNext={() => setStep(6)}
          />
        );
      case 6:
        return <LetterScreen onNext={() => setStep(7)} />;
      case 7:
        return <FinalScreen />;
      default:
        return <WelcomeScreen onNext={() => setStep(2)} />;
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10 }}>
      {/* Background Glow effects */}
      <div className="bg-particles">
        <div className="bg-glow-pink"></div>
        <div className="bg-glow-violet"></div>

        {/* Ambient floating sparkles in background */}
        {bgParticles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
              pointerEvents: "none",
              animation: "floatBackgroundParticle linear infinite",
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Render current step content */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 5 }}>
        {renderStep()}
      </div>

      {/* Audio Players */}
      {/* 1. YouTube Iframe Player */}
      {isYouTube && musicPlaying && (
        <iframe
          key={currentSongUrl}
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&controls=0&mute=0`}
          title="Birthday Song Player"
          allow="autoplay"
          style={{ display: "none", position: "absolute", width: 0, height: 0, border: 0 }}
        />
      )}

      {/* 2. Direct HTML5 Audio Player */}
      {!isYouTube && (
        <audio
          ref={audioRef}
          src={currentSongUrl}
          loop
          style={{ display: "none" }}
        />
      )}

      {/* CSS injection for ambient background particle moving */}
      <style>{`
        @keyframes floatBackgroundParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translate(25px, -25px) scale(1.3);
            opacity: 0.65;
          }
        }
      `}</style>
    </div>
  );
}
