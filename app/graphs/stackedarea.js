(async function() {
  const { getStackedAreaData } = await import("../api.js");
  const container = document.getElementById('stackedarea');
  let cachedData = null;

  function draw(data) {
    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = (container ? container.offsetWidth : 460) - margin.left - margin.right;
    const height = (container ? container.offsetHeight : 300) - margin.top - margin.bottom;

    d3.select('#stackedarea').selectAll('*').remove();

    const svg = d3.select("#stackedarea")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "tooltip-stackedarea")
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Prepare data: unique years and crimes
    const years = Array.from(new Set(data.map(d => +d.year))).sort((a,b)=>a-b);
    const crimes = Array.from(new Set(data.map(d => d.crime)));

    // Pivot data into rows per year with crime counts as columns
    const dataByYear = years.map(year => {
      const row = { year };
      crimes.forEach(c => row[c] = 0);
      data.forEach(d => { if (+d.year === year) row[d.crime] = +(d.count || 0); });
      return row;
    });

    // Stack the data by crime keys
    const stackedData = d3.stack()
      .keys(crimes)
      (dataByYear);

    // X axis: numeric year scale
    const x = d3.scaleLinear()
      .domain(d3.extent(years))
      .range([ 0, width ]);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(Math.min(years.length, 10)).tickFormat(d3.format("d")));

    // Y axis: 0..max total per year
    const maxTotal = d3.max(dataByYear, r => d3.sum(crimes, c => r[c])) || 1;
    const y = d3.scaleLinear()
      .domain([0, maxTotal])
      .range([ height, 0 ]);

    svg.append("g").call(d3.axisLeft(y));

    // color palette
    const color = d3.scaleOrdinal()
      .domain(crimes)
      .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999']);

    // Create a tooltip element
    var tooltip = d3.select("#stackedarea")
      .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden");

    // Show the areas and add hover handlers to display the crime name
    svg
      .selectAll("mylayers")
      .data(stackedData)
      .join("path")
        .attr("fill", function(d) { return color(d.key); })
        .attr("d", d3.area()
          .x(function(d) { return x(d.data.year); })
          .y0(function(d) { return y(d[0]); })
          .y1(function(d) { return y(d[1]); })
        )
        .on("mouseover", function(event, d) {
          tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px")
            .style("visibility", "visible")
            .text(d && d.key ? d.key : "Unknown");
        })
        .on("mousemove", function(event, d) {
          tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px")
            .style("visibility", "visible")
            .text(d && d.key ? d.key : "Unknown");
        })
        .on("mouseout", function() {
          tooltip.style("visibility", "hidden");
        });
  }

  function debounce(fn, delay){ let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), delay); }; }

  try {
    const apiData = await getStackedAreaData();
    if (!apiData || !Array.isArray(apiData)) {
      console.error('getStackedAreaData returned invalid data', apiData);
      return;
    }
    cachedData = apiData.map(d => ({ year: d.year, crime: d.primary_type, count: +d.count }));
    draw(cachedData);
    window.addEventListener('resize', debounce(() => draw(cachedData), 200));
  } catch (err) {
    console.error('Error fetching stacked area data:', err);
  }

})();