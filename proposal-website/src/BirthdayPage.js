// import React, { useState, useEffect } from 'react';
// import { Container, Button, Carousel, Spinner, Modal } from 'react-bootstrap';
// import { Heart, Star, Gift, MessageCircle, Volume2, MapPin, Send, ChevronRight, Music, X, Check, Clock } from 'lucide-react';
// import Confetti from 'react-confetti';
// import useWindowSize from 'react-use/lib/useWindowSize';
// import ReactHowler from 'react-howler';

// const BirthdayLoveProposal = () => {
//   const { width, height } = useWindowSize();
//   const [currentStep, setCurrentStep] = useState(0); // 0 = loading, 1 = birthday, 2 = love letter, 3 = proposal
//   const [hearts, setHearts] = useState([]);
//   const [showYesNo, setShowYesNo] = useState(false);
//   const [showMusicPlayer, setShowMusicPlayer] = useState(false);
//   const [currentSong, setCurrentSong] = useState(0);
//   const [playMusic, setPlayMusic] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showCountdown, setShowCountdown] = useState(false);
//   const [timeUntilMeet, setTimeUntilMeet] = useState('');

//   // Malayalam Romantic Songs (replace with actual song URLs)
//   const songs = [
//     {
//       title: "Aaromale - Alphonse",
//       url: "https://example.com/songs/aromale.mp3",
//       malayalamTitle: "ആറോമലേ - അൽഫോൻസ്"
//     },
//     {
//       title: "Mazhaneerthullikal - Kumbalangi Nights",
//       url: "https://example.com/songs/mazhaneer.mp3",
//       malayalamTitle: "മഴനീര്ത്തുള്ളികൾ - കുമ്പളങ്ങി നൈറ്റ്സ്"
//     },
//     {
//       title: "Thiruvarutchelvar - Ennu Ninte Moideen",
//       url: "https://example.com/songs/moideen.mp3",
//       malayalamTitle: "തിരുവരുത്തചെൽവർ - എന്നു നിന്റെ മൊയ്തീൻ"
//     }
//   ];

//   // Calculate time until next meet
//   useEffect(() => {
//     // Set your next meeting date here (YYYY, MM-1, DD)
//     const meetDate = new Date(2024, 7, 15); // August 15, 2024 (month is 0-indexed)
//     const updateCountdown = () => {
//       const now = new Date();
//       const diff = meetDate - now;
      
//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
//       setTimeUntilMeet(`${days} days, ${hours} hours, ${minutes} minutes`);
//     };
    
//     const timer = setInterval(updateCountdown, 60000);
//     updateCountdown();
//     return () => clearInterval(timer);
//   }, []);

//   // Simulate loading with Malayalam song
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       setCurrentStep(1);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Floating hearts effect
//   useEffect(() => {
//     if (currentStep >= 2) {
//       const interval = setInterval(() => {
//         setHearts(prev => [
//           ...prev.slice(-50),
//           {
//             id: Date.now(),
//             left: Math.random() * width,
//             size: Math.random() * 20 + 10,
//             duration: Math.random() * 3 + 2,
//             emoji: ['❤️', '💖', '💘', '💓', '💕'][Math.floor(Math.random() * 5)]
//           }
//         ]);
//       }, 300);

//       return () => clearInterval(interval);
//     }
//   }, [currentStep, width]);

//   const addHeartsBurst = (count) => {
//     const newHearts = Array.from({ length: count }, (_, i) => ({
//       id: Date.now() + i,
//       left: Math.random() * width,
//       size: Math.random() * 25 + 15,
//       duration: Math.random() * 3 + 2,
//       emoji: ['❤️', '💖', '💘', '💓', '💕'][Math.floor(Math.random() * 5)]
//     }));
//     setHearts(prev => [...prev, ...newHearts]);
//   };

//   const nextSong = () => {
//     setCurrentSong((prev) => (prev + 1) % songs.length);
//   };

//   const prevSong = () => {
//     setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
//   };

//   // Loading Screen with Malayalam Song
//   if (isLoading || currentStep === 0) {
//     return (
//       <div className="bg-danger text-white vh-100 d-flex flex-column justify-content-center align-items-center">
//         <ReactHowler
//           src={songs[0].url}
//           playing={true}
//           loop={false}
//           volume={0.7}
//         />
        
//         <div className="text-center">
//           <div className="heart-beat mb-4">
//             <Heart size={80} className="text-white" fill="white" />
//           </div>
//           <h2 className="mb-3">Loading Special Moments...</h2>
//           <p className="mb-4">{songs[0].malayalamTitle}</p>
//           <Spinner animation="border" variant="light" />
//           <div className="mt-4">
//             <small className="text-white-50">Preparing something special for you</small>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white text-dark min-vh-100 overflow-hidden position-relative">
//       {/* Background elements */}
//       <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
//         <div className="position-absolute top-0 start-0 w-100 h-100 bg-pattern"></div>
//       </div>

