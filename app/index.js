const http = require('http');

// /c:/Users/throa/Desktop/VisAnal/app/index.js
// Run: node index.js  then open http://localhost:3000

const html = `<!doctype html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>D3 Test Graph</title>
    <style>
        body { margin:0; font-family: Arial, sans-serif; }
        svg { width:100vw; height:100vh; display:block; background:#f8f9fb; }
        .link { stroke:#999; stroke-opacity:0.6; }
        .node { stroke:#fff; stroke-width:1.5px; cursor: pointer; }
        .label { font-size:12px; pointer-events:none; }
    </style>
</head>
<body>
    <svg></svg>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script>
        const width = window.innerWidth;
        const height = window.innerHeight;

        const nodes = [
            { id: 'A' }, { id: 'B' }, { id: 'C' },
            { id: 'D' }, { id: 'E' }, { id: 'F' }
        ];
        const links = [
            { source: 'A', target: 'B' },
            { source: 'A', target: 'C' },
            { source: 'B', target: 'D' },
            { source: 'C', target: 'D' },
            { source: 'D', target: 'E' },
            { source: 'E', target: 'F' }
        ];

        const svg = d3.select('svg')
            .attr('viewBox', [0, 0, width, height]);

        const link = svg.append('g')
            .attr('stroke-width', 2)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('class','link');

        const node = svg.append('g')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .call(drag(d3.forceSimulation(nodes)
                .force('link', d3.forceLink(links).id(d => d.id).distance(120))
                .force('charge', d3.forceManyBody().strength(-400))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .on('tick', ticked)
            ));

        node.append('circle')
            .attr('r', 18)
            .attr('fill', (d,i) => d3.schemeTableau10[i % 10])
            .attr('class','node');

        node.append('text')
            .attr('class','label')
            .attr('dy', 4)
            .attr('x', 0)
            .attr('text-anchor','middle')
            .text(d => d.id);

        function ticked() {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
        }

        function drag(sim) {
            function dragstarted(event, d) {
                if (!event.active) sim.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }
            function dragended(event, d) {
                if (!event.active) sim.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
            return d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended);
        }

        // resize handling
        window.addEventListener('resize', () => {
            const w = window.innerWidth, h = window.innerHeight;
            svg.attr('viewBox', [0,0,w,h]);
        });
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('D3 test page running at http://localhost:' + port);
});