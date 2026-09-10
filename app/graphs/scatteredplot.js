(async function() {
  const { getMdsData } = await import("../api.js");
  const container = document.getElementById('scatteredplot');
  if (!container) return;

  let currentMetric = 'profile';
  let mdsData = [];
  let selectedDistricts = new Set();
  let activeCluster = null;

  // Formatters
  const formatComma = d3.format(",");

  // Cluster colors (Harmonious qualitative palette)
  const clusterColors = [
    '#2563eb', // Cluster 0: Property & Theft (Vibrant Blue)
    '#dc2626', // Cluster 1: Violent & Weapons (Vibrant Red)
    '#059669', // Cluster 2: Mixed / General (Emerald Green)
    '#d97706'  // Cluster 3: Fraud & Deceptive (Amber)
  ];

  // Tooltip
  let tooltip = d3.select("body").select(".chart-tooltip.mds-tooltip");
  if (tooltip.empty()) {
    tooltip = d3.select("body")
      .append("div")
      .attr("class", "chart-tooltip mds-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden");
  }

  function draw() {
    if (!mdsData || !mdsData.length) return;

    const margin = { top: 22, right: 20, bottom: 42, left: 45 };
    const width = Math.max(100, (container.offsetWidth || 380) - margin.left - margin.right);
    const height = Math.max(100, (container.offsetHeight || 380) - margin.top - margin.bottom);

    d3.select('#scatteredplot').selectAll('*').remove();

    const svg = d3.select("#scatteredplot")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .style("display", "block")
        .style("overflow", "visible");

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Extents with margin
    const xExtent = d3.extent(mdsData, d => d.x);
    const yExtent = d3.extent(mdsData, d => d.y);
    const xPad = (xExtent[1] - xExtent[0]) * 0.12 || 0.05;
    const yPad = (yExtent[1] - yExtent[0]) * 0.12 || 0.05;

    const x = d3.scaleLinear()
      .domain([xExtent[0] - xPad, xExtent[1] + xPad])
      .range([0, width])
      .nice();

    const y = d3.scaleLinear()
      .domain([yExtent[0] - yPad, yExtent[1] + yPad])
      .range([height, 0])
      .nice();

    // Subtle axes & gridlines
    const xAxis = d3.axisBottom(x).ticks(5).tickFormat(d3.format(".2f"));
    const yAxis = d3.axisLeft(y).ticks(5).tickFormat(d3.format(".2f"));

    // Zero crosshairs
    if (x(0) >= 0 && x(0) <= width) {
      g.append("line")
        .attr("x1", x(0)).attr("y1", 0)
        .attr("x2", x(0)).attr("y2", height)
        .attr("stroke", "#e2e8f0").attr("stroke-dasharray", "3,3");
    }
    if (y(0) >= 0 && y(0) <= height) {
      g.append("line")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", width).attr("y2", y(0))
        .attr("stroke", "#e2e8f0").attr("stroke-dasharray", "3,3");
    }

    g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .call(g => g.select(".domain").attr("stroke", "#cbd5e1"))
      .call(g => g.selectAll("text").style("fill", "#64748b").style("font-size", "9.5px"));

    g.append("g")
      .attr("class", "axis axis-y")
      .call(yAxis)
      .call(g => g.select(".domain").attr("stroke", "#cbd5e1"))
      .call(g => g.selectAll("text").style("fill", "#64748b").style("font-size", "9.5px"));

    // Axis labels
    svg.append("text")
      .attr("x", margin.left + width / 2)
      .attr("y", height + margin.top + 34)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "500")
      .style("fill", "#64748b")
      .text("MDS Dimension 1 (Crime Space)");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(margin.top + height / 2))
      .attr("y", 12)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "500")
      .style("fill", "#64748b")
      .text("MDS Dimension 2");

    // ==========================================
    // CLUSTER LEGEND (Top of chart)
    // ==========================================
    const clustersInfo = [];
    const seen = new Set();
    mdsData.forEach(d => {
      if (!seen.has(d.cluster)) {
        seen.add(d.cluster);
        clustersInfo.push({ id: d.cluster, label: d.cluster_label });
      }
    });
    clustersInfo.sort((a, b) => a.id - b.id);

    const legendG = svg.append("g")
      .attr("class", "mds-legend")
      .attr("transform", `translate(${margin.left}, 8)`);

    let curX = 0;
    clustersInfo.forEach((cl) => {
      const item = legendG.append("g")
        .attr("transform", `translate(${curX}, 0)`)
        .style("cursor", "pointer")
        .on("click", () => {
          if (activeCluster === cl.id) {
            activeCluster = null;
            selectedDistricts.clear();
          } else {
            activeCluster = cl.id;
            selectedDistricts.clear();
            mdsData.filter(d => d.cluster === cl.id).forEach(d => selectedDistricts.add(d.community));
          }
          updateVisualStates();
          dispatchSelection();
        });

      item.append("circle")
        .attr("r", 4)
        .attr("cx", 4)
        .attr("cy", 0)
        .attr("fill", clusterColors[cl.id % clusterColors.length]);

      const txt = item.append("text")
        .attr("x", 11)
        .attr("y", 3)
        .style("font-size", "8.5px")
        .style("font-weight", activeCluster === cl.id ? "700" : "500")
        .style("fill", activeCluster === cl.id ? "#0f172a" : "#64748b")
        .text(cl.label.length > 20 ? cl.label.slice(0, 18) + "…" : cl.label);

      curX += (cl.label.length * 5.2) + 24;
    });

    // ==========================================
    // D3 2D BRUSH
    // ==========================================
    const brush = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("start brush end", brushed);

    const brushG = g.append("g")
      .attr("class", "brush mds-brush")
      .call(brush);

    function brushed(event) {
      if (!event.selection) {
        if (event.sourceEvent) {
          // Cleared
          selectedDistricts.clear();
          activeCluster = null;
          updateVisualStates();
          dispatchSelection();
        }
        return;
      }
      const [[x0, y0], [x1, y1]] = event.selection;
      selectedDistricts.clear();
      activeCluster = null;

      mdsData.forEach(d => {
        const cx = x(d.x);
        const cy = y(d.y);
        if (cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1) {
          selectedDistricts.add(d.community);
        }
      });

      updateVisualStates();
      dispatchSelection();
    }

    // ==========================================
    // DATA POINTS (DOTS)
    // ==========================================
    const dotsG = g.append("g").attr("class", "dots-group");

    const dots = dotsG.selectAll(".mds-dot")
      .data(mdsData, d => d.community)
      .join("circle")
        .attr("class", "mds-dot")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 5)
        .attr("fill", d => clusterColors[d.cluster % clusterColors.length])
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1)
        .attr("opacity", 0.85);

    dots
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("r", 7)
          .attr("stroke", "#0f172a")
          .attr("stroke-width", 2);

        // Build top crimes preview
        const topHtml = (d.top_crimes || []).map((c, idx) => 
          `<div style="display:flex; justify-content:space-between; gap:8px; font-size:11px;">
            <span style="color:#cbd5e1;">${idx + 1}. ${c.crime}:</span>
            <strong style="color:#ffffff;">${c.pct}%</strong>
           </div>`
        ).join('');

        tooltip
          .style("visibility", "visible")
          .html(`
            <div style="font-weight:700; font-size:12.5px; color:#38bdf8; margin-bottom:2px;">
              ${d.community}
            </div>
            <div style="font-size:11px; color:#94a3b8; margin-bottom:4px;">
              Cluster: <strong style="color:${clusterColors[d.cluster % clusterColors.length]};">${d.cluster_label}</strong>
            </div>
            <div style="font-size:11px; color:#e2e8f0; margin-bottom:4px;">
              Total Crimes: <strong>${formatComma(d.total_crimes)}</strong>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.15); padding-top:3px;">
              ${topHtml}
            </div>
          `);

        // Notify map of hover
        window.dispatchEvent(new CustomEvent('districtHovered', { detail: { community: d.community } }));
      })
      .on("mousemove", function(event) {
        tooltip
          .style("left", (event.pageX + 12) + "px")
          .style("top", (event.pageY - 24) + "px");
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .attr("r", selectedDistricts.has(d.community) ? 6.5 : 5);
        tooltip.style("visibility", "hidden");
        updateVisualStates();
        window.dispatchEvent(new CustomEvent('districtHovered', { detail: { community: null } }));
      })
      .on("click", function(event, d) {
        event.stopPropagation();
        if (selectedDistricts.has(d.community)) {
          selectedDistricts.delete(d.community);
        } else {
          selectedDistricts.add(d.community);
        }
        updateVisualStates();
        dispatchSelection();
      });

    function updateVisualStates() {
      if (selectedDistricts.size === 0 && activeCluster === null) {
        dots
          .attr("opacity", 0.85)
          .attr("r", 5)
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1)
          .classed("selected", false);
      } else {
        dots.each(function(d) {
          const isSelected = selectedDistricts.has(d.community) || (activeCluster !== null && d.cluster === activeCluster);
          d3.select(this)
            .attr("opacity", isSelected ? 1 : 0.2)
            .attr("r", isSelected ? 6.5 : 4)
            .attr("stroke", isSelected ? "#e65100" : "#ffffff")
            .attr("stroke-width", isSelected ? 2.5 : 0.5)
            .classed("selected", isSelected);
        });
      }
    }

    function dispatchSelection() {
      const arr = Array.from(selectedDistricts);
      window.dispatchEvent(new CustomEvent('districtsSelected', {
        detail: { districts: arr }
      }));
    }

    // Expose reset for external UI
    window._mdsReset = function() {
      selectedDistricts.clear();
      activeCluster = null;
      brushG.call(brush.move, null);
      updateVisualStates();
      dispatchSelection();
    };

    // Listen for hover from the map
    window.addEventListener('districtHovered', (e) => {
      const comm = e.detail && e.detail.community;
      if (!comm) {
        updateVisualStates();
        return;
      }
      dots.each(function(d) {
        if (d.community === comm) {
          d3.select(this)
            .attr("r", 8)
            .attr("stroke", "#0f172a")
            .attr("stroke-width", 2.5)
            .attr("opacity", 1);
        }
      });
    });
  }

  // ==========================================
  // CONTROLS
  // ==========================================
  function setupControls() {
    const metricProfileBtn = document.getElementById('mds-metric-profile');
    const metricVolumeBtn = document.getElementById('mds-metric-volume');
    const resetBtn = document.getElementById('mds-reset-btn');

    if (metricProfileBtn && metricVolumeBtn) {
      metricProfileBtn.addEventListener('click', async () => {
        if (currentMetric !== 'profile') {
          currentMetric = 'profile';
          metricProfileBtn.classList.add('active');
          metricVolumeBtn.classList.remove('active');
          await loadAndDraw();
        }
      });

      metricVolumeBtn.addEventListener('click', async () => {
        if (currentMetric !== 'volume') {
          currentMetric = 'volume';
          metricVolumeBtn.classList.add('active');
          metricProfileBtn.classList.remove('active');
          await loadAndDraw();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (window._mdsReset) {
          window._mdsReset();
        }
      });
    }
  }

  async function loadAndDraw() {
    try {
      const data = await getMdsData(currentMetric);
      if (Array.isArray(data) && data.length) {
        mdsData = data;
        draw();
      }
    } catch (err) {
      console.error('Error loading MDS data:', err);
    }
  }

  function debounce(fn, delay) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), delay);
    };
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  setupControls();
  await loadAndDraw();

  const handleResize = debounce(() => draw(), 180);
  window.addEventListener('resize', handleResize);
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
  }

})();