//       {/* Floating hearts and flowers */}
//       {hearts.map(heart => (
//         <div
//           key={heart.id}
//           className="position-absolute"
//           style={{
//             left: heart.left,
//             top: '100%',
//             fontSize: heart.size,
//             animation: `float-up ${heart.duration}s linear forwards`,
//             zIndex: 0,
//             color: ['#ff0000', '#ff69b4', '#ff1493', '#db3eb1'][Math.floor(Math.random() * 4)]
//           }}
//         >
//           {heart.emoji}
//         </div>
//       ))}

//       {/* Falling rose petals */}
//       {currentStep >= 2 && (
//         <div className="rose-petals">
//           {Array.from({ length: 15 }).map((_, i) => (
//             <div 
//               key={i} 
//               className="rose-petal"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${Math.random() * 10 + 10}s`
//               }}
//             >
//               🌹
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confetti */}
//       {currentStep >= 2 && <Confetti width={width} height={height} numberOfPieces={currentStep === 3 ? 300 : 100} />}

//       {/* Music player */}
//       <ReactHowler
//         src={songs[currentSong].url}
//         playing={playMusic}
//         loop={true}
//         volume={0.7}
//       />

//       {/* Music player popup */}
//       {showMusicPlayer && (
//         <div className="music-player-popup animate__animated animate__fadeInUp">
//           <div className="music-player-content bg-white rounded-4 shadow-lg p-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5 className="mb-0 text-danger">Malayalam Romantic Songs</h5>
//               <Button variant="link" onClick={() => setShowMusicPlayer(false)}>
//                 <X size={20} />
//               </Button>
//             </div>
//             <div className="text-center mb-3">
//               <Music size={40} className="text-danger mb-2" />
//               <h6>{songs[currentSong].malayalamTitle}</h6>
//               <h6 className="text-muted small">{songs[currentSong].title}</h6>
//             </div>
//             <div className="d-flex justify-content-center gap-3 align-items-center">
//               <Button variant="outline-danger" className="rounded-circle" onClick={prevSong}>
//                 ⏮
//               </Button>
//               <Button 
//                 variant={playMusic ? "danger" : "outline-danger"} 
//                 className="rounded-circle"
//                 onClick={() => setPlayMusic(!playMusic)}
//               >
//                 {playMusic ? '❚❚' : '▶'}
//               </Button>
//               <Button variant="outline-danger" className="rounded-circle" onClick={nextSong}>
//                 ⏭
//               </Button>
//             </div>
//             <div className="mt-3">
//               <small className="text-muted">നിങ്ങളുടെ പ്രണയ ഗാനങ്ങൾ</small>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Countdown modal */}
//       <Modal show={showCountdown} onHide={() => setShowCountdown(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title className="text-danger">
//             <Clock className="me-2" />
//             Time Until We Meet
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center py-4">
//           <h3 className="mb-3">⏳ {timeUntilMeet}</h3>
//           <p>I'm counting every second until I can hold you again</p>
//           <div className="heart-beat">
//             <Heart size={48} className="text-danger" fill="red" />
//           </div>
//         </Modal.Body>
//       </Modal>

//       <Container className="position-relative z-index-2 py-5">
//         {/* Header with photo frame */}
//         <header className="text-center mb-5">
//           <div className="photo-frame mx-auto mb-4">
//             <div className="heart-pulse d-inline-block">
//               <div className="photo-placeholder bg-light-red d-flex align-items-center justify-content-center">
//                 <span className="text-danger fs-1">🎂</span>
//               </div>
//             </div>
//             <div className="photo-frame-decoration"></div>
//           </div>
//           <h1 className="display-4 fw-bold text-danger mb-3">Happy Birthday, My Love</h1>
//           <div className="d-flex justify-content-center gap-3 mb-4">
//             <span className="badge bg-danger">August 4th</span>
//             <span className="badge bg-dark">Your Special Day</span>
//           </div>
//         </header>

//         {/* Step 1: Birthday Wishes */}
//         {currentStep === 1 && (
//           <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 mb-5 mx-auto animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
//             <div className="d-flex justify-content-center mb-4">
//               <Star size={24} className="text-warning me-2" fill="gold" />
//               <Star size={28} className="text-warning me-2" fill="gold" />
//               <Star size={24} className="text-warning" fill="gold" />
//             </div>
            
//             <h2 className="text-center text-danger mb-4">To The Most Amazing Boyfriend</h2>
            
