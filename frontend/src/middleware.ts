import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request, cookies, url } = context;
  const token = cookies.get("token")?.value;

  // Protéger toutes les routes commençant par /dashboard
  if (url.pathname.startsWith("/dashboard")) {
    if (!token) {
      return Response.redirect("/login", 302);
    }
    // Optionnel : valider le token auprès de Strapi
    const meRes = await fetch("http://localhost:1337/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!meRes.ok) {
      cookies.delete("token", { path: "/" });
      return Response.redirect("/login", 302);
    }
  }
  return next();
};
