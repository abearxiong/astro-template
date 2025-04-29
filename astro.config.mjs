import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import pkgs from './package.json';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
  // ...
  // site: 'https://kevisual.xiongxiao.me/root/astro',
  base: isDev ? undefined : pkgs.basename,
  integrations: [
    mdx(),
    react(), //
    // sitemap(), // sitemap must be site has a domain
  ],

  vite: {
    plugins: [tailwindcss()],
    define: {
      BASE_NAME: JSON.stringify(pkgs.basename),
    },
  },
});