//             <div className="love-message bg-light-red rounded-3 p-4 mb-4 position-relative">
//               <div className="corner-heart top-left">
//                 <Heart size={20} className="text-danger" fill="red" />
//               </div>
//               <div className="corner-heart bottom-right">
//                 <Heart size={20} className="text-danger" fill="red" />
//               </div>
              
//               <p className="lead text-center mb-4">
//                 Distance means so little when someone means so much. Even though we're apart today,
//                 I want you to feel all my love on your special day.
//               </p>
              
//               <div className="d-flex justify-content-center gap-2 mb-3">
//                 <Heart size={20} className="text-danger" fill="red" />
//                 <Heart size={24} className="text-danger" fill="red" />
//                 <Heart size={20} className="text-danger" fill="red" />
//               </div>
//             </div>
            
//             <Button 
//               variant="danger" 
//               size="lg" 
//               className="rounded-pill fw-bold px-4 py-3 d-flex align-items-center mx-auto"
//               onClick={() => {
//                 setCurrentStep(2);
//                 addHeartsBurst(20);
//               }}
//             >
//               Continue to My Special Message <ChevronRight size={20} className="ms-2" />
//             </Button>
//           </div>
//         )}

//         {/* Step 2: Love Letter */}
//         {currentStep === 2 && (
//           <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 mb-5 mx-auto animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
//             <div className="love-letter-content position-relative">
//               <div className="text-center mb-4">
//                 <Heart size={48} className="text-danger" fill="red" />
//               </div>
              
//               <h2 className="text-center text-danger mb-4">My Heart's Message</h2>
              
//               <div className="love-text bg-light-red rounded-3 p-4 mb-4 position-relative">
//                 <div className="corner-heart top-left">
//                   <Heart size={20} className="text-danger" fill="red" />
//                 </div>
//                 <div className="corner-heart bottom-right">
//                   <Heart size={20} className="text-danger" fill="red" />
//                 </div>
                
//                 <p className="fs-5">
//                   Every day with you (even from afar) feels like a blessing I don't deserve. Your smile, your voice, 
//                   your heart - they're my favorite things in this world.
//                 </p>
                
//                 <p className="fs-5">
//                   This distance between us is only temporary, but what I feel for you is forever. You've become my home, 
//                   my safe place, and my greatest adventure.
//                 </p>
                
//                 <div className="d-flex justify-content-center my-4">
//                   <div className="heart-beat">
//                     <Heart size={36} className="text-danger" fill="red" />
//                   </div>
//                 </div>
                
//                 <p className="fs-5 fw-bold text-center">
//                   There's something important I want to ask you...
//                 </p>
//               </div>
              
//               <Button 
//                 variant="danger" 
//                 size="lg" 
//                 className="rounded-pill fw-bold px-4 py-3 d-flex align-items-center mx-auto"
//                 onClick={() => {
//                   setCurrentStep(3);
//                   addHeartsBurst(50);
//                   setTimeout(() => setShowYesNo(true), 1500);
//                 }}
//               >
//                 Read My Most Important Question <ChevronRight size={20} className="ms-2" />
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Proposal */}
//         {currentStep === 3 && (
//           <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 mb-5 mx-auto animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
//             <div className="proposal-content position-relative">
//               <div className="text-center mb-4">
//                 <div className="heart-beat d-inline-block">
//                   <Heart size={60} className="text-danger" fill="red" />
//                 </div>
//               </div>
              
//               <h2 className="text-center text-danger mb-4">Will You Be Mine Forever?</h2>
              
//               <div className="proposal-text bg-light-red rounded-3 p-4 mb-4 position-relative">
//                 <div className="corner-heart top-left">
//                   <Heart size={20} className="text-danger" fill="red" />
//                 </div>
//                 <div className="corner-heart bottom-right">
//                   <Heart size={20} className="text-danger" fill="red" />
//                 </div>
                
//                 <p className="fs-5 text-center">
//                   On your birthday, as we celebrate you, I want to ask for the greatest gift - 
//                   the chance to love you for all my days.
//                 </p>
                
//                 <div className="d-flex justify-content-center my-4">
//                   <div className="position-relative">
//                     <Heart size={80} className="text-danger" fill="red" />
//                     <span className="position-absolute top-50 start-50 translate-middle text-white fw-bold fs-4">
//                       ?
//                     </span>
//                   </div>
//                 </div>
                
//                 <p className="fs-4 fw-bold text-center text-danger">
//                   My love, will you be my partner for all of life's adventures?
//                 </p>
//               </div>
              
