import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categories = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			description: z.string().optional(),
			cover: image().optional(),
			order: z.number().default(0),
		}),
});

const products = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			category: reference('categories'),
			// 第一张作为封面
			images: z.array(image()).min(1),
			// 用于列表卡片和 meta description
			summary: z.string().max(200),
			// 参数值统一用字符串，例如 "10000-20000"、"0.8 (Maximum)"
			specs: z.array(z.object({ name: z.string(), value: z.string() })).min(1),
			featured: z.boolean().default(false),
			order: z.number().default(0),
		}),
});

export const collections = { categories, products };
