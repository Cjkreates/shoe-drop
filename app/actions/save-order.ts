"use server";
import { createClient } from "@supabase/supabase-js";

type SaveOrderInput = {
  email: string;
  amount: number;
  items: any[];
};

export async function saveOrder({ email, amount, items }: SaveOrderInput) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );

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
