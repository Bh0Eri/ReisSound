import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Star, MapPin, Phone, Speaker, ShieldCheck, Zap, Lock, BatteryCharging, ArrowRight, Instagram, Facebook, CalendarDays, Clock3, Images } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import fachada from "@/assets/fachada.png";

const WHATS_NUMBER = "5511989700064";
const WHATS = `https://wa.me/${WHATS_NUMBER}`;
const MAPS = "https://www.google.com/maps/place/Reis+Sound/@-23.7392199,-46.6949247,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce4f167698fdfb:0x519a4236963760f4!8m2!3d-23.7392199!4d-46.6949247!16s%2Fg%2F11fxf581px";
const GOOGLE_REVIEWS = MAPS;
const GOOGLE_PHOTOS_URL = "https://share.google/fCv7791CADnioPvGk";
const INSTAGRAM_URL = (import.meta.env.VITE_INSTAGRAM_URL as string | undefined) || "https://www.instagram.com/reis.sound/";
const FACEBOOK_URL = (import.meta.env.VITE_FACEBOOK_URL as string | undefined) || "https://www.facebook.com/reissound/";
// Horários consultados na ficha do Google Maps em 24/10/2026.
const GOOGLE_WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function GoogleHoursStatus() {
  const [status, setStatus] = useState("Horário conforme a ficha da loja no Google");

  useEffect(() => {
    function updateStatus() {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      }).formatToParts(new Date());
      const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
      const weekday = values["weekday"] ?? "Sun";
      const hour = Number(values["hour"] ?? "0");
      const minute = Number(values["minute"] ?? "0");
      const day = GOOGLE_WEEKDAYS.indexOf(weekday.toLowerCase());
      const isOpen = day > 0 && (hour > 9 || (hour === 9 && minute >= 0)) && hour < 19;
      if (isOpen) {
        setStatus("Aberto agora · fecha às 19h");
        return;
      }

      const opensToday = day > 0 && hour < 9;
      const nextDay = opensToday ? day : day === 0 || day === 6 ? 1 : day + 1;
      const nextOpening = opensToday ? "hoje" : nextDay === (day + 1) % 7 ? "amanhã" : "segunda-feira";
      setStatus(day === 0 || (!opensToday && hour >= 19 && day === 6)
        ? "Fechado agora · abre segunda-feira às 9h"
        : `Fechado agora · abre ${nextOpening} às 9h`);
    }

    updateStatus();
    const timer = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>{status}</span>;
}

const services = [
  { icon: Speaker, t: "Som automotivo", d: "Multimídia, alto-falantes, módulos e subwoofer. Seu carro com som de verdade.", tag: "Mais pedido", slug: "som-automotivo-em-sao-paulo" },
  { icon: ShieldCheck, t: "Instalação de alarme", d: "Instalação e manutenção para proteger seu veículo.", tag: "Segurança", slug: "instalacao-de-alarme-em-sao-paulo" },
  { icon: Zap, t: "Vidros elétricos", d: "Instalação e conserto de máquinas e botões.", tag: "Conforto", slug: "vidro-eletrico-em-sao-paulo" },
  { icon: Lock, t: "Travas elétricas", d: "Travamento central e manutenção das travas.", tag: "Praticidade", slug: "trava-eletrica-em-sao-paulo" },
  { icon: BatteryCharging, t: "Baterias", d: "Teste, venda e troca de baterias automotivas.", tag: "Na hora", slug: "bateria-automotiva-em-sao-paulo" },
];

// Avaliações exibidas no site
const reviews = [
  { n: "Roberto", date: "Janeiro de 2026", t: "Atencioso, e serviço de muita qualidade sem enrolação, preço justo também. Se precisar de novo, voltarei." },
  { n: "Jefferson", date: "Janeiro de 2026", t: "Super indico, o cara é fera, achou o problema do carro e cobrou o valor justo. Sempre que eu precisar já sei onde ir no Reis 🤩" },
  { n: "André", date: "Junho de 2025", t: "Profissional super atencioso e qualificado, solucionou de forma rápida o problema na máquina de vidro do meu carro e também diagnosticou a causa da ventoinha não acionar. Super recomendo e o preço foi super justo!" },
  { n: "Andre", date: "Maio de 2025", t: "O Ademir é um excepcional profissional. Oferece o melhor serviço, honestíssimo, atencioso e o preço é muito acessível. Indiquei a todos meus conhecidos e sempre que tiver que fazer um serviço de som automotivo ou trava elétrica, voltarei a procurá-lo. Parabéns!!" },
  { n: "Andre", date: "Agosto de 2023", t: "Trocou a bateria do meu carro, veio no meu endereço. Resolveu rápido, atende super bem, pode contratar sem medo, super recomendo!!!" },
  { n: "Hector", date: "Maio de 2023", t: "Loja bem estruturada. Serviços com boa qualidade e pessoal honesto com preço justo. Indico, vale a pena. Valeu Ademir!" },
];

