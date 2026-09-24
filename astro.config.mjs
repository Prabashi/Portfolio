// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// TODO: replace with your domain (also used for canonical URLs, sitemap and RSS).
	site: 'https://example.com',
	integrations: [mdx(), sitemap(), react()],

	fonts: [
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-plex-sans',
			weights: [400, 500, 600],
			styles: ['normal', 'italic'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			// Self-hosted full font: Google's subsets omit the box-drawing glyphs used in diagrams.
			provider: fontProviders.local(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains',
			fallbacks: ['ui-monospace', 'monospace'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/JetBrainsMono.woff2'],
						weight: '100 800',
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],

	markdown: {
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark-dimmed' },
			defaultColor: false,
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},
});
