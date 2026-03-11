import svgPaths from "./svg-lf55duofgf";

function Logo() {
  return (
    <div className="relative shrink-0 size-[64.612px]" data-name="logo">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.6116 64.6116">
        <g id="logo">
          <ellipse cx="32.3058" cy="32.3058" fill="var(--fill-0, #163376)" id="Ellipse 20" rx="32.3058" ry="32.3058" />
          <path d={svgPaths.p3f5f2e00} fill="var(--fill-0, white)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[14.134px] items-center relative size-full">
      <Logo />
      <p className="font-['Museo:500',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#163376] text-[64.234px]">SmileforYou</p>
    </div>
  );
}