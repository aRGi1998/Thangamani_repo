
// import React, { useState, useEffect, useRef } from 'react';
// import { Heart, Music, Sparkles, Gift } from 'lucide-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import meriTamanna from './assests/meri_tamanna.mp3';

// const RomanticBirthdaySurprise = () => {
//     const [showPlayer, setShowPlayer] = useState(true); // Auto-show player
//     const [currentMessage, setCurrentMessage] = useState(0);
//     const [showHearts, setShowHearts] = useState(true); // Auto-show hearts
//     const audioRef = useRef(null);

//     const romanticMessages = [
//         "Happy Birthday, My Dearest Thangamani! 💖",
//         "Thangamani, you are the most beautiful person I know ✨",
//         "Every moment with you, Thangamani, feels like magic 🌸",
//         "My heart skips a beat when I see you, Thangamani 💌",
//         "Wishing you the happiest birthday my love Thangamani 🎂",
//         "Thangamani, you make my world brighter every day 🌟",
//         "To Thangamani: The queen of my heart 👑",
//         "Thangamani, your smile lights up my universe 💫"
//     ];

//     const bgColors = [
//         'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
//         'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
//         'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
//         'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
//         'linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)',
//         'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
//     ];

//     useEffect(() => {
//         // Auto-play music and show hearts on load
//         if (audioRef.current) {
//             audioRef.current.volume = 0.5; // Set volume to 50%
//             audioRef.current.play().catch(e => console.log("Auto-play prevented:", e));
//         }
//         setShowHearts(true);

//         const interval = setInterval(() => {
//             setCurrentMessage((prev) => (prev + 1) % romanticMessages.length);
//         }, 5000);

//         return () => {
//             clearInterval(interval);
//             if (audioRef.current) {
//                 audioRef.current.pause();
//             }
//         };
//     }, []);

//     const toggleMusic = () => {
//         if (audioRef.current) {
//             if (audioRef.current.paused) {
//                 audioRef.current.play();
//             } else {
//                 audioRef.current.pause();
//             }
//             setShowPlayer(!audioRef.current.paused);
//         }
//     };

//     const HeartRain = () => {
//         return (
//             <>
//                 {[...Array(50)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="position-absolute text-danger heart"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             fontSize: `${Math.random() * 25 + 15}px`,
//                             opacity: Math.random() * 0.7 + 0.3,
//                             animation: `float ${Math.random() * 8 + 5}s linear infinite`,
//                             animationDelay: `${Math.random() * 5}s`,
//                             zIndex: 0,
//                             pointerEvents: 'none'
//                         }}
//                     >
//                         {Math.random() > 0.5 ? '❤️' : '💖'}
//                     </div>
//                 ))}
//             </>
//         );
//     };

//     return (
//         <div
//             className="min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
//             style={{
//                 background: bgColors[currentMessage % bgColors.length],
//                 transition: 'background 2s ease-in-out'
//             }}
//         >
//             {/* Audio element for background music */}
//             <audio
//                 ref={audioRef}
//                 src={meriTamanna}
//                 loop
//             />

//             {/* Floating hearts background */}
//             {showHearts && <HeartRain />}

//             {/* Sparkle decorations */}
//             <Sparkles
//                 size={40}
//                 className="position-absolute top-0 start-0 m-4 text-warning sparkle"
//             />
//             <Sparkles
//                 size={40}
//                 className="position-absolute bottom-0 end-0 m-4 text-warning sparkle"
//             />

//             {/* Birthday gift icon */}
//             <Gift
//                 size={50}
//                 className="position-absolute top-0 start-50 translate-middle-x mt-4 text-primary"
//                 style={{ animation: 'bounce 2s infinite' }}
//             />

//             {/* Music toggle button */}
//             <div className="position-absolute top-0 end-0 p-4">
//                 <button
//                     onClick={toggleMusic}
//                     className="btn btn-danger rounded-circle p-3 shadow-lg"
//                 >
//                     <Music size={24} className={showPlayer ? 'beat' : ''} />
//                 </button>
//             </div>

//             {/* Main content */}
//             <div
//                 className="text-center px-4 position-relative"
//                 style={{ zIndex: 1, maxWidth: '800px' }}
//             >
//                 <h1
//                     className="display-3 fw-bold mb-4 text-white text-shadow"
//                     style={{
//                         textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
//                         animation: 'fadeIn 1.5s ease-in-out'
//                     }}
//                 >
//                     {romanticMessages[currentMessage]}
//                 </h1>

//                 <div className="mt-5">
//                     <Heart
//                         size={60}
//                         className="text-danger beat"
//                         fill="currentColor"
//                     />
//                 </div>
//             </div>

