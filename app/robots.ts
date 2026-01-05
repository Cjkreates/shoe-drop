export default function robots() {
  const host = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const content = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nSitemap: ${host}/sitemap.xml`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