//               {showYesNo && (
//                 <div className="animate__animated animate__fadeInUp animate__delay-1s">
//                   <div className="d-flex justify-content-center gap-3 flex-wrap">
//                     <Button 
//                       variant="success" 
//                       size="lg" 
//                       className="rounded-pill fw-bold px-4 py-3"
//                       onClick={() => {
//                         addHeartsBurst(100);
//                         setShowMusicPlayer(true);
//                       }}
//                     >
//                       <Check size={20} className="me-2" /> YES! Forever and Always 💍
//                     </Button>
//                     <Button 
//                       variant="outline-danger" 
//                       size="lg" 
//                       className="rounded-pill fw-bold px-4 py-3"
//                     >
//                       Send Me a Kiss First 💋
//                     </Button>
//                   </div>
//                   <div className="text-center mt-3">
//                     <small className="text-muted">(Pick the first one, I'm waiting!)</small>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Memory Carousel */}
//         {currentStep >= 2 && (
//           <div className="mt-5 mx-auto" style={{ maxWidth: '800px' }}>
//             <h4 className="text-center text-danger mb-3">Our Beautiful Memories</h4>
//             <div className="bg-light-red rounded-4 p-3">
//               <Carousel indicators={false} variant="dark">
//                 <Carousel.Item>
//                   <div className="memory-slide d-flex align-items-center justify-content-center p-4">
//                     <div className="text-center">
//                       <div className="memory-emoji fs-1 mb-3">💑</div>
//                       <p>The day we first met</p>
//                       <small className="text-muted">ഞങ്ങൾ ആദ്യം കണ്ടുമുട്ടിയ ദിവസം</small>
//                     </div>
//                   </div>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                   <div className="memory-slide d-flex align-items-center justify-content-center p-4">
//                     <div className="text-center">
//                       <div className="memory-emoji fs-1 mb-3">📱</div>
//                       <p>Our first late-night call</p>
//                       <small className="text-muted">ഞങ്ങളുടെ ആദ്യത്തെ രാത്രി സംസാരം</small>
//                     </div>
//                   </div>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                   <div className="memory-slide d-flex align-items-center justify-content-center p-4">
//                     <div className="text-center">
//                       <div className="memory-emoji fs-1 mb-3">❤️</div>
//                       <p>When we said "I love you"</p>
//                       <small className="text-muted">ഞങ്ങൾ "ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു" പറഞ്ഞപ്പോൾ</small>
//                     </div>
//                   </div>
//                 </Carousel.Item>
//               </Carousel>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="d-flex justify-content-center gap-3 flex-wrap mt-5">
//           <Button 
//             variant={playMusic ? "danger" : "outline-danger"} 
//             className="rounded-pill"
//             onClick={() => setShowMusicPlayer(true)}
//           >
//             <Music size={18} className="me-2" />
//             {playMusic ? 'Change Song' : 'Play Music'}
//           </Button>
//           <Button 
//             variant="outline-dark" 
//             className="rounded-pill"
//             onClick={() => setShowCountdown(true)}
//           >
//             <Clock size={18} className="me-2" />
//             Next Meeting Countdown
//           </Button>
//         </div>

//         {/* Footer */}
//         <footer className="text-center mt-5 pt-3">
//           <p className="text-muted small">
//             Made with <Heart size={14} className="text-danger" fill="red" /> for you • 
//             <span className="ms-1">എന്റെ പ്രണയം</span>
//           </p>
//         </footer>
//       </Container>