//             {/* Footer */}
//             <div className="position-absolute bottom-0 w-100 text-center p-3" style={{ zIndex: 2 }}>
//                 <p className="text-white opacity-75 mb-0">
//                     Created with all my love for you, Thangamani ❤️
//                 </p>
//             </div>

//             <style>{`
//         @keyframes float {
//           0% { transform: translateY(100vh) rotate(0deg); }
//           100% { transform: translateY(-20vh) rotate(360deg); }
//         }
        
//         @keyframes beat {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.3); }
//         }
        
//         @keyframes sparkle {
//           0% { opacity: 0.3; transform: scale(0.8); }
//           50% { opacity: 1; transform: scale(1.2); }
//           100% { opacity: 0.3; transform: scale(0.8); }
//         }
        
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-15px); }
//         }
        
//         .text-shadow {
//           text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         }
        
//         .heart {
//           animation: float 8s linear infinite;
//         }
        
//         .sparkle {
//           animation: sparkle 3s infinite ease-in-out;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         body {
//           overflow-x: hidden;
//           font-family: 'Arial', sans-serif;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default RomanticBirthdaySurprise;

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, Sparkles, Gift } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import meriTamanna from './assests/meri_tamanna.mp3';

const RomanticBirthdaySurprise = () => {
    const [showPlayer, setShowPlayer] = useState(true);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [showHearts, setShowHearts] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);
    const audioRef = useRef(null);

    const romanticMessages = [
        "Happy Birthday, My Dearest Thangamani! 💖",
        "Thangamani, you are the most beautiful person I know ✨",
        "Every moment with you, Thangamani, feels like magic 🌸",
        "My heart skips a beat when I see you, Thangamani 💌",
        "Wishing you the happiest birthday my love Thangamani 🎂",
        "Thangamani, you make my world brighter every day 🌟",
        "To Thangamani: The queen of my heart 👑",
        "Thangamani, your smile lights up my universe 💫"
    ];

    const bgColors = [
        'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)',
        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    ];

    const handleUserInteraction = () => {
        if (!userInteracted) {
            setUserInteracted(true);
            // Try to play audio after user interaction
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                const playPromise = audioRef.current.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Playback failed:", error);
                    });
                }
            }
        }
    };

    useEffect(() => {
        // Set up a single interaction listener for the whole document
        const interactionEvents = ['click', 'touchstart', 'keydown'];
        const listeners = interactionEvents.map(event => {
            document.addEventListener(event, handleUserInteraction, { once: true });
        });

        // Message rotation interval
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % romanticMessages.length);
        }, 5000);

        return () => {
            // Cleanup
            interactionEvents.forEach(event => {
                document.removeEventListener(event, handleUserInteraction);
            });
            clearInterval(interval);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

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
                            animation: `float ${Math.random() * 8 + 5}s linear infinite`,
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

    return (
        <div
            className="min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
            style={{
                background: bgColors[currentMessage % bgColors.length],
                transition: 'background 2s ease-in-out'
            }}
            onClick={handleUserInteraction} // Add click handler to the main container
        >
            {/* Audio element for background music */}
            <audio
                ref={audioRef}
                src={meriTamanna}
                loop
            />

            {/* Floating hearts background */}
            {showHearts && <HeartRain />}

            {/* Sparkle decorations */}
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
                >
                    <Music size={24} className={showPlayer ? 'beat' : ''} />
                </button>
            </div>

            {/* Main content */}
            <div
                className="text-center px-4 position-relative"
                style={{ zIndex: 1, maxWidth: '800px' }}
            >
                <h1
                    className="display-3 fw-bold mb-4 text-white text-shadow"
                    style={{
                        textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                        animation: 'fadeIn 1.5s ease-in-out'
                    }}
                >
                    {romanticMessages[currentMessage]}
                </h1>

                <div className="mt-5">
                    <Heart
                        size={60}
                        className="text-danger beat"
                        fill="currentColor"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="position-absolute bottom-0 w-100 text-center p-3" style={{ zIndex: 2 }}>
                <p className="text-white opacity-75 mb-0">
                    Created with all my love for you, Thangamani ❤️
                </p>
            </div>

            {/* Add a subtle instruction if audio hasn't played */}
            {!userInteracted && (
                <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                    <p>Click anywhere to start the music</p>
                </div>
            )}

            <style>{`
                @keyframes float {
                    0% { transform: translateY(100vh) rotate(0deg); }
                    100% { transform: translateY(-20vh) rotate(360deg); }
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
                
                .text-shadow {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .heart {
                    animation: float 8s linear infinite;
                }
                
                .sparkle {
                    animation: sparkle 3s infinite ease-in-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                body {
                    overflow-x: hidden;
                    font-family: 'Arial', sans-serif;
                }
            `}</style>
        </div>
    );
};

export default RomanticBirthdaySurprise;