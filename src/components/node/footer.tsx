import { Heart, Sword } from "lucide-react";
import { IconValue } from "../icon-value.tsx";

export function Footer() {
  return (
    <footer className="node__footer">
      <IconValue value={1} right={<Sword className="silver" strokeWidth={2} />} />

      <IconValue value={10} right={<Heart className="red" strokeWidth={2} />} />
    </footer>
  );
}
