function Heading() {
  return <div className="-translate-x-1/2 absolute h-[122px] left-[calc(50%+0.6px)] top-[56px] w-[561.19px]" data-name="Heading 2" />;
}

function DivJsx() {
  return (
    <div className="-translate-x-1/2 absolute h-[837px] left-[calc(50%-2.5px)] top-[100px] w-[1299px]" data-name="div.jsx-337721074">
      <Heading />
    </div>
  );
}

export default function DivJsx1() {
  return (
    <div className="bg-gradient-to-b from-[rgba(196,224,254,0)] relative size-full to-1/2 to-[rgba(196,224,254,0)] via-[15%] via-[rgba(196,224,254,0.5)]" data-name="div.jsx-2374977771">
      <DivJsx />
    </div>
  );
}