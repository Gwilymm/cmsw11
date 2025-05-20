// Helper functions for SelectRemote component
export const fetchRemoteData = async (endpoint) => {
	try {
		const response = await fetch(`http://localhost:1337${endpoint}`);
		if (!response.ok) throw new Error(`Erreur lors de la requête: ${response.status}`);
		const result = await response.json();
		return result.data || [];
	} catch (error) {
		console.error(`Erreur lors de la récupération des données depuis ${endpoint}:`, error);
		return [];
	}
};

export const sortItems = (items, labelKey) => {
	return [ ...items ].sort((a, b) => {
		const labelA = (a[ labelKey ] ?? a.attributes?.[ labelKey ] ?? '').toString();
		const labelB = (b[ labelKey ] ?? b.attributes?.[ labelKey ] ?? '').toString();
		return labelA.localeCompare(labelB);
	});
};

export const generateUniqueId = (name) => {
	return `field-${name}-${Math.random().toString(36).substring(2, 9)}`;
};
