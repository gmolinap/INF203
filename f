"use strict";

import { createServer } from "http";
import { readFile, existsSync } from 'fs';
import { join, extname } from 'path';
import { parse } from 'querystring'; // Not needed if using URLSearchParams

// Define MIME types for common file extensions
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.mjs': 'application/javascript'
};

let visitedNames = [];

function escapeHtml(html) {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function webserver(request, response) {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    const pathname = requestUrl.pathname;

    // Logic to handle different paths
    if (pathname === '/bonjour') {
        const name = decodeURIComponent(requestUrl.searchParams.get('nom') || '');
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(`<!doctype html><html><body>Bonjour ${escapeHtml(name)}</body></html>`);
    } else if (pathname === '/coucou') {
        const name = escapeHtml(requestUrl.searchParams.get('name') || '');
        visitedNames.push(name);
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(`<!doctype html><html><body>Coucou ${name}, the following users have already visited this page: ${visitedNames.join(', ')}</body></html>`);
    } else if (pathname === '/clear') {
        visitedNames = [];
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(`<!doctype html><html><body>Memory cleared.</body></html>`);
    } else if (pathname.startsWith('/Files/')) {
        const filePath = join(process.cwd(), pathname.replace('/Files/', ''));
        if (!filePath.startsWith(process.cwd())) {
            response.statusCode = 404;
            response.end("Access Denied!");
            return;
        }
        if (existsSync(filePath)) {
            readFile(filePath, (err, data) => {
                if (err) {
                    response.statusCode = 404;
                    response.end("File not found");
                    return;
                }
                const ext = extname(filePath);
                response.setHeader("Content-Type", mimeType[ext] || 'text/plain; charset=utf-8');
                response.end(data);
            });
        } else {
            response.statusCode = 404;
            response.end("File not found");
        }
    } else if (pathname === '/stop') {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    } else {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>Server works.</body></html>");
    }
}

const port = process.argv[2] || 8000;
const server = createServer(webserver);
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
