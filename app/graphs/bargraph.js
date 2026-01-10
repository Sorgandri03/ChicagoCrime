(async function() {
  const { getBarData } = await import("../api.js");
  const container = document.getElementById('bargraph');
  let cachedData = null;

  function draw(data) {
    // compute margins dynamically so rotated labels don't get clipped
    const margin = { top: 10, right: 30, left: 60, bottom: Math.max(50, Math.round((container ? container.offsetHeight : 300) * 0.18)) };
    const width = (container ? container.offsetWidth : 460) - margin.left - margin.right;
    const height = (container ? container.offsetHeight : 300) - margin.top - margin.bottom;

    d3.select('#bargraph').selectAll('*').remove();

    const svg = d3.select("#bargraph")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis (labels come from `crime`)
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.crime))
      .padding(0.2);

    const xAxis = svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const fs = Math.min(8, Math.round((container ? container.offsetWidth : 460) / 80));
    xAxis.selectAll("text")
      .attr("transform", "translate(-8,2)rotate(-30)")
      .style("text-anchor", "end")
      .style("font-size", fs + "px");

    // Y axis: logarithmic scale
    const values = data.map(d => +d.count);
    const maxVal = d3.max(values) || 1;
    const minPositive = d3.min(values.filter(v => v > 0)) || 1;
    const y = d3.scaleLog()
      .base(10)
      .domain([Math.max(1, minPositive), Math.max(10, maxVal)])
      .range([height, 0])
      .nice();

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5, "~s"));

    // Bars (use Math.max to avoid log(0))
    svg.selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", d => x(d.crime))
        .attr("y", d => y(Math.max(1, +d.count)))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(Math.max(1, +d.count)))
        .attr("fill", "#69b3a2");
  }

  function debounce(fn, delay){ let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), delay); }; }

  try {
    const apiData = await getBarData();
    if (!apiData || !Array.isArray(apiData)) {
      console.error('getBarData returned invalid data', apiData);
      return;
    }
    cachedData = apiData.map(d => ({ crime: d.crime, count: +d.count }));
    draw(cachedData);
    window.addEventListener('resize', debounce(() => draw(cachedData), 200));
  } catch (err) {
    console.error('Error fetching bar data:', err);
  }

})();