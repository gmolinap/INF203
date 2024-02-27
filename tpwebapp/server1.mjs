import fs from 'fs';
import { createServer } from "http";
import { readFile, writeFile, existsSync, stat } from 'fs';
import { join, extname, sep } from 'path';
import *  as url from "url";
import * as querystring from "querystring";

const port = process.argv[2] || 8000;

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

const storageFilePath = 'storage.json';

let storageData = [];

function loadStorage() {
    if (existsSync(storageFilePath)) {
        readFile(storageFilePath, (err, data) => {
            if (err) {
                console.error("Error reading storage file:", err);
                return;
            }
            storageData = JSON.parse(data);
        });
    } else {
        storageData = [];
        saveStorage(storageData);
    }
}

loadStorage();

function saveStorage(data, response) {
    writeFile(storageFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error writing storage file:", err);
            if (response) {
                response.statusCode = 500;
                response.end("Error writing storage file");
            }
            return;
        }
        if (response) {
            response.end("Operation successful");
        }
    });
}

function generatePieChart(data) {
    let svg = '<svg viewBox="-1 -1 2 2" style="transform: rotate(-0.25turn)">';
    let totalValue = data.reduce((acc, slice) => acc + slice.value, 0);
    let offset = 0;

    data.forEach(slice => {
        const [startX, startY] = getCoordinatesForPercent(offset);
        offset += slice.value / totalValue;
        const [endX, endY] = getCoordinatesForPercent(offset);
        const largeArcFlag = slice.value / totalValue > 0.5 ? 1 : 0;
        const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0 Z`;

        svg += `<path d="${pathData}" fill="${slice.color}"/>`;
        // Add text element here if needed
    });

    svg += '</svg>';
    return svg;
}

function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}

function webserver(request, response) {
    let url_parse = url.parse(request.url);
    let pathname = url_parse.pathname;
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);


    if (pathname.startsWith('/Files/')) {
        const filePath = join(process.cwd(), pathname.replace(/^\/Files/, ''));
        if (!filePath.startsWith(process.cwd() + sep)) {
            response.statusCode = 403;
            response.end("Access denied");
            return;
        }
        stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                response.statusCode = 404;
                response.end("File not found");
                return;
            }
            readFile(filePath, (err, data) => {
                if (err) {
                    response.statusCode = 500;
                    response.end("Error reading file");
                    return;
                }
                const ext = extname(filePath);
                response.setHeader("Content-Type", mimeType[ext] || 'text/plain');
                response.end(data);
            });
        });
    } else if (pathname === '/stop') {
        response.end("Server stopping", () => server.close());
    } else if (pathname === '/Data') {
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(storageData));
    } else if (pathname === '/add') {
        const newElement = {
            title: requestUrl.searchParams.get('title'),
            color: requestUrl.searchParams.get('color'),
            value: parseInt(requestUrl.searchParams.get('value'), 10)
        };
        storageData.push(newElement);
        saveStorage(storageData, response);
    } else if (pathname === '/remove') {
        let query = querystring.parse(url_parse.query);
        console.log(query);
        var data = JSON.parse(fs.readFileSync("storage.json"));
        data.splice(query.index, 1);
        fs.writeFileSync("storage.json", JSON.stringify(data));
        response.writeHeader(200);
        response.end();
        return;
    } else if (pathname === '/clear') {
        storageData = [{ "title": "empty", "color": "red", "value": 1 }];
        saveStorage(storageData, response);
    } else if (pathname === '/restore') {
        storageData = [
            { "title": "foo", "color": "red", "value": 20 },
            { "title": "bar", "color": "ivory", "value": 100 }
            // ... add more elements as needed
        ];
        saveStorage(storageData, response);
    } else if (pathname === '/PChart') {
        var slices = JSON.parse(fs.readFileSync("storage.json"));
        var rep = '<svg id="pieChart" viewBox="-1 -1 2 2" height=500 width=500>';
        var value_tot = 0;
        for (var slice of slices) {
            value_tot += new Number(slice.value);
        }
        var cum = 0;
        for (var slice of slices) {
            var percent = slice.value / value_tot;
            var [x_start, y_start] = getCoordinatesForPercent(cum);
            cum += percent;
            var [x_end, y_end] = getCoordinatesForPercent(cum);
            var largeArcFlag = percent > .5 ? 1 : 0;
            var pathData = [
                `M ${x_start} ${y_start}`,
                `A 1 1 0 ${largeArcFlag} 1 ${x_end} ${y_end}`,
                `L 0 0`,
            ].join(' ');

            rep += '<path d="' + pathData + '" fill="' + slice.color + '"></path>';
        }
        rep += '</svg>'
        response.writeHeader(200, { "Content-Type": "image/svg+xml" });
        response.write(rep);
        response.end();
    
    } else {
        response.end("Server works.");
    }
}

const server = createServer(webserver);
server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
