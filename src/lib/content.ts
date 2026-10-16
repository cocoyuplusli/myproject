import { getCollection, type CollectionEntry } from 'astro:content';
import site from '../data/site.json';

type Sortable = { data: { order: number } };

function byOrder<T extends Sortable>(a: T, b: T) {
	return a.data.order - b.data.order;
}

export async function getCategories() {
	return (await getCollection('categories')).sort(byOrder);
}

export async function getProducts(filter?: (p: CollectionEntry<'products'>) => boolean) {
	const all = await getCollection('products');
	return (filter ? all.filter(filter) : all).sort(byOrder);
}

export const productUrl = (id: string) => `/products/${id}/`;
export const categoryUrl = (id: string) => `/products/category/${id}/`;

export function whatsappUrl(text?: string) {
	const base = `https://wa.me/${site.whatsapp}`;
	return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
