import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		// Posts in a series are grouped and ordered by `seriesPart`.
		series: z.string().optional(),
		seriesPart: z.number().optional(),
		// Drafts are visible in `astro dev` but excluded from production builds.
		draft: z.boolean().default(false),
		// Marks sample content generated as a starting point. Remove once rewritten.
		placeholder: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		// One-line pitch shown on cards.
		summary: z.string(),
		status: z.enum(['live', 'wip', 'archived']).default('live'),
		stack: z.array(z.string()),
		// Short, quantified callouts shown on the card and detail header.
		highlights: z.array(z.string()).default([]),
		repo: z.url().optional(),
		demo: z.url().optional(),
		// Lower numbers are listed first.
		order: z.number().default(100),
		featured: z.boolean().default(false),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
		placeholder: z.boolean().default(false),
	}),
});

export const collections = { blog, projects };
