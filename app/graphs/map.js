(async function() {
  const { getMapData } = await import("../api.js");
  const margin = {top: 30, right: 30, bottom: 70, left: 60};
  const container = document.getElementById('map');
  let cachedTopo = null;
  let cachedPop = null;
  let cachedData = null;

  function draw(topo, data){
    const width = Math.max(1, (container ? container.offsetWidth : 460) - margin.left - margin.right);
    const height = Math.max(1, (container ? container.offsetHeight : 300) - margin.top - margin.bottom);

    d3.select('#map').selectAll('*').remove();
    d3.select('#map').style('position', 'relative');

    // append the svg object to the map div
    const svg = d3.select("#map")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Fit the GeoJSON to the current container. A fixed Mercator scale causes
    // clipped and offset shapes when the viewport changes size.
    const projection = d3.geoMercator()
      .fitSize([width, height], topo);
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
    const minVal = values.length ? d3.min(values) : 0;
    const maxVal = values.length ? d3.max(values) : 1;
    // Use a stronger sequential color scale (OrRd) for higher contrast
    const colorScale = d3.scaleSequential()
      .domain([minVal, Math.max(minVal + 1, maxVal)])
      .interpolator(d3.interpolateOrRd);

    let mapAreas;

    let mouseOver = function(event, d) {
      const communityName = (d && d.properties && d.properties.community) ? String(d.properties.community).toUpperCase() : '';
      const count = crimeByCommunity.get(communityName) || 0;
      // Interrupt any animation still running from the previous area. Without
      // this, rapid pointer movement can leave a path in its hover state.
      mapAreas
        .interrupt()
        .style("opacity", .5)
        .style("stroke", "#fff")
        .style("stroke-width", "0.5px");
      d3.select(this)
        .interrupt()
        .style("opacity", 1)
        .style("stroke", "#000")
        .style("stroke-width", "2px");

      // Show tooltip with community and count (allow HTML)
      tooltip.html(`<strong>${(d && d.properties && d.properties.community) ? d.properties.community : 'Unknown'}</strong><br/>Count: ${count.toLocaleString()}`)
        .style("visibility", "visible");
    }

    let mouseLeave = function(event, d) {
      // Reset every visual property changed on hover, including the border.
      mapAreas
        .interrupt()
        .style("opacity", .8)
        .style("stroke", "#fff")
        .style("stroke-width", "0.5px");

      // Hide tooltip
      tooltip.style("visibility", "hidden");
    }

    // Update tooltip position as mouse moves
    let mouseMove = function(event, d) {
      const [x, y] = d3.pointer(event, container);
      tooltip.style("left", (x + 10) + "px").style("top", (y + 10) + "px");
    }

    // Create a tooltip element (styled, positioned relative to #map)
    var tooltip = d3.select("#map")
      .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "rgba(0,0,0,0.75)")
        .style("color", "#fff")
        .style("padding", "6px 8px")
        .style("border-radius", "4px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", 1000);

    // Draw the map
    mapAreas = svg.append("g")
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
        .style("stroke", "#fff")
        .style("stroke-width", "0.5px")
        .attr("class", function(d){ return "Country" } )
        .style("opacity", .8)
        .on("mouseover", mouseOver )
        .on("mousemove", mouseMove )
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
