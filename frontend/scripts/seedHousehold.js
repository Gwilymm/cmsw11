import 'dotenv/config';
import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';

const STRAPI = 'http://localhost:1337';
// Récupérer le token d'API Strapi depuis STRAPI_TOKEN ou STRAPI_API_TOKEN
const TOKEN = process.env.STRAPI_TOKEN_API || process.env.STRAPI_API_TOKEN;
if (!TOKEN) {
	console.error('Il manque la variable d\'environnement STRAPI_TOKEN (ou STRAPI_API_TOKEN)');
	process.exit(1);
}

// En-têtes HTTP pour Strapi
const HEADER = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${TOKEN}`,
};


// scripts/seedHousehold.js

// … en-têtes, imports, fonctions createCategory/createLocation/createItem

// Liste de 20 catégories « maison »
const CATEGORY_LIST = [
	{ name: 'Produits laitiers', icon: '🥛' },
	{ name: 'Fruits & Légumes', icon: '🍎' },
	{ name: 'Viandes & Poissons', icon: '🍗' },
	{ name: 'Boissons', icon: '🥤' },
	{ name: 'Épicerie fine', icon: '🧂' },
	{ name: 'Snacks & Gourmandises', icon: '🍪' },
	{ name: 'Petit-déjeuner', icon: '🥐' },
	{ name: 'Pâtes & Riz', icon: '🍝' },
	{ name: 'Conserves & Bocaux', icon: '🥫' },
	{ name: 'Surgelés', icon: '❄️' },
	{ name: 'Hygiène & Hygiène dentaire', icon: '🪥' },
	{ name: 'Ménage & Nettoyage', icon: '🧹' },
	{ name: 'Lessive & Entretien', icon: '🧺' },
	{ name: 'Cosmétiques', icon: '💄' },
	{ name: 'Santé & Médicaments', icon: '💊' },
	{ name: 'Bébés & Puériculture', icon: '🍼' },
	{ name: 'Animaux & Accessoires', icon: '🐶' },
	{ name: 'Papeterie & Fournitures', icon: '📎' },
	{ name: 'Boissons alcoolisées', icon: '🍷' },
	{ name: 'Boulangerie & Viennoiseries', icon: '🥖' },
];

// Liste de 10 emplacements réalistes
const LOCATION_LIST = [
	{ name: 'Frigo', temperature_sensitive: true },
	{ name: 'Congélateur', temperature_sensitive: true },
	{ name: 'Placard Cuisine', temperature_sensitive: false },
	{ name: 'Cellier', temperature_sensitive: false },
	{ name: 'Cave à vin', temperature_sensitive: false },
	{ name: 'Armoire SDB', temperature_sensitive: false },
	{ name: 'Machine à laver', temperature_sensitive: false },
	{ name: 'Lave-vaisselle', temperature_sensitive: false },
	{ name: 'Étagère Salon', temperature_sensitive: false },
	{ name: 'Boîte à pharmacie', temperature_sensitive: false },
];
async function createCategory(c) {
	const res = await fetch(`${STRAPI}/api/categories`, {
		method: 'POST',
		headers: HEADER,
		body: JSON.stringify({ data: c }),
	});
	const result = await res.json();
	if (!res.ok || !result.data) {
		console.error('Erreur création catégorie:', result);
		throw new Error(`Échec création catégorie ${c.name}`);
	}
	return result.data.id;
}

async function createLocation(l) {
	const res = await fetch(`${STRAPI}/api/locations`, {
		method: 'POST',
		headers: HEADER,
		body: JSON.stringify({ data: l }),
	});
	const result = await res.json();
	if (!res.ok || !result.data) {
		console.error('Erreur création lieu:', result);
		throw new Error(`Échec création lieu ${l.name}`);
	}
	return result.data.id;
}

async function createItem(catId, locId) {
	const name = faker.commerce.productName();
	// Utiliser la nouvelle API faker.number pour générer une quantité (float avec step 0.5)
	const quantity = faker.number.float({ min: 1, max: 10, fractionDigits: 2, precision: 0.5 });
	const unit = faker.helpers.arrayElement([ 'g', 'kg', 'L', 'mL', 'piece' ]);
	const expiration_date = faker.date.soon(30).toISOString().split('T')[ 0 ];
	const notes = faker.datatype.boolean()
		? faker.lorem.sentence()
		: '';

	const payload = {
		data: {
			name,
			quantity,
			unit,
			expiration_date,
			notes,
			category: catId,
			storage_location: locId,
			user: 1,
		}
	};

	const res = await fetch(`${STRAPI}/api/items`, {
		method: 'POST',
		headers: HEADER,
		body: JSON.stringify(payload),
	});
	return res.ok;
}

async function run() {
	if (!TOKEN) {
		console.error('Il manque STRAPI_TOKEN dans tes env vars');
		process.exit(1);
	}

	// 1) Création des catégories
	const catIds = [];
	for (const c of CATEGORY_LIST) {
		const id = await createCategory(c);
		console.log(`Catégorie "${c.name}" créée (id=${id})`);
		catIds.push(id);
	}

	// 2) Création des lieux
	const locIds = [];
	for (const l of LOCATION_LIST) {
		const id = await createLocation(l);
		console.log(`Lieu "${l.name}" créé (id=${id})`);
		locIds.push(id);
	}

	// 3) Création d’items
	for (let i = 0; i < 50; i++) {
		const catId = faker.helpers.arrayElement(catIds);
		const locId = faker.helpers.arrayElement(locIds);
		const ok = await createItem(catId, locId);
		console.log(`Item #${i + 1} ${ok ? 'créé' : 'ÉCHEC'}`);
	}

	console.log('✅ Seed terminé !');
}

run().catch(console.error);
