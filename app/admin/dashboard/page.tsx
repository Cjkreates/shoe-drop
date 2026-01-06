import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PRODUCTS } from "@/lib/products";

export const revalidate = 0; // dynamic

export default async function DashboardPage() {
  // Simple auth gate
  const session = cookies().get("admin_session");
  if (!session?.value) {
    redirect("/admin");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const { data: orders = [] } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((s: number, o: any) => s + (Number(o.amount) || 0), 0);

  return (
    <div className="p-8 min-h-screen bg-black text-green-300">
      <h1 className="text-2xl font-bold mb-6">ADMIN DASHBOARD</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-zinc-900 border border-zinc-800">
          <h2 className="text-sm uppercase text-zinc-400">Total Revenue</h2>
          <p className="text-2xl font-bold">KES {totalRevenue}</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800">
          <h2 className="text-sm uppercase text-zinc-400">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-lg font-bold mb-4">Recent Sales</h3>
        <div className="overflow-auto bg-zinc-900 border border-zinc-800">
          <table className="w-full text-left">
            <thead>
              <tr className="text-zinc-400">
                <th className="p-3">Date</th>
                <th className="p-3">Email</th>
                <th className="p-3">Items</th>
                <th className="p-3">Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any) => (
                <tr key={o.id} className="border-t border-zinc-800">
                  <td className="p-3">{new Date(o.created_at || o.createdAt).toLocaleString()}</td>
                  <td className="p-3">{o.email}</td>
                  <td className="p-3">{Array.isArray(o.items) ? `${o.items.length} items` : "-"}</td>
                  <td className="p-3">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4">Inventory (Products)</h3>
        <div className="grid grid-cols-4 gap-4">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="p-4 bg-zinc-900 border border-zinc-800">
              <div className="text-sm uppercase text-zinc-400">{p.category}</div>
              <div className="font-bold text-lg">{p.name}</div>
              <div className="text-zinc-400">KES {p.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
