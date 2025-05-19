import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (
  { request, cookies, url },
  next
) => {
  const token = cookies.get("token")?.value;
  const pathname =
    typeof url === "string" ? new URL(url, request.url).pathname : url.pathname;

  if (
    pathname.startsWith("/items") ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/locations")
  ) {
    if (!token) {
      // Build an absolute URL for the Location header:
      const loginUrl = new URL("/auth/login", request.url).toString();
      return Response.redirect(loginUrl, 302);
    }

    const meRes = await fetch("http://localhost:1337/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!meRes.ok) {
      cookies.delete("token", { path: "/" });
      const loginUrl = new URL("/auth/login", request.url).toString();
      return Response.redirect(loginUrl, 302);
    }
  }

  return next();
};
