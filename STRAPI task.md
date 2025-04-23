
# ✅ Tâches – Connexion Astro à Strapi (Mon Économat)

Cette liste de tâches guide la mise en place complète de la connexion entre le front Astro et le backend Strapi local (http://localhost:1337), pour permettre la récupération et l’envoi de données.

---

## 🌐 Tâche 1 – Ajouter la configuration d’URL de l’API

Créer un fichier `.env` à la racine du projet Astro avec la variable :
```
STRAPI_API_URL=http://localhost:1337
```
Et s’assurer que l’URL est utilisée dans les pages via :
```js
const apiUrl = import.meta.env.STRAPI_API_URL;
```

---

## 🔐 Tâche 2 – Activer les permissions dans Strapi

Dans le panneau admin Strapi (`/admin`) :
- Aller dans **Settings > Roles > Public**
- Autoriser :
  - `find`, `findOne` pour `Item`, `Category`, `Location`
  - `create`, `update` si les formulaires utilisent le rôle public
- Sauvegarder

---

## 🔁 Tâche 3 – Créer un fichier utilitaire `api.ts`

Créer `src/lib/api.ts` dans Astro avec les fonctions suivantes :
- `getAll(endpoint: string)`
- `getOne(endpoint: string, id: string)`
- `create(endpoint: string, data: any)`
- `update(endpoint: string, id: string, data: any)`

Utiliser `fetch()` avec `import.meta.env.STRAPI_API_URL`.

---

## 📄 Tâche 4 – Utiliser `fetch()` pour charger les données dans une page

Dans `/items/index.astro`, ajouter :
```ts
const res = await fetch(`${import.meta.env.STRAPI_API_URL}/api/items?populate=*`);
const items = (await res.json()).data;
```

Afficher ensuite les items avec un `map()`.

---

## 📤 Tâche 5 – Utiliser `fetch()` pour envoyer un formulaire

Dans `/items/new.astro`, utiliser :
```ts
await fetch(`${import.meta.env.STRAPI_API_URL}/api/items`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: form })
});
```

Rediriger si succès.

---

## 🔽 Tâche 6 – Brancher `SelectRemote.astro` aux endpoints `/api/categories` et `/api/locations`

Dans le composant `SelectRemote.astro`, utiliser `fetch()` vers le `endpoint` fourni en prop. Afficher les options dynamiquement dans un `<select>` stylé avec Tailwind.

---

## ✅ Objectif final

Toutes les pages front communiquent avec Strapi local, les listes sont dynamiques, et les formulaires fonctionnels en POST/PUT.
