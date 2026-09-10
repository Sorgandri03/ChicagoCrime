D3.js – Scales, Axis, Colors
|                  | Visual Analytics – |                                  | Practical Part – | P06 |     |
| ---------------- | ------------------ | -------------------------------- | ---------------- | --- | --- |
| Visual Analytics |                    | P10 -D3.js -Scales, Axis, Colors |                  |     | 1   |

Scales
https://d3js.org/d3-scale
| Visual Analytics | P10 -D3.js -Scales, Axis, Colors | 2   |
| ---------------- | -------------------------------- | --- |

Scales
• Attributes (and styles) control position and appearance of elements
•
We use data binding to maintain the mapping from data to elements, but what
| about the mapping from data to attributes? |     |     |
| ------------------------------------------ | --- | --- |
• We need to compute attributes from data to generate visual encodings (position,
color, etc.)
• Scales help to do that
| Visual Analytics | P10 -D3.js -Scales, Axis, Colors | 3   |
| ---------------- | -------------------------------- | --- |

Scales
Data Attributes
SCALES
Scales in D3 are functions that maps data to attributes.
We need to setup some parameters of the functions to obtain what is desired.
Visual Analytics P10 -D3.js -Scales, Axis, Colors 4

D3 Scales
| • Utility functions | that maps data | to attributes |     |
| ------------------- | -------------- | ------------- | --- |
•
We need to setup some parameters to define the correct behavior
• The use of scales is not mandatory, but highly suggested. We can define our
own functions that transform data to attribute values.
• Many scales exist: we need to know the data types on which we are working
https://d3js.org/d3-scale
| Visual Analytics |     | P10 -D3.js -Scales, Axis, Colors | 5   |
| ---------------- | --- | -------------------------------- | --- |

Data Types
➢ Quantitative
(allows arithmetic operations)
• 123, 29.56, 67832, …
➢ Categorical
o Nominal (name only, no ordering)
• North, East, South, West
o Ordinal (ordered, not measurable)
• First, second, third ...
o Intervals (starts out as quantitative, but it is made categorical by subdividing into ordered ranges)
• 0-999, 1000-4999, 5000-9999
o Hierarchical (successive inclusion)
• Continent > Country > State > City
Visual Analytics P10 -D3.js -Scales, Axis, Colors 6

Quantitative scales
A quantitative scale:
• maps a continuous numeric domain (x) to a continuous* range (y)
| • defines its own function: 𝒚 |     | = 𝒇(𝒙) |     |     |     |     |
| ----------------------------- | --- | ------ | --- | --- | --- | --- |
• if the range is numeric the function can be inverted: 𝒙 = 𝒇′(𝒚)
| • Linear | scales → | apply a linear transformation  |     | 𝑦 = 𝑚𝑥 | + 𝑞 |     |
| -------- | -------- | ------------------------------ | --- | ------ | --- | --- |
• Power scales → apply an exponential transformation  𝑦 = 𝑚𝑥 𝑘 + 𝑞
• Logarithmic scales → apply a logarithmic transformation  𝑦 = 𝑚 log ( 𝑥) + 𝑞
𝑏
* The range is usually numeric, but could be of different types
| Visual Analytics |     |     | P10 -D3.js -Scales, Axis, Colors |     |     | 7   |
| ---------------- | --- | --- | -------------------------------- | --- | --- | --- |

Domain → Range
• Two key concept for a scale: Domain and Range
•
Scales map values from data-space (domain) to visual-space (range)
• Some scales allow also the inverse mapping: range →domain
|                  | 0   |     | Domain                           | 100 |     |
| ---------------- | --- | --- | -------------------------------- | --- | --- |
|                  |     | 20  | Range                            | 110 |     |
| Visual Analytics |     |     | P10 -D3.js -Scales, Axis, Colors |     | 8   |

| Visual Analytics | P10 -D3.js -Scales, Axis, Colors | 9   |
| ---------------- | -------------------------------- | --- |

