import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { productsQuery, formatPrice, type Product } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ReisSoundStock" },
      { name: "description", content: "Gerenciar produtos do ReisSoundStock." },
      { property: "og:title", content: "Admin — ReisSoundStock" },
      { property: "og:description", content: "Gerenciar produtos do ReisSoundStock." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: isAdmin, isLoading: checking } = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      return !!data;
    },
  });
  const { data: products } = useQuery(productsQuery);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  function resetForm() {
    setEditingId(null);
    setName(""); setPrice(""); setImage(""); setLink("");
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price == null ? "" : String(p.price).replace(".", ","));
    setImage(p.image_url ?? "");
    setLink(p.link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name,
      link,
      image_url: image || null,
      price: price ? Number(price.replace(",", ".")) : null,
    };
    const { error } = editingId
      ? await supabase.from("products").update(payload).eq("id", editingId)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) { toast.error("Não foi possível salvar"); return; }
    toast.success(editingId ? "Produto atualizado" : "Produto adicionado");
    resetForm();
    qc.invalidateQueries({ queryKey: ["products"] });
  }

  async function remove(id: string) {
    if (!confirm("Remover este produto?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast.error("Não foi possível remover"); return; }
    if (editingId === id) resetForm();
    qc.invalidateQueries({ queryKey: ["products"] });
  }

  return (
    <div className="min-h-screen">
      <div className="hazard-stripe h-2" />
      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-6">
        <Logo />
        <Button variant="outline" size="sm" onClick={signOut}>Sair</Button>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20">
        {checking ? (
          <p className="text-muted-foreground">Verificando acesso…</p>
        ) : !isAdmin ? (
          <p className="rounded-md border border-dashed p-10 text-center text-muted-foreground">
            Esta conta não tem acesso de administrador.
          </p>
        ) : (
          <>
            <h1 className="font-display text-4xl">{editingId ? "Editar produto" : "Adicionar produto"}</h1>
            <form onSubmit={save} className="mt-4 grid gap-4 rounded-lg border bg-card p-5 md:grid-cols-2">
              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input id="price" inputMode="decimal" placeholder="199,90" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="image">Link da foto</Label>
                <Input id="image" type="url" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="link">Link de afiliado</Label>
                <Input id="link" type="url" required placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} />
              </div>
              <Button type="submit" disabled={saving} className={editingId ? "" : "md:col-span-2"}>
                {saving ? "Salvando…" : editingId ? "Salvar alterações" : "Adicionar"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>Cancelar edição</Button>
              )}
            </form>

            <h2 className="mt-10 font-display text-3xl">Produtos ({products?.length ?? 0})</h2>
            <ul className="mt-4 divide-y rounded-lg border bg-card">
              {products?.map((p) => (
                <li key={p.id} className="flex items-center gap-3 p-3">
                  <div className="h-12 w-12 shrink-0 rounded bg-secondary">
                    {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-contain" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-sm text-primary">{formatPrice(p.price)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => startEdit(p)} aria-label="Editar">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(p.id)} aria-label="Remover">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
