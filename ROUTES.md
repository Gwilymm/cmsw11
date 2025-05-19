# Documentation des routes API et Frontend

## 📦 Backend (Strapi) – API REST

### Catégories
- `GET    /api/categories` : Liste toutes les catégories
- `GET    /api/categories/:id` : Détail d'une catégorie
- `POST   /api/categories` : Créer une catégorie
- `PUT    /api/categories/:id` : Modifier une catégorie
- `DELETE /api/categories/:id` : Supprimer une catégorie

### Articles (Items)
- `GET    /api/items` : Liste tous les articles
- `GET    /api/items/:id` : Détail d'un article
- `POST   /api/items` : Créer un article
- `PUT    /api/items/:id` : Modifier un article
- `DELETE /api/items/:id` : Supprimer un article

### Emplacements (Locations)
- `GET    /api/locations` : Liste tous les emplacements
- `GET    /api/locations/:id` : Détail d'un emplacement
- `POST   /api/locations` : Créer un emplacement
- `PUT    /api/locations/:id` : Modifier un emplacement
- `DELETE /api/locations/:id` : Supprimer un emplacement

---

## 🌐 Frontend (Astro)

- `/` : Accueil
- `/categories` : Liste des catégories
- `/categories/new` : Ajouter une catégorie
- `/categories/[id]/edit` : Modifier une catégorie
- `/items` : Liste des articles
- `/items/new` : Ajouter un article
- `/items/[id]/edit` : Modifier un article
- `/locations/new` : Ajouter un emplacement
- `/locations/[id]/edit` : Modifier un emplacement

---
