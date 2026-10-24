#!/usr/bin/env bash
# Rode DENTRO da pasta do projeto (reissoundstock-src), no Git Bash / terminal.
# Antes de rodar:
#   1) Git instalado e configurado (primeira vez neste PC):
#        git config --global user.name  "Seu Nome"
#        git config --global user.email "seu-email-do-github@exemplo.com"
#   2) Repositório VAZIO e PRIVADO criado em https://github.com/new
#      com o nome ReisSound (sem README, sem .gitignore).
#   3) Estar logado no GitHub neste PC (o push vai pedir login se não estiver).

set -e

REPO_URL="https://github.com/Bh0Eri/ReisSound.git"

# ---------- 1) Local repository, main branch ----------
git init -b main

# ---------- 2) Make sure .env NEVER goes to GitHub ----------
printf '\n# Environment variables (never commit)\n.env\n.env.*\n!.env.example\n' >> .gitignore
printf 'SUPABASE_URL=\nSUPABASE_PUBLISHABLE_KEY=\nSUPABASE_PROJECT_ID=\nVITE_SUPABASE_URL=\nVITE_SUPABASE_PUBLISHABLE_KEY=\nVITE_SUPABASE_PROJECT_ID=\n' > .env.example

# ---------- 3) Commits ----------

# Project setup
git add .gitignore .env.example
git commit -m "chore: ignore .env and add .env.example"

git add .prettierignore .prettierrc eslint.config.js
git commit -m "chore: configure Prettier and ESLint"

git add package.json bun.lock bunfig.toml
git commit -m "chore: add dependencies and package manager config"

git add tsconfig.json vite.config.ts vitest.config.ts components.json
git commit -m "chore: configure TypeScript, Vite, Vitest and shadcn"

git add public
git commit -m "chore: add favicon and robots.txt"

# Utilities and UI components
git add src/lib/utils.ts
git commit -m "feat: add cn utility for CSS classes"

git add src/hooks
git commit -m "feat: add use-mobile hook"

git add src/components/ui/[a-b]*
git commit -m "feat: add UI components (accordion to button)"

git add src/components/ui/[c-d]*
git commit -m "feat: add UI components (calendar to drawer)"

git add src/components/ui/[e-i]*
git commit -m "feat: add UI components (dropdown-menu to input)"

git add src/components/ui/[l-p]*
git commit -m "feat: add UI components (label to progress)"

git add src/components/ui/[r-s]*
git commit -m "feat: add UI components (radio-group to switch)"

git add src/components/ui/t*
git commit -m "feat: add UI components (table to tooltip)"

# Database and Supabase
git add drizzle drizzle.config.ts
git commit -m "feat: add initial migration for products and user roles"

git add supabase
git commit -m "chore: add Supabase configuration"

git add src/integrations/supabase/client.ts src/integrations/supabase/client.server.ts src/integrations/supabase/types.ts
git commit -m "feat: add Supabase clients and database types"

git add src/integrations/supabase/auth-attacher.ts src/integrations/supabase/auth-middleware.ts src/integrations/supabase/cron-auth.ts src/integrations/supabase/previewAuthStorage.ts
git commit -m "feat: add Supabase authentication and middleware"

git add src/lib/error-capture.ts src/lib/error-page.ts src/lib/lovable-error-reporting.ts
git commit -m "feat: add error capture and reporting"

# Look and structure
git add src/styles.css
git commit -m "feat: add garage-style visual theme (dark, amber, hazard stripe)"

git add src/components/Logo.tsx
git commit -m "feat: add Reis Sound logo"

git add src/components/ThemeToggle.tsx
git commit -m "feat: add light/dark theme toggle"

git add src/router.tsx src/server.ts src/start.ts src/routeTree.gen.ts
git commit -m "feat: add TanStack Start router and server"

git add src/routes/__root.tsx
git commit -m "feat: add root layout with 404 page and error handling"

# Public pages
git add src/assets
git commit -m "feat: add storefront facade photo"

git add src/routes/index.tsx
git commit -m "feat: add home page with services, reviews and map"

git add src/lib/products.ts
git commit -m "feat: add product query and price formatting"

git add src/routes/produtos.tsx
git commit -m "feat: add product catalog with affiliate disclosure"

# Admin area
git add src/routes/auth.tsx
git commit -m "feat: add login and sign-up page"

git add src/routes/_authenticated/route.tsx
git commit -m "feat: add protected route for signed-in users"

git add src/routes/_authenticated/admin.tsx
git commit -m "feat: add admin panel to add, edit and remove products"

# Tests and docs
git add src/test
git commit -m "test: add routing tests"

git add -A
git commit -m "docs: add README and setup instructions"

# ---------- 4) Safety check ----------
if git ls-files | grep -qx ".env"; then
  echo "DANGER: .env was added to Git. Do NOT push."
  exit 1
fi

git log --oneline
echo "OK: $(git rev-list --count HEAD) commits criados e .env fora do Git."

# ---------- 5) Enviar para o GitHub (repositório privado) ----------
git remote add origin "$REPO_URL"
git push -u origin main
echo "Pronto: código enviado para $REPO_URL"
