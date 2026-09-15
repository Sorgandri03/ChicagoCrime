(async function() {
  const { getBarData } = await import("../api.js");
  const container = document.getElementById('bargraph');
  if (!container) return;

  // Global visualization state
  let rawData = [];
  let totalCrimes = 0;
  const state = {
    filter: '15',           // '10', '15', '25', 'all'
    sort: 'count-desc',     // 'count-desc', 'count-asc', 'alpha'
    orient: 'horiz',        // 'horiz' (recommended for long labels), 'vert'
    scale: 'lin',           // 'lin' (standard 0-baseline), 'log'
    showMean: true,
    selectedCrime: null
  };

  let selectedCommunity = null;
  let currentStartYear = null;
  let currentEndYear = null;

  // Create shared tooltip in body if not existing
  let tooltip = d3.select("body").select(".chart-tooltip.bar-chart-tooltip");
  if (tooltip.empty()) {
    tooltip = d3.select("body")
      .append("div")
      .attr("class", "chart-tooltip bar-chart-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden");
  }

  let isWindowScrolling = false;
  let scrollTimeout = null;
  window.addEventListener('scroll', () => {
    isWindowScrolling = true;
    tooltip.style("visibility", "hidden");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isWindowScrolling = false;
    }, 120);
  }, { passive: true });

  // Formatters
  const formatComma = d3.format(",");
  const formatCompact = d3.format("~s");

  function getDisplayData() {
    if (!rawData || !rawData.length) return [];
    
    // Sort base data copy
    let sorted = [...rawData];
    if (state.sort === 'count-desc') {
      sorted.sort((a, b) => b.count - a.count);
    } else if (state.sort === 'count-asc') {
      sorted.sort((a, b) => a.count - b.count);
    } else if (state.sort === 'alpha') {
      sorted.sort((a, b) => a.crime.localeCompare(b.crime));
    }

    // Apply filter scope
    if (state.filter === '10') {
      return sorted.slice(0, 10);
    } else if (state.filter === '15') {
      return sorted.slice(0, 15);
    } else if (state.filter === '25') {
      return sorted.slice(0, 25);
    }
    return sorted;
  }

  function draw() {
    const data = getDisplayData();
    if (!data.length) return;

    const containerWidth = Math.max(container.offsetWidth || 600, 320);
    const containerHeight = Math.max(container.offsetHeight || 320, 160);

    // Margins tailored to orientation
    const isHoriz = state.orient === 'horiz';
    const isLog = state.scale === 'log';

    const margin = isHoriz
      ? { top: 32, right: 65, bottom: 25, left: Math.min(175, Math.round(containerWidth * 0.28)) }
      : { top: 32, right: 30, bottom: Math.min(100, Math.round(containerHeight * 0.28)), left: 65 };

    const width = Math.max(containerWidth - margin.left - margin.right, 100);
    const height = Math.max(containerHeight - margin.top - margin.bottom, 100);

    d3.select('#bargraph').selectAll('*').remove();

    const svg = d3.select("#bargraph")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .style("display", "block")
        .style("overflow", "visible");

    // Click outside to clear selection
    svg.on("click", (event) => {
      if (event.target.tagName !== 'rect' || !event.target.classList.contains('bar-rect')) {
        if (state.selectedCrime !== null) {
          state.selectedCrime = null;
          updateSelectionHighlight();
          window.dispatchEvent(new CustomEvent('crimeSelected', { detail: { crime: null } }));
        }
      }
    });

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Global crime stats
    const values = data.map(d => +d.count);
    const maxVal = d3.max(values) || 1;
    const minVal = d3.min(values) || 0;
    const minPositive = d3.min(values.filter(v => v > 0)) || 1;
    const meanVal = d3.mean(values) || 0;

    // Standard D3 sequential chromatic color scale (Course standard color encoding)
    // Interpolates from bright light-blue (#93c5fd) up to saturated navy (#0c4a6e)
    const colorScale = d3.scaleSequential()
      .domain([0, maxVal])
      .interpolator(t => d3.interpolateBlues(0.35 + 0.65 * t));

    // ==========================================
    // COLOR LEGEND (Course Rubric requirement)
    // ==========================================
    const legendWidth = Math.min(140, Math.max(90, width * 0.25));
    const legendHeight = 8;
    const legendG = svg.append("g")
      .attr("class", "color-legend")
      .attr("transform", `translate(${margin.left + width - legendWidth}, 10)`);

    const defs = svg.append("defs");
    const legendGradientId = "bar-legend-grad-" + Math.random().toString(36).slice(2, 7);
    const linearGrad = defs.append("linearGradient")
      .attr("id", legendGradientId)
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%");

    linearGrad.append("stop").attr("offset", "0%").attr("stop-color", colorScale(0));
    linearGrad.append("stop").attr("offset", "100%").attr("stop-color", colorScale(maxVal));

    legendG.append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("rx", 2)
      .style("fill", `url(#${legendGradientId})`)
      .style("stroke", "#cbd5e1")
      .style("stroke-width", "0.5px");

    legendG.append("text")
      .attr("x", 0)
      .attr("y", -3)
      .text("Incidents:")
      .style("font-size", "9px")
      .style("font-weight", "600")
      .style("fill", "#64748b");

    legendG.append("text")
      .attr("x", 0)
      .attr("y", legendHeight + 10)
      .text("0")
      .style("font-size", "8.5px")
      .style("fill", "#64748b");

    legendG.append("text")
      .attr("x", legendWidth)
      .attr("y", legendHeight + 10)
      .attr("text-anchor", "end")
      .text(formatCompact(maxVal))
      .style("font-size", "8.5px")
      .style("fill", "#64748b");

    // ==========================================
    // SCALES & AXES
    // ==========================================
    if (isHoriz) {
      // HORIZONTAL ORIENTATION: categories on Y, values on X
      const y = d3.scaleBand()
        .domain(data.map(d => d.crime))
        .range([0, height])
        .padding(data.length > 20 ? 0.15 : 0.25);

      let x;
      if (isLog) {
        x = d3.scaleLog()
          .base(10)
          .domain([Math.max(1, minPositive * 0.8), Math.max(10, maxVal * 1.3)])
          .range([0, width])
          .nice();
      } else {
        // Linear scale starting strictly at 0 (Few & Santucci: "Do not lie!")
        x = d3.scaleLinear()
          .domain([0, maxVal * 1.08])
          .range([0, width])
          .nice();
      }

      // X Axis (Bottom)
      const xAxis = d3.axisBottom(x)
        .ticks(Math.max(4, Math.round(width / 90)))
        .tickFormat(isLog ? d3.format("~s") : d3.format("~s"));

      g.append("g")
        .attr("class", "axis axis-x")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .call(g => g.select(".domain").attr("stroke", "#94a3b8"))
        .call(g => g.selectAll(".tick line").attr("stroke", "#e2e8f0"))
        .call(g => g.selectAll("text").style("fill", "#475569").style("font-size", "10px"));

      // Gridlines (subtle vertical lines)
      g.append("g")
        .attr("class", "grid grid-x")
        .call(d3.axisBottom(x).ticks(Math.max(4, Math.round(width / 90))).tickSize(height).tickFormat(""))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll("line").attr("stroke", "#f1f5f9").attr("stroke-dasharray", "2,2"));

      // Y Axis (Left - Full readable category labels)
      const yAxis = d3.axisLeft(y);
      const yAxisG = g.append("g")
        .attr("class", "axis axis-y")
        .call(yAxis)
        .call(g => g.select(".domain").attr("stroke", "#94a3b8"))
        .call(g => g.selectAll(".tick line").remove());

      // Format category labels dynamically to fit margin
      const maxChar = Math.max(14, Math.floor(margin.left / 7.2));
      yAxisG.selectAll("text")
        .style("fill", "#1e293b")
        .style("font-size", data.length > 20 ? "9.5px" : "11px")
        .style("font-weight", "500")
        .text(d => d.length > maxChar ? d.slice(0, maxChar - 2) + "…" : d)
        .append("title")
        .text(d => d);

      // ==========================================
      // STATISTICAL REFERENCE LINE (Mean)
      // ==========================================
      if (state.showMean && meanVal > 0) {
        const meanX = x(isLog ? Math.max(1, meanVal) : meanVal);
        if (meanX >= 0 && meanX <= width) {
          const refG = g.append("g").attr("class", "mean-reference-group");
          refG.append("line")
            .attr("class", "mean-reference-line")
            .attr("x1", meanX).attr("y1", 0)
            .attr("x2", meanX).attr("y2", height);

          refG.append("rect")
            .attr("x", Math.min(width - 65, Math.max(0, meanX - 32)))
            .attr("y", -16)
            .attr("width", 64)
            .attr("height", 14)
            .attr("rx", 3)
            .attr("fill", "#fee2e2")
            .attr("stroke", "#fca5a5")
            .attr("stroke-width", "0.5px");

          refG.append("text")
            .attr("class", "mean-reference-badge")
            .attr("x", Math.min(width - 33, Math.max(32, meanX)))
            .attr("y", -6)
            .attr("text-anchor", "middle")
            .text(`Avg: ${formatCompact(meanVal)}`);
        }
      }

      // ==========================================
      // BARS
      // ==========================================
      const bars = g.selectAll(".bar-rect")
        .data(data, d => d.crime)
        .join("rect")
          .attr("class", d => `bar-rect ${state.selectedCrime === d.crime ? 'selected' : ''}`)
          .attr("y", d => y(d.crime))
          .attr("x", 0)
          .attr("height", y.bandwidth())
          .attr("width", d => {
            const val = isLog ? Math.max(1, +d.count) : Math.max(0, +d.count);
            return Math.max(2, x(val));
          })
          .attr("rx", 3)
          .attr("fill", d => colorScale(+d.count))
          .attr("stroke", d => state.selectedCrime === d.crime ? "#e65100" : "transparent")
          .attr("stroke-width", d => state.selectedCrime === d.crime ? 2.5 : 1)
          .style("opacity", d => (!state.selectedCrime || state.selectedCrime === d.crime ? 1 : 0.3));

      // Value labels at the end of each bar
      if (data.length <= 25) {
        g.selectAll(".bar-value-label")
          .data(data, d => d.crime)
          .join("text")
            .attr("class", "bar-value-label")
            .attr("x", d => {
              const val = isLog ? Math.max(1, +d.count) : Math.max(0, +d.count);
              return Math.min(width + 4, x(val) + 5);
            })
            .attr("y", d => y(d.crime) + y.bandwidth() / 2 + 3.5)
            .text(d => formatCompact(d.count))
            .style("font-size", data.length > 18 ? "9px" : "10px");
      }

      setupInteractions(bars, data, meanVal);

    } else {
      // VERTICAL ORIENTATION: categories on X, values on Y
      const x = d3.scaleBand()
        .domain(data.map(d => d.crime))
        .range([0, width])
        .padding(data.length > 20 ? 0.18 : 0.28);

      let y;
      if (isLog) {
        y = d3.scaleLog()
          .base(10)
          .domain([Math.max(1, minPositive * 0.8), Math.max(10, maxVal * 1.3)])
          .range([height, 0])
          .nice();
      } else {
        y = d3.scaleLinear()
          .domain([0, maxVal * 1.08])
          .range([height, 0])
          .nice();
      }

      // X Axis (Bottom)
      const xAxis = d3.axisBottom(x);
      const xAxisG = g.append("g")
        .attr("class", "axis axis-x")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .call(g => g.select(".domain").attr("stroke", "#94a3b8"));

      // Smart responsive rotation
      const fontSize = Math.max(8, Math.min(10.5, Math.floor(x.bandwidth() / 1.8)));
      xAxisG.selectAll("text")
        .attr("transform", "translate(-8, 4) rotate(-38)")
        .style("text-anchor", "end")
        .style("fill", "#1e293b")
        .style("font-size", `${fontSize}px`)
        .style("font-weight", "500")
        .text(d => {
          const maxLetters = Math.max(10, Math.floor((margin.bottom * 1.3) / (fontSize * 0.55)));
          return d.length > maxLetters ? d.slice(0, maxLetters - 2) + "…" : d;
        })
        .append("title")
        .text(d => d);

      // Y Axis (Left)
      const yAxis = d3.axisLeft(y)
        .ticks(Math.max(4, Math.round(height / 50)))
        .tickFormat(isLog ? d3.format("~s") : d3.format("~s"));

      g.append("g")
        .attr("class", "axis axis-y")
        .call(yAxis)
        .call(g => g.select(".domain").attr("stroke", "#94a3b8"))
        .call(g => g.selectAll(".tick line").attr("stroke", "#e2e8f0"))
        .call(g => g.selectAll("text").style("fill", "#475569").style("font-size", "10px"));

      // Gridlines (horizontal)
      g.append("g")
        .attr("class", "grid grid-y")
        .call(d3.axisLeft(y).ticks(Math.max(4, Math.round(height / 50))).tickSize(-width).tickFormat(""))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll("line").attr("stroke", "#f1f5f9").attr("stroke-dasharray", "2,2"));

      // Reference Line
      if (state.showMean && meanVal > 0) {
        const meanY = y(isLog ? Math.max(1, meanVal) : meanVal);
        if (meanY >= 0 && meanY <= height) {
          const refG = g.append("g").attr("class", "mean-reference-group");
          refG.append("line")
            .attr("class", "mean-reference-line")
            .attr("x1", 0).attr("y1", meanY)
            .attr("x2", width).attr("y2", meanY);

          refG.append("rect")
            .attr("x", width - 68)
            .attr("y", meanY - 14)
            .attr("width", 64)
            .attr("height", 13)
            .attr("rx", 3)
            .attr("fill", "#fee2e2")
            .attr("stroke", "#fca5a5")
            .attr("stroke-width", "0.5px");

          refG.append("text")
            .attr("class", "mean-reference-badge")
            .attr("x", width - 36)
            .attr("y", meanY - 4)
            .attr("text-anchor", "middle")
            .text(`Avg: ${formatCompact(meanVal)}`);
        }
      }

      // BARS
      const bars = g.selectAll(".bar-rect")
        .data(data, d => d.crime)
        .join("rect")
          .attr("class", d => `bar-rect ${state.selectedCrime === d.crime ? 'selected' : ''}`)
          .attr("x", d => x(d.crime))
          .attr("y", d => {
            const val = isLog ? Math.max(1, +d.count) : Math.max(0, +d.count);
            return y(val);
          })
          .attr("width", x.bandwidth())
          .attr("height", d => {
            const val = isLog ? Math.max(1, +d.count) : Math.max(0, +d.count);
            return Math.max(2, height - y(val));
          })
          .attr("rx", 2)
          .attr("fill", d => colorScale(+d.count))
          .attr("stroke", d => state.selectedCrime === d.crime ? "#e65100" : "transparent")
          .attr("stroke-width", d => state.selectedCrime === d.crime ? 2.5 : 1)
          .style("opacity", d => (!state.selectedCrime || state.selectedCrime === d.crime ? 1 : 0.3));

      // Value labels on top of bars
      if (data.length <= 20) {
        g.selectAll(".bar-value-label")
          .data(data, d => d.crime)
          .join("text")
            .attr("class", "bar-value-label")
            .attr("x", d => x(d.crime) + x.bandwidth() / 2)
            .attr("y", d => {
              const val = isLog ? Math.max(1, +d.count) : Math.max(0, +d.count);
              return Math.max(10, y(val) - 4);
            })
            .attr("text-anchor", "middle")
            .text(d => formatCompact(d.count))
            .style("font-size", "9px");
      }

      setupInteractions(bars, data, meanVal);
    }
  }

  function setupInteractions(bars, currentData, meanVal) {
    bars
      .on("mouseover", function(event, d) {
        if (isWindowScrolling) return;

        if (state.selectedCrime !== null) {
          // If a crime is selected:
          // 1. Keep selected bar fully visible (opacity 1) with orange border
          // 2. Highlight currently hovered bar with opacity 1 and blue border
          // 3. Dim remaining bars to 0.25
          bars.each(function(el) {
            const isSel = el.crime === state.selectedCrime;
            const isHov = el.crime === d.crime;
            const barSel = d3.select(this);

            if (isSel) {
              barSel
                .style("opacity", 1)
                .style("stroke", "#e65100")
                .style("stroke-width", "2.5px")
                .classed("selected", true);
            } else if (isHov) {
              barSel
                .style("opacity", 1)
                .style("stroke", "#0284c7")
                .style("stroke-width", "2px")
                .classed("selected", false);
            } else {
              barSel
                .style("opacity", 0.25)
                .style("stroke", "transparent")
                .style("stroke-width", "1px")
                .classed("selected", false);
            }
          });
        } else {
          // No crime selected: hover focus on this bar, dim others
          bars.each(function(el) {
            const isHov = el.crime === d.crime;
            const barSel = d3.select(this);
            barSel
              .style("opacity", isHov ? 1 : 0.35)
              .style("stroke", isHov ? "#0284c7" : "transparent")
              .style("stroke-width", isHov ? "2px" : "1px")
              .classed("selected", false);
          });
        }

        // Compute rank among all crimes
        const rankIndex = rawData.findIndex(r => r.crime === d.crime) + 1;
        const pctTotal = totalCrimes > 0 ? ((d.count / totalCrimes) * 100).toFixed(2) : '0';
        const diffMean = d.count - Math.round(meanVal);
        const diffSign = diffMean >= 0 ? "+" : "";

        tooltip
          .style("visibility", "visible")
          .html(`
            <div style="font-weight:700; font-size:13px; color:#38bdf8; margin-bottom:4px;">
              ${d.crime}
            </div>
            <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:2px;">
              <span style="color:#94a3b8;">Incidents:</span>
              <strong style="color:#ffffff;">${formatComma(d.count)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:2px;">
              <span style="color:#94a3b8;">Share of Total:</span>
              <strong style="color:#facc15;">${pctTotal}%</strong>
            </div>
            <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:2px;">
              <span style="color:#94a3b8;">Rank:</span>
              <strong style="color:#e2e8f0;">#${rankIndex} of ${rawData.length}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; gap:12px;">
              <span style="color:#94a3b8;">Vs Average:</span>
              <strong style="color:${diffMean >= 0 ? '#4ade80' : '#f87171'};">
                ${diffSign}${formatComma(diffMean)}
              </strong>
            </div>
          `);
      })
      .on("mousemove", function(event) {
        if (isWindowScrolling) return;
        const tooltipEl = tooltip.node();
        const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 180;
        let left = event.pageX + 14;
        let top = event.pageY - 28;

        if (event.clientX + tooltipWidth + 24 > window.innerWidth) {
          left = event.pageX - tooltipWidth - 14;
        }
        if (event.clientY - 35 < 0) {
          top = event.pageY + 18;
        }

        tooltip
          .style("left", `${left}px`)
          .style("top", `${top}px`);
      })
      .on("mouseout", function() {
        updateSelectionHighlight();
        tooltip.style("visibility", "hidden");
      })
      .on("click", function(event, d) {
        event.stopPropagation();
        if (state.selectedCrime === d.crime) {
          state.selectedCrime = null;
        } else {
          state.selectedCrime = d.crime;
        }
        updateSelectionHighlight();

        // Dispatch coordination event to other views (Exam Requirement)
        window.dispatchEvent(new CustomEvent('crimeSelected', {
          detail: {
            crime: state.selectedCrime,
            count: d.count
          }
        }));
      });
  }

  function updateSelectionHighlight() {
    const bars = d3.select("#bargraph").selectAll(".bar-rect");
    if (state.selectedCrime === null) {
      bars
        .style("opacity", 1)
        .style("stroke", "transparent")
        .style("stroke-width", "1px")
        .classed("selected", false);
    } else {
      bars
        .style("opacity", d => d.crime === state.selectedCrime ? 1 : 0.3)
        .style("stroke", d => d.crime === state.selectedCrime ? "#e65100" : "transparent")
        .style("stroke-width", d => d.crime === state.selectedCrime ? "2.5px" : "1px")
        .classed("selected", d => d.crime === state.selectedCrime);
    }
  }

  // ==========================================
  // CONTROLS ATTACHMENT
  // ==========================================
  function setupControls() {
    const filterSelect = document.getElementById('bar-filter-select');
    const sortSelect = document.getElementById('bar-sort-select');
    const orientHoriz = document.getElementById('bar-orient-horiz');
    const orientVert = document.getElementById('bar-orient-vert');
    const scaleLin = document.getElementById('bar-scale-lin');
    const scaleLog = document.getElementById('bar-scale-log');
    const meanToggle = document.getElementById('bar-mean-toggle');

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        state.filter = e.target.value;
        draw();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        draw();
      });
    }

    if (orientHoriz && orientVert) {
      orientHoriz.addEventListener('click', () => {
        if (state.orient !== 'horiz') {
          state.orient = 'horiz';
          orientHoriz.classList.add('active');
          orientVert.classList.remove('active');
          draw();
        }
      });
      orientVert.addEventListener('click', () => {
        if (state.orient !== 'vert') {
          state.orient = 'vert';
          orientVert.classList.add('active');
          orientHoriz.classList.remove('active');
          draw();
        }
      });
    }

    if (scaleLin && scaleLog) {
      scaleLin.addEventListener('click', () => {
        if (state.scale !== 'lin') {
          state.scale = 'lin';
          scaleLin.classList.add('active');
          scaleLog.classList.remove('active');
          draw();
        }
      });
      scaleLog.addEventListener('click', () => {
        if (state.scale !== 'log') {
          state.scale = 'log';
          scaleLog.classList.add('active');
          scaleLin.classList.remove('active');
          draw();
        }
      });
    }

    if (meanToggle) {
      meanToggle.addEventListener('click', () => {
        state.showMean = !state.showMean;
        meanToggle.classList.toggle('active', state.showMean);
        draw();
      });
    }
  }

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  try {
    const apiData = await getBarData();
    if (!apiData || !Array.isArray(apiData)) {
      console.error('getBarData returned invalid data', apiData);
      return;
    }

    rawData = apiData.map(d => ({ crime: String(d.crime).trim(), count: +d.count }));
    // Base sort descending by count
    rawData.sort((a, b) => b.count - a.count);
    totalCrimes = d3.sum(rawData, d => d.count);

    // Update total badge in card header
    updateBarHeaderBadges();

    setupControls();
    draw();

    const handleResize = debounce(() => draw(), 180);
    window.addEventListener('resize', handleResize);

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
    }

    // Coordinated View Listeners
    window.addEventListener('districtsSelected', async (e) => {
      const districts = e.detail && e.detail.districts ? e.detail.districts : [];
      selectedCommunity = districts.length > 0 ? districts[0] : null;
      await reloadBarData();
    });

    window.addEventListener('timespanSelected', async (e) => {
      currentStartYear = e.detail && e.detail.startYear ? e.detail.startYear : null;
      currentEndYear = e.detail && e.detail.endYear ? e.detail.endYear : null;
      await reloadBarData();
    });

    window.addEventListener('crimeTimeRangeSelected', async (e) => {
      if (e.detail && e.detail.isReset) {
        currentStartYear = null;
        currentEndYear = null;
        await reloadBarData();
      }
    });

    // Global Dashboard Reset Listener
    window.addEventListener('globalDashboardReset', async () => {
      state.selectedCrime = null;
      selectedCommunity = null;
      currentStartYear = null;
      currentEndYear = null;
      await reloadBarData();
    });

  } catch (err) {
    console.error('Error initializing bar chart:', err);
  }

  async function reloadBarData() {
    try {
      const apiData = await getBarData({
        community: selectedCommunity,
        startYear: currentStartYear,
        endYear: currentEndYear
      });
      if (!apiData || !Array.isArray(apiData)) return;

      rawData = apiData.map(d => ({ crime: String(d.crime).trim(), count: +d.count }));
      rawData.sort((a, b) => b.count - a.count);
      totalCrimes = d3.sum(rawData, d => d.count);

      updateBarHeaderBadges();
      draw();
    } catch (err) {
      console.error('Error reloading bar data:', err);
    }
  }

  function updateBarHeaderBadges() {
    const totalBadge = document.getElementById('bar-total-badge');
    if (totalBadge) {
      let label = `${formatComma(totalCrimes)} Crimes`;
      if (selectedCommunity) label += ` | Area: ${selectedCommunity}`;
      if (currentStartYear != null && currentEndYear != null) label += ` | ${currentStartYear}–${currentEndYear}`;
      totalBadge.textContent = label;
    }
  }
})();