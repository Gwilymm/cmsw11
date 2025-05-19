import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });
      const data = await res.json();
      if (data.jwt) {
        // Stocker le token dans un cookie SameSite strict
        document.cookie = `token=${data.jwt}; Path=/; SameSite=Strict`;
        window.location.href = "/dashboard";
      } else {
        setError(data.error?.message || "Identifiants invalides");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-cream border border-night/10 p-6 rounded neo-form"
    >
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      {error && (
        <div className="bg-rust/10 border border-l-4 border-rust p-2 mb-4 text-rust">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full py-2 px-3 bg-cream border border-night/30 neo-input"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-bold mb-1">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full py-2 px-3 bg-cream border border-night/30 neo-input"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-2 bg-petrol text-cream font-bold uppercase tracking-wider neo-btn-primary hover:bg-neo-mint transition-colors"
        disabled={loading}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
