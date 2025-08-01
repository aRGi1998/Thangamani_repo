import React, { useState, useEffect, useRef } from 'react';

const ProposalWebsite = () => {
  const [showProposal, setShowProposal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState('');
  const [musicEnabled, setMusicEnabled] = useState(true); // Set to true by default
  const audioContextRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const memories = [
    {
      title: "When We First Connected",
      text: "That magical moment when our messages first crossed the digital space. Miles couldn't stop what our hearts felt instantly - a connection that transcended distance and time zones...",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
      video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-and-a-woman-touching-on-a-cell-phone-17263-large.mp4",
      color: "#ff6b6b",
      icon: "💕"
    },
    {
      title: "Late Night Conversations",
      text: "Those beautiful 3 AM calls where time zones didn't matter. Every word we shared, every laugh we exchanged, made the distance feel like nothing at all...",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      video: "https://assets.mixkit.co/videos/preview/mixkit-woman-video-calling-a-man-17264-large.mp4",
      color: "#4ecdc4",
      icon: "🌙"
    },
    {
      title: "Virtual Dates & Dreams",
      text: "Movie nights over video calls, sharing meals across screens, planning our future together. Every moment proved that love knows no boundaries...",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
      video: "https://assets.mixkit.co/videos/preview/mixkit-couple-watching-a-movie-on-a-laptop-17265-large.mp4",
      color: "#45b7d1",
      icon: "💻"
    },
    {
      title: "Counting Days Until We Meet",
      text: "Every sunrise brings us closer to the day we'll finally be in each other's arms. Until then, my heart beats with yours across the miles...",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      video: "https://assets.mixkit.co/videos/preview/mixkit-woman-looking-at-the-calendar-17266-large.mp4",
      color: "#96ceb4",
      icon: "✈️"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProposal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-enable music when component mounts
  useEffect(() => {
    enableMusic();
  }, []);

  const enableMusic = () => {
    setMusicEnabled(true);
    createRomanticMelody();
    playBackgroundMusic();
  };

  const playBackgroundMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Lower volume
      audioRef.current.loop = true;
      audioRef.current.play().catch(e => console.log("Auto-play prevented:", e));
    }
  };

  const createRomanticMelody = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const playChord = (frequencies, duration, delay = 0) => {
        setTimeout(() => {
          const oscillators = [];
          const gainNode = audioContext.createGain();

          frequencies.forEach(freq => {
            const oscillator = audioContext.createOscillator();
            oscillator.connect(gainNode);
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'sine';
            oscillators.push(oscillator);
          });

          gainNode.connect(audioContext.destination);
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

          oscillators.forEach(osc => {
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + duration);
          });
        }, delay);
      };

      // Beautiful romantic progression
      const chordProgression = [
        { chord: [261.63, 329.63, 392.00], duration: 2 },   // C Major
        { chord: [293.66, 369.99, 440.00], duration: 2 },   // D Minor
        { chord: [349.23, 440.00, 523.25], duration: 2 },   // F Major
        { chord: [392.00, 493.88, 587.33], duration: 2 },   // G Major
        { chord: [220.00, 277.18, 329.63], duration: 2 },   // A Minor
        { chord: [246.94, 311.13, 369.99], duration: 2 },   // B Diminished
        { chord: [261.63, 329.63, 392.00, 523.25], duration: 4 }, // C Major (resolution)
      ];

      let delay = 0;
      const playProgression = () => {
        chordProgression.forEach(({ chord, duration }) => {
          playChord(chord, duration, delay);
          delay += duration * 800;
        });
      };

      playProgression();
      const interval = setInterval(playProgression, delay + 2000);

      // Cleanup function
      return () => {
        clearInterval(interval);
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };
    } catch (error) {
      console.log('Audio not supported in this browser');
    }
  };

  const handleNext = () => {
    if (currentStep < memories.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleResponse = (answer) => {
    setResponse(answer);
    if (answer === 'yes') {
      // Play celebration sound
      if (audioRef.current) {
        audioRef.current.src = "https://assets.mixkit.co/sfx/preview/mixkit-happy-pop-2060.mp3";
        audioRef.current.play();
      }
    }
  };

  // Enhanced floating hearts with different colors
  const FloatingHearts = () => (
    <div className="floating-hearts">
      {[...Array(20)].map((_, i) => {
        const hearts = ['💕', '💖', '💗', '💝', '❤️', '💓'];
        const colors = ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#e91e63', '#f06292'];
        return (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              fontSize: `${0.8 + Math.random() * 1.5}rem`,
              color: colors[i % colors.length]
            }}
          >
            {hearts[i % hearts.length]}
          </div>
        );
      })}
    </div>
  );

  // Enhanced particle background
  const ParticleBackground = () => (
    <div className="particles">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${20 + Math.random() * 15}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}
    </div>
  );

  // Connection lines animation
  const ConnectionLines = () => (
    <div className="connection-lines">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="connection-line"
          style={{
            animationDelay: `${i * 2}s`,
            opacity: 0.3
          }}
        />
      ))}
    </div>
  );

  // Long distance animation showing two people with connecting heart line
  const LongDistanceAnimation = () => (
    <div className="long-distance-animation">
      <div className="person person-1">👩</div>
      <div className="connecting-line">
        <div className="heart-trail">💕</div>
      </div>
      <div className="person person-2">👨</div>
    </div>
  );

  return (
    <div className="proposal-container">
      {/* Hidden audio element for background music */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-romantic-melody-1289.mp3"
        loop
      />

      <ParticleBackground />
      <FloatingHearts />
      <ConnectionLines />

      {/* Loading Screen */}
      {!showProposal && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-heart">
              <div className="heart-pulse">💕</div>
            </div>
            <h2 className="loading-text">Connecting hearts across the miles...</h2>
            <LongDistanceAnimation />
            <div className="loading-signal">
              <div className="signal-bar"></div>
              <div className="signal-bar"></div>
              <div className="signal-bar"></div>
              <div className="signal-bar"></div>
            </div>
            <p className="loading-subtext">Distance means nothing when love means everything</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {showProposal && (
        <>
          {/* Music Control */}
          {musicEnabled && (
            <div className="music-playing">
              <div className="music-visualizer">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
              <span>🎵 Our Love Song Playing...</span>
            </div>
          )}

          {/* Hero Section */}
          {currentStep === 0 && (
            <div className="hero-section">
              <div className="hero-content">
                <LongDistanceAnimation />
                <h1 className="hero-title">My Beautiful Love</h1>
                <p className="hero-subtitle">
                  Though {Math.floor(Math.random() * 5000) + 5000} miles separate us, nothing can divide our hearts.
                  Before I ask you the most important question of my life,
                  let me take you through our incredible digital love story...
                </p>
                <div className="distance-counter">
                  <div className="counter-item">
                    <span className="counter-number">∞</span>
                    <span className="counter-label">Miles Apart</span>
                  </div>
                  <div className="counter-divider">💕</div>
                  <div className="counter-item">
                    <span className="counter-number">1</span>
                    <span className="counter-label">Heart Connected</span>
                  </div>
                </div>
                <button className="hero-btn" onClick={handleNext}>
                  <span>Begin Our Journey</span>
                  <div className="btn-sparkle">✨</div>
                </button>
              </div>
            </div>
          )}

          {/* Memory Cards */}
          {currentStep > 0 && currentStep <= memories.length && (
            <div className="memory-section">
              <div className="memory-card">
                <div className="memory-icon-container">
                  <div className="memory-icon" style={{ color: memories[currentStep - 1].color }}>
                    {memories[currentStep - 1].icon}
                  </div>
                  <div className="icon-glow" style={{ background: `${memories[currentStep - 1].color}33` }}></div>
                </div>
                <div className="memory-image-container">
                  {Math.random() > 0.5 ? (
                    <img
                      src={memories[currentStep - 1].image}
                      alt={memories[currentStep - 1].title}
                      className="memory-image"
                    />
                  ) : (
                    <video
                      src={memories[currentStep - 1].video}
                      autoPlay
                      loop
                      muted
                      className="memory-video"
                    />
                  )}
                  <div className="image-overlay" style={{ background: `linear-gradient(45deg, ${memories[currentStep - 1].color}44, transparent)` }}></div>
                  <div className="image-frame"></div>
                </div>
                <div className="memory-content">
                  <div className="memory-number">
                    <span>{currentStep}</span>
                    <div className="number-pulse"></div>
                  </div>
                  <h3 className="memory-title" style={{ color: memories[currentStep - 1].color }}>
                    {memories[currentStep - 1].title}
                  </h3>
                  <p className="memory-text">
                    {memories[currentStep - 1].text}
                  </p>
                  <div className="memory-footer">
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(currentStep / memories.length) * 100}%`,
                            background: `linear-gradient(90deg, ${memories[currentStep - 1].color}, ${memories[currentStep - 1].color}aa)`
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">{currentStep} of {memories.length}</span>
                    </div>
                    <button
                      className="memory-btn"
                      onClick={handleNext}
                      style={{
                        background: `linear-gradient(45deg, ${memories[currentStep - 1].color}, ${memories[currentStep - 1].color}dd)`,
                        boxShadow: `0 10px 30px ${memories[currentStep - 1].color}44`
                      }}
                    >
                      {currentStep === memories.length ? 'The Big Question 💍' : 'Next Memory ➤'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Proposal Section */}
          {currentStep > memories.length && response === '' && (
            <div className="proposal-section">
              <div className="proposal-content">
                <div className="proposal-animation">
                  <div className="virtual-ring">💍</div>
                  <div className="ring-glow"></div>
                  <div className="proposal-hearts">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="proposal-heart"
                        style={{
                          animationDelay: `${i * 0.3}s`,
                          transform: `rotate(${i * 30}deg) translateY(-60px)`
                        }}
                      >
                        💕
                      </div>
                    ))}
                  </div>
                </div>
                <h1 className="proposal-title">Will You Marry Me?</h1>
                <p className="proposal-text">
                  Distance tested us, but love conquered all. You are my soulmate,
                  my best friend, and my greatest blessing. Even though we're miles apart,
                  I want to spend forever building our dreams together.
                  <br /><br />
                  Will you be my wife? Will you let me love you for the rest of our lives?
                </p>
                <div className="proposal-promise">
                  <div className="promise-item">
                    <span className="promise-icon">✈️</span>
                    <span>I promise to close this distance</span>
                  </div>
                  <div className="promise-item">
                    <span className="promise-icon">🏠</span>
                    <span>I promise to build our home together</span>
                  </div>
                  <div className="promise-item">
                    <span className="promise-icon">💕</span>
                    <span>I promise to love you unconditionally</span>
                  </div>
                </div>
                <div className="proposal-buttons">
                  <button
                    className="proposal-btn yes-btn"
                    onClick={() => handleResponse('yes')}
                  >
                    <span>YES! Forever & Always 💕</span>
                    <div className="btn-glow"></div>
                  </button>
                  <button
                    className="proposal-btn maybe-btn"
                    onClick={() => handleResponse('maybe')}
                  >
                    I need time to think...
                  </button>
                </div>
              </div>
              <div className="proposal-sparkles">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="sparkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 4}s`
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yes Response */}
          {response === 'yes' && (
            <div className="celebration-section">
              <div className="celebration-content">
                <div className="celebration-animation">
                  <div className="celebration-emoji">🎉</div>
                  <div className="celebration-ring">💍</div>
                  <div className="celebration-fireworks">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="firework" style={{ animationDelay: `${i * 0.5}s` }}>
                        🎆
                      </div>
                    ))}
                  </div>
                </div>
                <h1 className="celebration-title">SHE SAID YES!</h1>
                <p className="celebration-text">
                  🎊 We're getting married! 🎊
                  <br /><br />
                  Thank you for saying yes to our forever! I can't wait for the day
                  I can hold you in my arms as my wife. Distance is temporary,
                  but our love is eternal!
                </p>
                <div className="celebration-promises">
                  <div className="promise-box">
                    <h3>Our Next Steps:</h3>
                    <ul>
                      <li>🎯 Plan our meeting</li>
                      <li>💒 Dream about our wedding</li>
                      <li>🌍 Plan our life together</li>
                      <li>✈️ Book that plane ticket!</li>
                    </ul>
                  </div>
                </div>
                <div className="celebration-hearts-rain">
                  {[...Array(60)].map((_, i) => (
                    <div
                      key={i}
                      className="celebration-heart"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        color: ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ff1744', '#e91e63', '#f06292'][i % 6],
                        fontSize: `${1 + Math.random() * 1.5}rem`
                      }}
                    >
                      {['💕', '💖', '💗', '💝', '❤️', '💓'][i % 6]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Maybe Response */}
          {response === 'maybe' && (
            <div className="thinking-section">
              <div className="thinking-content">
                <div className="thinking-animation">
                  <div className="thinking-emoji">🤔</div>
                  <div className="thought-bubble">💭</div>
                </div>
                <h2 className="thinking-title">Take All the Time You Need</h2>
                <p className="thinking-text">
                  I understand this is a huge decision, especially with the distance between us.
                  My love for you is patient and unconditional. Whether it takes days, months,
                  or longer - I'll be here, loving you and supporting you.
                  <br /><br />
                  Our love story is worth waiting for. 💕
                </p>
                <div className="thinking-reassurance">
                  <div className="reassurance-item">
                    <span className="reassurance-icon">⏰</span>
                    <span>No pressure, no rush</span>
                  </div>
                  <div className="reassurance-item">
                    <span className="reassurance-icon">💝</span>
                    <span>My love remains unchanged</span>
                  </div>
                  <div className="reassurance-item">
                    <span className="reassurance-icon">🤝</span>
                    <span>We'll figure this out together</span>
                  </div>
                </div>
                <button
                  className="thinking-btn"
                  onClick={() => setResponse('')}
                >
                  Ask Me Again When I'm Ready 💕
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .proposal-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%);
          font-family: 'Georgia', serif;
          position: relative;
          overflow: hidden;
        }

        /* Long Distance Animation */
        .long-distance-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin-bottom: 40px;
          position: relative;
        }

        .person {
          font-size: 4rem;
          animation: personFloat 3s ease-in-out infinite;
          z-index: 2;
        }

        .person-1 {
          animation-delay: 0s;
        }

        .person-2 {
          animation-delay: 1s;
        }

        .connecting-line {
          position: relative;
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          overflow: hidden;
        }

        .heart-trail {
          position: absolute;
          left: 0;
          animation: heartTravel 4s linear infinite;
          font-size: 1.5rem;
        }

        @keyframes personFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes heartTravel {
          0% { transform: translateX(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(220px); opacity: 0; }
        }

        /* Enhanced Particles Background */
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: float 25s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        /* Connection Lines */
        .connection-lines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .connection-line {
          position: absolute;
          width: 2px;
          height: 100vh;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent);
          left: 50%;
          animation: connectionPulse 4s infinite;
        }

        @keyframes connectionPulse {
          0%, 100% { transform: translateX(-50%) scaleY(0); }
          50% { transform: translateX(-50%) scaleY(1); }
        }

        /* Enhanced Floating Hearts */
        .floating-hearts {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .floating-heart {
          position: absolute;
          animation: floatHeart 20s linear infinite;
          opacity: 0.8;
        }

        @keyframes floatHeart {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        /* Enhanced Music Controls */
        .music-playing {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          backdrop-filter: blur(15px);
          padding: 15px 25px;
          border-radius: 25px;
          color: white;
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 1000;
          animation: musicGlow 3s ease-in-out infinite alternate;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .music-visualizer {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 25px;
        }

        .music-visualizer .bar {
          width: 4px;
          background: linear-gradient(to top, #ff6b6b, #4ecdc4, #45b7d1);
          border-radius: 2px;
          animation: musicBars 1.2s ease-in-out infinite alternate;
        }

        @keyframes musicGlow {
          from { box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4); }
          to { box-shadow: 0 8px 25px rgba(76, 236, 196, 0.4); }
        }

        @keyframes musicBars {
          0% { height: 8px; }
          100% { height: 25px; }
        }

        /* Enhanced Loading Screen */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loading-content {
          text-align: center;
          color: white;
          max-width: 500px;
          padding: 0 20px;
        }

        .loading-heart {
          margin-bottom: 40px;
        }

        .heart-pulse {
          font-size: 8rem;
          animation: heartPulse 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.5));
        }

        .loading-text {
          font-size: 2rem;
          margin-bottom: 30px;
          animation: fadeInOut 3s infinite;
          font-weight: 300;
        }

        .loading-signal {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .signal-bar {
          width: 6px;
          height: 30px;
          background: linear-gradient(to top, #ff6b6b, #4ecdc4);
          border-radius: 3px;
          animation: signalPulse 1.5s infinite ease-in-out;
        }

        .signal-bar:nth-child(1) { animation-delay: 0s; }
        .signal-bar:nth-child(2) { animation-delay: 0.2s; }
        .signal-bar:nth-child(3) { animation-delay: 0.4s; }
        .signal-bar:nth-child(4) { animation-delay: 0.6s; }

        .loading-subtext {
          font-size: 1.1rem;
          opacity: 0.8;
          font-style: italic;
        }

        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes signalPulse {
          0%, 100% { height: 15px; opacity: 0.5; }
          50% { height: 35px; opacity: 1; }
        }

        /* Enhanced Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          position: relative;
          z-index: 10;
          padding: 20px;
        }

        .hero-content {
          max-width: 900px;
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          animation: heroFadeIn 2s ease-out;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .hero-title {
          font-size: 4.5rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #fff, #ffb3b3, #ff6b6b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGlow 4s ease-in-out infinite;
          font-weight: bold;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          line-height: 1.8;
          margin-bottom: 40px;
          opacity: 0.95;
          font-weight: 300;
        }

        .distance-counter {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .counter-item {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 20px 30px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .counter-number {
          display: block;
          font-size: 3rem;
          font-weight: bold;
          color: #ff6b6b;
          margin-bottom: 5px;
        }

        .counter-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        .counter-divider {
          font-size: 2rem;
          animation: heartPulse 2s infinite;
        }

        .hero-btn {
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffb3b3);
          border: none;
          color: white;
          padding: 25px 50px;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: bold;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .hero-btn:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 50px rgba(255, 107, 107, 0.6);
        }

        .btn-sparkle {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          animation: sparkle 2s infinite;
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes titleGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3) drop-shadow(0 0 30px rgba(255, 107, 107, 0.5)); }
        }

        @keyframes sparkle {
          0%, 100% { transform: translateY(-50%) rotate(0deg) scale(1); }
          50% { transform: translateY(-50%) rotate(180deg) scale(1.3); }
        }

        /* Enhanced Memory Section */
        .memory-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          z-index: 10;
          position: relative;
        }

        .memory-card {
          max-width: 1100px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
          display: grid;
          grid-template-columns: 80px 1fr 1fr;
          min-height: 600px;
          animation: memorySlideIn 1s ease-out;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .memory-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          position: relative;
        }

        .memory-icon {
          font-size: 3rem;
          z-index: 2;
          animation: iconPulse 3s infinite ease-in-out;
        }

        .icon-glow {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          animation: iconGlow 2s infinite ease-in-out;
        }

        .memory-image-container {
          position: relative;
          overflow: hidden;
        }

        .memory-image, .memory-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .memory-card:hover .memory-image,
        .memory-card:hover .memory-video {
          transform: scale(1.08);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.4;
        }

        .image-frame {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 3px solid rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          pointer-events: none;
        }

        .memory-content {
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          background: linear-gradient(135deg, #ffffff, #f8f9fa);
        }

        .memory-number {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 70px;
          height: 70px;
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          font-weight: bold;
          box-shadow: 0 15px 30px rgba(255, 107, 107, 0.4);
          border: 3px solid white;
        }

        .number-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #ff6b6b;
          animation: numberPulse 2s infinite;
        }

        .memory-title {
          font-size: 2.8rem;
          margin-bottom: 25px;
          font-weight: bold;
          line-height: 1.2;
        }

        .memory-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .memory-footer {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .progress-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #eee;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: progressShine 2s infinite;
        }

        .progress-text {
          font-size: 0.9rem;
          color: #777;
          font-weight: 500;
        }

        .memory-btn {
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          border: none;
          color: white;
          padding: 18px 35px;
          border-radius: 25px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s ease;
          align-self: flex-end;
          position: relative;
          overflow: hidden;
        }

        .memory-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .memory-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .memory-btn:hover::before {
          left: 100%;
        }

        @keyframes memorySlideIn {
          from { opacity: 0; transform: translateX(50px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes iconGlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
        }

        @keyframes numberPulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Enhanced Proposal Section */
        .proposal-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          position: relative;
          z-index: 10;
          padding: 20px;
        }

        .proposal-content {
          max-width: 900px;
          padding: 60px 50px;
          animation: proposalFadeIn 2s ease-out;
        }

        .proposal-animation {
          position: relative;
          margin-bottom: 50px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .virtual-ring {
          font-size: 10rem;
          animation: ringFloat 4s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.6));
          z-index: 2;
        }

        .ring-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
          border-radius: 50%;
          animation: ringGlow 3s ease-in-out infinite alternate;
        }

        .proposal-hearts {
          position: absolute;
          width: 200px;
          height: 200px;
        }

        .proposal-heart {
          position: absolute;
          font-size: 1.5rem;
          animation: proposalHeartOrbit 8s linear infinite;
          opacity: 0.8;
        }

        .proposal-title {
          font-size: 5.5rem;
          margin-bottom: 40px;
          background: linear-gradient(45deg, #fff, #ffb3b3, #ff6b6b, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: proposalGlow 3s ease-in-out infinite alternate;
          font-weight: bold;
          text-shadow: none;
        }

        .proposal-text {
          font-size: 1.5rem;
          line-height: 1.8;
          margin-bottom: 50px;
          opacity: 0.95;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 300;
        }

        .proposal-promise {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .promise-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 15px 25px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .promise-item:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.15);
        }

        .promise-icon {
          font-size: 1.3rem;
        }

        .proposal-buttons {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .proposal-btn {
          padding: 25px 50px;
          border-radius: 50px;
          font-size: 1.4rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .yes-btn {
          background: linear-gradient(45deg, #4CAF50, #66BB6A, #81C784);
          color: white;
          box-shadow: 0 20px 40px rgba(76, 175, 80, 0.4);
        }

        .yes-btn:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 60px rgba(76, 175, 80, 0.6);
        }

        .maybe-btn {
          background: transparent;
          border: 3px solid white;
          color: white;
          backdrop-filter: blur(10px);
        }

        .maybe-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(255, 255, 255, 0.2);
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: btnGlow 3s infinite;
        }

        .proposal-sparkles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          animation: sparkleFloat 5s infinite ease-in-out;
          opacity: 0.9;
          font-size: 1.2rem;
        }

        @keyframes proposalFadeIn {
          from { opacity: 0; transform: translateY(50px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes ringFloat {
          0%, 100% { transform: rotate(-5deg) scale(1) translateY(0px); }
          25% { transform: rotate(5deg) scale(1.05) translateY(-10px); }
          50% { transform: rotate(-2deg) scale(1.1) translateY(-5px); }
          75% { transform: rotate(3deg) scale(1.05) translateY(-8px); }
        }

        @keyframes ringGlow {
          from { transform: scale(1); opacity: 0.3; }
          to { transform: scale(1.2); opacity: 0.1; }
        }

        @keyframes proposalHeartOrbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        @keyframes proposalGlow {
          from { filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)); }
          to { filter: drop-shadow(0 0 40px rgba(255, 107, 107, 0.6)); }
        }

        @keyframes btnGlow {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          25% { opacity: 1; }
          50% { transform: translateY(-30px) rotate(180deg) scale(1.2); opacity: 1; }
          75% { opacity: 1; }
        }

        /* Enhanced Celebration Section */
        .celebration-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          position: relative;
          z-index: 10;
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffb3b3, #f093fb);
          padding: 20px;
        }

        .celebration-content {
          max-width: 900px;
          padding: 60px 50px;
          animation: celebrationBounce 1.5s ease-out;
        }

        .celebration-animation {
          position: relative;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
        }

        .celebration-emoji {
          font-size: 12rem;
          animation: celebrationSpin 3s infinite ease-in-out;
          z-index: 2;
        }

        .celebration-ring {
          position: absolute;
          font-size: 6rem;
          animation: celebrationRingFloat 4s infinite ease-in-out;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
        }

        .celebration-fireworks {
          position: absolute;
          width: 300px;
          height: 300px;
        }

        .firework {
          position: absolute;
          font-size: 3rem;
          animation: fireworkExplode 2s infinite ease-out;
        }

        .firework:nth-child(1) { top: 10%; left: 10%; }
        .firework:nth-child(2) { top: 10%; right: 10%; }
        .firework:nth-child(3) { bottom: 30%; left: 20%; }
        .firework:nth-child(4) { bottom: 30%; right: 20%; }
        .firework:nth-child(5) { top: 50%; left: 5%; }
        .firework:nth-child(6) { top: 50%; right: 5%; }
        .firework:nth-child(7) { top: 70%; left: 15%; }
        .firework:nth-child(8) { top: 70%; right: 15%; }

        .celebration-title {
          font-size: 6.5rem;
          margin-bottom: 40px;
          animation: celebrationPulse 2s infinite;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
          font-weight: bold;
        }

        .celebration-text {
          font-size: 1.6rem;
          margin-bottom: 50px;
          animation: celebrationFadeIn 2s ease-out 0.5s both;
          line-height: 1.8;
          font-weight: 300;
        }

        .celebration-promises {
          margin-bottom: 40px;
        }

        .promise-box {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          padding: 30px;
          border-radius: 25px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: inline-block;
          text-align: left;
        }

        .promise-box h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-align: center;
          color: #fff;
        }

        .promise-box ul {
          list-style: none;
          padding: 0;
        }

        .promise-box li {
          font-size: 1.2rem;
          margin-bottom: 15px;
          padding-left: 10px;
        }

        .celebration-hearts-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .celebration-heart {
          position: absolute;
          animation: celebrationHeartFall 4s linear infinite;
        }

        @keyframes celebrationBounce {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes celebrationSpin {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-15deg) scale(1.1); }
          75% { transform: rotate(15deg) scale(1.1); }
        }

        @keyframes celebrationRingFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes celebrationPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes celebrationFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes celebrationHeartFall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes fireworkExplode {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }

        /* Enhanced Thinking Section */
        .thinking-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          position: relative;
          z-index: 10;
          padding: 20px;
        }

        .thinking-content {
          max-width: 900px;
          padding: 60px 50px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          animation: thinkingFadeIn 1s ease-out;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .thinking-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .thinking-emoji {
          font-size: 6rem;
          animation: thinkingFloat 4s ease-in-out infinite;
        }

        .thought-bubble {
          font-size: 4rem;
          animation: bubbleFloat 3s ease-in-out infinite;
          opacity: 0.8;
        }

        .thinking-title {
          font-size: 3.5rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #fff, #e1bee7, #ce93d8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: bold;
        }

        .thinking-text {
          font-size: 1.4rem;
          line-height: 1.8;
          margin-bottom: 50px;
          opacity: 0.95;
          font-weight: 300;
        }

        .thinking-reassurance {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .reassurance-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 15px 25px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .reassurance-item:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.15);
        }

        .reassurance-icon {
          font-size: 1.3rem;
        }

        .thinking-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 3px solid white;
          color: white;
          padding: 20px 40px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(15px);
        }

        .thinking-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(255, 255, 255, 0.2);
        }

        @keyframes thinkingFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes thinkingFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .memory-card {
            grid-template-columns: 1fr;
            max-width: 95%;
          }

          .memory-icon-container {
            grid-row: 1;
            padding: 20px;
            background: linear-gradient(90deg, #f8f9fa, #e9ecef);
          }

          .memory-image-container {
            grid-row: 2;
            height: 300px;
          }

          .memory-content {
            grid-row: 3;
            padding: 40px 30px;
          }

          .hero-title {
            font-size: 3.5rem;
          }

          .distance-counter {
            gap: 20px;
          }

          .counter-item {
            padding: 15px 20px;
          }

          .counter-number {
            font-size: 2.5rem;
          }

          .proposal-promise,
          .thinking-reassurance {
            gap: 15px;
          }

          .promise-item,
          .reassurance-item {
            padding: 12px 20px;
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content,
          .proposal-content,
          .celebration-content,
          .thinking-content {
            padding: 40px 30px;
            margin: 20px;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .proposal-title {
            font-size: 3.5rem;
          }

          .celebration-title {
            font-size: 4rem;
          }

          .thinking-title {
            font-size: 2.5rem;
          }

          .virtual-ring,
          .celebration-emoji {
            font-size: 6rem;
          }

          .heart-pulse {
            font-size: 5rem;
          }

          .loading-text {
            font-size: 1.5rem;
          }

          .proposal-text,
          .celebration-text,
          .thinking-text {
            font-size: 1.2rem;
          }

          .memory-title {
            font-size: 2rem;
          }

          .memory-text {
            font-size: 1.1rem;
          }

          .memory-content {
            padding: 30px 25px;
          }

          .proposal-buttons {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .proposal-btn {
            width: 280px;
            padding: 20px 40px;
            font-size: 1.2rem;
          }

          .hero-btn {
            padding: 20px 40px;
            font-size: 1.1rem;
          }

          .distance-counter {
            flex-direction: column;
            gap: 15px;
          }

          .proposal-promise,
          .thinking-reassurance {
            flex-direction: column;
            align-items: center;
          }

          .music-playing {
            top: 10px;
            right: 10px;
            padding: 12px 20px;
            font-size: 0.9rem;
          }

          .promise-box {
            padding: 25px 20px;
          }

          .promise-box h3 {
            font-size: 1.5rem;
          }

          .promise-box li {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content,
          .proposal-content,
          .celebration-content,
          .thinking-content {
            padding: 30px 20px;
            margin: 15px;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .proposal-title {
            font-size: 2.5rem;
          }

          .celebration-title {
            font-size: 2.8rem;
          }

          .thinking-title {
            font-size: 2rem;
          }

          .virtual-ring,
          .celebration-emoji,
          .thinking-emoji {
            font-size: 4rem;
          }

          .heart-pulse {
            font-size: 4rem;
          }

          .loading-text {
            font-size: 1.2rem;
          }

          .loading-subtext {
            font-size: 0.9rem;
          }

          .proposal-text,
          .celebration-text,
          .thinking-text {
            font-size: 1rem;
          }

          .memory-title {
            font-size: 1.6rem;
          }

          .memory-text {
            font-size: 1rem;
          }

          .memory-icon {
            font-size: 2rem;
          }

          .memory-number {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
            top: -10px;
            right: -10px;
          }

          .proposal-btn {
            width: 250px;
            padding: 18px 30px;
            font-size: 1.1rem;
          }

          .hero-btn {
            padding: 18px 35px;
            font-size: 1rem;
          }

          .thinking-btn {
            padding: 18px 35px;
            font-size: 1.1rem;
          }

          .counter-number {
            font-size: 2rem;
          }

          .counter-label {
            font-size: 0.9rem;
          }

          .promise-item,
          .reassurance-item {
            padding: 10px 15px;
            font-size: 0.9rem;
          }

          .promise-icon,
          .reassurance-icon {
            font-size: 1.1rem;
          }

          .music-playing {
            position: relative;
            top: auto;
            right: auto;
            margin: 20px;
            display: inline-flex;
          }

          .long-distance-animation {
            margin-bottom: 30px;
            height: 120px;
          }

          .person {
            font-size: 3rem;
          }

          .connecting-line {
            width: 150px;
          }

          .proposal-animation {
            height: 150px;
            margin-bottom: 30px;
          }

          .celebration-animation {
            height: 180px;
            margin-bottom: 30px;
          }

          .thinking-animation {
            margin-bottom: 30px;
          }

          .thought-bubble {
            font-size: 2.5rem;
          }

          .promise-box {
            padding: 20px 15px;
            margin: 0 10px;
          }

          .promise-box h3 {
            font-size: 1.3rem;
          }

          .promise-box li {
            font-size: 1rem;
            margin-bottom: 10px;
          }

          .celebration-fireworks {
            width: 200px;
            height: 200px;
          }

          .firework {
            font-size: 2rem;
          }

          .proposal-hearts {
            width: 150px;
            height: 150px;
          }

          .proposal-heart {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 320px) {
          .hero-content,
          .proposal-content,
          .celebration-content,
          .thinking-content {
            padding: 25px 15px;
            margin: 10px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .proposal-title {
            font-size: 2rem;
          }

          .celebration-title {
            font-size: 2.2rem;
          }

          .thinking-title {
            font-size: 1.6rem;
          }

          .proposal-btn,
          .hero-btn,
          .thinking-btn {
            width: 100%;
            max-width: 220px;
          }

          .distance-counter {
            margin-bottom: 30px;
          }

          .counter-item {
            padding: 10px 15px;
          }

          .memory-content {
            padding: 25px 20px;
          }

          .promise-box {
            margin: 0 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProposalWebsite;