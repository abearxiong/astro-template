import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import pkgs from './package.json';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

const isDev = process.env.NODE_ENV === 'development';
const plugins = [tailwindcss()]
const isCNB = process.env.CNB === 'true';
if (isDev && !isCNB) {
  plugins.push(basicSsl());
}
let target = process.env.VITE_API_URL || 'http://localhost:3000';
let proxy = {
  '/root/center/': {
    target: `${target}/root/center/`,
  },
  '/user/login/': {
    target: `${target}/user/login/`,
  },
  '/api': {
    target: target,
    changeOrigin: true,
    ws: true,
    rewriteWsOrigin: true,
    cookieDomainRewrite: 'localhost',
  },
};

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
    plugins,
    define: {
      BASE_NAME: JSON.stringify(pkgs.basename),
    },
    server: {
      port: 7008,
      host: '0.0.0.0',
      allowedHosts: true,
      proxy,
    },
  },
});
