interface CardValueProps {
  value: number;
  className: string;
}

export function CardValue({ value, className }: CardValueProps) {
  return (
    <div className={`card__value-container ${className}`}>
      <div className="card__value">{value}</div>
    </div>
  );
}
