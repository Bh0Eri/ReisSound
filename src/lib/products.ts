import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  price: number | null;
  image_url: string | null;
  link: string;
  created_at: string;
};

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Product[];
  },
});

export const formatPrice = (v: number | null) =>
  v == null ? "" : Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
