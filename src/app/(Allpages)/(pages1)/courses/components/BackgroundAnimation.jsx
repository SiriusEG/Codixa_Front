// src/app/(Allpages)/(pages1)/courses/components/BackgroundAnimation.jsx
const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 bg-primary/10 z-[-2]">
      <div className="absolute top-20 left-10 w-8 h-8 border-2 border-primary/50 rounded-lg animate-spin-slow"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-primary/50 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-1/4 w-10 h-10 border-2 border-purple-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary/50 rounded-lg animate-bounce-slow"></div>
      {/* Additional floating shapes */}
      <div className="absolute bottom-32 right-1/4 w-6 h-6 bg-purple-400/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-1/4 left-1/3 w-12 h-12 border-2 border-primary/50 rounded-lg rotate-45 animate-spin-reverse-slow"></div>
      <div className="absolute top-2/3 right-1/5 w-8 h-8 bg-primary/50 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-20 w-4 h-4 bg-purple-400/40 rounded-lg animate-bounce-slow delay-500"></div>

      {/* Wrap the SVG in a div to position it at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(0, -20px);
          }
          75% {
            transform: translate(-10px, -10px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation;