Linear scale
𝑦 = 𝑚𝑥 + 𝑞
const myScale = d3.scaleLinear()
.domain([0, 1000])
// set the domain, must be an array [min, max]
.range([100, 200])
// set the range, must be an array [min, max]
myScale(16) // -> 240
myScale.invert(240) // --> 16
Used for example for
• x and y coordinates in scatterplot
• bar height in bar chart
• …
https://d3js.org/d3-scale/linear
Visual Analytics P10 -D3.js -Scales, Axis, Colors 10

| Power scale |     | 𝑘   |     |     |
| ----------- | --- | --- | --- | --- |
|             | 𝑦 = | 𝑚𝑥  | + 𝑞 |     |
const myScale = d3.scalePow()
.domain([0, 1000])
// set the domain, must be an array [min, max]
.range([100, 200])
// set the range, must be an array [min, max]
.exponent(2)
// set the exponent
myScale(16) // -> ~100
myScale.invert(100) // --> ~16
https://d3js.org/d3-scale/pow
| Visual Analytics |     |     | P10 -D3.js -Scales, Axis, Colors | 11  |
| ---------------- | --- | --- | -------------------------------- | --- |

Logarithmic scale
𝑦 = 𝑚 log ( 𝑥) + 𝑞
𝑏
const myScale = d3.scaleLog()
.domain([10, 1000])
// set the domain, must be an array [min, max]
.range([100, 200])
// set the range, must be an array [min, max]
.base(10)
// set the base of the logarithmic
myScale(16) // -> ~110.2
myScale.invert(110.2) // --> ~16
https://d3js.org/d3-scale/log
Visual Analytics P10 -D3.js -Scales, Axis, Colors 12

Domain and Range
(valid for each scale, not only for quantitative)
• The domain is typically derived from the data
• E.g., [min, max] of a dimension of the dataset
• The range is typically constant
• E.g., [0, svgWidth] size of the chart
Visual Analytics P10 -D3.js -Scales, Axis, Colors 13

Useful d3 functions
Useful functions to derive the domain
• d3.min(array, mappingFunction) → min of the array
• d3.max(array, mappingFunction) → max of the array
• d3.extent(array, mappingFunction) → [min, max] of the array (as array)
mappingFunction is optional, is a function (d, i) => {…} that returns a value. For example, when array is an
array of objects, and we want to compute the min of a given property of the objects
const arr= [
d3.min(arr, d => d.x1) // -> 10
{ x1: 10, x2: 100, x3: 98},
{ x1: 25, x2: 50, x3: 45},
{x1: 18, x2: 32, x3: 12}
d3.extent(arr, d => d.x1) // -> [10, 25]
]
Visual Analytics P10 -D3.js -Scales, Axis, Colors 14

Range NOT numerical in quantitative scales
In quantitative scales (linear, power, …) range can be "not numerical"
• For example, map a number in [0, 1000] to a color from red to blue
const myScale = d3.scaleLinear()
.domain([0, 1000]) // set the domain, must be an array [min, max]
.range(['red', 'blue']) // // set the range, must be an array [min, max]
myScale(500) // -> rgb(128, 0, 128)
Visual Analytics P10 -D3.js -Scales, Axis, Colors 15

Diverging Scales
Like linear/pow/log scales but have 3 values for domain and 3 values for range
• d3.scaleDiverging()
• d3.scaleDivergingPow()
• d3.scaleDivergingLog()
const myScale = d3.scaleDiverging()
.domain([-100, 0, +100]) // set the domain, must be a 3D array [min, center, max]
.range(['red', 'white', 'blue']) // set the range, must be a 3D array [min, center, max]
https://d3js.org/d3-scale/diverging
Visual Analytics P10 -D3.js -Scales, Axis, Colors 16

Why diverging scales?
• For domains that are diverging from a central point, for example:
•
|     | Temperature: [-100 C° | , 0 C° | ,+100 C°] |     |
| --- | --------------------- | ------ | --------- | --- |
• Use as output a diverging color scale (see next slides)
| Visual Analytics |     |     | P10 -D3.js -Scales, Axis, Colors | 17  |
| ---------------- | --- | --- | -------------------------------- | --- |

