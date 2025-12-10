import React, { useState, useEffect } from 'react';
import { Zap, Radio, Tv, Gamepad2, Target, Brain, ChevronRight } from 'lucide-react';

const MathDimension = () => {
  const [flicker, setFlicker] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [activePortal, setActivePortal] = useState(null);
  const [scanLine, setScanLine] = useState(0);

  // Flickering effect
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker(prev => !prev);
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(flickerInterval);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  // CRT scan line
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(scanInterval);
  }, []);

  const dimensions = [
    {
      id: 1,
      name: "DIMENSION K-2",
      title: "NUMBER ZONE",
      desc: "Where counting becomes power",
      color: "from-pink-500 to-red-500",
      glow: "shadow-pink-500/50",
      icon: "🔢",
      stats: "LEVEL: BASIC | POWER: HIGH"
    },
    {
      id: 2,
      name: "DIMENSION 3-5",
      title: "FRACTION REALM",
      desc: "Divide and conquer",
      color: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/50",
      icon: "🧩",
      stats: "LEVEL: MEDIUM | POWER: INTENSE"
    },
    {
      id: 3,
      name: "DIMENSION 6-8",
      title: "ALGEBRA VOID",
      desc: "Solve the unknown",
      color: "from-green-500 to-emerald-500",
      glow: "shadow-green-500/50",
      icon: "⚡",
      stats: "LEVEL: ADVANCED | POWER: MAXIMUM"
    }
  ];

  const features = [
    { icon: <Zap className="w-8 h-8" />, title: "NO PRESSURE ZONE", desc: "Self-paced exploration. No timers. No anxiety.", color: "text-pink-500" },
    { icon: <Brain className="w-8 h-8" />, title: "ADAPTIVE INTELLIGENCE", desc: "Each game reads your child's mind and adapts", color: "text-cyan-500" },
    { icon: <Target className="w-8 h-8" />, title: "MISSION-BASED", desc: "Every problem is a quest to complete", color: "text-green-500" },
    { icon: <Gamepad2 className="w-8 h-8" />, title: "PURE GAMEPLAY", desc: "Learning disguised as arcade fun", color: "text-purple-500" }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
          25%, 75% { opacity: 0.95; }
        }
        
        @keyframes chromatic {
          0% { 
            text-shadow: -2px 0 0 #ff00de, 2px 0 0 #00fff2;
          }
          50% { 
            text-shadow: -4px 0 0 #ff00de, 4px 0 0 #00fff2;
          }
          100% { 
            text-shadow: -2px 0 0 #ff00de, 2px 0 0 #00fff2;
          }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
          }
          50% { 
            box-shadow: 0 0 30px currentColor, 0 0 60px currentColor;
          }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes neon-flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { opacity: 0.8; text-shadow: 0 0 5px currentColor; }
        }

        .retro-font {
          font-family: 'Press Start 2P', cursive;
          letter-spacing: 2px;
        }
        
        .chromatic-text {
          animation: chromatic 2s ease-in-out infinite;
        }
        
        .flicker-text {
          animation: flicker 4s ease-in-out infinite;
        }
        
        .neon-flicker {
          animation: neon-flicker 3s ease-in-out infinite;
        }
        
        .glitch-effect {
          animation: glitch 0.3s ease-in-out;
        }

        .crt-effect {
          position: relative;
        }
        
        .crt-effect::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        
        .scan-line {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: scan 8s linear infinite;
          pointer-events: none;
          z-index: 9999;
        }

        .vhs-effect {
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.05) 2px,
              rgba(0, 0, 0, 0.05) 4px
            );
        }
      `}</style>

      {/* CRT Scan Line */}
      <div className="scan-line" />

      {/* VHS Static Overlay */}
      <div className="fixed inset-0 vhs-effect pointer-events-none z-40 opacity-30" />

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(#ff00de 1px, transparent 1px),
          linear-gradient(90deg, #00fff2 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Neon Glow Orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Navigation */}
      <nav className="relative z-50 border-b-2 border-cyan-500/30 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 blur-xl opacity-50" />
              <Tv className="relative w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <div className="retro-font text-xl text-pink-500 neon-flicker">PLAYPOWER</div>
              <div className="text-xs text-cyan-400 font-mono tracking-wider">EST. 1985</div>
            </div>
          </div>
          <button className="relative px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 border-2 border-pink-400 retro-font text-xs text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all">
            ENTER
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
        
        {/* Warning Sign */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-3 px-6 py-3 border-2 border-yellow-500 bg-black/80 ${flicker ? 'flicker-text' : ''}`}>
            <Radio className="w-5 h-5 text-yellow-500" />
            <span className="retro-font text-yellow-500 text-xs">WARNING: MATH DIMENSION DETECTED</span>
          </div>
        </div>

        {/* Main Title */}
        <div className={`text-center mb-12 crt-effect ${glitchActive ? 'glitch-effect' : ''}`}>
          <h1 className="retro-font text-6xl md:text-8xl mb-6 leading-tight">
            <div className="chromatic-text text-pink-500 mb-2">THE MATH</div>
            <div className="chromatic-text text-cyan-400">DIMENSION</div>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
            <span className="retro-font text-purple-500 text-sm neon-flicker">1985</span>
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>

          <p className="text-xl md:text-2xl text-cyan-400 font-mono max-w-3xl mx-auto leading-relaxed mb-4">
            A mysterious parallel universe where mathematics isn't taught—
            <span className="text-pink-500"> it's discovered</span>.
          </p>
          
          <p className="text-lg text-purple-400 font-mono max-w-2xl mx-auto">
            Your child is the chosen one. The equations are waiting.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 border-2 border-pink-500 retro-font text-sm text-white hover:shadow-2xl hover:shadow-pink-500/50 transition-all overflow-hidden">
            <span className="relative z-10">OPEN PORTAL</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="relative px-8 py-4 bg-black border-2 border-cyan-500 retro-font text-sm text-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            WATCH TRANSMISSION
          </button>
        </div>

        {/* Terminal Window */}
        <div className="max-w-2xl mx-auto mb-20 border-2 border-green-500 bg-black/90 p-1 shadow-lg shadow-green-500/30">
          <div className="bg-green-500/10 border-b border-green-500 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="font-mono text-green-500 text-sm ml-2">SYSTEM_TERMINAL.EXE</span>
          </div>
          <div className="p-6 font-mono text-green-500 text-sm leading-relaxed">
            <div className="mb-2">{'> INITIALIZING MATH PROTOCOLS...'}</div>
            <div className="mb-2">{'> LOADING DIMENSION DATA... [OK]'}</div>
            <div className="mb-2">{'> STUDENT PROFILE: CURIOUS_LEARNER_001'}</div>
            <div className="mb-4">{'> STATUS: READY FOR ADVENTURE'}</div>
            <div className="text-cyan-400">{'> NO TESTS. NO GRADES. PURE EXPLORATION.'}</div>
          </div>
        </div>
      </div>

      {/* Dimensional Portals */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="retro-font text-4xl md:text-5xl chromatic-text text-pink-500 mb-4">
            CHOOSE YOUR DIMENSION
          </h2>
          <p className="text-cyan-400 font-mono text-lg">
            Each portal leads to a different mathematical realm
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dimensions.map((dim, index) => (
            <div
              key={dim.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActivePortal(dim.id)}
              onMouseLeave={() => setActivePortal(null)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${dim.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
              
              {/* Portal Card */}
              <div className="relative border-4 border-pink-500 bg-black/95 p-8 hover:border-cyan-500 transition-all">
                
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-cyan-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-cyan-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-cyan-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-cyan-500" />

                {/* Content */}
                <div className="text-center mb-6">
                  <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                    {dim.icon}
                  </div>
                  <div className="retro-font text-xs text-cyan-400 mb-2">
                    {dim.name}
                  </div>
                  <h3 className="retro-font text-2xl text-pink-500 mb-3 neon-flicker">
                    {dim.title}
                  </h3>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4" />
                  <p className="text-cyan-400 font-mono text-sm mb-4">
                    {dim.desc}
                  </p>
                  <div className="font-mono text-xs text-green-500 border border-green-500 bg-green-500/10 px-3 py-2 inline-block">
                    {dim.stats}
                  </div>
                </div>

                {/* Enter Button */}
                <button className={`w-full py-3 bg-gradient-to-r ${dim.color} border-2 border-white/50 retro-font text-xs text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 hover:${dim.glow} hover:shadow-2xl`}>
                  ENTER DIMENSION
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Scan Lines */}
              {activePortal === dim.id && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="border-4 border-purple-500 bg-black/90 p-12">
          
          {/* Scanline effect on container */}
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)'
            }}
          />

          <div className="text-center mb-12">
            <h2 className="retro-font text-4xl chromatic-text text-cyan-400 mb-4">
              SYSTEM FEATURES
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="border-2 border-cyan-500/30 bg-black/50 p-6 hover:border-pink-500 hover:bg-pink-500/5 transition-all group">
                <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="retro-font text-sm text-pink-500 mb-3">
                  {feature.title}
                </h3>
                <p className="text-cyan-400 font-mono text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial - Retro Style */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 py-20">
        <div className="border-4 border-green-500 bg-black/90 p-8 relative">
          <div className="absolute top-4 right-4 retro-font text-green-500 text-xs">
            [TRANSMISSION_RECEIVED]
          </div>
          
          <div className="text-center">
            <div className="text-6xl mb-6">📻</div>
            <blockquote className="font-mono text-green-500 text-lg mb-6 leading-relaxed">
              "My kid thinks they're playing arcade games.
              <br />
              <span className="text-cyan-400">I know they're mastering fractions.</span>
              <br />
              Nobody tell them."
            </blockquote>
            <div className="retro-font text-pink-500 text-xs">
              - PARENT_USER_2847
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="border-4 border-pink-500 bg-gradient-to-br from-purple-900/50 to-black/90 p-12 relative overflow-hidden">
          
          {/* Animated border corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-500 animate-pulse" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-500 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-500 animate-pulse" style={{ animationDelay: '1.5s' }} />

          <div className="text-7xl mb-8 neon-flicker">⚡🎮⚡</div>
          
          <h2 className="retro-font text-4xl md:text-5xl chromatic-text text-pink-500 mb-6">
            THE PORTAL
            <br />
            AWAITS
          </h2>
          
          <p className="text-cyan-400 font-mono text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Your child's mathematical adventure begins now.
            <br />
            <span className="text-purple-400">No credit card. No commitment. Just curiosity.</span>
          </p>

          <button className="relative group px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 border-4 border-pink-500 retro-font text-lg text-white hover:shadow-2xl hover:shadow-pink-500/70 transition-all overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              ACTIVATE PORTAL
              <Zap className="w-6 h-6 group-hover:animate-spin" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity" />
          </button>

          <div className="mt-8 font-mono text-green-500 text-sm">
            {'> COORDINATES: FREE_TRIAL'}<br />
            {'> DANGER_LEVEL: ZERO'}<br />
            {'> FUN_LEVEL: MAXIMUM'}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 border-t-2 border-cyan-500/30 bg-black/90">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="retro-font text-pink-500 text-xs mb-2">PLAYPOWER GAMES</div>
            <div className="font-mono text-cyan-400 text-xs">
              © 1985-2024 | DIMENSIONAL MATH LABORATORIES | ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MathDimension;