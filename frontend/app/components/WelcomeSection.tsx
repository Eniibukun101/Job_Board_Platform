export default function WelcomeSection() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-white flex-col items-center justify-center px-12 relative">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">J</span>
          </div>
          <span className="text-xl font-bold text-primary">Jobnest</span>
        </div>
      </div>

      {/* Welcome content */}
      <div className="text-center max-w-md">
        {/* Cat illustration - using emoji as placeholder */}
        <div className="mb-8 text-6xl">
          <div className="inline-block">
            <svg
              viewBox="0 0 300 300"
              className="w-48 h-48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left cat */}
              <g>
                {/* Head */}
                <circle cx="80" cy="120" r="35" fill="#2D2639" />
                {/* Ears */}
                <polygon points="60,80 70,60 75,85" fill="#2D2639" />
                <polygon points="100,80 90,60 85,85" fill="#2D2639" />
                {/* Eyes */}
                <circle cx="70" cy="110" r="4" fill="white" />
                <circle cx="90" cy="110" r="4" fill="white" />
                {/* Mouth */}
                <path d="M 80 125 Q 75 135 80 140" stroke="white" strokeWidth="2" fill="none" />
                {/* Tongue */}
                <circle cx="80" cy="145" r="3" fill="#FF6B6B" />
                {/* Body */}
                <ellipse cx="80" cy="175" rx="30" ry="40" fill="#2D2639" />
                {/* Tail */}
                <path d="M 50 175 Q 30 170 25 150" stroke="#2D2639" strokeWidth="8" fill="none" strokeLinecap="round" />
                {/* Arms */}
                <rect x="55" y="160" width="8" height="35" fill="#2D2639" rx="4" />
                <rect x="105" y="160" width="8" height="35" fill="#2D2639" rx="4" />
              </g>

              {/* Right cat */}
              <g>
                {/* Head */}
                <circle cx="220" cy="120" r="35" fill="#2D2639" />
                {/* Ears */}
                <polygon points="200,80 210,60 215,85" fill="#2D2639" />
                <polygon points="240,80 230,60 225,85" fill="#2D2639" />
                {/* Eyes */}
                <circle cx="210" cy="110" r="4" fill="white" />
                <circle cx="230" cy="110" r="4" fill="white" />
                {/* Mouth */}
                <path d="M 220 125 Q 215 135 220 140" stroke="white" strokeWidth="2" fill="none" />
                {/* Tongue */}
                <circle cx="220" cy="145" r="3" fill="#FF6B6B" />
                {/* Body */}
                <ellipse cx="220" cy="175" rx="30" ry="40" fill="#2D2639" />
                {/* Tail */}
                <path d="M 250 175 Q 270 170 275 150" stroke="#2D2639" strokeWidth="8" fill="none" strokeLinecap="round" />
                {/* Arms */}
                <rect x="195" y="160" width="8" height="35" fill="#2D2639" rx="4" />
                <rect x="245" y="160" width="8" height="35" fill="#2D2639" rx="4" />
              </g>

              {/* Dots */}
              <circle cx="150" cy="235" r="3" fill="#2D2639" />
              <circle cx="120" cy="250" r="2.5" fill="#2D2639" />
              <circle cx="180" cy="250" r="2.5" fill="#2D2639" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-primary mb-4">WELCOME</h1>

        <p className="text-gray-600 text-sm leading-relaxed">
          Great to see you again! Log in to discover new opportunities, connect with employers, and keep growing your professional journey with JobNest.
        </p>
      </div>
    </div>
  )
}
