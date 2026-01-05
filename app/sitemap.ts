import { PRODUCTS } from "@/lib/products";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const staticRoutes = ["/", "/shop", "/about", "/collections"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${base}/product/${p.id}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...productRoutes];
}
