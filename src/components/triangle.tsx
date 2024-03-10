type TriangleIconProps = {
  color?: string;
};
export function TriangleIcon({ color = "currentColor" }: TriangleIconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill={color}>
      <path d="M0 0L12 6.5L0 12V0Z" fill={color} />
    </svg>
  );
}