//       {/* CSS Styles */}
//       <style>{`
//         @keyframes float-up {
//           0% { transform: translateY(0); opacity: 1; }
//           100% { transform: translateY(-100vh); opacity: 0; }
//         }
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.1); }
//           100% { transform: scale(1); }
//         }
//         @keyframes heartbeat {
//           0% { transform: scale(1); }
//           25% { transform: scale(1.1); }
//           50% { transform: scale(1); }
//           75% { transform: scale(1.1); }
//           100% { transform: scale(1); }
//         }
//         @keyframes float {
//           0% { transform: translateY(0) rotate(0deg); }
//           100% { transform: translateY(-100vh) rotate(360deg); }
//         }
//         .heart-pulse {
//           animation: pulse 2s infinite;
//         }
//         .heart-beat {
//           animation: heartbeat 1.5s infinite;
//         }
//         .bg-pattern {
//           background-image: radial-gradient(#ff000020 1px, transparent 1px);
//           background-size: 20px 20px;
//           opacity: 0.6;
//         }
//         .bg-light-red {
//           background-color: #fff5f5;
//         }
//         .z-index-2 {
//           z-index: 2;
//         }
//         .love-message {
//           border-left: 4px solid #dc3545;
//         }
//         .proposal-text {
//           border: 2px dashed #dc3545;
//         }
//         .photo-frame {
//           position: relative;
//           width: 150px;
//           height: 150px;
//         }
//         .photo-placeholder {
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           border: 3px solid #dc3545;
//           overflow: hidden;
//         }
//         .photo-frame-decoration {
//           position: absolute;
//           top: -10px;
//           left: -10px;
//           right: -10px;
//           bottom: -10px;
//           border: 2px dashed #dc3545;
//           border-radius: 50%;
//           z-index: -1;
//         }
//         .corner-heart {
//           position: absolute;
//           opacity: 0.7;
//         }
//         .top-left {
//           top: 10px;
//           left: 10px;
//         }
//         .bottom-right {
//           bottom: 10px;
//           right: 10px;
//         }
//         .rose-petals {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           pointer-events: none;
//           z-index: 1;
//         }
//         .rose-petal {
//           position: absolute;
//           animation: float linear infinite;
//           opacity: 0.7;
//           font-size: 20px;
//         }
//         .music-player-popup {
//           position: fixed;
//           bottom: 80px;
//           right: 20px;
//           z-index: 1000;
//           animation: fadeInUp 0.5s;
//         }
//         .music-player-content {
//           width: 250px;
//         }
//         .memory-slide {
//           height: 200px;
//         }
//         .memory-emoji {
//           font-size: 3rem;
//         }
//         @media (max-width: 768px) {
//           .display-4 {
//             font-size: 2.5rem;
//           }
//           .proposal-content .btn {
//             width: 100%;
//             margin-bottom: 10px;
//           }
//           .music-player-popup {
//             bottom: 60px;
//             right: 10px;
//             left: 10px;
//             margin: auto;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BirthdayLoveProposal;






