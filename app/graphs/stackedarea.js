(async function () {
  const { getStackedAreaData } = await import("../api.js");
  const rootContainer = document.getElementById('stackedarea');
  if (!rootContainer) return;

  // Chart State
  let rawData = [];
  let currentMode = 'counts'; // 'counts' | 'percent'
  let currentTopN = 8;        // 5 | 8 | 10 | 'all'
  let focusedCrime = null;    // null or string
  let brushedYears = null;    // null or [startYear, endYear]
  let hoveredCrime = null;
  let selectedCommunities = null;

  // Cache DOM control references
  const btnModeCounts = document.getElementById('btn-mode-counts');
  const btnModePercent = document.getElementById('btn-mode-percent');
  const btnTop5 = document.getElementById('btn-top-5');
  const btnTop8 = document.getElementById('btn-top-8');
  const btnTop10 = document.getElementById('btn-top-10');
  const btnTopAll = document.getElementById('btn-top-all');
  const statusBadge = document.getElementById('stacked-status-badge');
  const btnReset = document.getElementById('btn-reset-stacked');

  // Neutral color for aggregated remaining categories
  const OTHER_COLOR = '#78909c';

  /**
   * Process raw database records into structured pivot table
   */
  function processData(data, topN, focusKey) {
    const years = Array.from(new Set(data.map(d => +d.year))).sort((a, b) => a - b);

    // Calculate total count per primary_type across entire timeframe
    const crimeTotals = new Map();
    data.forEach(d => {
      const c = d.crime;
      crimeTotals.set(c, (crimeTotals.get(c) || 0) + (+d.count || 0));
    });

    const sortedCrimes = Array.from(crimeTotals.entries())
      .sort((a, b) => b[1] - a[1])
      .map(d => d[0]);

    const totalSystemCrime = d3.sum(Array.from(crimeTotals.values()));

    // Categorization: Top N + "OTHER CRIMES"
    let displayCrimes = [];
    const crimeToDisplayKey = new Map();

    if (topN === 'all' || sortedCrimes.length <= topN) {
      displayCrimes = [...sortedCrimes];
      sortedCrimes.forEach(c => crimeToDisplayKey.set(c, c));
    } else {
      const topSet = new Set(sortedCrimes.slice(0, topN));
      displayCrimes = sortedCrimes.slice(0, topN);
      if (focusKey && !topSet.has(focusKey) && sortedCrimes.includes(focusKey)) {
        displayCrimes.push(focusKey);
        topSet.add(focusKey);
      }
      displayCrimes.push('OTHER CRIMES');

      sortedCrimes.forEach(c => {
        if (topSet.has(c)) {
          crimeToDisplayKey.set(c, c);
        } else {
          crimeToDisplayKey.set(c, 'OTHER CRIMES');
        }
      });
    }

    // Pivot data by year
    const dataByYear = years.map(year => {
      const row = { year, _total: 0, _crimes: {} };
      displayCrimes.forEach(c => {
        row[c] = 0;
        row._crimes[c] = { count: 0, share: 0 };
      });
      return row;
    });

    const yearLookup = new Map(dataByYear.map(r => [r.year, r]));

    data.forEach(d => {
      const yRow = yearLookup.get(+d.year);
      if (yRow) {
        const mappedKey = crimeToDisplayKey.get(d.crime) || 'OTHER CRIMES';
        const val = +d.count || 0;
        yRow[mappedKey] = (yRow[mappedKey] || 0) + val;
        yRow._total += val;
      }
    });

    // Compute shares and YoY changes
    dataByYear.forEach((row, i) => {
      const prevRow = i > 0 ? dataByYear[i - 1] : null;
      displayCrimes.forEach(c => {
        const count = row[c] || 0;
        const share = row._total > 0 ? count / row._total : 0;
        let yoy = null;
        if (prevRow && prevRow[c] > 0) {
          yoy = (count - prevRow[c]) / prevRow[c];
        }
        row._crimes[c] = { count, share, yoy };
      });
    });

    // Aggregate overall totals for display keys
    const displayTotals = new Map();
    displayCrimes.forEach(c => {
      const total = d3.sum(dataByYear, r => r[c] || 0);
      displayTotals.set(c, {
        total,
        shareOfSystem: totalSystemCrime > 0 ? total / totalSystemCrime : 0
      });
    });

    return {
      years,
      displayCrimes,
      dataByYear,
      displayTotals,
      totalSystemCrime
    };
  }

  /**
   * Build color scale matching standard Tableau 10 encoding
   */
  function buildColorScale(displayCrimes) {
    const tableau10 = [
      '#4e79a7', // Steel Blue
      '#f28e2c', // Orange
      '#e15759', // Red
      '#76b7b2', // Teal
      '#59a14f', // Green
      '#edc949', // Yellow-Gold
      '#af7aa1', // Purple
      '#ff9da7', // Pink
      '#9c755f', // Brown
      '#bab0ab'  // Gray
    ];

    const colorMap = new Map();
    let paletteIndex = 0;

    displayCrimes.forEach(crime => {
      if (crime === 'OTHER CRIMES') {
        colorMap.set(crime, OTHER_COLOR);
      } else {
        colorMap.set(crime, tableau10[paletteIndex % tableau10.length]);
        paletteIndex++;
      }
    });

    return function (crimeKey) {
      return colorMap.get(crimeKey) || '#64748b';
    };
  }

  /**
   * Format numbers with commas or SI abbreviations
   */
  const numFormat = d3.format(",");
  const siFormat = d3.format("~s");
  const percentFormat = d3.format(".1%");

  /**
   * Main render / draw function
   */
  function draw() {
    if (!rawData || rawData.length === 0) return;

    const { years, displayCrimes, dataByYear, displayTotals, totalSystemCrime } =
      processData(rawData, currentTopN, focusedCrime);

    const colorScale = buildColorScale(displayCrimes);

    // Active stacking keys (if focused on a single crime, stack only that one to remove baseline distortion)
    const activeKeys = focusedCrime && displayCrimes.includes(focusedCrime)
      ? [focusedCrime]
      : [...displayCrimes];

    // Configure stack generator
    const stackGen = d3.stack().keys(activeKeys);
    if (currentMode === 'percent') {
      stackGen.offset(d3.stackOffsetExpand);
    } else {
      stackGen.offset(d3.stackOffsetNone);
    }

    const stackedSeries = stackGen(dataByYear);

    // Clear root container and build flex layout
    rootContainer.innerHTML = '';
    const mainWrap = document.createElement('div');
    mainWrap.className = 'stackedarea-container';

    const svgWrap = document.createElement('div');
    svgWrap.className = 'stackedarea-svg-wrap';

    const legendWrap = document.createElement('div');
    legendWrap.className = 'stackedarea-legend-wrap';

    mainWrap.appendChild(svgWrap);
    mainWrap.appendChild(legendWrap);
    rootContainer.appendChild(mainWrap);

    // Compute dimensions
    const totalWidth = svgWrap.offsetWidth || (rootContainer.offsetWidth - 230) || 600;
    const totalHeight = svgWrap.offsetHeight || rootContainer.offsetHeight || 440;

    const margin = { top: 18, right: 28, bottom: 36, left: 56 };
    const width = Math.max(10, totalWidth - margin.left - margin.right);
    const height = Math.max(10, totalHeight - margin.top - margin.bottom);

    // Create SVG
    const svg = d3.select(svgWrap)
      .append("svg")
      .attr("width", totalWidth)
      .attr("height", totalHeight)
      .attr("viewBox", `0 0 ${totalWidth} ${totalHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Clip path for brush / zoom
    svg.append("defs").append("clipPath")
      .attr("id", "stacked-clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X Scale
    const minYear = d3.min(years);
    const maxYear = d3.max(years);
    const xScale = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([0, width]);

    // Y Scale
    let yScale;
    const maxStackedVal = d3.max(stackedSeries, layer => d3.max(layer, d => d[1])) || 1;
    if (currentMode === 'percent') {
      yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);
    } else if (maxStackedVal <= 5) {
      yScale = d3.scaleLinear()
        .domain([0, Math.max(1, Math.ceil(maxStackedVal))])
        .range([height, 0]);
    } else {
      yScale = d3.scaleLinear()
        .domain([0, maxStackedVal * 1.05])
        .range([height, 0])
        .nice();
    }

    // Gridlines behind chart
    const tickCount = (currentMode === 'percent') ? 6 : (maxStackedVal <= 5 ? Math.max(1, Math.ceil(maxStackedVal)) : 6);
    const yGrid = d3.axisLeft(yScale)
      .ticks(tickCount)
      .tickSize(-width)
      .tickFormat("");
    g.append("g")
      .attr("class", "stacked-grid")
      .call(yGrid);

    // Area Generator with smooth monotone interpolation
    const areaGen = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(d.data.year))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]));

    // Chart content layer (clipped)
    const chartContent = g.append("g")
      .attr("clip-path", "url(#stacked-clip)");

    // Render area layers
    const layers = chartContent.selectAll(".area-layer")
      .data(stackedSeries, d => d.key)
      .join("path")
      .attr("class", d => `area-layer layer-${d.key.replace(/[^a-zA-Z0-9]/g, '_')}`)
      .attr("fill", d => colorScale(d.key))
      .attr("stroke", d => d3.color(colorScale(d.key)).darker(0.35))
      .attr("stroke-width", 0.75)
      .attr("fill-opacity", 0.88)
      .attr("d", areaGen);

    // Axes
    const xAxis = d3.axisBottom(xScale)
      .tickValues(years)
      .tickFormat(d3.format("d"));

    let yAxisFormat;
    if (currentMode === 'percent') {
      yAxisFormat = d3.format(".0%");
    } else if (maxStackedVal <= 5) {
      yAxisFormat = d3.format("d");
    } else {
      yAxisFormat = d => Number.isInteger(d) ? (Math.abs(d) >= 1000 ? d3.format("~s")(d) : d3.format("d")(d)) : "";
    }

    const yAxis = d3.axisLeft(yScale)
      .ticks(tickCount)
      .tickFormat(yAxisFormat);

    // Render X Axis
    g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    // X Axis Title
    g.append("text")
      .attr("class", "axis-title")
      .attr("x", width / 2)
      .attr("y", height + 28)
      .attr("text-anchor", "middle")
      .text("Year of Incident");

    // Render Y Axis
    g.append("g")
      .attr("class", "axis axis-y")
      .call(yAxis);

    // Y Axis Title
    g.append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .text(currentMode === 'percent' ? "Crime Composition Share (%)" : "Annual Recorded Incidents (#)");

    // Tooltip Element (attached to body for absolute floating)
    d3.select("body").selectAll(".stacked-rich-tooltip").remove();
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "stacked-rich-tooltip")
      .style("opacity", 0)
      .style("display", "none");

    // Scrubber Line & Dot
    const scrubberLine = g.append("line")
      .attr("class", "scrubber-line")
      .attr("y1", 0)
      .attr("y2", height)
      .style("opacity", 0);

    const scrubberDot = g.append("circle")
      .attr("class", "scrubber-dot")
      .attr("r", 4.5)
      .style("opacity", 0);

    // Time Brush (d3.brushX) as taught in P11 & P12
    const brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on("start brush", function(event) {
        if (event.sourceEvent) {
          scrubberLine.style("opacity", 0);
          scrubberDot.style("opacity", 0);
          tooltip.style("display", "none");
        }
      })
      .on("end", brushed);

    const brushG = chartContent.append("g")
      .attr("class", "stacked-brush")
      .call(brush)
      .on("mousemove", onPointerMove)
      .on("mouseleave", onPointerLeave);

    function brushed(event) {
      if (!event.sourceEvent) return; // Ignore programmatic brush calls
      const selection = event.selection;

      if (!selection) {
        brushedYears = null;
        updateStatusBadge();
        // Dispatch reset event for coordinated views
        window.dispatchEvent(new CustomEvent('timespanSelected', {
          detail: { startYear: null, endYear: null, isReset: true }
        }));
        window.dispatchEvent(new CustomEvent('crimeTimeRangeSelected', {
          detail: { startYear: minYear, endYear: maxYear, isReset: true }
        }));
        return;
      }

      // Convert pixel range to discrete years
      const rawStart = xScale.invert(selection[0]);
      const rawEnd = xScale.invert(selection[1]);
      let startYear = Math.max(minYear, Math.round(rawStart));
      let endYear = Math.min(maxYear, Math.round(rawEnd));

      if (startYear > endYear) {
        const tmp = startYear;
        startYear = endYear;
        endYear = tmp;
      }

      brushedYears = [startYear, endYear];
      updateStatusBadge();

      // Snap brush to integer year boundaries
      d3.select(this).transition().duration(180).call(
        brush.move,
        [xScale(startYear), xScale(endYear)]
      );

      // Dispatch CustomEvent for Coordinated Views across Dashboard
      window.dispatchEvent(new CustomEvent('timespanSelected', {
        detail: {
          startYear,
          endYear,
          isReset: false
        }
      }));
      window.dispatchEvent(new CustomEvent('crimeTimeRangeSelected', {
        detail: {
          startYear,
          endYear,
          focusedCrime,
          years: Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
        }
      }));
    }

    if (brushedYears) {
      brushG.call(brush.move, [xScale(brushedYears[0]), xScale(brushedYears[1])]);
    }

    function onPointerMove(event) {
      if (event.buttons > 0) return; // Dragging brush
      const [mx, my] = d3.pointer(event, g.node());
      if (mx < 0 || mx > width || my < 0 || my > height) {
        onPointerLeave();
        return;
      }

      // Find closest discrete year
      const rawX = xScale.invert(mx);
      let closestYear = Math.round(rawX);
      closestYear = Math.max(minYear, Math.min(maxYear, closestYear));
      const yearX = xScale(closestYear);

      // Show scrubber line
      scrubberLine
        .attr("x1", yearX)
        .attr("x2", yearX)
        .style("opacity", 1);

      // Identify which stacked layer is under the mouse cursor at this year
      const yearRow = dataByYear.find(d => d.year === closestYear);
      if (!yearRow) return;

      const yVal = yScale.invert(my);

      let identifiedCrime = hoveredCrime || focusedCrime || null;
      let targetPointY = my;

      if (!hoveredCrime) {
        // Find which layer yVal falls into
        for (const layer of stackedSeries) {
          const point = layer.find(p => p.data.year === closestYear);
          if (point && yVal >= point[0] && yVal <= point[1]) {
            identifiedCrime = layer.key;
            targetPointY = yScale((point[0] + point[1]) / 2);
            break;
          }
        }
      } else {
        const layer = stackedSeries.find(l => l.key === identifiedCrime);
        if (layer) {
          const point = layer.find(p => p.data.year === closestYear);
          if (point) {
            targetPointY = yScale(point[1]);
          }
        }
      }

      // Update scrubber dot
      if (identifiedCrime) {
        scrubberDot
          .attr("cx", yearX)
          .attr("cy", targetPointY)
          .attr("fill", colorScale(identifiedCrime))
          .style("opacity", 1);

        highlightLayer(identifiedCrime);
      } else {
        scrubberDot.style("opacity", 0);
      }

      // Populate rich tooltip
      const crimeInfo = yearRow._crimes[identifiedCrime] || { count: 0, share: 0, yoy: null };
      const crimeColor = identifiedCrime ? colorScale(identifiedCrime) : '#64748b';

      let yoyBadge = '';
      if (crimeInfo.yoy !== null) {
        const pct = (crimeInfo.yoy * 100).toFixed(1);
        const sign = crimeInfo.yoy > 0 ? `+${pct}%` : `${pct}%`;
        const cls = crimeInfo.yoy > 0.01 ? 'up' : (crimeInfo.yoy < -0.01 ? 'down' : 'flat');
        const icon = crimeInfo.yoy > 0.01 ? '▲' : (crimeInfo.yoy < -0.01 ? '▼' : '▬');
        yoyBadge = `<span class="tooltip-yoy ${cls}">${icon} ${sign} YoY</span>`;
      }

      const totalYearStr = numFormat(yearRow._total);
      const crimeCountStr = numFormat(crimeInfo.count);
      const crimeShareStr = percentFormat(crimeInfo.share);

      tooltip.html(`
        <div class="tooltip-header">
          <span>Year ${closestYear}</span>
          <small class="text-white-50">${totalYearStr} total</small>
        </div>
        <div class="tooltip-crime-title">
          <span class="tooltip-swatch" style="background:${crimeColor}"></span>
          <span>${identifiedCrime || 'Chicago Crimes'}</span>
        </div>
        <div class="tooltip-row">
          <span>Incidents:</span>
          <span class="tooltip-val">${crimeCountStr} ${yoyBadge}</span>
        </div>
        <div class="tooltip-row">
          <span>Yearly Share:</span>
          <span class="tooltip-val">${crimeShareStr}</span>
        </div>
        ${focusedCrime ? `<div class="tooltip-row mt-1 text-info small"><span>• Focused on ${focusedCrime}</span></div>` : ''}
      `);

      // Position tooltip safely avoiding viewport edge clipping
      const tooltipEl = tooltip.node();
      const tipWidth = 220;
      const tipHeight = 110;
      let left = event.pageX + 15;
      let top = event.pageY - 20;

      if (left + tipWidth > window.innerWidth - 20) {
        left = event.pageX - tipWidth - 15;
      }
      if (top + tipHeight > window.innerHeight - 20) {
        top = window.innerHeight - tipHeight - 20;
      }

      tooltip
        .style("left", `${left}px`)
        .style("top", `${top}px`)
        .style("display", "block")
        .transition().duration(50)
        .style("opacity", 1);
    }

    function onPointerLeave() {
      scrubberLine.style("opacity", 0);
      scrubberDot.style("opacity", 0);
      tooltip.transition().duration(150).style("opacity", 0).on("end", () => {
        tooltip.style("display", "none");
      });
      if (!focusedCrime) {
        resetLayerHighlights();
      } else {
        highlightLayer(focusedCrime);
      }
    }

    /**
     * Layer highlight & dimming logic
     */
    function highlightLayer(crimeKey) {
      layers.each(function (d) {
        const isMatch = d.key === crimeKey;
        d3.select(this)
          .classed("dimmed", !isMatch)
          .classed("highlighted", isMatch);
      });

      d3.select(legendWrap).selectAll(".stackedarea-legend-item")
        .classed("dimmed", function () {
          return this.getAttribute("data-crime") !== crimeKey;
        });
    }

    function resetLayerHighlights() {
      layers.classed("dimmed", false).classed("highlighted", false);
      d3.select(legendWrap).selectAll(".stackedarea-legend-item").classed("dimmed", false);
    }

    // Direct hover / click on SVG path layers
    layers
      .on("mouseenter", function (event, d) {
        hoveredCrime = d.key;
        highlightLayer(d.key);
      })
      .on("mouseleave", function () {
        hoveredCrime = null;
        if (!focusedCrime) {
          resetLayerHighlights();
        } else {
          highlightLayer(focusedCrime);
        }
      })
      .on("click", function (event, d) {
        toggleCrimeFocus(d.key);
      });

    /**
     * Build Interactive Legend
     */
    buildLegend(legendWrap, displayCrimes, displayTotals, colorScale, totalSystemCrime);
  }

  /**
   * Render Interactive Legend with swatches, counts, and click-to-focus
   */
  function buildLegend(container, displayCrimes, displayTotals, colorScale, totalSystemCrime) {
    const header = document.createElement('div');
    header.className = 'stackedarea-legend-header';
    header.innerHTML = `
      <span>Legend (${displayCrimes.length})</span>
      <span class="stackedarea-legend-hint">Click to isolate</span>
    `;
    container.appendChild(header);

    const list = document.createElement('div');
    list.className = 'stackedarea-legend-list';
    container.appendChild(list);

    displayCrimes.forEach(crime => {
      const info = displayTotals.get(crime) || { total: 0, shareOfSystem: 0 };
      const item = document.createElement('div');
      item.className = 'stackedarea-legend-item';
      item.setAttribute('data-crime', crime);

      if (focusedCrime === crime) {
        item.classList.add('active-focus');
      }

      const swatch = document.createElement('span');
      swatch.className = 'legend-swatch';
      swatch.style.backgroundColor = colorScale(crime);

      const label = document.createElement('span');
      label.className = 'legend-label';
      label.title = crime;
      label.textContent = crime;

      const val = document.createElement('span');
      val.className = 'legend-val';
      const pctStr = (info.shareOfSystem * 100).toFixed(1) + '%';
      val.textContent = currentMode === 'percent' ? pctStr : numFormat(info.total);

      item.appendChild(swatch);
      item.appendChild(label);
      item.appendChild(val);

      // Interactions on legend item
      item.addEventListener('mouseenter', () => {
        hoveredCrime = crime;
        d3.selectAll(".area-layer").each(function (d) {
          const match = d.key === crime;
          d3.select(this).classed("dimmed", !match).classed("highlighted", match);
        });
        d3.selectAll(".stackedarea-legend-item").classed("dimmed", function () {
          return this.getAttribute("data-crime") !== crime;
        });
      });

      item.addEventListener('mouseleave', () => {
        hoveredCrime = null;
        if (!focusedCrime) {
          d3.selectAll(".area-layer").classed("dimmed", false).classed("highlighted", false);
          d3.selectAll(".stackedarea-legend-item").classed("dimmed", false);
        } else {
          d3.selectAll(".area-layer").each(function (d) {
            const match = d.key === focusedCrime;
            d3.select(this).classed("dimmed", !match).classed("highlighted", match);
          });
          d3.selectAll(".stackedarea-legend-item").classed("dimmed", function () {
            return this.getAttribute("data-crime") !== focusedCrime;
          });
        }
      });

      item.addEventListener('click', () => {
        toggleCrimeFocus(crime);
      });

      list.appendChild(item);
    });
  }

  /**
   * Toggle crime focus mode (flattens baseline to y=0 to eliminate baseline distortion)
   */
  function toggleCrimeFocus(crime) {
    if (focusedCrime === crime) {
      focusedCrime = null;
    } else {
      focusedCrime = crime;
    }
    updateStatusBadge();
    draw();

    // Emit event for coordinated views (both bar graph and map listen to 'crimeSelected')
    window.dispatchEvent(new CustomEvent('crimeSelected', {
      detail: { crime: focusedCrime, source: 'stackedarea' }
    }));
  }

  /**
   * Update active filter / brush status badge
   */
  function updateStatusBadge() {
    if (!statusBadge) return;

    const parts = [];
    if (selectedCommunities && selectedCommunities.length > 0) {
      if (selectedCommunities.length === 1) {
        parts.push(`Area: ${selectedCommunities[0]}`);
      } else {
        parts.push(`Areas (${selectedCommunities.length}): ${selectedCommunities.slice(0, 2).join(', ')}${selectedCommunities.length > 2 ? '…' : ''}`);
      }
    }
    if (focusedCrime) {
      parts.push(`Focus: ${focusedCrime}`);
    }
    if (brushedYears) {
      parts.push(`Years: ${brushedYears[0]}–${brushedYears[1]}`);
    }

    if (parts.length > 0) {
      statusBadge.textContent = parts.join(' | ');
      statusBadge.classList.remove('d-none');
      if (btnReset) btnReset.classList.remove('d-none');
    } else {
      statusBadge.classList.add('d-none');
      if (btnReset) btnReset.classList.add('d-none');
    }
  }

  /**
   * Reset all filters, focus, and time brush
   */
  function resetAll() {
    focusedCrime = null;
    brushedYears = null;
    selectedCommunities = null;
    updateStatusBadge();
    reloadStackedData();

    window.dispatchEvent(new CustomEvent('timespanSelected', {
      detail: { startYear: null, endYear: null, isReset: true }
    }));
    window.dispatchEvent(new CustomEvent('crimeTimeRangeSelected', {
      detail: { isReset: true }
    }));
    window.dispatchEvent(new CustomEvent('crimeSelected', {
      detail: { crime: null, isReset: true, source: 'stackedarea' }
    }));
    window.dispatchEvent(new CustomEvent('districtsSelected', {
      detail: { districts: [] }
    }));
  }

  /**
   * Setup UI toolbar event listeners
   */
  function setupControls() {
    // Mode toggles
    if (btnModeCounts) {
      btnModeCounts.addEventListener('click', () => {
        if (currentMode === 'counts') return;
        currentMode = 'counts';
        btnModeCounts.classList.add('active');
        if (btnModePercent) btnModePercent.classList.remove('active');
        draw();
      });
    }

    if (btnModePercent) {
      btnModePercent.addEventListener('click', () => {
        if (currentMode === 'percent') return;
        currentMode = 'percent';
        btnModePercent.classList.add('active');
        if (btnModeCounts) btnModeCounts.classList.remove('active');
        draw();
      });
    }

    // Top N category buttons
    const topButtons = [
      { btn: btnTop5, val: 5 },
      { btn: btnTop8, val: 8 },
      { btn: btnTop10, val: 10 },
      { btn: btnTopAll, val: 'all' }
    ];

    topButtons.forEach(({ btn, val }) => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (currentTopN === val) return;
          currentTopN = val;
          topButtons.forEach(b => { if (b.btn) b.btn.classList.remove('active'); });
          btn.classList.add('active');
          draw();
        });
      }
    });

    if (btnReset) {
      btnReset.addEventListener('click', resetAll);
    }
  }

  /**
   * Expose global coordination hooks for other dashboard charts
   */
  window.setStackedAreaCrimeFilter = function (crimeName) {
    if (crimeName && crimeName !== focusedCrime) {
      focusedCrime = crimeName;
    } else {
      focusedCrime = null;
    }
    updateStatusBadge();
    draw();
  };

  window.clearStackedAreaFilter = function () {
    resetAll();
  };

  /**
   * Resize debouncing
   */
  function debounce(fn, delay) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), delay);
    };
  }

  // Initialization
  setupControls();

  try {
    let apiData = await getStackedAreaData();
    if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
      // Fallback direct fetch if import failed
      const directResp = await fetch('http://localhost:5000/data?graph=stackedarea');
      if (directResp.ok) {
        apiData = await directResp.json();
      }
    }

    if (!apiData || !Array.isArray(apiData)) {
      console.error('getStackedAreaData returned invalid data', apiData);
      rootContainer.innerHTML = `
        <div class="d-flex align-items-center justify-content-center h-100 text-muted">
          <div class="text-center">
            <i class="bi bi-exclamation-triangle fs-3 text-warning"></i>
            <p class="mt-2 mb-0">Unable to load crime trend data from server.</p>
            <small>Ensure the Python Flask backend is running on port 5000.</small>
          </div>
        </div>
      `;
      return;
    }

    rawData = apiData.map(d => ({
      year: +d.year,
      crime: d.primary_type || d.crime,
      count: +d.count
    }));

    draw();

    const handleResize = debounce(draw, 180);
    window.addEventListener('resize', handleResize);
    if (window.ResizeObserver && rootContainer) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(rootContainer);
    }

    // Community filter listener from map or MDS
    window.addEventListener('districtsSelected', async (e) => {
      const districts = e.detail && e.detail.districts ? e.detail.districts : [];
      selectedCommunities = districts.length > 0 ? districts : null;
      await reloadStackedData();
    });

    // Crime filter listener from bar chart or other views
    window.addEventListener('crimeSelected', (e) => {
      if (e.detail && e.detail.source === 'stackedarea') return;
      const crime = e.detail && e.detail.crime ? e.detail.crime : null;
      focusedCrime = crime;
      updateStatusBadge();
      draw();
    });

    // Global Dashboard Reset Listener
    window.addEventListener('globalDashboardReset', () => {
      resetAll();
    });

  } catch (err) {
    console.error('Error initializing stacked area chart:', err);
    rootContainer.innerHTML = `
      <div class="d-flex align-items-center justify-content-center h-100 text-danger">
        <p>Failed to initialize chart: ${err.message}</p>
      </div>
    `;
  }

  async function reloadStackedData() {
    try {
      const apiData = await getStackedAreaData({ community: selectedCommunities });
      if (apiData && Array.isArray(apiData)) {
        rawData = apiData.map(d => ({
          year: +d.year,
          crime: d.primary_type || d.crime,
          count: +d.count
        }));
        updateStatusBadge();
        draw();
      }
    } catch (err) {
      console.error('Error reloading stacked area data:', err);
    }
  }
})();