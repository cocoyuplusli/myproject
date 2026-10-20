// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// 正式域名。sitemap、canonical、表单跳转地址都依赖它
	site: 'https://www.anlair.com',
	trailingSlash: 'always',
	integrations: [sitemap({ filter: (page) => !page.includes('/thanks/') })],
});
