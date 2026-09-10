Visualization Frameworks
| Visual Analytics – | Practical Part – | P04 |
| ------------------ | ---------------- | --- |
Visual Analytics -Practical Part P04 -Visualization Frameworks 1

Visualization frameworks
• We’ll explore two complementary frameworks:
• Vega-Lite → high-level, declarative
• D3.js → low-level, programmatic
• Tools differ in abstraction level, expressivity, and effort
Visual Analytics -Practical Part P04 -Visualization Frameworks 2

First, let's do a quick exercise
culmen_leng culmen_dept flipper_lengt body_mass_ • Your task is to design a static (i.e.,
|     | species | island    |       |      |       |        | sex    |         |        |             |               |              |      |     |
| --- | ------- | --------- | ----- | ---- | ----- | ------ | ------ | ------- | ------ | ----------- | ------------- | ------------ | ---- | --- |
|     |         |           | th_mm | h_mm | h_mm  | g      |        |         |        |             |               |              |      |     |
| 0   | Adelie  | Torgersen | 39.1  | 18.7 | 181.0 | 3750.0 | MALE   |         |        |             |               |              |      |     |
|     |         |           |       |      |       |        |        | single  | image) |             | visualization |              | that | you |
| 1   | Adelie  | Torgersen | 39.5  | 17.4 | 186.0 | 3800.0 | FEMALE |         |        |             |               |              |      |     |
| 2   | Adelie  | Torgersen | 40.3  | 18.0 | 195.0 | 3250.0 | FEMALE |         |        |             |               |              |      |     |
|     |         |           |       |      |       |        |        | believe |        | effectively |               | communicates |      | an  |
| 3   | Adelie  | Torgersen | NaN   | NaN  | NaN   | NaN    | NaN    |         |        |             |               |              |      |     |
| 4   | Adelie  | Torgersen | 36.7  | 19.3 | 193.0 | 3450.0 | FEMALE |         |        |             |               |              |      |     |
|     |         |           |       |      |       |        |        | idea    | about  | the         | data          |              |      |     |
The dataset consists of 7 columns:
•
|     |     |     |     |     |     |     |     | Start | by  | choosing |     | a question |     | you'd |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | -------- | --- | ---------- | --- | ----- |
• species: penguin species (Chinstrap, Adélie, or Gentoo)
|     |     |     |     |     |     |     |     | like | your | visualization |     | to  | answer |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---- | ------------- | --- | --- | ------ | --- |
• culmen_length_mm: culmen length (mm)
•
• culmen_depth_mm: culmen depth (mm) Design your visualization to answer
• flipper_length_mm: flipper length (mm)
|     |     |     |     |     |     |     |     | that | question |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | -------- | --- | --- | --- | --- | --- |
•
body_mass_g: body mass (g)
|     |     |     |     |     |     |     |     | • You | are | free to | transform |     | the | data as |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | ------- | --------- | --- | --- | ------- |
• island: island name (Dream, Torgersen, or Biscoe) in the Palmer
| Archipelago (Antarctica) |     |     |     |     |     |     |     | you | see | fit |     |     |     |     |
| ------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
• sex: penguin sex
The dataset contains 344 entries
Visual Analytics -Practical Part P04 -Visualization Frameworks 3

Common ground
• Both frameworks implement ideas from the Grammar of Graphics
• Core components:
• Data → Transformation → Encoding → Marks → View
• Key difference: level of specification detail
• Vega-Lite: describe what
• D3.js: program how
Visual Analytics -Practical Part P04 -Visualization Frameworks 4

Grammar of Graphics
Understanding how data becomes visual meaning
data table → chart
Visual Analytics -Practical Part P04 -Visualization Frameworks 5

Why a grammar?
• Charts are not just pictures — they are structured expressions
• A grammar defines consistent rules for:
• combining components (data, scales, marks, etc.)
• generating many types of visualizations from a small vocabulary
• Enables systematic reasoning and automation of visualization
Visual Analytics -Practical Part P04 -Visualization Frameworks 6

Core idea
Every visualization can be decomposed into:
1. Data
2. Transformations
3. Mappings (Encodings)
4. Marks
5. Scales
6. Guides (Axes, Legends)
7. Coordinate System
8. Composition (Layers, Facets)
Visual Analytics -Practical Part P04 -Visualization Frameworks 7

Building blocks
• Data Input data source to visualize.
• Transform Filter, aggregation, binning, etc.
• Mark Data-representative graphics.
• Encoding Mapping between data and mark properties.
• Scale Functions that map data values to visual values.
• Guides Axes & legends that visualize scales.
Visual Analytics -Practical Part P04 -Visualization Frameworks 8

Toy example
Name Score
Anna 24
Ben 21
Carla 30
Transform: sort by score Add axes
Encoding:
• x = name
Name Score
• y = score
Carla 30
• mark = bar
Anna 24
Ben 21
Visual Analytics -Practical Part P04 -Visualization Frameworks 9

Marks and channels
• Marks: geometric primitives (point, line, bar, area, text)
• Channels (Encodings): visual variables used to represent data
• Position (x, y)
• Size, Shape, Color, Orientation, etc.
• Matching data type to the appropriate channel is crucial
• (nominal → color; quantitative → position)
Visual Analytics -Practical Part P04 -Visualization Frameworks 10

