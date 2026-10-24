import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const WHATS = "https://wa.me/5511989700064";
const MAPS = "https://www.google.com/maps/place/Reis+Sound/@-23.7392199,-46.6949247,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce4f167698fdfb:0x519a4236963760f4!8m2!3d-23.7392199!4d-46.6949247!16s%2Fg%2F11fxf581px";

const servicePages: Record<string, { name: string; title: string; description: string; detail: string }> = {
  "som-automotivo-em-sao-paulo": {
    name: "Som automotivo",
    title: "Som automotivo em São Paulo | Reis Sound",
    description: "Instalação de som automotivo no Parque São Paulo, zona sul de São Paulo. Fale com a Reis Sound pelo WhatsApp.",
    detail: "Instalação de multimídia, alto-falantes, módulos e subwoofer. Converse com a equipe para escolher a solução compatível com seu carro.",
  },
  "instalacao-de-alarme-em-sao-paulo": {
    name: "Instalação de alarme",
    title: "Instalação de alarme automotivo em São Paulo | Reis Sound",
    description: "Instalação e manutenção de alarmes automotivos no Parque São Paulo, zona sul de São Paulo.",
    detail: "Instalação e manutenção de alarmes para ajudar a proteger seu veículo. Consulte a Reis Sound sobre modelos e compatibilidade.",
  },
  "vidro-eletrico-em-sao-paulo": {
    name: "Vidros elétricos",
    title: "Vidro elétrico em São Paulo | Reis Sound",
    description: "Instalação e conserto de vidros elétricos no Parque São Paulo, zona sul de São Paulo.",
    detail: "A equipe realiza instalação e conserto de máquinas e botões de vidro elétrico. Conte o modelo do carro para pedir uma avaliação.",
  },
  "trava-eletrica-em-sao-paulo": {
    name: "Travas elétricas",
    title: "Trava elétrica em São Paulo | Reis Sound",
    description: "Instalação e manutenção de travas elétricas no Parque São Paulo, zona sul de São Paulo.",
    detail: "Serviço de travamento central e manutenção de travas elétricas. Entre em contato para consultar o atendimento para o seu veículo.",
  },
  "bateria-automotiva-em-sao-paulo": {
    name: "Bateria automotiva",
    title: "Bateria automotiva em São Paulo | Reis Sound",
    description: "Teste, venda e troca de bateria automotiva no Parque São Paulo, zona sul de São Paulo.",
    detail: "Faça um teste e consulte opções de baterias para o seu carro. Confirme disponibilidade e atendimento pelo WhatsApp.",
  },
};

export const Route = createFileRoute("/servicos/$slug")({
  head: ({ params }) => {
    const service = servicePages[params.slug];
    return {
      meta: [
        { title: service?.title ?? "Serviços automotivos em São Paulo | Reis Sound" },
        { name: "description", content: service?.description ?? "Serviços automotivos no Parque São Paulo, zona sul de São Paulo." },
        { property: "og:title", content: service?.title ?? "Reis Sound" },
        { property: "og:description", content: service?.description ?? "Serviços automotivos em São Paulo." },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const service = servicePages[slug];

  if (!service) {
    return <main className="mx-auto max-w-3xl px-4 py-20"><h1 className="font-display text-5xl">Serviço não encontrado</h1><a href="/" className="mt-6 inline-flex items-center gap-2 text-primary"><ArrowLeft className="h-4 w-4" />Voltar ao início</a></main>;
  }

  return (
    <div className="min-h-screen">
      <div className="hazard-stripe h-2" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6"><Logo /><ThemeToggle /></header>
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <a href="/#servicos" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" />Todos os serviços</a>
        <section className="mt-8 rounded-xl border bg-card p-7 md:p-12">
          <p className="font-semibold uppercase tracking-widest text-primary">Reis Sound · Parque São Paulo</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">{service.name} <span className="text-primary">em São Paulo</span></h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{service.detail}</p>
          <a href={`${WHATS}?text=${encodeURIComponent(`Olá! Gostaria de um orçamento de ${service.name.toLowerCase()}. Meu carro é: `)}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Pedir orçamento no WhatsApp</a>
        </section>
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-6"><h2 className="font-display text-3xl">Atendimento na zona sul</h2><p className="mt-3 flex gap-2 text-muted-foreground"><MapPin className="h-5 w-5 shrink-0 text-primary" />Rua Benedetto Marcello, 278 — Parque São Paulo, São Paulo - SP, 04843-225</p><a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-primary">Ver rota no Google Maps</a></div>
          <div className="rounded-xl border p-6"><h2 className="font-display text-3xl">Fale com a Reis Sound</h2><p className="mt-3 text-muted-foreground">Tire dúvidas e confirme disponibilidade para o seu veículo.</p><a href="tel:+5511989700064" className="mt-4 flex items-center gap-2 font-semibold text-primary"><Phone className="h-5 w-5" />(11) 98970-0064</a></div>
        </section>
      </main>
      <div className="hazard-stripe h-2" />
    </div>
  );
}
