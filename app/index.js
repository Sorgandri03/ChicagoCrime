const http = require('http');

// /c:/Users/throa/Desktop/VisAnal/app/index.js
// Run: node index.js  then open http://localhost:3000

const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    try {
        const rawPath = decodeURIComponent(req.url.split('?')[0]);
        // Serve index.html for root
        if (rawPath === '/' || rawPath === '/index.html') {
            const indexPath = path.join(__dirname, 'index.html');
            fs.readFile(indexPath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(data);
                }
            });
            return;
        }

        // serve static files requested under /app/ or directly
        let rel = rawPath.replace(/^\/+/, '');
        if (rel.startsWith('app/')) rel = rel.slice('app/'.length);

        // try requested path under __dirname
        let filePath = path.normalize(path.join(__dirname, rel));
        // prevent directory traversal
        if (!filePath.startsWith(__dirname)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }

        const serveFile = (fp) => {
            const ext = path.extname(fp).toLowerCase();
            const types = {
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.geojson': 'application/json',
                '.html': 'text/html; charset=utf-8',
                '.svg': 'image/svg+xml',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg'
            };
            const ct = types[ext] || 'application/octet-stream';
            fs.readFile(fp, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Not found');
                } else {
                    res.writeHead(200, { 'Content-Type': ct });
                    res.end(data);
                }
            });
        };

        fs.stat(filePath, (err, stats) => {
            if (err) {
                // fallback: try serving the basename from __dirname (helps when HTML references /app/graphs/... but files live in app root)
                const alt = path.join(__dirname, path.basename(rel));
                fs.stat(alt, (e2, s2) => {
                    if (e2 || !s2.isFile()) {
                        res.writeHead(404);
                        res.end('Not found');
                    } else {
                        serveFile(alt);
                    }
                });
            } else if (stats.isDirectory()) {
                const idx = path.join(filePath, 'index.html');
                fs.readFile(idx, (ie, idata) => {
                    if (ie) {
                        res.writeHead(404);
                        res.end('Not found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(idata);
                    }
                });
            } else {
                serveFile(filePath);
            }
        });
    } catch (ex) {
        res.writeHead(500);
        res.end('Server error');
    }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('D3 test page running at http://localhost:' + port);
});