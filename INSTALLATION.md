# Documentation d'installation du projet Astro/Strapi

Ce guide explique comment installer et lancer l'ensemble du projet (frontend Astro + backend Strapi), ainsi que la configuration des fichiers `.env`.

## Prérequis

- **Node.js** v18 à v22 (recommandé : v20)
- **npm** (ou pnpm/yarn)
- **Git**

## 1. Cloner le dépôt

```sh
git clone <url-du-repo>
cd cms
```

## 2. Installation du backend (Strapi)

```sh
cd economat-backend
npm install
```

### Configuration du fichier `.env`

Crée un fichier `.env` à la racine de `economat-backend/` en t'inspirant de `.env.example` :

```
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```

> **Remplace chaque valeur `tobemodified` par une chaîne secrète forte et unique.**

#### (Optionnel) Variables pour la base de données PostgreSQL
Si tu utilises PostgreSQL, ajoute aussi :
```
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=motdepasse
DATABASE_SSL=false
```

### Lancer Strapi

```sh
npm run develop
```

L'admin Strapi sera accessible sur [http://localhost:1337/admin](http://localhost:1337/admin)

## 3. Installation du frontend (Astro)

Dans un autre terminal :

```sh
cd frontend
npm install
```

### Lancer le serveur Astro

```sh
npm run dev
```

Le site sera accessible sur [http://localhost:4321](http://localhost:4321)

## 4. Variables d'environnement côté frontend

> **Aucune variable d'environnement n'est requise par défaut pour le frontend.**

Si tu veux surcharger l'URL de l'API Strapi, crée un fichier `.env` dans `frontend/` :
```
VITE_API_URL=http://localhost:1337
```
Et adapte les appels API dans le code si besoin.

## 5. (Optionnel) Remplir la base avec des données de test

Un script d'exemple existe dans `frontend/scripts/seedHousehold.js`.

```sh
cd frontend
node scripts/seedHousehold.js
```

## 6. Accès et authentification

- Inscris-toi via `/auth/register` sur le frontend.
- Connecte-toi via `/auth/login`.
- L'authentification utilise un JWT stocké dans le localStorage.

## 7. Dépannage

- Si le frontend ne trouve pas l'API, vérifie que Strapi tourne bien sur `localhost:1337`.
- Si tu modifies `.env`, relance le serveur concerné.

## 8. Structure du projet

```
/
├── economat-backend/   # Strapi (API, admin, base de données)
├── frontend/           # Astro (site web)
└── docs/               # Documentation technique et UML
```

---
Pour toute question, consulte les fichiers README de chaque dossier ou la documentation officielle :
- [Astro](https://docs.astro.build)
- [Strapi](https://docs.strapi.io)
