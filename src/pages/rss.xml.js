import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { getPosts } from '../lib/content';

export async function GET(context) {
	const posts = await getPosts();
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: `/blog/${post.id}/`,
		})),
	});
}
