import { Dither } from "../Dither";

function Cover({ number, title }: { number?: string; title: string }) {
  return (
    <div className="text-on-primary bg-brand-600 relative h-64 w-full overflow-hidden">
      <div className="absolute top-0 left-1/2 h-full w-screen -translate-x-1/2">
        <Dither
          waveColor={[0.14, 0.31, 1]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.5}
          colorNum={4}
          waveAmplitude={0.1}
          waveFrequency={1.2}
          waveSpeed={0.125}
          backgroundColor={[0.09, 0.13, 0.64]}
        />
      </div>
      <div className="pointer-events-none absolute left-1/2 z-10 mx-auto grid h-full w-full max-w-5xl -translate-x-1/2 grid-cols-2 gap-4 px-12 py-8 text-5xl">
        <div className="flex flex-col justify-end">
          <span className="text-on-primary font-mono font-semibold">{number}</span>
        </div>
        <div className="flex flex-col justify-end">
          <h1 className="font-semibold">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Cover;