Transformations
• Operations applied before mapping:
• Filtering
• Aggregation (sum, mean, count)
• Binning
• Derived fields (e.g., percentage)
• Support analytical reasoning by structuring data
Visual Analytics -Practical Part P04 -Visualization Frameworks 11

Scales, guides, and coordinates
• Scales map data values → visual space (linear, log, color, etc.)
• Guides (axes, legends) help interpret scales.
• Coordinates define the geometric frame (Cartesian, polar, geographic).
Visual Analytics -Practical Part P04 -Visualization Frameworks 12

Composition
• Complex visuals arise by composing multiple views:
• Layering (overlay line + points)
• Faceting (small multiples)
• Concatenation (side-by-side views)
• Enables multi-dimensional analysis
Visual Analytics -Practical Part P04 -Visualization Frameworks 13

Introducing Vega-Lite
https://vega.github.io/vega-lite/
• High-level grammar of interactive graphics
• Specifications written in JSON (or JavaScript)
• Bind data fields to visual encodings:
• Position: x, y
• Attributes: color, size, shape, …
• Automatically handles:
• Scales, legends, axes, layout, …
• Aggregation, binning, filtering, …
Visual Analytics -Practical Part P04 -Visualization Frameworks 14

Vega-Lite: key advantages
• Easy to learn and fast to prototype
• Reusable & shareable specs (for dashboards, notebooks, etc.)
• Built-in analytics operations (faceting, layering, interactions)
• Compiles to Vega, for further customization
• Consistent rendering and design defaults
• Ideal for teaching visual encoding principles
Visual Analytics -Practical Part P04 -Visualization Frameworks 15

When Vega-Lite isn’t enough
• Limited control over custom layouts or bespoke visuals
• Complex interaction logic can be hard to express declaratively
• Under the hood:
• → compiles to Vega, which itself uses D3.js
• → so you can “step down” to lower levels when needed
Visual Analytics -Practical Part P04 -Visualization Frameworks 16

Introducing D3.js
https://d3js.org/
• Low-level JavaScript library for binding data to the DOM
• Uses web standards: SVG, HTML, CSS (and Canvas/WebGL if needed)
• Full control of every detail:
• Data joins (enter, update, exit)
• Shapes, transitions, interactions
• Layouts (trees, force-directed, choropleths, etc.)
Visual Analytics -Practical Part P04 -Visualization Frameworks 17

D3.js: key advantages
• Maximum expressivity and custom control
• Integrates easily with modern frameworks (React, Angular)
• Advanced interactivity, animation, and transitions
• Foundation for many visualization libraries (Vega, Plotly, etc.)
• Best choice for novel visualization designs
Visual Analytics -Practical Part P04 -Visualization Frameworks 18

D3.js: challenges
• Steep learning curve — you must manage the DOM manually
• More code for simple charts
• Performance tuning often required for large datasets
• Less portable/reproducible than Vega-Lite specs
Visual Analytics -Practical Part P04 -Visualization Frameworks 19

| Vega-Lite   | vs D3.js                 |                        |
| ----------- | ------------------------ | ---------------------- |
| Feature     | Vega-Lite                | D3.js                  |
| Abstraction | High-level (Declarative) | Low-level (Imperative) |
Ease of use Easier / faster prototyping Requires coding experience
| Control | Limited | Full control |
| ------- | ------- | ------------ |
Typical use Dashboards, analytics charts Custom/novel visualizations
| Interactivity | Basic (predefined patterns)   | Fully programmable      |
| ------------- | ----------------------------- | ----------------------- |
| Output        | JSON spec → Vega → SVG/Canvas | Direct DOM manipulation |
Learning goal Understanding encoding grammar Understanding implementation details
Visual Analytics -Practical Part P04 -Visualization Frameworks 20

How to use Vega-Lite
• Online editor for Vega and Vega-Lite:
https://vega.github.io/editor/
• VSCode extension for interactive preview of Vega and Vega-Lite:
https://github.com/RandomFractals/vscode-vega-viewer
• Embed in a web page:
https://github.com/vega/vega-embed
Visual Analytics -Practical Part P04 -Visualization Frameworks 21

Introduction to Vega-Lite
https://observablehq.com/@uwdata/introduction-to-vega-lite-json
Visual Analytics -Practical Part P04 -Visualization Frameworks 22

Suggested reading
• Vega-Lite: A Grammar of Interactive Graphics. Arvind Satyanarayan, Dominik Moritz, Kanit
Wongsuphasawat, Jeffrey Heer. IEEE Trans. Visualization & Comp. Graphics (Proc. InfoVis),
2017
• D3: Data-Driven Documents. Michael Bostock, Vadim Ogievetsky, Jeffrey Heer. IEEE Trans.
Visualization & Comp. Graphics (Proc. InfoVis), 2011
• https://www.tableau.com/blog/three-waves-data-visualization-brief-history-and-
predictions-future-100830
Visual Analytics -Practical Part P04 -Visualization Frameworks 23