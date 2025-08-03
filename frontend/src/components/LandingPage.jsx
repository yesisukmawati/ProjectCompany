import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1d4e6a] to-[#3a7c99] text-white overflow-hidden">
      {/* Stars background */}
      {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute bg-white rounded-full" style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
          }} />
      ))}

      {/* Content */}
      <div className="absolute top-8 left-8 text-sm font-light z-10">
        PT. MERPATI WAHANA RAYA
      </div>

      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-down">
          Welcome To MWR!
        </h1>
        <button
          onClick={() => navigate('/login')}
          className="px-12 py-4 border border-white rounded-full text-lg font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
        >
          Tap To Start
        </button>
      </div>
    </div>
  );
};

export default LandingPage;