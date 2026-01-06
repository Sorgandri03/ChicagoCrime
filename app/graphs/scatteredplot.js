(function() {
    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const container = document.getElementById('scatteredplot');
    let cachedData = null;

    function draw(data){
        const width = (container ? container.offsetWidth : 460) - margin.left - margin.right;
        const height = (container ? container.offsetHeight : 300) - margin.top - margin.bottom;

        d3.select('#scatteredplot').selectAll('*').remove();

        const svg = d3.select("#scatteredplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add X axis
        const x = d3.scaleLinear()
            .domain([0, 4000])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 500000])
            .range([ height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .join("circle")
                .attr("cx", function (d) { return x(d.GrLivArea); } )
                .attr("cy", function (d) { return y(d.SalePrice); } )
                .attr("r", 1.5)
                .style("fill", "#69b3a2");
    }

    function debounce(fn, delay){ let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), delay); }; }

    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv").then(function(data){
        cachedData = data;
        draw(cachedData);
        window.addEventListener('resize', debounce(() => draw(cachedData), 200));
    });

})();