| Visual Analytics | P10 -D3.js -Scales, Axis, Colors | 18  |
| ---------------- | -------------------------------- | --- |

Ordinal scales
A quantitative scale:
• maps a discrete domain (x) to a discrete range (y)
• 𝒙 → 𝒚
𝟏 𝟏
• For example, an ordinal scale might map a set of named categories to a set of colors
const myScale = d3.scaleOrdinal()
.domain(['a', 'b', 'c']) // set the domain, must be an array
.range(['red', 'green', 'blue']) // set the range, must be an array, same size of domain
https://d3js.org/d3-scale/ordinal
Visual Analytics P10 -D3.js -Scales, Axis, Colors 19

Point Scales
0 1000
|     | A   |     | B   | C   |     |
| --- | --- | --- | --- | --- | --- |
Domain = [a, b, c]
Range = [0, 1000]
| Visual Analytics |     | P10 -D3.js -Scales, Axis, Colors |     |     | 20  |
| ---------------- | --- | -------------------------------- | --- | --- | --- |

Point scales
A point scale:
•
|     | maps a discrete | domain | (x) to a continuous |     | range | (y) |     |
| --- | --------------- | ------ | ------------------- | --- | ----- | --- | --- |
• Point scales are typically used for scatterplots with an ordinal or categorical dimension
const myScale = d3.scalePoint()
.domain(['a', 'b', 'c']) // set the domain, must be an array
.range([0, 1000]) // set the range, must be an array [min, max]
https://d3js.org/d3-scale/point
| Visual Analytics |     |     |     | P10 -D3.js -Scales, Axis, Colors |     |     | 21  |
| ---------------- | --- | --- | --- | -------------------------------- | --- | --- | --- |

Band scales
0 1000
|     | A   |     | B   | C   |     |
| --- | --- | --- | --- | --- | --- |
myScale.bandwidth()
Domain = [a, b, c]
Range = [0, 1000]
| Visual Analytics |     | P10 -D3.js -Scales, Axis, Colors |     |     | 22  |
| ---------------- | --- | -------------------------------- | --- | --- | --- |

Band scales
A band scale:
•
|     | maps a discrete | domain | (x) to a continuous |     | range | (y) |     |
| --- | --------------- | ------ | ------------------- | --- | ----- | --- | --- |
• Point scales are typically used for bar charts with an ordinal or categorical dimension
const myScale = d3.scaleBand()
.domain(['a', 'b', 'c']) // set the domain, must be an array
.range([0, 1000]) // set the range, must be an array [min, max]
https://d3js.org/d3-scale/band
| Visual Analytics |     |     |     | P10 -D3.js -Scales, Axis, Colors |     |     | 23  |
| ---------------- | --- | --- | --- | -------------------------------- | --- | --- | --- |

Axis
https://d3js.org/d3-axis
| Visual Analytics | P10 -D3.js -Scales, Axis, Colors | 24  |
| ---------------- | -------------------------------- | --- |

Axis
• The axis component renders human-readable reference marks for scales
• Works with most scale types, including linear, log, band, and time scales as
shown above.
• Automatically renders all the stuff representing an axis, with a single call
Visual Analytics P10 -D3.js -Scales, Axis, Colors 25

Axis Types
• d3.axisTop(scale)
• d3.axisBottom(scale)
• d3.axisLeft(scale)
• d3.axisRight(scale)
left rigth
Visual Analytics P10 -D3.js -Scales, Axis, Colors 26

Axis usage
• The axis function takes as input a scale (that we have already defined)
1. Create the axis object passing a scale as input
2. Create a g in which we will plot the axis
3. Optionally apply a transformation (the axis is plotted in 0,0)
4. Call the axis
const axisX = d3.axisBottom(scale)
const gAxisX = svg.append('g').attr('class', 'axisX')
// .attr('transform', "(0, 200)")
.call(axisX)
Visual Analytics P10 -D3.js -Scales, Axis, Colors 27

