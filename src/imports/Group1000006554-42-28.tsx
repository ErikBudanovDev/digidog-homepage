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

export default function Group3() {
  return (
    <div className="relative size-full">
      <Group1 />
      <Group2 />
      <div className="absolute bg-[#e3e6f3] h-[10px] left-[320px] rounded-[20px] top-[26px] w-[142px]" />
      <div className="absolute bg-[#e3e6f3] h-[10px] left-[320px] rounded-[20px] top-[51px] w-[96px]" />
    </div>
  );
}