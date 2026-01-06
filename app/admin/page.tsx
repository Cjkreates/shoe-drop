import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLoginPage() {
  async function authenticate(formData: FormData) {
    "use server";
    const password = String(formData.get("password") || "");

    if (password === process.env.ADMIN_PASSWORD) {
      // Set cookie and redirect
      cookies().set({ name: "admin_session", value: "true", path: "/" });
      redirect("/admin/dashboard");
    }

    return;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50">
      <div className="w-full max-w-sm p-8 bg-zinc-900 border border-zinc-800 rounded">
        <h1 className="text-xl font-bold uppercase text-center mb-6">RESTRICTED ACCESS</h1>
        <form action={authenticate} className="flex flex-col gap-4">
          <input
            name="password"
            type="password"
            placeholder="ENTER PIN"
            className="p-3 bg-zinc-800 border border-zinc-700 text-zinc-50"
          />
          <button
            type="submit"
            className="py-3 bg-zinc-50 text-zinc-950 font-bold uppercase"
          >
            ACCESS
          </button>
        </form>
      </div>
    </div>
  );
}
