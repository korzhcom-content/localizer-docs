// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'
import starlightImageZoom from 'starlight-image-zoom'
import { rehypeLinks } from './plugins/rehype-links';
import { updateFrontmatter } from './plugins/update-frontmatter';
import getSidebar from "./tools/get-sidebar.js"

const base = 'localizer/docs';
const site = 'https://korzh.com';
const outDir = './dist/localizer/docs';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	outDir,
	trailingSlash: "never",
	integrations: [
		starlight({
			title: 'Localizer',
			favicon: '/favicon.ico',
			social: {},
			sidebar: [
				...getSidebar("./src/content/docs/getting-started", false),
				...getSidebar("./src/content/docs/language-manager", true),
				...getSidebar("./src/content/docs/language-wizard", true),
				...getSidebar("./src/content/docs/localizer-references", true),
			],
			customCss: [
				'./src/styles/index.css',
			],
			components: {
				Footer: './src/components/Footer.astro',
				SocialIcons: './src/components/SocialIcons.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
			lastUpdated: true,
			plugins: [
				starlightThemeRapide(),
				starlightImageZoom(),
			],
			tableOfContents: {
				minHeadingLevel: 2,
				maxHeadingLevel: 4,
			},
			credits: false,
		}),
	],
	markdown: {
		rehypePlugins: [[rehypeLinks, { base }]],
		remarkPlugins: [updateFrontmatter]
	}
});
