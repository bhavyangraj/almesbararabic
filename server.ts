import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import compression from 'compression';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const commonEngine = new CommonEngine();

  // ✅ 1. Gzip/Brotli compression for all responses
  server.use(compression());

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // ✅ 2. Static assets with long cache + immutable (hashed filenames)
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
      immutable: true,           // tells browser: never re-check hashed files
      setHeaders: (res, filePath) => {
        // JS/CSS chunks are hashed — safe to cache forever
        if (/\.(js|css|woff2|woff|ttf)$/.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
        // Images can be cached but re-validated
        if (/\.(jpg|jpeg|png|webp|svg|ico|gif)$/.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        }
      },
    }),
  );

  // ✅ 3. Scan browser dist folder once at startup to find chunk filenames
  //    (Angular generates dynamic names like chunk-XXXX.js on every build)
  let criticalChunks: string[] = [];
  try {
    const files = readdirSync(browserDistFolder);
    criticalChunks = files
      .filter(f => f.endsWith('.js') && !f.includes('worker'))
      .map(f => `/${f}`);
  } catch {
    criticalChunks = [];
  }

  // ✅ 4. Angular SSR with injected preload hints + security headers
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    // SSR HTML pages should not be cached by CDN aggressively
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Security headers (bonus)
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
        ],
      })
      .then((html) => {
        // ✅ 5. Inject <link rel="modulepreload"> for all JS chunks dynamically
        //    This tells the browser to fetch chunks BEFORE they're discovered
        const preloadLinks = criticalChunks
          .map(chunk => `<link rel="modulepreload" href="${chunk}" as="script">`)
          .join('\n    ');

        // ✅ 6. Inject preconnect to your backend API domain
        const preconnectLinks = `
    <link rel="preconnect" href="https://almesbararbackend-2.vercel.app" crossorigin>
    <link rel="dns-prefetch" href="https://almesbararbackend-2.vercel.app">`;

        html = html.replace(
          '</head>',
          `${preconnectLinks}\n    ${preloadLinks}\n</head>`
        );

        res.send(html);
      })
      .catch((err) => {
        console.error('SSR Error:', err);
        next(err);
      });
  });

  return server;
}

if (process.env['VERCEL'] !== '1') {
  const port = Number(process.env['PORT']) || 4001;
  const server = app();
  server.listen(port, () => {
    console.log(`SSR running on http://localhost:${port}`);
  });
}