import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Carousel, Spinner, Modal } from 'react-bootstrap';
import { Heart, Star, Gift, MessageCircle, Volume2, MapPin, Send, ChevronRight, Music, X, Check, Clock } from 'lucide-react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const BirthdayLoveProposal = () => {
  const { width, height } = useWindowSize();
  const [currentStep, setCurrentStep] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showYesNo, setShowYesNo] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [playMusic, setPlayMusic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeUntilMeet, setTimeUntilMeet] = useState('');
  const [showHeartBalloon, setShowHeartBalloon] = useState(false);
  const [showKiss, setShowKiss] = useState(false);
  const audioRef = useRef(null);

  // Malayalam Romantic Songs (replace with your actual song files)
  const songs = [
    {
      title: "Aaromale - Alphonse",
      url: "/songs/aromale.mp3", // Place in public/songs folder
      malayalamTitle: "ആറോമലേ - അൽഫോൻസ്"
    },
    {
      title: "Mazhaneerthullikal - Kumbalangi Nights",
      url: "/songs/mazhaneer.mp3",
      malayalamTitle: "മഴനീര്ത്തുള്ളികൾ - കുമ്പളങ്ങി നൈറ്റ്സ്"
    }
  ];

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(songs[currentSong].url);
    audioRef.current.preload = "auto";
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setCurrentStep(1);
    };
    
    const handleError = () => {
      console.log("Music will play when you click the play button");
      setIsLoading(false);
      setCurrentStep(1);
    };
    
    audioRef.current.addEventListener('canplaythrough', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current = null;
      }
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (playMusic) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Please click the play button to start music");
          setPlayMusic(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [playMusic]);

  // Handle song change
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current = new Audio(songs[currentSong].url);
    audioRef.current.preload = "auto";
    
    if (playMusic) {
      audioRef.current.play().catch(e => {
        console.log("Click play to start the new song");
      });
    }
  }, [currentSong]);

  // Countdown to next meeting
  useEffect(() => {
    const meetDate = new Date(2024, 7, 15); // August 15, 2024
    const updateCountdown = () => {
      const now = new Date();
      const diff = meetDate - now;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilMeet(`${days} days, ${hours} hours, ${minutes} minutes`);
    };
    
    const timer = setInterval(updateCountdown, 60000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Floating hearts effect
  useEffect(() => {
    if (currentStep >= 2) {
      const interval = setInterval(() => {
        setHearts(prev => [
          ...prev.slice(-50),
          {
            id: Date.now(),
            left: Math.random() * width,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 3 + 2,
            emoji: ['❤️', '💖', '💘', '💓', '💕'][Math.floor(Math.random() * 5)]
          }
        ]);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [currentStep, width]);

  const addHeartsBurst = (count) => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * width,
      size: Math.random() * 25 + 15,
      duration: Math.random() * 3 + 2,
      emoji: ['❤️', '💖', '💘', '💓', '💕'][Math.floor(Math.random() * 5)]
    }));
    setHearts(prev => [...prev, ...newHearts]);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const handleYesClick = () => {
    addHeartsBurst(100);
    setShowHeartBalloon(true);
    setTimeout(() => setShowHeartBalloon(false), 3000);
  };

  const handleKissClick = () => {
    setShowKiss(true);
    setTimeout(() => setShowKiss(false), 2000);
  };

  // Loading Screen
  if (isLoading || currentStep === 0) {
    return (
      <div className="bg-danger text-white vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="text-center">
          <div className="heart-beat mb-4">
            <Heart size={80} className="text-white" fill="white" />
          </div>
          <h2 className="mb-3">Loading Special Moments...</h2>
          <p className="mb-4">{songs[0].malayalamTitle}</p>
          <Spinner animation="border" variant="light" />
          <div className="mt-4">
            <small className="text-white-50">Preparing something special for you</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-dark min-vh-100 overflow-hidden position-relative">
      {/* Background elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-pattern"></div>
      </div>

      {/* Audio element (hidden) */}
      <audio ref={audioRef} loop />

      {/* Floating hearts and flowers */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="position-absolute"
          style={{
            left: heart.left,
            top: '100%',
            fontSize: heart.size,
            animation: `float-up ${heart.duration}s linear forwards`,
            zIndex: 0,
            color: ['#ff0000', '#ff69b4', '#ff1493', '#db3eb1'][Math.floor(Math.random() * 4)]
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Falling rose petals */}
      {currentStep >= 2 && (
        <div className="rose-petals">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="rose-petal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            >
              🌹
            </div>
          ))}
        </div>
      )}

      {/* Confetti */}
      {currentStep >= 2 && <Confetti width={width} height={height} numberOfPieces={currentStep === 3 ? 300 : 100} />}

      {/* Heart Balloon */}
      {showHeartBalloon && (
        <div className="heart-balloon animate__animated animate__bounceIn">
          ❤️
        </div>
      )}

      {/* Kiss Emoji */}
      {showKiss && (
        <div className="kiss-emoji animate__animated animate__bounceIn">
          😘
        </div>
      )}

      {/* Countdown modal */}
      <Modal show={showCountdown} onHide={() => setShowCountdown(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            <Clock className="me-2" />
            Time Until We Meet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <h3 className="mb-3">⏳ {timeUntilMeet}</h3>
          <p>I'm counting every second until I can hold you again</p>
          <div className="heart-beat">
            <Heart size={48} className="text-danger" fill="red" />
          </div>
        </Modal.Body>
      </Modal>

      <Container className="position-relative z-index-2 py-5">
        {/* Header with photo frame */}
        <header className="text-center mb-5">
          <div className="photo-frame mx-auto mb-4">
            <div className="heart-pulse d-inline-block">
              <div className="photo-placeholder bg-light-red d-flex align-items-center justify-content-center">
                <span className="text-danger fs-1">🎂</span>
              </div>
            </div>
            <div className="photo-frame-decoration"></div>
          </div>
          <h1 className="display-4 fw-bold text-danger mb-3">Happy Birthday, My Love</h1>
          <div className="d-flex justify-content-center gap-3 mb-4">
            <span className="badge bg-danger">August 4th</span>
            <span className="badge bg-dark">Your Special Day</span>
          </div>
        </header>

        {/* Step 1: Birthday Wishes */}
        {currentStep === 1 && (
          <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 mb-5 mx-auto animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
            <div className="d-flex justify-content-center mb-4">
              <Star size={24} className="text-warning me-2" fill="gold" />
              <Star size={28} className="text-warning me-2" fill="gold" />
              <Star size={24} className="text-warning" fill="gold" />
            </div>
            
            <h2 className="text-center text-danger mb-4">To The Most Amazing Boyfriend</h2>
            
            <div className="love-message bg-light-red rounded-3 p-4 mb-4 position-relative">
              <div className="corner-heart top-left">
                <Heart size={20} className="text-danger" fill="red" />
              </div>
              <div className="corner-heart bottom-right">
                <Heart size={20} className="text-danger" fill="red" />
              </div>
              
              <p className="lead text-center mb-4">
                Distance means so little when someone means so much. Even though we're apart today,
                I want you to feel all my love on your special day.
              </p>
              
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Heart size={20} className="text-danger" fill="red" />
                <Heart size={24} className="text-danger" fill="red" />
                <Heart size={20} className="text-danger" fill="red" />
              </div>
            </div>
            
            <Button 
              variant="danger" 
              size="lg" 
              className="rounded-pill fw-bold px-4 py-3 d-flex align-items-center mx-auto"
              onClick={() => {
                setCurrentStep(2);
                addHeartsBurst(20);
              }}
            >
              Continue to My Special Message <ChevronRight size={20} className="ms-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Love Letter */}
        {currentStep === 2 && (
          <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 mb-5 mx-auto animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
            <div className="love-letter-content position-relative">
              <div className="text-center mb-4">
                <Heart size={48} className="text-danger" fill="red" />
              </div>
              
              <h2 className="text-center text-danger mb-4">My Heart's Message</h2>
              
              <div className="love-text bg-light-red rounded-3 p-4 mb-4 position-relative">
                <div className="corner-heart top-left">
                  <Heart size={20} className="text-danger" fill="red" />
                </div>
                <div className="corner-heart bottom-right">
                  <Heart size={20} className="text-danger" fill="red" />
                </div>
                
                <p className="fs-5">
                  Every day with you (even from afar) feels like a blessing I don't deserve. Your smile, your voice, 
                  your heart - they're my favorite things in this world.
                </p>
                
                <p className="fs-5">
                  This distance between us is only temporary, but what I feel for you is forever. You've become my home, 
                  my safe place, and my greatest adventure.
                </p>
                
                <div className="d-flex justify-content-center my-4">
                  <div className="heart-beat">
                    <Heart size={36} className="text-danger" fill="red" />
                  </div>
                </div>
                
                <p className="fs-5 fw-bold text-center">
                  There's something important I want to ask you...
                </p>
              </div>
              
              <Button 
                variant="danger" 
                size="lg" 
                className="rounded-pill fw-bold px-4 py-3 d-flex align-items-center mx-auto"
                onClick={() => {
                  setCurrentStep(3);
                  addHeartsBurst(50);
                  setTimeout(() => setShowYesNo(true), 1500);
                }}
              >
                Read My Most Important Question <ChevronRight size={20} className="ms-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Proposal */}
        {currentStep === 3 && (
          <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 mb-5 mx-auto animate__animated animate__fadeIn" style={{ maxWidth: '800px' }}>
            <div className="proposal-content position-relative">
              <div className="text-center mb-4">
                <div className="heart-beat d-inline-block">
                  <Heart size={60} className="text-danger" fill="red" />
                </div>
              </div>
              
              <h2 className="text-center text-danger mb-4">Will You Be Mine Forever?</h2>
              
              <div className="proposal-text bg-light-red rounded-3 p-4 mb-4 position-relative">
                <div className="corner-heart top-left">
                  <Heart size={20} className="text-danger" fill="red" />
                </div>
                <div className="corner-heart bottom-right">
                  <Heart size={20} className="text-danger" fill="red" />
                </div>
                
                <p className="fs-5 text-center">
                  On your birthday, as we celebrate you, I want to ask for the greatest gift - 
                  the chance to love you for all my days.
                </p>
                
                <div className="d-flex justify-content-center my-4">
                  <div className="position-relative">
                    <Heart size={80} className="text-danger" fill="red" />
                    <span className="position-absolute top-50 start-50 translate-middle text-white fw-bold fs-4">
                      ?
                    </span>
                  </div>
                </div>
                
                <p className="fs-4 fw-bold text-center text-danger">
                  My love, will you be my partner for all of life's adventures?
                </p>
              </div>
              
              {showYesNo && (
                <div className="animate__animated animate__fadeInUp animate__delay-1s">
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button 
                      variant="success" 
                      size="lg" 
                      className="rounded-pill fw-bold px-4 py-3"
                      onClick={handleYesClick}
                    >
                      <Check size={20} className="me-2" /> YES! Forever and Always 💍
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="lg" 
                      className="rounded-pill fw-bold px-4 py-3"
                      onClick={handleKissClick}
                    >
                      Send Me a Kiss First 💋
                    </Button>
                  </div>
                  <div className="text-center mt-3">
                    <small className="text-muted">(Pick the first one, I'm waiting!)</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Memory Carousel */}
        {currentStep >= 2 && (
          <div className="mt-5 mx-auto" style={{ maxWidth: '800px' }}>
            <h4 className="text-center text-danger mb-3">Our Beautiful Memories</h4>
            <div className="bg-light-red rounded-4 p-3">
              <Carousel indicators={false} variant="dark">
                <Carousel.Item>
                  <div className="memory-slide d-flex align-items-center justify-content-center p-4">
                    <div className="text-center">
                      <div className="memory-emoji fs-1 mb-3">💑</div>
                      <p>The day we first met</p>
                      <small className="text-muted">ഞങ്ങൾ ആദ്യം കണ്ടുമുട്ടിയ ദിവസം</small>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="memory-slide d-flex align-items-center justify-content-center p-4">
                    <div className="text-center">
                      <div className="memory-emoji fs-1 mb-3">📱</div>
                      <p>Our first late-night call</p>
                      <small className="text-muted">ഞങ്ങളുടെ ആദ്യത്തെ രാത്രി സംസാരം</small>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="memory-slide d-flex align-items-center justify-content-center p-4">
                    <div className="text-center">
                      <div className="memory-emoji fs-1 mb-3">❤️</div>
                      <p>When we said "I love you"</p>
                      <small className="text-muted">ഞങ്ങൾ "ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു" പറഞ്ഞപ്പോൾ</small>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-5">
          <Button 
            variant={playMusic ? "danger" : "outline-danger"} 
            className="rounded-pill"
            onClick={() => setShowMusicPlayer(true)}
          >
            <Music size={18} className="me-2" />
            {playMusic ? 'Change Song' : 'Play Music'}
          </Button>
          <Button 
            variant="outline-dark" 
            className="rounded-pill"
            onClick={() => setShowCountdown(true)}
          >
            <Clock size={18} className="me-2" />
            Next Meeting Countdown
          </Button>
        </div>

        {/* Music player popup */}
        {showMusicPlayer && (
          <div className="music-player-popup animate__animated animate__fadeInUp">
            <div className="music-player-content bg-white rounded-4 shadow-lg p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 text-danger">Malayalam Romantic Songs</h5>
                <Button variant="link" onClick={() => setShowMusicPlayer(false)}>
                  <X size={20} />
                </Button>
              </div>
              <div className="text-center mb-3">
                <Music size={40} className="text-danger mb-2" />
                <h6>{songs[currentSong].malayalamTitle}</h6>
                <h6 className="text-muted small">{songs[currentSong].title}</h6>
              </div>
              <div className="d-flex justify-content-center gap-3 align-items-center">
                <Button 
                  variant={playMusic ? "danger" : "outline-danger"} 
                  className="rounded-circle"
                  onClick={() => setPlayMusic(!playMusic)}
                >
                  {playMusic ? '❚❚' : '▶'}
                </Button>
                <Button 
                  variant="outline-danger" 
                  className="rounded-circle"
                  onClick={() => {
                    nextSong();
                    setPlayMusic(true);
                  }}
                >
                  ⏭
                </Button>
              </div>
              <div className="mt-3">
                <small className="text-muted">നിങ്ങളുടെ പ്രണയ ഗാനങ്ങൾ</small>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-5 pt-3">
          <p className="text-muted small">
            Made with <Heart size={14} className="text-danger" fill="red" /> for you • 
            <span className="ms-1">എന്റെ പ്രണയം</span>
          </p>
        </footer>
      </Container>

      {/* CSS Styles */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
        .heart-pulse {
          animation: pulse 2s infinite;
        }
        .heart-beat {
          animation: heartbeat 1.5s infinite;
        }
        .bg-pattern {
          background-image: radial-gradient(#ff000020 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.6;
        }
        .bg-light-red {
          background-color: #fff5f5;
        }
        .z-index-2 {
          z-index: 2;
        }
        .love-message {
          border-left: 4px solid #dc3545;
        }
        .proposal-text {
          border: 2px dashed #dc3545;
        }
        .photo-frame {
          position: relative;
          width: 150px;
          height: 150px;
        }
        .photo-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid #dc3545;
          overflow: hidden;
        }
        .photo-frame-decoration {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px dashed #dc3545;
          border-radius: 50%;
          z-index: -1;
        }
        .corner-heart {
          position: absolute;
          opacity: 0.7;
        }
        .top-left {
          top: 10px;
          left: 10px;
        }
        .bottom-right {
          bottom: 10px;
          right: 10px;
        }
        .rose-petals {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        .rose-petal {
          position: absolute;
          animation: float linear infinite;
          opacity: 0.7;
          font-size: 20px;
        }
        .music-player-popup {
          position: fixed;
          bottom: 80px;
          right: 20px;
          z-index: 1000;
          animation: fadeInUp 0.5s;
        }
        .music-player-content {
          width: 250px;
        }
        .memory-slide {
          height: 200px;
        }
        .memory-emoji {
          font-size: 3rem;
        }
        .heart-balloon {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 150px;
          z-index: 1001;
          animation: balloon-float 3s ease-in-out forwards;
        }
        .kiss-emoji {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 120px;
          z-index: 1001;
          animation: kiss-pulse 1s ease-in-out infinite;
        }
        @keyframes balloon-float {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          50% { transform: translate(-50%, -150%) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -250%) scale(0.8); opacity: 0; }
        }
        @keyframes kiss-pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          .proposal-content .btn {
            width: 100%;
            margin-bottom: 10px;
          }
          .music-player-popup {
            bottom: 60px;
            right: 10px;
            left: 10px;
            margin: auto;
          }
          .heart-balloon {
            font-size: 100px;
          }
          .kiss-emoji {
            font-size: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default BirthdayLoveProposal;