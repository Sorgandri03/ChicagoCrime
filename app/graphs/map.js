(async function() {
  const { getMapData } = await import("../api.js");
  const margin = {top: 10, right: 10, bottom: 10, left: 10};
  const container = document.getElementById('map');
  let cachedTopo = null;
  let cachedPop = null;
  let cachedData = null;

  // Create shared tooltip in body if not existing
  let tooltip = d3.select("body").select(".chart-tooltip.map-tooltip");
  if (tooltip.empty()) {
    tooltip = d3.select("body")
      .append("div")
      .attr("class", "chart-tooltip map-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden");
  }

  window.addEventListener('scroll', () => {
    tooltip.style("visibility", "hidden");
  }, { passive: true });

  let currentSelectedDistricts = null;

  function draw(topo, data){
    const width = Math.max(1, (container ? container.offsetWidth : 460) - margin.left - margin.right);
    const height = Math.max(1, (container ? container.offsetHeight : 300) - margin.top - margin.bottom);

    d3.select('#map').selectAll('*').remove();
    d3.select('#map').style('position', 'relative');

    // Append responsive SVG
    const svg = d3.select("#map")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .style("display", "block")
        .style("width", "100%")
        .style("height", "100%")
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Fit the GeoJSON to the current container
    const projection = d3.geoMercator()
      .fitSize([width, height], topo);
    const path = d3.geoPath().projection(projection);

    // Data and color scale
    const pop = new Map();
    if (cachedPop) { cachedPop.forEach(d => pop.set(d.code, +d.pop)); }
    // Build a lookup from community name -> crime count (case-insensitive)
    const crimeByCommunity = new Map();
    if (Array.isArray(data)) {
      data.forEach(d => {
        if (d && d.community_area != null) {
          crimeByCommunity.set(String(d.community_area).toUpperCase(), +d.crime_count || 0);
        }
      });
    }
    // Compute data-driven domain
    const values = Array.from(crimeByCommunity.values());
    const minVal = values.length ? d3.min(values) : 0;
    const maxVal = values.length ? d3.max(values) : 1;
    // Sequential color scale (OrRd)
    const colorScale = d3.scaleSequential()
      .domain([minVal, Math.max(minVal + 1, maxVal)])
      .interpolator(d3.interpolateOrRd);

    let mapAreas;

    let mouseOver = function(event, d) {
      const communityName = (d && d.properties && d.properties.community) ? String(d.properties.community).toUpperCase() : '';
      const count = crimeByCommunity.get(communityName) || 0;

      mapAreas.each(function(areaD) {
        const name = (areaD && areaD.properties && areaD.properties.community) ? String(areaD.properties.community).toUpperCase() : '';
        const isHovered = name === communityName;
        const isSelected = currentSelectedDistricts && currentSelectedDistricts.has(name);
        const sel = d3.select(this).interrupt();

        if (isHovered) {
          sel.style("opacity", 1)
             .style("stroke", isSelected ? "#e65100" : "#000")
             .style("stroke-width", isSelected ? "3px" : "2px");
        } else if (isSelected) {
          sel.style("opacity", 1)
             .style("stroke", "#e65100")
             .style("stroke-width", "2.5px");
        } else {
          sel.style("opacity", currentSelectedDistricts && currentSelectedDistricts.size > 0 ? 0.22 : 0.5)
             .style("stroke", "#fff")
             .style("stroke-width", "0.5px");
        }
      });

      // Show tooltip with community and count
      tooltip.html(`<strong>${(d && d.properties && d.properties.community) ? d.properties.community : 'Unknown'}</strong><br/>Count: ${count.toLocaleString()}`)
        .style("visibility", "visible");
    };

    let mouseLeave = function(event, d) {
      if (!currentSelectedDistricts || currentSelectedDistricts.size === 0) {
        mapAreas
          .interrupt()
          .style("opacity", 0.8)
          .style("stroke", "#fff")
          .style("stroke-width", "0.5px");
      } else {
        mapAreas.each(function(areaD) {
          const name = (areaD && areaD.properties && areaD.properties.community) ? String(areaD.properties.community).toUpperCase() : '';
          const isSelected = currentSelectedDistricts.has(name);
          d3.select(this)
            .interrupt()
            .style("opacity", isSelected ? 1 : 0.22)
            .style("stroke", isSelected ? "#e65100" : "#fff")
            .style("stroke-width", isSelected ? "2.5px" : "0.5px");
        });
      }

      // Hide tooltip
      tooltip.style("visibility", "hidden");
    };

    let mouseMove = function(event, d) {
      const tooltipEl = tooltip.node();
      const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 140;
      let left = event.pageX + 14;
      let top = event.pageY - 28;

      if (event.clientX + tooltipWidth + 24 > window.innerWidth) {
        left = event.pageX - tooltipWidth - 14;
      }
      if (event.clientY - 35 < 0) {
        top = event.pageY + 18;
      }

      tooltip.style("left", `${left}px`).style("top", `${top}px`);
    };

    // Draw the map
    mapAreas = svg.append("g")
      .selectAll("path")
      .data(topo.features)
      .enter()
      .append("path")
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
        .on("mouseleave", mouseLeave )
        .on("click", function(event, d) {
          const name = d && d.properties && d.properties.community ? String(d.properties.community).toUpperCase() : '';
          const isCurrentlySelected = currentSelectedDistricts && currentSelectedDistricts.has(name);
          const newSelection = isCurrentlySelected ? [] : [name];
          currentSelectedDistricts = newSelection.length > 0 ? new Set(newSelection) : null;
          window.dispatchEvent(new CustomEvent('districtsSelected', { detail: { districts: newSelection } }));
        })
        .each(function(d) {
          if (!currentSelectedDistricts || currentSelectedDistricts.size === 0) return;
          const name = d && d.properties && d.properties.community ? String(d.properties.community).toUpperCase() : '';
          const isSelected = currentSelectedDistricts.has(name);
          d3.select(this)
            .classed('highlighted-district', isSelected)
            .style('opacity', isSelected ? 1 : 0.22)
            .style('stroke', isSelected ? '#e65100' : '#fff')
            .style('stroke-width', isSelected ? '2.5px' : '0.5px');
        });

    // ==========================================
    // MAP COLOR LEGEND (Theory_md sequential encoding)
    // ==========================================
    const formatTick = d3.format("~s");
    const midVal = Math.round((minVal + maxVal) / 2);

    const legendContainer = d3.select('#map').append('div')
      .attr('class', 'map-legend-container');

    legendContainer.append('div')
      .attr('class', 'map-legend-title')
      .text('Crime Density');

    // Create gradient stops directly matching d3.interpolateOrRd
    const stops = [0, 0.25, 0.5, 0.75, 1.0].map(p => {
      const col = d3.interpolateOrRd(p);
      return `${col} ${Math.round(p * 100)}%`;
    }).join(', ');

    legendContainer.append('div')
      .attr('class', 'map-legend-bar')
      .style('background', `linear-gradient(to right, ${stops})`);

    const ticksDiv = legendContainer.append('div')
      .attr('class', 'map-legend-ticks');

    ticksDiv.append('span').text(formatTick(minVal));
    ticksDiv.append('span').text(formatTick(midVal));
    ticksDiv.append('span').text(formatTick(maxVal));
  }

  let currentStartYear = null;
  let currentEndYear = null;
  let currentSelectedCrime = null;

  function updateMapHeaderBadge() {
    const badge = document.getElementById('map-time-badge');
    if (!badge) return;
    const parts = [];
    if (currentSelectedCrime) {
      parts.push(currentSelectedCrime);
    }
    if (currentStartYear != null && currentEndYear != null) {
      parts.push(`${currentStartYear}–${currentEndYear}`);
    }
    if (parts.length > 0) {
      badge.textContent = parts.join(' | ');
      badge.classList.remove('d-none');
    } else {
      badge.classList.add('d-none');
    }
  }

  async function reloadMapData() {
    if (!cachedTopo) return;
    const apiData = await getMapData({
      crime: currentSelectedCrime,
      startYear: currentStartYear,
      endYear: currentEndYear
    });
    if (apiData && Array.isArray(apiData)) {
      cachedData = apiData.map(d => ({ community_area: d.community_area, crime_count: d.crime_count }));
      draw(cachedTopo, cachedData);
    }
  }

  // Listen for selection from other views or self
  window.addEventListener('districtsSelected', (e) => {
    const selected = e.detail && e.detail.districts && e.detail.districts.length ? new Set(e.detail.districts) : null;
    currentSelectedDistricts = selected;
    const areas = d3.select("#map").selectAll("path.Country");
    if (areas.empty()) return;
    if (!selected || selected.size === 0) {
      areas
        .classed('highlighted-district', false)
        .style('opacity', 0.8)
        .style('stroke', '#fff')
        .style('stroke-width', '0.5px');
    } else {
      areas.each(function(d) {
        const name = d && d.properties && d.properties.community ? String(d.properties.community).toUpperCase() : '';
        const isSelected = selected.has(name);
        d3.select(this)
          .classed('highlighted-district', isSelected)
          .style('opacity', isSelected ? 1 : 0.22)
          .style('stroke', isSelected ? '#e65100' : '#fff')
          .style('stroke-width', isSelected ? '2.5px' : '0.5px');
      });
    }
  });

  // Listen for crime selection from bar graph
  window.addEventListener('crimeSelected', async (e) => {
    currentSelectedCrime = e.detail && e.detail.crime ? e.detail.crime : null;
    updateMapHeaderBadge();
    await reloadMapData();
  });

  // Listen for timespan filter from stacked area chart brush
  window.addEventListener('timespanSelected', async (e) => {
    currentStartYear = e.detail && e.detail.startYear ? e.detail.startYear : null;
    currentEndYear = e.detail && e.detail.endYear ? e.detail.endYear : null;
    updateMapHeaderBadge();
    await reloadMapData();
  });

  window.addEventListener('crimeTimeRangeSelected', async (e) => {
    if (e.detail && e.detail.isReset) {
      currentStartYear = null;
      currentEndYear = null;
      updateMapHeaderBadge();
      await reloadMapData();
    }
  });

  // Global Dashboard Reset Listener
  window.addEventListener('globalDashboardReset', async () => {
    currentSelectedDistricts = null;
    currentSelectedCrime = null;
    currentStartYear = null;
    currentEndYear = null;
    updateMapHeaderBadge();
    window.dispatchEvent(new CustomEvent('districtsSelected', { detail: { districts: [] } }));
    await reloadMapData();
  });

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

    const handleResize = debounce(() => {
      if (cachedTopo && cachedData) draw(cachedTopo, cachedData);
    }, 180);
    window.addEventListener('resize', handleResize);
    if (window.ResizeObserver && container) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
    }
  } catch (err) {
    console.error('Error fetching map area data:', err);
  }

})();
