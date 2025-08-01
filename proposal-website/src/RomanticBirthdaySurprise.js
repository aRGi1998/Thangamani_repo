import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, Sparkles, Gift } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import meriTamanna from './assests/meri_tamanna.mp3';

const RomanticBirthdaySurprise = () => {
    const [showPlayer, setShowPlayer] = useState(true);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [showHearts, setShowHearts] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showSmiles, setShowSmiles] = useState(false);
    const audioRef = useRef(null);
    const romanticMessages = [
        "Happy Birthday, My Dearest Thangamani! 💖 You are the reason my heart beats with joy today and every day.",
        "Thangamani, you are the most handsome soul I've ever known — strong, kind, and endlessly loving ✨",
        "Every moment with you, Thangamani, feels like a dream I never want to wake up from 🌌",
        "My heart races when I think of you, Thangamani — you’re my forever and always 💘",
        "Wishing the happiest birthday to the man who owns my heart, my love, my Thangamani 🎂❤️",
        "Thangamani, your voice soothes me, your love completes me, and your smile lights up my world 💫",
        "To Thangamani: My king, my protector, my everything 👑 I’m so lucky to love you.",
        "Thangamani, I may not be by your side today, but my heart is wrapped around yours across every mile 🌍💌",
        "On your birthday, I just want to remind you: loving you is the greatest gift life has given me 💝",
        "Happy Birthday, Thangamani! You are my strength, my peace, my heart’s true home 🏡❤️"
    ];

    const bgColors = [
        'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)',
        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    ];

    const handleStartExperience = () => {
        setUserInteracted(true);
        setShowSmiles(true);

        // Show smiles for 2 seconds before showing content
        setTimeout(() => {
            setShowContent(true);
            setShowHearts(true);
            setShowSmiles(false);
        }, 2000);

        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Playback failed:", error);
                });
            }
        }
    };

    useEffect(() => {
        if (showContent) {
            const interval = setInterval(() => {
                setCurrentMessage((prev) => (prev + 1) % romanticMessages.length);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [showContent]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            setShowPlayer(!audioRef.current.paused);
        }
    };

    const HeartRain = () => {
        return (
            <>
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="position-absolute text-danger heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 25 + 15}px`,
                            opacity: Math.random() * 0.7 + 0.3,
                            animation: `heartFloat ${Math.random() * 8 + 5}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                            zIndex: 0,
                            pointerEvents: 'none'
                        }}
                    >
                        {Math.random() > 0.5 ? '❤️' : '💖'}
                    </div>
                ))}
            </>
        );
    };

    const SmileRain = () => {
        const smileys = ['😊', '😍', '🥰', '😘', '🤗', '💋', '💌', '💖'];
        return (
            <>
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="position-absolute smile"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 30 + 20}px`,
                            opacity: 0,
                            animation: `smileFloat ${Math.random() * 3 + 2}s ease-out forwards`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            zIndex: 10,
                            pointerEvents: 'none',
                            transform: 'translateY(0)'
                        }}
                    >
                        {smileys[Math.floor(Math.random() * smileys.length)]}
                    </div>
                ))}
            </>
        );
    };

    const HeartBalloon = () => {
        return (
            <div
                className="position-absolute top-50 start-50 translate-middle text-center"
                style={{ zIndex: 10, cursor: 'pointer' }}
                onClick={handleStartExperience}
            >
                <div
                    className="heart-balloon animate-float"
                    style={{
                        fontSize: '100px',
                        animation: 'heartBeat 1.5s infinite, float 4s ease-in-out infinite',
                        textShadow: '0 0 20px rgba(255,105,180,0.7)',
                        transform: 'translateY(0)',
                        filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.5))'
                    }}
                >
                    ❤️
                </div>
                <div
                    className="text-white mt-3 animate-pulse"
                    style={{
                        fontSize: '28px',
                        animation: 'pulse 1.5s infinite',
                        textShadow: '0 0 10px rgba(255,20,147,0.8)',
                        fontWeight: 'bold',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '10px 20px',
                        borderRadius: '50px'
                    }}
                >
                    Click my ❤️, Thanagame...😘💋
                </div>
            </div>
        );
    };

    return (
        <div
            className="min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
            style={{
                background: showContent ? bgColors[currentMessage % bgColors.length] : 'linear-gradient(135deg, #ff6b6b 0%, #ffb8b8 100%)',
                transition: 'background 1.5s ease-in-out'
            }}
        >
            {/* Audio element for background music */}
            <audio
                ref={audioRef}
                src={meriTamanna}
                loop
            />

            {/* Initial heart balloon */}
            {!userInteracted && <HeartBalloon />}

            {/* Smile animation when clicked */}
            {showSmiles && <SmileRain />}

            {/* Floating hearts background */}
            {showHearts && <HeartRain />}

            {/* Sparkle decorations */}
            {showContent && (
                <>
                    <Sparkles
                        size={40}
                        className="position-absolute top-0 start-0 m-4 text-warning sparkle"
                    />
                    <Sparkles
                        size={40}
                        className="position-absolute bottom-0 end-0 m-4 text-warning sparkle"
                    />

                    {/* Birthday gift icon */}
                    <Gift
                        size={50}
                        className="position-absolute top-0 start-50 translate-middle-x mt-4 text-primary"
                        style={{ animation: 'bounce 2s infinite' }}
                    />

                    {/* Music toggle button */}
                    <div className="position-absolute top-0 end-0 p-4">
                        <button
                            onClick={toggleMusic}
                            className="btn btn-danger rounded-circle p-3 shadow-lg"
                            style={{ background: 'rgba(255,0,0,0.7)', border: 'none' }}
                        >
                            <Music size={24} className={showPlayer ? 'beat' : ''} />
                        </button>
                    </div>
                </>
            )}

            {/* Main content */}
            {showContent && (
                <div
                    className="text-center px-4 position-relative"
                    style={{ zIndex: 1, maxWidth: '800px' }}
                >
                    <h1
                        className="display-3 fw-bold mb-4 text-white text-shadow"
                        style={{
                            textShadow: '3px 3px 10px rgba(0,0,0,0.5)',
                            animation: 'fadeIn 1.5s ease-in-out',
                            // background: 'rgba(0,0,0,0.2)',
                            padding: '20px',
                            // borderRadius: '20px'
                        }}
                    >
                        {romanticMessages[currentMessage]}
                    </h1>

                    <div className="mt-5">
                        <Heart
                            size={80}
                            className="text-danger beat"
                            fill="currentColor"
                            style={{ filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.5))' }}
                        />
                    </div>
                </div>
            )}

            {/* Footer */}
            {showContent && (
                <div className="position-absolute bottom-0 w-100 text-center p-3" style={{ zIndex: 2 }}>
                    <p className="text-white mb-0" style={{
                        fontSize: '18px',
                        textShadow: '0 0 5px rgba(0,0,0,0.5)',
                        // background: 'rgba(0,0,0,0.3)',
                        padding: '10px',
                        // borderRadius: '50px'
                    }}>
                        Created with all my love for you, Thangamani ❤️
                    </p>
                </div>
            )}

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(-5deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes heartBeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                
                @keyframes beat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                }
                
                @keyframes sparkle {
                    0% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                    100% { opacity: 0.3; transform: scale(0.8); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.8; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                
                @keyframes heartFloat {
                    0% { transform: translateY(100vh) rotate(0deg); }
                    100% { transform: translateY(-20vh) rotate(360deg); }
                }
                
                @keyframes smileFloat {
                    0% { opacity: 0; transform: translateY(0) scale(0.5); }
                    20% { opacity: 1; transform: translateY(-20px) scale(1.2); }
                    100% { opacity: 0; transform: translateY(-100px) scale(1); }
                }
                
                .text-shadow {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .heart {
                    animation: heartFloat 8s linear infinite;
                }
                
                .smile {
                    animation: smileFloat 2s ease-out forwards;
                }
                
                .sparkle {
                    animation: sparkle 3s infinite ease-in-out;
                }
                
                .heart-balloon {
                    transition: all 0.3s ease;
                }
                
                .heart-balloon:hover {
                    transform: scale(1.1) !important;
                    filter: drop-shadow(0 0 15px rgba(255,0,0,0.8)) !important;
                }
                
                body {
                    overflow-x: hidden;
                    font-family: 'Arial', sans-serif;
                    cursor: default;
                }
            `}</style>
        </div>
    );
};

export default RomanticBirthdaySurprise;
