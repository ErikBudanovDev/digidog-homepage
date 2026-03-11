import svgPaths from "./svg-2hs0g2kefy";
import imgEllipse4 from "figma:asset/59fe701eb8226508e3a213da6b6769564706529b.png";

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-white h-[205px] left-[100px] rounded-bl-[45px] rounded-br-[11.169px] rounded-tl-[11.169px] rounded-tr-[11.169px] shadow-[0px_3.723px_70.736px_0px_rgba(28,2,98,0.31)] top-0 w-[387px]" />
      <div className="absolute left-0 opacity-60 size-[308px] top-[12px]">
        <div className="absolute inset-[-4.91%_-10.11%_-12.42%_-7.22%]">
          <img alt="" className="block max-w-none size-full" height="361.378" src={imgEllipse4} width="361.378" />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[333px] top-[67px]">
      <div className="absolute bg-[#f2efff] h-[33px] left-[333px] rounded-[4.233px] top-[126px] w-[16px]" />
      <div className="absolute bg-[#f2efff] h-[24px] left-[358px] rounded-[4.233px] top-[135px] w-[16px]" />
      <div className="absolute bg-[#f2efff] h-[33px] left-[383px] rounded-[4.233px] top-[126px] w-[16px]" />
      <div className="absolute bg-[#f2efff] h-[36px] left-[408px] rounded-[4.233px] top-[123px] w-[16px]" />
      <div className="absolute bg-[#52bd94] h-[92px] left-[430px] rounded-[4.233px] shadow-[0px_4.233px_6.35px_0px_rgba(135,145,233,0.3)] top-[67px] w-[21px]" />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group1 />
      <Group2 />
      <div className="absolute bg-[#e3e6f3] h-[10px] left-[320px] rounded-[20px] top-[26px] w-[142px]" />
      <div className="absolute bg-[#e3e6f3] h-[10px] left-[320px] rounded-[20px] top-[51px] w-[96px]" />
    </div>
  );
}

function SJqOprTif() {
  return (
    <div className="absolute inset-[0_-0.02%_0.01%_0]" data-name="sJqOPR.tif">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169.163 170.245">
        <g id="sJqOPR.tif">
          <path d={svgPaths.p3829e500} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute h-[170.27px] left-[68.87px] overflow-clip top-[80.86px] w-[169.135px]" data-name="Layer_1">
      <SJqOprTif />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[28px] top-[40px]">
      <div className="absolute left-[28px] size-[252px] top-[40px]">
        <div className="absolute inset-[-4.76%_-7.94%_-7.94%_-4.76%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 284 284">
            <g filter="url(#filter0_d_42_91)" id="Ellipse 51">
              <circle cx="138" cy="138" fill="var(--fill-0, #74AA9C)" r="126" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="284" id="filter0_d_42_91" width="284" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="4" dy="4" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.236159 0 0 0 0 0.0240706 0 0 0 0 0.790853 0 0 0 0.43 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_42_91" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_42_91" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Layer />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[28px] top-[40px]">
      <Group3 />
    </div>
  );
}

export default function Group6() {
  return (
    <div className="relative size-full">
      <Group5 />
      <Group4 />
    </div>
  );
}