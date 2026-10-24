import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { productsQuery, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "ReisSoundStock — Ferramentas e acessórios automotivos" },
      { name: "description", content: "Ferramentas, peças e acessórios para carro selecionados a dedo." },
      { property: "og:title", content: "ReisSoundStock" },
      { property: "og:description", content: "Ferramentas, peças e acessórios para carro selecionados a dedo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: products, isLoading } = useQuery(productsQuery);

  return (
    <div className="min-h-screen">
      <div className="hazard-stripe h-2" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <Logo stock />
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-semibold hover:text-primary">Nossa loja</Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-4">
        <h1 className="font-display text-5xl leading-none md:text-7xl">
          Ferramentas & <span className="text-primary">Automotivo</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Seleção do que vale a pena pra garagem. Clique no produto para ir direto à loja.
        </p>
        <p className="mt-4 max-w-2xl rounded-md border border-dashed border-primary/60 p-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Aviso:</strong> os links desta página são de afiliado. Se você comprar pelo Mercado Livre, a Reis Sound pode receber uma comissão, sem custo extra para você. Preços e disponibilidade são os do Mercado Livre e podem mudar.
        </p>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-20">
        {isLoading ? (
          <p className="text-muted-foreground">Carregando…</p>
        ) : !products?.length ? (
          <p className="rounded-md border border-dashed p-10 text-center text-muted-foreground">
            Nenhum produto ainda.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group flex flex-col overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:border-primary"
              >
                <div className="aspect-square bg-secondary">
                  {p.image_url && (
                    <img src={p.image_url} alt={p.name} loading="lazy" className="h-full w-full object-contain p-3" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <h2 className="line-clamp-2 text-sm font-semibold">{p.name}</h2>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-display text-2xl text-primary">{formatPrice(p.price)}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-sm text-muted-foreground">
        Links de afiliado do Mercado Livre: a Reis Sound pode receber comissão pelas compras feitas por eles, sem custo extra para você.
      </footer>
    </div>
  );
}
