# Reis Sound — site institucional

Site institucional desenvolvido para a **Reis Sound**, cliente do segmento de som e acessórios automotivos em São Paulo. O projeto apresenta os serviços da loja, facilita pedidos de orçamento e solicitações de horário pelo WhatsApp e reúne atalhos para os perfis sociais e as fotos publicadas no Google.

## Links do cliente

- **Instagram:** [@reis.sound](https://www.instagram.com/reis.sound/)
- **Facebook:** [Reis Sound](https://www.facebook.com/reissound/)
- **Google — perfil, localização e fotos:** [Abrir perfil da Reis Sound no Google](https://share.google/fCv7791CADnioPvGk)
- **Google Maps:** [Localização e rota](https://www.google.com/maps/place/Reis+Sound/@-23.7392199,-46.6949247,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce4f167698fdfb:0x519a4236963760f4!8m2!3d-23.7392199!4d-46.6949247!16s%2Fg%2F11fxf581px)
- **WhatsApp:** [Iniciar conversa com a loja](https://wa.me/5511989700064)
- **Telefone:** [(11) 98970-0064](tel:+5511989700064)
- **Endereço:** Rua Benedetto Marcello, 278 — Parque São Paulo, São Paulo - SP, 04843-225
- **Repositório:** [github.com/Bh0Eri/ReisSound](https://github.com/Bh0Eri/ReisSound)

## Sobre o projeto

O site foi pensado para que clientes encontrem rapidamente os serviços e entrem em contato sem precisar ligar. A navegação destaca os serviços automotivos, orçamento e agendamento, além de avaliações, localização e redes sociais. A identidade visual usa a logo fornecida pelo cliente como ícone do site.

O catálogo público de produtos foi retirado conforme solicitado pelo cliente. O foco da página inicial passou a ser a apresentação dos serviços da loja.

## Funcionalidades

- Página inicial responsiva com apresentação da Reis Sound, foto da fachada, serviços, avaliações e localização.
- Ícone e identificação visual do site atualizados para a logo da Reis Sound.
- Catálogo público de produtos removido.
- Formulário de **orçamento rápido**: o visitante escolhe o serviço e informa o modelo do carro; o site abre o WhatsApp com uma mensagem preenchida.
- Formulário de **solicitação de agendamento**: o visitante informa serviço, carro, dia e horário preferido; a loja recebe a solicitação pelo WhatsApp para confirmar a disponibilidade.
- Número de contato unificado para o telefone confirmado pelo cliente, terminado em **0064**.
- Atalhos para Instagram e Facebook no cabeçalho, na galeria e no rodapé.
- Galeria com a foto da fachada e links para ver as fotos e publicações do Google, Instagram e Facebook. O conteúdo hospedado nessas plataformas é aberto nos próprios sites.
- Links para abrir o perfil da loja no Google, consultar a rota e acessar as avaliações.
- Indicador de aberto/fechado calculado automaticamente com o horário local de São Paulo, usando os horários consultados na ficha do Google: segunda a sábado, das 9h às 19h; domingo fechado.
- Páginas individuais por serviço, com título e descrição próprios para buscas locais.

## Páginas de serviços

As páginas são acessadas pelos seguintes caminhos:

| Serviço | URL relativa |
| --- | --- |
| Som automotivo | `/servicos/som-automotivo-em-sao-paulo` |
| Instalação de alarme | `/servicos/instalacao-de-alarme-em-sao-paulo` |
| Vidros elétricos | `/servicos/vidro-eletrico-em-sao-paulo` |
| Travas elétricas | `/servicos/trava-eletrica-em-sao-paulo` |
| Bateria automotiva | `/servicos/bateria-automotiva-em-sao-paulo` |

O domínio público do site não foi informado. Assim, os caminhos acima são relativos e podem ser combinados com o domínio quando houver publicação.

## Tecnologias

- React 19 e TypeScript
- TanStack Start e TanStack Router
- Vite
- Tailwind CSS
- Lucide React para ícones
- Supabase (integração existente no projeto)

## Executar localmente

### Requisitos

- Node.js compatível com o Vite usado pelo projeto
- npm

### Instalação e desenvolvimento

```bash
npm install
npm run dev
```

O servidor local informa o endereço para abrir no navegador (normalmente `http://localhost:5173`).

### Compilar para produção

```bash
npm run build
npm run preview
```

## Configuração

O arquivo `.env.example` lista as variáveis de ambiente usadas pelo projeto. Copie-o para `.env` e preencha as credenciais do Supabase quando for executar as partes que dependem dessa integração.

```bash
cp .env.example .env
```

As URLs das redes sociais já estão configuradas como padrão no site e também constam no `.env.example`:

- `VITE_INSTAGRAM_URL`
- `VITE_FACEBOOK_URL`

O status de funcionamento usa os horários registrados no código e atualiza a indicação no navegador. Se o horário comercial informado no Google mudar, atualize a configuração correspondente em `src/routes/index.tsx`.

## Estrutura relevante

```text
src/
├── assets/                 # Imagens usadas pelo site
├── components/             # Componentes reutilizáveis, logo e tema
└── routes/
    ├── index.tsx            # Página inicial, orçamento, agendamento e galeria
    └── servicos.$slug.tsx   # Páginas locais individuais por serviço
public/
└── logo.png                # Logo usada no favicon e ícone do site
```

## Observações de publicação

- Antes de publicar, configure o domínio do cliente na plataforma de hospedagem.
- A galeria direciona para as fotos originais nas redes e no Google; os links e o conteúdo dessas plataformas são administrados pelo cliente.
- O site envia pedidos e solicitações de horário para o WhatsApp **(11) 98970-0064**; a confirmação do agendamento é feita pela loja.
