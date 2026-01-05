(function() {
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the map div
const svg = d3.select("#map")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Map and projection — center on Chicago and use a larger scale
const projection = d3.geoMercator()
  .center([-87.65, 41.85])
  .scale(30000)
  .translate([width / 2, height / 2]);
const path = d3.geoPath().projection(projection);

// Data and color scale
const data = new Map();
const colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
Promise.all([
d3.json("/app/media/chicago-community-areas.geojson"),
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) {
  data.set(d.code, +d.pop)
})]).then(function(loadData){
  let topo = loadData[0];

  console.log('Loaded topo:', topo && topo.features && topo.features.length);
  if (!topo || !topo.features || topo.features.length === 0) {
    console.error('GeoJSON has no features or failed to load');
    return;
  }

    let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each area using shared path generator
      .attr("d", path)
      // set the color of each area to black for testing
      .attr("fill", "#000")
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave );

});
})();