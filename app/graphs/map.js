(async function() {
  const { getMapData } = await import("../api.js");
  const margin = {top: 30, right: 30, bottom: 70, left: 60};
  const container = document.getElementById('map');
  let cachedTopo = null;
  let cachedPop = null;
  let cachedData = null;

  function draw(topo, data){
    const width = (container ? container.offsetWidth : 460) - margin.left - margin.right;
    const height = (container ? container.offsetHeight : 300) - margin.top - margin.bottom;

    d3.select('#map').selectAll('*').remove();

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
      // translate relative to the inner drawing area (group already offset by margins)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    // Data and color scale
    const pop = new Map();
    if (cachedPop) { cachedPop.forEach(d => pop.set(d.code, +d.pop)); }
    // build a lookup from community name -> crime count (case-insensitive)
    const crimeByCommunity = new Map();
    if (Array.isArray(data)) {
      data.forEach(d => {
        if (d && d.community_area != null) {
          crimeByCommunity.set(String(d.community_area).toUpperCase(), +d.crime_count || 0);
        }
      });
    }
    // Compute data-driven domain (fallback to known min/max if no data)
    const values = Array.from(crimeByCommunity.values());
    const minVal = values.length ? d3.min(values) : 7865;
    const maxVal = values.length ? d3.max(values) : 508819;
    // Use a stronger sequential color scale (OrRd) for higher contrast
    const colorScale = d3.scaleSequential()
      .domain([minVal, maxVal])
      .interpolator(d3.interpolateOrRd);

    let mouseOver = function(event, d) {
      const communityName = (d && d.properties && d.properties.community) ? String(d.properties.community).toUpperCase() : '';
      const Count = crimeByCommunity.get(communityName) || 0;
      console.log("Community", communityName, "Crime Count:", Count);
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

    let mouseLeave = function(event, d) {
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
        .attr("fill", function(d){
          const name = d && d.properties && d.properties.community ? String(d.properties.community).toUpperCase() : '';
          const c = crimeByCommunity.get(name) || 0;
          return colorScale(c) || '#eee';
        })
        .style("stroke", "transparent")
        .attr("class", function(d){ return "Country" } )
        .style("opacity", .8)
        .on("mouseover", mouseOver )
        .on("mouseleave", mouseLeave );
  }

  function debounce(fn, delay){ let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), delay); }; }

  try {
    const loadData = await Promise.all([
      d3.json("/app/media/chicago-community-areas.geojson")
    ]);
    cachedTopo = loadData[0];
    cachedPop = loadData.length > 1 ? loadData[1] : null;

    const topo = cachedTopo;
    if (!topo || !topo.features || topo.features.length === 0) {
      console.error('GeoJSON has no features or failed to load');
      return;
    }

    const apiData = await getMapData();
    if (!apiData || !Array.isArray(apiData)) {
      console.error('getMapData returned invalid data', apiData);
      return;
    }
    cachedData = apiData.map(d => ({ community_area: d.community_area, crime_count: d.crime_count }));
    draw(topo, cachedData);
    window.addEventListener('resize', debounce(() => draw(topo, cachedData), 200));
  } catch (err) {
    console.error('Error fetching map area data:', err);
  }

})();