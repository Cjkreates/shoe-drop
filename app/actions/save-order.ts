"use server";
import { supabase } from "@/lib/supabase";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type SaveOrderInput = {
  email: string;
  amount: number;
  items: CartItem[];
};

export async function saveOrder({ email, amount, items }: SaveOrderInput) {
  try {
    const { error } = await supabase.from("orders").insert([{ email, amount, items }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("saveOrder error:", err?.message || err);
    return { success: false, error: String(err) };
  }
}
