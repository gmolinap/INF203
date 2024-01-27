"use strict";

import { createServer } from "http";
import { readFile, existsSync, stat } from 'fs';
import { join, extname, sep } from 'path';
import { URL } from 'url'; // Add this import for URL parsing

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

function escapeHtml(html) {
    return html.replace(/</g, "_").replace(/>/g, "_");
}

function webserver(request, response) {
    try {
        const requestUrl = new URL(request.url, `http://${request.headers.host}`);
        let pathname = requestUrl.pathname;

        // Normalize pathname to prevent directory traversal
        pathname = pathname.replace(/^(\.\.[\/\\])+/, '');
        const filePath = join(process.cwd(), pathname.replace(/^\/Files/, ''));

        // Security check to prevent accessing files outside the server directory
        if (!filePath.startsWith(process.cwd() + sep)) {
            throw new Error("Access denied");
        }
        if (pathname === '/bonjour') {
            let name = requestUrl.searchParams.get('nom') || '';
            name = decodeURIComponent(name); // Support accents without escaping HTML
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.write(`<!doctype html><html><body>Bonjour <span>${name}</span></body></html>`);
            response.end();
        }
        
        
        
        
        
        else if (pathname === '/coucou') {
            const name = requestUrl.searchParams.get('name') || '';
            visitedNames.push(escapeHtml(name)); // Escape HTML for security
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(`<!doctype html><html><body>Coucou ${escapeHtml(name)}, the following users have already visited this page: ${visitedNames.join(', ')}</body></html>`);
        } 
        
        
        else if (pathname === '/clear') {
            visitedNames = [];
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>Memory cleared.</body></html>");
        } else if (pathname.startsWith('/Files/')) {
            const resolvedPath = join(process.cwd(), pathname.replace(/^\/Files/, ''));
        
            // Ensure that the resolved path is still within the server directory
            if (!resolvedPath.startsWith(process.cwd() + sep)) {
                response.statusCode = 403; // Forbidden
                response.setHeader("Content-Type", "text/html; charset=utf-8");
                response.end("Access denied");
            } else {
                stat(resolvedPath, (err, stats) => {
                    if (err || !stats.isFile()) {
                        response.statusCode = 404;
                        response.setHeader("Content-Type", "text/html; charset=utf-8");
                        response.end("File not found");
                    } else {
                        const ext = extname(resolvedPath);
                        response.setHeader("Content-Type", mimeType[ext] || 'text/plain; charset=utf-8');
        
                        const fileStream = readFile(resolvedPath, (err, data) => {
                            if (err) {
                                throw err;
                            }
                            response.end(data);
                        });
                    }
                });
            }
        } else if (pathname === '/stop') {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>The server will stop now.</body></html>");
            server.close(); // This will stop the server
            return;
        } else {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>Server works.</body></html>");
        }
    } catch (error) {
        console.error(error);
        response.statusCode = 500;
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(`<!doctype html><html><body>Error: ${error.message}</body></html>`);
    }
}

const port = process.argv[2] || 8000;
const server = createServer(webserver);
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