function openWhatsApp(message: string) {
  window.open(`${WHATS}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function Home() {
  const [quoteService, setQuoteService] = useState(services[0].t);
  const [quoteCar, setQuoteCar] = useState("");
  const [appointmentService, setAppointmentService] = useState(services[0].t);
  const [appointmentCar, setAppointmentCar] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  function requestQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openWhatsApp(`Olá! Gostaria de um orçamento para ${quoteService.toLowerCase()}. Modelo do carro: ${quoteCar}.`);
  }

  function requestAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const date = new Date(`${appointmentDate}T12:00:00`).toLocaleDateString("pt-BR");
    openWhatsApp(`Olá! Gostaria de solicitar um horário para ${appointmentService.toLowerCase()}. Carro: ${appointmentCar}. Dia: ${date}, às ${appointmentTime}. Podem confirmar a disponibilidade?`);
  }

  return (
    <div className="min-h-screen">
      <div className="hazard-stripe h-2" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <a href="#servicos" className="text-sm font-semibold hover:text-primary">Serviços</a>
          <a href="#orcamento" className="text-sm font-semibold hover:text-primary">Orçamento</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Reis Sound" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook da Reis Sound" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 md:grid-cols-2">
        <div>
          <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Star className="h-5 w-5 fill-current" /> Veja e avalie no Google
          </a>
          <h1 className="mt-2 font-display text-6xl leading-none md:text-8xl">Reis <span className="text-primary">Sound</span></h1>
          <p className="mt-3 max-w-xl text-lg">Som, alarmes, vidros, travas e acessórios no Parque São Paulo, zona sul de SP.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#orcamento" className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Pedir orçamento</a>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="rounded-md border px-5 py-3 font-semibold hover:border-primary">Como chegar</a>
          </div>
        </div>
        <img src={fachada} alt="Fachada da loja Reis Sound" className="w-full rounded-xl border-4 border-primary object-cover shadow-2xl" />
      </section>

      <section id="servicos" className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-semibold uppercase tracking-widest text-primary">Serviços</p>
          <h2 className="font-display text-5xl md:text-6xl">O que a gente faz</h2>
          <p className="mt-2 text-muted-foreground">Escolha um serviço para saber mais ou peça seu orçamento pelo WhatsApp.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: I, t, d, tag, slug }) => (
              <a key={t} href={`/servicos/${slug}`} className="group relative flex flex-col overflow-hidden rounded-xl border-2 bg-background p-6 transition hover:-translate-y-1 hover:border-primary">
                <span className="absolute right-4 top-4 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">{tag}</span>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground transition group-hover:scale-110"><I className="h-8 w-8" /></div>
                <h3 className="mt-5 font-display text-3xl">{t}</h3>
                <p className="mt-1 flex-1 text-muted-foreground">{d}</p>
                <span className="mt-5 flex items-center gap-2 font-semibold text-primary">Ver serviço <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="orcamento" className="mx-auto grid max-w-6xl gap-8 px-4 py-20 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 md:p-8">
          <div className="flex items-center gap-3 text-primary"><Speaker className="h-6 w-6" /><p className="font-semibold uppercase tracking-widest">Orçamento rápido</p></div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Conte o que seu carro precisa</h2>
          <p className="mt-2 text-muted-foreground">A mensagem já vai pronta para o WhatsApp da loja.</p>
          <form onSubmit={requestQuote} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">Serviço
              <select value={quoteService} onChange={(event) => setQuoteService(event.target.value)} className="h-11 rounded-md border bg-background px-3 font-normal">
                {services.map((service) => <option key={service.t}>{service.t}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">Modelo do carro
              <input required value={quoteCar} onChange={(event) => setQuoteCar(event.target.value)} placeholder="Ex.: Honda Civic 2018" className="h-11 rounded-md border bg-background px-3 font-normal" />
            </label>
            <button className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Continuar no WhatsApp</button>
          </form>
        </div>

        <div className="rounded-xl border bg-card p-6 md:p-8">
          <div className="flex items-center gap-3 text-primary"><CalendarDays className="h-6 w-6" /><p className="font-semibold uppercase tracking-widest">Agendamento</p></div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Peça um horário</h2>
          <p className="mt-2 text-muted-foreground">A loja recebe sua preferência pelo WhatsApp e confirma a disponibilidade.</p>
          <form onSubmit={requestAppointment} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">Serviço
              <select value={appointmentService} onChange={(event) => setAppointmentService(event.target.value)} className="h-11 rounded-md border bg-background px-3 font-normal">
                {services.map((service) => <option key={service.t}>{service.t}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">Modelo do carro
              <input required value={appointmentCar} onChange={(event) => setAppointmentCar(event.target.value)} placeholder="Ex.: Honda Civic 2018" className="h-11 rounded-md border bg-background px-3 font-normal" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">Dia
                <input required type="date" min={new Date().toLocaleDateString("en-CA")} value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value)} className="h-11 rounded-md border bg-background px-3 font-normal" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">Horário preferido
                <input required type="time" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)} className="h-11 rounded-md border bg-background px-3 font-normal" />
              </label>
            </div>
            <button className="rounded-md border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Solicitar confirmação no WhatsApp</button>
          </form>
        </div>
      </section>

      <section id="galeria" className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 text-primary"><Images className="h-6 w-6" /><p className="font-semibold uppercase tracking-widest">Galeria</p></div>
          <h2 className="mt-2 font-display text-5xl md:text-6xl">Galeria de trabalhos</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">Veja fotos da loja e dos serviços realizados. As galerias do Google, Instagram e Facebook abrem com as publicações mais recentes.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <figure className="overflow-hidden rounded-xl border bg-background">
              <img src={fachada} alt="Fachada da Reis Sound no Parque São Paulo" loading="lazy" className="aspect-square w-full object-cover" />
              <figcaption className="p-4 text-sm font-semibold">Fachada da Reis Sound</figcaption>
            </figure>
            <a href={GOOGLE_PHOTOS_URL} target="_blank" rel="noopener noreferrer" className="group flex min-h-64 flex-col justify-between rounded-xl border bg-background p-6 transition hover:-translate-y-1 hover:border-primary">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Images className="h-7 w-7" /></div>
              <div><h3 className="font-display text-2xl">Fotos no Google</h3><p className="mt-2 text-sm text-muted-foreground">Veja a galeria completa da loja e as fotos dos clientes.</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">Ver fotos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group flex min-h-64 flex-col justify-between rounded-xl border bg-background p-6 transition hover:-translate-y-1 hover:border-primary">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Instagram className="h-7 w-7" /></div>
              <div><h3 className="font-display text-2xl">Instagram</h3><p className="mt-2 text-sm text-muted-foreground">Fotos, vídeos e trabalhos da Reis Sound.</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">@reis.sound <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="group flex min-h-64 flex-col justify-between rounded-xl border bg-background p-6 transition hover:-translate-y-1 hover:border-primary">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Facebook className="h-7 w-7" /></div>
              <div><h3 className="font-display text-2xl">Facebook</h3><p className="mt-2 text-sm text-muted-foreground">Confira mais fotos e publicações da loja.</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">Reis Sound <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-5xl md:text-6xl">Quem é cliente, <span className="text-primary">indica</span></h2>
          <p className="mt-2 text-muted-foreground">Algumas avaliações de clientes. <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Ver todas e avaliar no Google</a></p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r, idx) => <blockquote key={idx} className="rounded-lg border bg-card p-6"><div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div><p className="mt-3">"{r.t}"</p><footer className="mt-3 text-sm text-muted-foreground">— {r.n} · {r.date}</footer></blockquote>)}
          </div>
          <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-md border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"><Star className="mr-2 h-5 w-5" />Avalie no Google</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">Visite a loja</h2>
          <p className="mt-4 flex items-start gap-2"><MapPin className="mt-1 h-5 w-5 text-primary" /> Rua Benedetto Marcello, 278 — Parque São Paulo, São Paulo - SP, 04843-225</p>
          <a href={`tel:+${WHATS_NUMBER}`} className="mt-2 flex items-center gap-2 hover:text-primary"><Phone className="h-5 w-5 text-primary" /> (11) 98970-0064</a>
          <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><Clock3 className="h-4 w-4" /><GoogleHoursStatus /></a>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={WHATS} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground">WhatsApp</a>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="rounded-md border px-4 py-2 font-semibold hover:border-primary">Google Maps</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 font-semibold hover:border-primary"><Instagram className="h-4 w-4" />Instagram</a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 font-semibold hover:border-primary"><Facebook className="h-4 w-4" />Facebook</a>
          </div>
        </div>
        <iframe title="Mapa Reis Sound" className="h-72 w-full rounded-lg border" loading="lazy" src="https://www.google.com/maps?q=Rua+Benedetto+Marcello+278+São+Paulo&output=embed" />
      </section>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-sm text-muted-foreground">
        <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Avalie a Reis Sound no Google</a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ml-5 inline-flex items-center gap-1 hover:text-primary"><Instagram className="h-4 w-4" />Instagram</a>
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="ml-5 inline-flex items-center gap-1 hover:text-primary"><Facebook className="h-4 w-4" />Facebook</a>
      </footer>
      <div className="hazard-stripe h-2" />
    </div>
  );
}

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
