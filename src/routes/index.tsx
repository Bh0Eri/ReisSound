import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MapPin, Phone, Speaker, ShieldCheck, Zap, Lock, BatteryCharging, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import fachada from "@/assets/fachada.png";

const WHATS = "https://wa.me/5511989700064";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Reis+Sound+Rua+Benedetto+Marcello+278+São+Paulo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reis Sound — Som, alarmes e elétrica automotiva em São Paulo" },
      { name: "description", content: "Som automotivo, alarmes, vidros e travas elétricas e baterias no Parque São Paulo, zona sul de SP." },
      { property: "og:title", content: "Reis Sound — Som e elétrica automotiva" },
      { property: "og:description", content: "Instalação de som, alarmes, vidros e travas elétricas e baterias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Speaker, t: "Som automotivo", d: "Multimídia, alto-falantes, módulos e subwoofer. Seu carro com som de verdade.", tag: "Mais pedido" },
  { icon: ShieldCheck, t: "Alarmes", d: "Instalação rápida pra você dormir tranquilo.", tag: "Segurança" },
  { icon: Zap, t: "Vidros elétricos", d: "Instalação e conserto de máquinas e botões.", tag: "Conforto" },
  { icon: Lock, t: "Travas elétricas", d: "Travamento central e manutenção das travas.", tag: "Praticidade" },
  { icon: BatteryCharging, t: "Baterias", d: "Teste grátis, venda e troca na hora.", tag: "Na hora" },
];

// Avaliações 5 estrelas mais recentes do Google (da mais nova para a mais antiga)
const reviews = [
  { n: "Roberto", date: "Janeiro de 2026", t: "Atencioso, e serviço de muita qualidade sem enrolação, preço justo também. Se precisar de novo, voltarei." },
  { n: "Jefferson", date: "Janeiro de 2026", t: "Super indico, o cara é fera, achou o problema do carro e cobrou o valor justo. Sempre que eu precisar já sei onde ir no Reis 🤩" },
  { n: "André", date: "Junho de 2025", t: "Profissional super atencioso e qualificado, solucionou de forma rápida o problema na máquina de vidro do meu carro e também diagnosticou a causa da ventoinha não acionar. Super recomendo e o preço foi super justo!" },
  { n: "Andre", date: "Maio de 2025", t: "O Ademir é um excepcional profissional. Oferece o melhor serviço, honestíssimo, atencioso e o preço é muito acessível. Indiquei a todos meus conhecidos e sempre que tiver que fazer um serviço de som automotivo ou trava elétrica, voltarei a procurá-lo. Parabéns!!" },
  { n: "Andre", date: "Agosto de 2023", t: "Trocou a bateria do meu carro, veio no meu endereço. Resolveu rápido, atende super bem, pode contratar sem medo, super recomendo!!!" },
  { n: "Hector", date: "Maio de 2023", t: "Loja bem estruturada. Serviços com boa qualidade e pessoal honesto com preço justo. Indico, vale a pena. Valeu Ademir!" },
];

function Home() {
  return (
    <div className="min-h-screen">
      <div className="hazard-stripe h-2" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/produtos" className="text-sm font-semibold hover:text-primary">Produtos</Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 md:grid-cols-2">
        <div>
          <a href={MAPS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Star className="h-5 w-5 fill-current" /> Veja as avaliações no Google
          </a>
          <h1 className="mt-2 font-display text-6xl leading-none md:text-8xl">Reis <span className="text-primary">Sound</span></h1>
          <p className="mt-3 max-w-xl text-lg">Som, alarmes, vidros, travas e acessórios no Parque São Paulo, zona sul de SP.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={WHATS} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Chamar no WhatsApp</a>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="rounded-md border px-5 py-3 font-semibold hover:border-primary">Como chegar</a>
          </div>
        </div>
        <img src={fachada} alt="Fachada da loja Reis Sound" className="w-full rounded-xl border-4 border-primary object-cover shadow-2xl" />
      </section>

      <section className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-semibold uppercase tracking-widest text-primary">Serviços</p>
          <h2 className="font-display text-5xl md:text-6xl">O que a gente faz</h2>
          <p className="mt-2 text-muted-foreground">Escolha o serviço e chame a gente no WhatsApp para fazer um orçamento.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: I, t, d, tag }) => (
              <a
                key={t}
                href={`${WHATS}?text=${encodeURIComponent(`Olá! Quero um orçamento de ${t.toLowerCase()}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-xl border-2 bg-background p-6 transition hover:-translate-y-1 hover:border-primary"
              >
                <span className="absolute right-4 top-4 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">{tag}</span>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground transition group-hover:scale-110">
                  <I className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-3xl">{t}</h3>
                <p className="mt-1 flex-1 text-muted-foreground">{d}</p>
                <span className="mt-5 flex items-center gap-2 font-semibold text-primary">
                  Pedir orçamento <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-5xl md:text-6xl">Quem é cliente, <span className="text-primary">indica</span></h2>
          <p className="mt-2 text-muted-foreground">
            Algumas avaliações de clientes no Google.{" "}
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
              Ver todas no Google
            </a>
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r, idx) => (
              <blockquote key={idx} className="rounded-lg border bg-card p-6">
                <div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-3">"{r.t}"</p>
                <footer className="mt-3 text-sm text-muted-foreground">— {r.n} · {r.date}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">Visite a loja</h2>
          <p className="mt-4 flex items-start gap-2"><MapPin className="mt-1 h-5 w-5 text-primary" /> Rua Benedetto Marcello, 278 — Parque São Paulo, São Paulo - SP, 04843-225</p>
          <p className="mt-2 flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> (11) 3448-5501 · (11) 98970-0064</p>
        </div>
        <iframe
          title="Mapa Reis Sound"
          className="h-72 w-full rounded-lg border"
          loading="lazy"
          src="https://www.google.com/maps?q=Rua+Benedetto+Marcello+278+São+Paulo&output=embed"
        />
      </section>
      <div className="hazard-stripe h-2" />
    </div>
  );
}
