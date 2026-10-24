import { Link } from "@tanstack/react-router";

export function Logo({ stock = false }: { stock?: boolean }) {
  return (
    <Link to={stock ? "/produtos" : "/"} className="font-display text-3xl tracking-wide text-foreground">
      Reis<span className="text-primary">Sound</span>
      {stock && "Stock"}
    </Link>
  );
}
