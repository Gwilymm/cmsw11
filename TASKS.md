
# ✅ Tâches de Développement – Mon Économat (Astro + Strapi)

Ce fichier regroupe les tâches à réaliser pour ajouter les formulaires de gestion aux entités Item, Category, et Location dans le style rétro + Neo-Memphis.

---

## 🔧 Tâches `Item`

### Tâche 1 – Formulaire de création d’un produit (`Item`)
Créer un formulaire dans `/items/new.astro` pour ajouter un produit.
Champs requis :
- name (text)
- quantity (float)
- unit (select: g, kg, L, mL, pièce)
- expiration_date (date)
- notes (textarea)
- category (select dynamique depuis /api/categories)
- storage_location (select dynamique depuis /api/locations)

Formulaire stylé en Tailwind, ambiance rétro/Neo-Memphis.  
Soumission via fetch (POST /api/items), redirection vers /items/ si succès.

---

### Tâche 2 – Formulaire de modification d’un produit (`Item`)
Créer `/items/[id]/edit.astro` pour modifier un produit existant.  
Récupérer l’item avec fetch(`/api/items/:id`)  
Pré-remplir le formulaire (mêmes champs que `new.astro`)  
Soumission via fetch (PUT), puis redirection vers `/items/`

---

## 📦 Tâches `Category`

### Tâche 3 – Formulaire de création d’une catégorie
Créer `/categories/new.astro` pour créer une catégorie.  
Champs :
- name (text)
- icon (text ou URL image)

POST vers `/api/categories`. Redirection vers `/categories/`

---

### Tâche 4 – Formulaire de modification d’une catégorie
Créer `/categories/[id]/edit.astro`  
Fetch des données avec `/api/categories/:id`  
Pré-remplir formulaire, puis envoyer via PUT

---

## 🧊 Tâches `Location`

### Tâche 5 – Formulaire de création d’un lieu de stockage
Créer `/locations/new.astro`  
Champs :
- name (text)
- temperature_sensitive (checkbox)

POST vers `/api/locations`, puis redirection vers `/locations/`

---

### Tâche 6 – Formulaire de modification d’un lieu
Créer `/locations/[id]/edit.astro`  
Pré-remplir les champs via fetch(`/api/locations/:id`)  
Envoyer les données en PUT

---

## 🧩 Tâche utilitaire

### Tâche 7 – Composant `<SelectRemote.astro>`
Créer un composant `SelectRemote.astro`  
Props :
- `label` (texte)
- `endpoint` (URL à appeler pour charger les options)
- `valueKey` (champ utilisé comme `value`)
- `labelKey` (champ utilisé comme `label`)
- `name` (attribut name du champ)

Ce composant affiche une liste déroulante dynamique stylée rétro avec Tailwind.
