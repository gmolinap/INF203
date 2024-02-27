"use strict";

import { createServer } from "http";
import { readFile, existsSync, stat } from 'fs';
import { join, normalize, sep, extname } from 'path';
import { URL } from 'url';
import * as querystring from 'querystring';

// Define MIME types for common file extensions
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
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

// Helper function to escape HTML characters
function escapeHtml(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function webserver(request, response) {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    let pathname = normalize(requestUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

    try {
        if (pathname === "/") {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end("<!doctype html><html><body>Server works.</body></html>");
            return;
        } else if (pathname === '/clear') {
            visitedNames = [];
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end('<html><body>The list of users has been cleared.</body></html>');
            return;
        } else if (pathname === '/stop') {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end("<!doctype html><html><body>The server will stop now.</body></html>");
            process.exit(0); // This will stop the server
            return;
        } else if (pathname.startsWith('/Files/')) {
            serveFile(request, response, pathname);
            return;
        } else if (pathname.startsWith("/bonjour")) {
            const name = escapeHtml(querystring.unescape(requestUrl.searchParams.get('nom') || ''));
            response.writeHead(200, { 'Content-Type': 'text/html;  charset=utf-8' });
            response.end(`<!doctype html><html><body>bonjour ${name}</body></html>`);
            return;
        } else if (pathname.startsWith("/coucou")) {
            let name = querystring.unescape(querystring.parse(request.url.split("?").pop()).user);
            name = name.replace(/[<>]/g, "_");
            visitedNames.push(name);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(`<html><body>coucou ${name}, the following users have already visited this page: ${visitedNames.join(', ')}</body></html>`);
            return;
        } else {
            throw new Error('404');
        }
    } catch (err) {
        if (err.message === '404') {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<html><body>404 Not Found</body></html>');
        } else {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end(`<html><body>Error: ${err.message}</body></html>`);
        }
    }
}

function serveFile(request, response, pathname) {
    const filePath = join(process.cwd(), pathname.replace(/^\/Files/, ''));
    if (!existsSync(filePath) || !filePath.startsWith(process.cwd() + sep)) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<html><body>404 Not Found</body></html>');
        return;
    }
    stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<html><body>File not found</body></html>');
            return;
        }
        const ext = extname(filePath);
        response.writeHead(200, { 'Content-Type': mimeType[ext] || 'text/plain' });
        readFile(filePath, (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.end('<html><body>Error reading file</body></html>');
                return;
            }
            response.end(data);
        });
    });
}

const port = process.argv[2] || 8000;
const server = createServer(webserver);
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
