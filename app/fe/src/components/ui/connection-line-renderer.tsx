interface ConnectionLineRendererProps {
  type: "source" | "target";
  path: string;
  marker?: string;
}

export function ConnectionLineRenderer({ type, path, marker }: ConnectionLineRendererProps) {
  return (
    <g>
      <path
        className="stroke-animated"
        d={path}
        fill="none"
        markerEnd={`url(#${marker}`}
        stroke={type === "source" ? "#00A6FF" : "FFC900"}
        strokeDasharray="10"
        strokeLinecap="round"
        strokeWidth={3}
      />
    </g>
  );
}
