import { type CollectionEntry, getCollection } from 'astro:content';

// Drafts show up while running `astro dev` and are left out of production builds.
const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', visible);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
	const projects = await getCollection('projects', visible);
	return projects.sort(
		(a, b) => a.data.order - b.data.order || b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export function readingMinutes(body: string | undefined): number {
	const words = (body ?? '').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 220));
}
