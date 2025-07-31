import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProposalWebsite = () => {
  const [showProposal, setShowProposal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState('');

  const memories = [
    {
      title: "Our First Meeting",
      text: "The moment I saw you, I knew my life would never be the same...",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=300&fit=crop"
    },
    {
      title: "Our First Date",
      text: "That perfect evening when we talked until the stars came out...",
      image: "https://images.unsplash.com/photo-1414490929659-9a12b7e31907?w=500&h=300&fit=crop"
    },
    {
      title: "When I Knew",
      text: "The moment I realized I wanted to spend forever with you...",
      image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProposal(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < memories.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleResponse = (answer) => {
    setResponse(answer);
  };

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Georgia, serif'
    }}>
      <div className="container-fluid p-0">
        
        {/* Loading Screen */}
        {!showProposal && (
          <div className="d-flex align-items-center justify-content-center min-vh-100 text-white">
            <div className="text-center">
              <div className="spinner-border text-light mb-4" style={{width: '3rem', height: '3rem'}}></div>
              <h2 className="mb-3">Something special is loading...</h2>
              <div className="d-flex justify-content-center">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="mx-1" style={{
                    width: '20px',
                    height: '20px',
                    background: '#ff6b6b',
                    borderRadius: '50%',
                    animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite alternate`
                  }}></div>
                ))}
              </div>
              <style>
                {`
                  @keyframes pulse {
                    from { opacity: 0.4; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1.2); }
                  }
                `}
              </style>
            </div>
          </div>
        )}

        {/* Main Content */}
        {showProposal && (
          <>
            {/* Hero Section */}
            {currentStep === 0 && (
              <div className="d-flex align-items-center justify-content-center min-vh-100 text-white text-center">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="card bg-transparent border-0">
                        <div className="card-body p-5">
                          <div className="mb-4" style={{fontSize: '4rem', animation: 'heartbeat 2s ease-in-out infinite'}}>
                            💕
                          </div>
                          <h1 className="display-3 mb-4" style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            animation: 'fadeInUp 1s ease-out'
                          }}>
                            My Dearest Love
                          </h1>
                          <p className="lead mb-5" style={{
                            fontSize: '1.3rem',
                            lineHeight: '1.8',
                            animation: 'fadeInUp 1s ease-out 0.5s both'
                          }}>
                            Before I ask you the most important question of my life,
                            let me take you through our beautiful journey together...
                          </p>
                          <button 
                            className="btn btn-light btn-lg px-5 py-3 rounded-pill"
                            onClick={handleNext}
                            style={{
                              fontSize: '1.1rem',
                              fontWeight: 'bold',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                              animation: 'fadeInUp 1s ease-out 1s both'
                            }}
                          >
                            Begin Our Story ✨
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <style>
                  {`
                    @keyframes heartbeat {
                      0%, 100% { transform: scale(1); }
                      50% { transform: scale(1.1); }
                    }
                    @keyframes fadeInUp {
                      from { opacity: 0; transform: translateY(30px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                  `}
                </style>
              </div>
            )}

            {/* Memory Cards */}
            {currentStep > 0 && currentStep <= memories.length && (
              <div className="d-flex align-items-center justify-content-center min-vh-100 py-5">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="row g-0">
                          <div className="col-md-6">
                            <img 
                              src={memories[currentStep - 1].image} 
                              alt={memories[currentStep - 1].title}
                              className="img-fluid h-100 w-100"
                              style={{objectFit: 'cover', minHeight: '400px'}}
                            />
                          </div>
                          <div className="col-md-6">
                            <div className="card-body h-100 d-flex flex-column justify-content-center p-5">
                              <h3 className="card-title text-primary mb-4" style={{fontSize: '2rem'}}>
                                {memories[currentStep - 1].title}
                              </h3>
                              <p className="card-text lead mb-4" style={{lineHeight: '1.7'}}>
                                {memories[currentStep - 1].text}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  Memory {currentStep} of {memories.length}
                                </small>
                                <button 
                                  className="btn btn-primary btn-lg rounded-pill px-4"
                                  onClick={handleNext}
                                >
                                  {currentStep === memories.length ? 'The Question ❤️' : 'Next ➤'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Proposal Section */}
            {currentStep > memories.length && response === '' && (
              <div className="d-flex align-items-center justify-content-center min-vh-100 text-white">
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="mb-5" style={{fontSize: '6rem', animation: 'ring 2s ease-in-out infinite'}}>
                        💍
                      </div>
                      <h1 className="display-2 mb-5" style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        animation: 'glow 2s ease-in-out infinite alternate'
                      }}>
                        Will You Marry Me?
                      </h1>
                      <p className="lead mb-5" style={{fontSize: '1.4rem', lineHeight: '1.8'}}>
                        You are my best friend, my greatest love, and my dream come true. 
                        I want to spend the rest of my life making you as happy as you make me.
                      </p>
                      <div className="d-flex justify-content-center gap-4">
                        <button 
                          className="btn btn-success btn-lg px-5 py-3 rounded-pill"
                          onClick={() => handleResponse('yes')}
                          style={{
                            fontSize: '1.3rem',
                            fontWeight: 'bold',
                            boxShadow: '0 6px 20px rgba(40, 167, 69, 0.4)'
                          }}
                        >
                          YES! 💕
                        </button>
                        <button 
                          className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
                          onClick={() => handleResponse('maybe')}
                          style={{fontSize: '1.3rem', fontWeight: 'bold'}}
                        >
                          Let me think...
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <style>
                  {`
                    @keyframes ring {
                      0%, 100% { transform: rotate(-10deg) scale(1); }
                      50% { transform: rotate(10deg) scale(1.1); }
                    }
                    @keyframes glow {
                      from { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
                      to { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,192,203,0.5); }
                    }
                  `}
                </style>
              </div>
            )}

            {/* Response Sections */}
            {response === 'yes' && (
              <div className="d-flex align-items-center justify-content-center min-vh-100 text-white">
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="mb-4" style={{fontSize: '8rem', animation: 'celebrate 1s ease-in-out infinite'}}>
                        🎉
                      </div>
                      <h1 className="display-1 mb-4" style={{
                        color: '#ff6b6b',
                        textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                        animation: 'bounce 2s ease-in-out infinite'
                      }}>
                        SHE SAID YES!
                      </h1>
                      <p className="lead mb-5" style={{fontSize: '1.5rem'}}>
                        I can't wait to start this amazing journey with you! 
                        You've just made me the happiest person alive! 💕
                      </p>
                      <div className="confetti-container">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className="confetti" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][i % 5]
                          }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <style>
                  {`
                    @keyframes celebrate {
                      0%, 100% { transform: scale(1) rotate(0deg); }
                      25% { transform: scale(1.2) rotate(-5deg); }
                      75% { transform: scale(1.2) rotate(5deg); }
                    }
                    @keyframes bounce {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-20px); }
                    }
                    .confetti {
                      position: absolute;
                      width: 10px;
                      height: 10px;
                      animation: confetti-fall 3s linear infinite;
                    }
                    @keyframes confetti-fall {
                      0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                    }
                    .confetti-container {
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      pointer-events: none;
                    }
                  `}
                </style>
              </div>
            )}

            {response === 'maybe' && (
              <div className="d-flex align-items-center justify-content-center min-vh-100 text-white">
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="mb-4" style={{fontSize: '4rem'}}>
                        🤔💭
                      </div>
                      <h2 className="display-4 mb-4">Take All the Time You Need</h2>
                      <p className="lead mb-5">
                        I understand this is a big decision. I'll be here waiting, 
                        no matter how long it takes. My love for you is patient and eternal. ❤️
                      </p>
                      <button 
                        className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
                        onClick={() => setResponse('')}
                      >
                        Ask Me Again 💕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProposalWebsite;