export function LoadingRing({ size = 36 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      stroke="#000"
      viewBox="0 0 24 24"
    >
      <style>
        {
          '.spinner_QPB9{transform-origin:center;animation:spinner_4N1C 2s linear infinite}.spinner_QPB9 circle{stroke-linecap:round;animation:spinner_MX3P 1.5s ease-in-out infinite}@keyframes spinner_4N1C{100%{transform:rotate(360deg)}}@keyframes spinner_MX3P{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}'
        }
      </style>
      <g className="spinner_QPB9">
        <circle cx={12} cy={12} r={9.5} fill="none" strokeWidth={2} />
      </g>
    </svg>
  );
}