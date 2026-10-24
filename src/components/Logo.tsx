import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="font-display text-3xl tracking-wide text-foreground">
      Reis<span className="text-primary">Sound</span>
    </Link>
  );
}
