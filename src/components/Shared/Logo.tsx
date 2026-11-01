import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ href = "/", size = "md" }: LogoProps) {
  
  const sizeMap = {
    sm: {
      box: "w-8 h-8 rounded-lg",
      svg: "w-4 h-4",
      text: "text-lg",
    },
    md: {
      box: "w-10 h-10 rounded-xl",
      svg: "w-5 h-5",
      text: "text-xl",
    },
    lg: {
      box: "w-12 h-12 rounded-2xl",
      svg: "w-6 h-6",
      text: "text-2xl",
    },
  };

  const current = sizeMap[size];

  return (
    <Link href={href} className="inline-flex items-center gap-3 shrink-0 group select-none">
      
      {/* 1. Cinematic Lens Aperture Icon Container */}
      <div
        className={`${current.box} relative bg-gradient-to-br from-brand-orange to-brand-amber p-[1.5px] flex items-center justify-center brand-glow group-hover:shadow-[0_0_28px_rgba(224,79,38,0.7)] group-hover:scale-105 transition-all duration-300`}
      >
        <div className="w-full h-full bg-surface-1 rounded-[inherit] flex items-center justify-center overflow-hidden relative">
          
          {/* Subtle Ambient Radial Center Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,79,38,0.25)_0%,transparent_70%)] pointer-events-none" />

          {/* 6-Blade Precision Camera Aperture SVG */}
          <svg
            className={`${current.svg} relative z-10 text-brand-amber group-hover:rotate-60 transition-transform duration-700 ease-out`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer Lens Rim */}
            <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeOpacity="0.4" />
            
            {/* 6 Overlapping Curved Aperture Shutter Blades */}
            <path d="M12 2.5 C14.5 5.5, 17 8.5, 18 11.5" stroke="url(#logoIrisGrad)" />
            <path d="M18 11.5 C17 14.5, 15 17.5, 12 21.5" stroke="url(#logoIrisGrad)" />
            <path d="M12 21.5 C9.5 18.5, 7 15.5, 6 12.5" stroke="url(#logoIrisGrad)" />
            <path d="M6 12.5 C7 9.5, 9 6.5, 12 2.5" stroke="url(#logoIrisGrad)" />
            <path d="M19 6.5 C15.5 8, 12.5 10, 8 10.5" stroke="url(#logoIrisGrad)" />
            <path d="M5 17.5 C8.5 16, 11.5 14, 16 13.5" stroke="url(#logoIrisGrad)" />

            {/* Central Focal Point Core */}
            <circle cx="12" cy="12" r="2" fill="url(#logoIrisGrad)" className="opacity-90" />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="logoIrisGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E04F26" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. Brand Wordmark Typography */}
      <span className={`font-headline font-extrabold ${current.text} tracking-tight text-text-primary`}>
        Studio
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
          Space
        </span>
      </span>
    </Link>
  );
}