Axis and Margin 1/4
| Visual Analytics | P10 -D3.js -Scales, Axis, Colors | 28  |
| ---------------- | -------------------------------- | --- |

Axis and Margin 2/4
• First define an object with a property for each of the four sides representing
the respective margins in pixels. You may need to adjust the margins to fit your
tick labels.
const margin = { top: 20, right: 30, bottom: 30, left: 40 }
• Define the width and height as the graphic’s outer dimensions.
const width = 800
const height = 600
Visual Analytics P10 -D3.js -Scales, Axis, Colors 29

Axis and Margin 3/4
• Define the scale x- and y-ranges based on the inner dimensions of the chart.
Note that the y-range is typically flipped to place y = 0 at the bottom of the
inner chart area.
const xScale = d3.scaleLinear()
.domain([0, 1])
.range([margin.left, width - margin.right])
const yScale = d3.scaleLinear()
.domain([0, 1])
.range([height - margin.bottom, margin.top])
Visual Analytics P10 -D3.js -Scales, Axis, Colors 30

Axis and Margin 4/4
• Define the x- and y-axes container (g) and apply a translation according to the
desired orientation
• Call the axis to the container
const xAxisContainer = svg.append('g').attr('class', 'xAxisContainer')
.attr('transform', `translate(0,${height - margin.bottom})`)
.call(xAxis)
const yAxisContainer = svg.append('g').attr('class', 'yAxisContainer')
.attr('transform', `translate(${margin.left},0)`)
.call(yAxis)
Visual Analytics P10 -D3.js -Scales, Axis, Colors 31

• Customize axis appearance via CSS
.yAxisContainer > *{
color: red;
font-size: 15px;
}
Visual Analytics P10 -D3.js -Scales, Axis, Colors 32

Colors
https://d3js.org/d3-scale-chromatic
| Visual Analytics | P10 -D3.js -Scales, Axis, Colors | 33  |
| ---------------- | -------------------------------- | --- |

Colors
D3 provides useful color schemes for our Visual Analytics application:
| • Categorical | schemes → | for working with categorical |     | data |     |
| ------------- | --------- | ---------------------------- | --- | ---- | --- |
• Sequential schemes → for working with quantitative or ordinal data
• Diverging schemes → like sequential schemes but for diverging data
• schemes →
Cyclical like sequential but cyclical (last color == first color)
| Visual Analytics |     |     | P10 -D3.js -Scales, Axis, Colors |     | 34  |
| ---------------- | --- | --- | -------------------------------- | --- | --- |

Categorical schemes
• To be used with categorical data
• In general, used with ordinal scales: d3.scaleOrdinal
• They are an array of colors
const colorScale = d3.scaleOrdinal()
.domain([...])
.range(d3.schemeAccent)
d3.schemeAccent = ['#7fc97f', '#beaed4', '#fdc086', '#ffff99',
'#386cb0', '#f0027f', '#bf5b17', '#666666']
Visual Analytics P10 -D3.js -Scales, Axis, Colors 35

Sequential schemes
| • To be used with quantitative |     |     | or ordinal |     | data |     |
| ------------------------------ | --- | --- | ---------- | --- | ---- | --- |
•
Two form provided:
• Scheme → array of colors, we can choose the size in [3,9]
const color = d3.scaleOrdinal()
|     |     |     | .domain([...])             |     |     |     |
| --- | --- | --- | -------------------------- | --- | --- | --- |
|     |     |     | .range(d3.schemeBlues[9])  |     |     |     |
// d3.schemeBlues[9] is an array of 9 colors. d3.schemeBlues is an array of array
• Interpolator → a function taking in input a value in [0,1] and return a color
const color = d3.scaleSequential(d3.interpolateBlues)
|                  |     |     |     | .domain([0, 1000])               |     |     |
| ---------------- | --- | --- | --- | -------------------------------- | --- | --- |
| Visual Analytics |     |     |     | P10 -D3.js -Scales, Axis, Colors |     | 36  |