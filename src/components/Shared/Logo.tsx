import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ href = "/", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: {
      box: "w-8 h-8 rounded-xl p-[2.5px]",
      inner: "rounded-[9.5px] p-1",
      svg: "w-4 h-4",
      text: "text-lg",
    },
    md: {
      box: "w-10 h-10 rounded-2xl p-[3px]",
      inner: "rounded-[13px] p-1.5",
      svg: "w-5 h-5",
      text: "text-xl",
    },
    lg: {
      box: "w-12 h-12 rounded-2xl p-[3.5px]",
      inner: "rounded-[12.5px] p-2",
      svg: "w-6 h-6",
      text: "text-2xl",
    },
  };

  const current = sizeMap[size];

  return (
    <Link href={href} className="inline-flex items-center gap-3 shrink-0 group select-none py-1">
      <div
        className={`${current.box} relative bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center brand-glow group-hover:scale-105 transition-all duration-300 shrink-0`}
      >
        <div className={`w-full h-full bg-surface-1 ${current.inner} flex items-center justify-center`}>
          <svg
            className={`${current.svg} text-brand-orange group-hover:rotate-45 transition-transform duration-500`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
        </div>
      </div>

      <span className={`font-headline font-extrabold ${current.text} tracking-tight text-text-primary`}>
        Studio
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
          Space
        </span>
      </span>
    </Link>
  );
}
