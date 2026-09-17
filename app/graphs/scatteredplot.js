(async function () {
  const { getMdsData } = await import("../api.js");
  const container = document.getElementById('scatteredplot');
  if (!container) return;

  let mdsData = [];
  let selectedDistricts = new Set(); // Reflected from Map selections only

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

  window.addEventListener('scroll', () => {
    tooltip.style("visibility", "hidden");
  }, { passive: true });

  function draw() {
    if (!mdsData || !mdsData.length) return;

    // Generous top margin for spacious 2-row legend
    const margin = { top: 44, right: 18, bottom: 38, left: 44 };
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
      .attr("y", height + margin.top + 30)
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
    // CLUSTER LEGEND (Top of chart - enlarged, legible, 2 rows)
    // ==========================================
    const clustersInfo = [];
    const seen = new Set();
    mdsData.forEach(d => {
      const label = (d.cluster_label === 'Motor Vehicle Theft & General') ? 'General Crimes' : d.cluster_label;
      d.cluster_label = label;
      if (!seen.has(d.cluster)) {
        seen.add(d.cluster);
        clustersInfo.push({ id: d.cluster, label: label });
      }
    });
    clustersInfo.sort((a, b) => a.id - b.id);

    const legendG = svg.append("g")
      .attr("class", "mds-legend")
      .attr("transform", `translate(${margin.left}, 4)`)
      .style("pointer-events", "none")
      .style("cursor", "default")
      .style("user-select", "none");

    const colWidth = Math.max(170, (width + margin.right) / 2);
    clustersInfo.forEach((cl, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = col * colWidth;
      const yPos = row * 16;

      const item = legendG.append("g")
        .attr("transform", `translate(${xPos}, ${yPos})`)
        .style("pointer-events", "none")
        .style("cursor", "default")
        .style("user-select", "none");

      item.append("circle")
        .attr("r", 5)
        .attr("cx", 6)
        .attr("cy", 0)
        .attr("fill", clusterColors[cl.id % clusterColors.length])
        .style("pointer-events", "none")
        .style("cursor", "default");

      item.append("text")
        .attr("x", 16)
        .attr("y", 3.5)
        .style("font-size", "10.5px")
        .style("font-weight", "600")
        .style("fill", "#334155")
        .style("pointer-events", "none")
        .style("cursor", "default")
        .style("user-select", "none")
        .text(cl.label === 'Motor Vehicle Theft & General' ? 'General Crimes' : cl.label);
    });

    // ==========================================
    // SELECTION: RECTANGULAR BRUSH & DOT CLICK
    // ==========================================
    function emitDistrictsSelected() {
      const districts = Array.from(selectedDistricts);
      window.dispatchEvent(new CustomEvent('districtsSelected', {
        detail: { districts, source: 'mds' }
      }));
      updateMdsBadge();
    }

    // Brush group (positioned under dots so dots retain full hover & click precision)
    const brushG = g.append("g").attr("class", "mds-brush");
    const brush = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("end", function (event) {
        if (!event.sourceEvent) return; // Programmatic clear
        const sel = event.selection;
        if (!sel) {
          // Click on canvas background without drag: clear selection if any
          if (event.sourceEvent.type === 'mouseup' || event.sourceEvent.type === 'click' || event.sourceEvent.type === 'pointerup') {
            if (selectedDistricts.size > 0) {
              selectedDistricts.clear();
              updateVisualStates();
              emitDistrictsSelected();
            }
          }
          return;
        }

        const [[x0, y0], [x1, y1]] = sel;
        // Ignore tiny accidental clicks/jitters (< 4px)
        if (Math.abs(x1 - x0) < 4 && Math.abs(y1 - y0) < 4) {
          d3.select(this).call(brush.move, null);
          return;
        }

        const isShift = event.sourceEvent.shiftKey || event.sourceEvent.ctrlKey || event.sourceEvent.metaKey;
        if (!isShift) {
          selectedDistricts.clear();
        }

        mdsData.forEach(d => {
          const px = x(d.x);
          const py = y(d.y);
          if (px >= x0 && px <= x1 && py >= y0 && py <= y1) {
            selectedDistricts.add(d.community);
          }
        });

        // Clear visual brush box so dots remain clearly visible and interactive
        d3.select(this).call(brush.move, null);

        updateVisualStates();
        emitDistrictsSelected();
      });

    brushG.call(brush);

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
      .attr("r", d => selectedDistricts.has(d.community) ? 7.5 : 5)
      .attr("fill", d => clusterColors[d.cluster % clusterColors.length])
      .attr("stroke", d => selectedDistricts.has(d.community) ? "#e65100" : "#ffffff")
      .attr("stroke-width", d => selectedDistricts.has(d.community) ? 2.5 : 1)
      .attr("opacity", d => selectedDistricts.size === 0 || selectedDistricts.has(d.community) ? 0.85 : 0.22)
      .style("cursor", "pointer");

    dots
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("r", selectedDistricts.has(d.community) ? 8.5 : 7)
          .attr("stroke", selectedDistricts.has(d.community) ? "#e65100" : "#0f172a")
          .attr("stroke-width", 2.5);

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
            <div style="font-size:10px; color:#94a3b8; margin-top:4px; font-style:italic;">
              Click to select | Shift-click / Drag to multi-select
            </div>
          `);

        // Notify map of hover
        window.dispatchEvent(new CustomEvent('districtHovered', { detail: { community: d.community } }));
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", (event.pageX + 14) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function (event, d) {
        const isSelected = selectedDistricts.has(d.community);
        d3.select(this)
          .attr("r", isSelected ? 7.5 : 5)
          .attr("stroke", isSelected ? "#e65100" : "#ffffff")
          .attr("stroke-width", isSelected ? 2.5 : 1);
        tooltip.style("visibility", "hidden");
        updateVisualStates();
        window.dispatchEvent(new CustomEvent('districtHovered', { detail: { community: null } }));
      })
      .on("click", function (event, d) {
        event.stopPropagation();
        const comm = d.community;
        const isMulti = event.shiftKey || event.ctrlKey || event.metaKey;
        if (isMulti) {
          if (selectedDistricts.has(comm)) {
            selectedDistricts.delete(comm);
          } else {
            selectedDistricts.add(comm);
          }
        } else {
          if (selectedDistricts.size === 1 && selectedDistricts.has(comm)) {
            selectedDistricts.clear();
          } else {
            selectedDistricts.clear();
            selectedDistricts.add(comm);
          }
        }
        updateVisualStates();
        emitDistrictsSelected();
      });

    function updateVisualStates() {
      if (selectedDistricts.size === 0) {
        dots
          .attr("opacity", 0.85)
          .attr("r", 5)
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1)
          .classed("selected", false);
      } else {
        dots.each(function (d) {
          const isSelected = selectedDistricts.has(d.community);
          d3.select(this)
            .attr("opacity", isSelected ? 1 : 0.22)
            .attr("r", isSelected ? 7.5 : 4)
            .attr("stroke", isSelected ? "#e65100" : "#ffffff")
            .attr("stroke-width", isSelected ? 2.5 : 0.5)
            .classed("selected", isSelected);
        });
      }
      updateMdsBadge();
    }

    window._updateVisualStates = updateVisualStates;
    updateVisualStates();

    // Listen for hover from the map
    window.addEventListener('districtHovered', (e) => {
      const comm = e.detail && e.detail.community;
      if (!comm) {
        updateVisualStates();
        return;
      }
      dots.each(function (d) {
        if (d.community === comm) {
          d3.select(this)
            .attr("r", 8.5)
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
    const distBadge = document.getElementById('mds-districts-badge');
    if (distBadge) {
      distBadge.addEventListener('click', () => {
        selectedDistricts.clear();
        if (window._updateVisualStates) window._updateVisualStates();
        window.dispatchEvent(new CustomEvent('districtsSelected', {
          detail: { districts: [], source: 'mds' }
        }));
        updateMdsBadge();
      });
    }
  }

  let currentStartYear = null;
  let currentEndYear = null;

  async function loadAndDraw() {
    try {
      const data = await getMdsData({
        startYear: currentStartYear,
        endYear: currentEndYear
      });
      if (Array.isArray(data) && data.length) {
        mdsData = data.map(d => ({
          ...d,
          cluster_label: (d.cluster_label === 'Motor Vehicle Theft & General') ? 'General Crimes' : d.cluster_label
        }));
        draw();
      }
    } catch (err) {
      console.error('Error loading MDS data:', err);
    }
  }

  function updateMdsBadge() {
    const badge = document.getElementById('mds-time-badge');
    if (badge) {
      if (currentStartYear != null && currentEndYear != null) {
        badge.textContent = `${currentStartYear}–${currentEndYear}`;
        badge.classList.remove('d-none');
      } else {
        badge.classList.add('d-none');
      }
    }

    const distBadge = document.getElementById('mds-districts-badge');
    if (distBadge) {
      if (selectedDistricts && selectedDistricts.size > 0) {
        const count = selectedDistricts.size;
        distBadge.textContent = count === 1 ? `${Array.from(selectedDistricts)[0]} ✕` : `${count} Areas ✕`;
        distBadge.classList.remove('d-none');
      } else {
        distBadge.classList.add('d-none');
      }
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

  // Coordinated View Listeners
  window.addEventListener('timespanSelected', async (e) => {
    currentStartYear = e.detail && e.detail.startYear ? e.detail.startYear : null;
    currentEndYear = e.detail && e.detail.endYear ? e.detail.endYear : null;
    updateMdsBadge();
    await loadAndDraw();
  });

  window.addEventListener('crimeTimeRangeSelected', async (e) => {
    if (e.detail && e.detail.isReset) {
      currentStartYear = null;
      currentEndYear = null;
      updateMdsBadge();
      await loadAndDraw();
    }
  });

  window.addEventListener('districtsSelected', (e) => {
    if (e.detail && e.detail.source === 'mds') return;
    const districts = e.detail && e.detail.districts ? e.detail.districts : [];
    selectedDistricts = new Set(districts);
    if (window._updateVisualStates) {
      window._updateVisualStates();
    } else {
      draw();
    }
    updateMdsBadge();
  });

  // Global Dashboard Reset Listener
  window.addEventListener('globalDashboardReset', async () => {
    selectedDistricts.clear();
    currentStartYear = null;
    currentEndYear = null;
    updateMdsBadge();
    await loadAndDraw();
  });

})();