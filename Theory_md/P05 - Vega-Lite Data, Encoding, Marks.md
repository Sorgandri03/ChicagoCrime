Vega-Lite
Data, Encoding Channels, Marks
| Visual Analytics – | Practical Part – | P05 |
| ------------------ | ---------------- | --- |
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 1

Where we left off
{
"$schema": "https://vega.github.io/schema/vega-lite/v6.json",
"width": 300,
"height": 300,
"data": {"url": "data/penguins.json"},
"mark": "point",
"encoding": {
"x": { "field": "Beak Length (mm)", "type": "quantitative" },
"y": { "field": "Beak Depth (mm)", "type": "quantitative" },
"color": { "field": "Species" }
}
}
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 2

Data
With respect to the data, the following data characteristics are relevant:
• Data domain (data scale and data type)
• Data structure
• Data space
• Data size
• Data scope
• Meta-data
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 3

Data Domain
• Set of values that a datum (or data value) can assume
• Differentiate between different data scales and data types
• Data scale: How are the data scaled?
• Qualitative data: Nominal and ordinal data
• Quantitative data: Discrete and continuous data
• Data type: How is a datum composed of components?
• Scalar, vector, tensor
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 4

Data Scale
• Qualitative data
• Nominal (Categorical) data
• Values for which only the equality relation = is defined
• Example: Names {John, Mike, Lisa, Monica}
• Give another example of nominal data
• Ordinal data
• Values for which an order relation < is defined in addition to equality
• Example: Age groups {children, youths, adults, elders}
• Give another example of ordinal data
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 5

Data Scale
• Quantitative data
• Discrete data
• Numeric values whose domain can be equated to the whole numbers
• Countable and distance between any two data values is defined
• Example: Number of people visiting a doctor
• Continuous data
• Numeric values whose domain can be equated to the real numbers
• Uncountable, distance is defined, and interpolation is possible
• Example: Temperature measurements
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 6

Data Scale
| Operations | Qualitative Data |         | Quantitative Data |            |
| ---------- | ---------------- | ------- | ----------------- | ---------- |
|            | Nominal          | Ordinal | Discrete          | Continuous |
| Equality   | ●                | ●       | ●                 | ●          |
| Order      |                  | ●       | ●                 | ●          |
|            |                  |         | ●                 | ●          |
Distance
| Interpolation |     |     |     | ●   |
| ------------- | --- | --- | --- | --- |
| (Count)       | ●   | ●   | ●   |     |
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 7

Data Structure
• Raw data often “unstructured”
• Data analysis typically requires transforming raw data to a suitable structure
• Tabular data: Rows are tuples, columns are variables
• Hierarchical data: Parent-child relations, e.g., for different levels of detail
• Graph data: General model for entities and relations between them
• Grid-structured data: Data aligned on different types of grids, for 3D data
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 8

Data Space
• Spanned by variables
• Independent variables: Dimensions of the space where data have been
collected, observed, or simulated
• Dependent variables: Attributes of what has been collected, observed, or
simulated
• Describes a functional dependency
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 9

Data Size
• n - Number of dimensions
• n-dimensional data
• 1D data (e.g., time-series): n = 1
• 2D data (e.g., geo-spatial data): n = 2
• Multidimensional data: n > 3
• m - Number of attributes
• m-variate data
• Univariate data: m = 1
• Bivariate data: m = 2
• Multivariate data: m > 2
• k - Number of tuples
• Small data: k < 1000
• Big data: k > 100.000
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 10

Data Scope
• Characterizes the range in which the data are valid around a point of
observation
• Usually cannot be inferred, must be given with the data description/context
Global Scope Local Scope Point Scope
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 11

Meta-data
• Meta-data contain information about the actual data with respect to:
• Data values: From which data domain are the values?
• Data set: How is the dataset structured, how does the data space look like,
how big are the data, what is their scope?
• Data evolution:
• Data Provenance: History of how the data were created?
• Data Format: How are the data stored presently?
• Data Utility: How may the data be used in the future?
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 12

Data Classes
• Data classes pertain to different data aspects
• A – data attributes
• T – time
• S – space
• R – structural relationships
• Based on A, T, S, and R, different data classes can be defined
• Multivariate data, temporal data, spatial data, spatio-temporal data, graph
data, …
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 13

Data Classes
• Multivariate data (A)
• Data with many attributes (A)
• Product data, player statistics, gene expressions, simulation runs, etc.
• Temporal data (T ➔ A)
• Data where attributes depend on time (T), a.k.a. time-dependent data
• Financial data, medical treatment data, sensor data, etc.
• Spatial data (S ➔ A)
• Data being located in space (S), a.k.a. geo-spatial data
• Election data, distribution of places, land use, etc.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 14

Data Classes
• Spatio-temporal data (S × T ➔ A)
• Data depends on space and time
• Meteorological/climate data, disease spread, movement data, etc.
• Graph data (R, R ➔ A, R ➔ S × T, or S × T ➔ R × A)
• Entities (vertices V) and relations (edges E) between them, graph G = (V,
E)
• Entities and relations may be associated with further information (A, S, T)
• Social networks, biological pathways, connectome data, etc.
• Further data classes
• Text (A, R), Images (S, A), Flow data (S, A), Volume data (S, A)
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 15

Data Classes
Interactive Visual Data Analysis, Christian Tominski and Heidrun Schumann, AK Peters Visualization Series - CRC Press
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 16

Data in Vega-Lite
https://vega.github.io/vega-lite/docs/data.html
• Data in Vega-Lite is assumed to be formatted as a data table (or data frame)
consisting of a set of named data columns (fields)
• Once loaded, the default table representation is an array of JavaScript
objects
• Data Structure: Tabular Data
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 17

Data Sources
https://vega.github.io/vega-lite/docs/data.html
• Inline Data: You can embed your data directly within the Vega-Lite specification using a
JSON array of objects or a string.
• This is convenient for small datasets or examples.
• URL-based Data: Data can be loaded from an external file specified by a URL. Vega-Lite
will fetch the data at render time.
• This is common for larger datasets hosted online.
• Named Data (from a top-level data property): For more complex specifications, you can
define named datasets at the top level of your Vega-Lite specification and then refer to
them by name within different parts of your visualization.
• This allows for data reuse and better organization.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 18

Data Types –
https://vega.github.io/vega-lite/docs/type.html
• Nominal Data – { ”type”: “nominal” }
• We should readily perceive if values are the same or different
• Rule of thumb: position, color hue (blue, red, green, etc.), and shape
• Ordinal Data – { ”type”: “ordinal” }
• We should perceive a sense of rank-order
• Rule of thumb: position, size, or color value (brightness)
• Quantitative Data – { ”type”: “quantitative” }
• Vega-Lite does not make a distinction between interval and ratio types
• Rule of thumb: position, size, or color value, among other channels
• Temporal Data – { ”type”: “temporal” }
• Time points or intervals - https://vega.github.io/vega-lite/docs/timeunit.html
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 19

Exercise 1
Below is a small dataset:
[
{"category": "A", "value": 5.3, "date": "2022-03-01", "rank": 1},
{"category": "B", "value": 2.1, "date": "2022-03-02", "rank": 2},
{"category": "C", "value": 7.8, "date": "2022-03-03", "rank": 3}
]
Identify each field’s data type and write a minimal Vega-Lite encoding block for
a scatter plot.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 20

Exercise 2
Dataset:
[
{"size_category": "Small"},
{"size_category": "Medium"},
{"size_category": "Large"}
]
Decide whether `size_category` should be nominal or ordinal. Think about how
Vega-Lite will treat it differently depending on your choice.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 21

Encoding Channels
https://vega.github.io/vega-lite/docs/encoding.html
• Encodings bind data fields (with a given data type) to available encoding
channels of a chosen mark type
https://observablehq.com/@uwdata/data-types-graphical-marks-encoding-
channels-json#cell-64
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 22

Exercise 3
Dataset:
[
{"year": 2018, "region": "North", "sales": 120, "profitMargin": 0.23},
{"year": 2019, "region": "South", "sales": 90, "profitMargin": 0.13}
]
Choose appropriate channels and write an encoding block for a scatter plot.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 23

Exercise 4
Use the `seattle-weather` dataset.
Create a plot showing temperature over time and:
• Use `color` to encode weather type (e.g., sun, rain).
• Use `opacity` to reflect precipitation.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 24

Graphical Marks
https://vega.github.io/vega-lite/docs/mark.html
• Marks are geometric elements that represent data
https://observablehq.com/@uwdata/data-types-graphical-marks-encoding-
channels-json#cell-254
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 25

Exercise 5
Match each dataset to an appropriate mark type:
• Daily temperature over a month
• Sales by product category
• Height vs weight of individuals
• Distribution of exam scores
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 26

Exercise 6
Given this Vega-Lite spec:
{
"data": {"url": "data/cars.json"},
"mark": "point",
"encoding": {
"x": {"field": "Horsepower", "type": "quantitative"},
"y": {"field": "Miles_per_Gallon", "type": "quantitative"}
}
}
Modify it to use a `bar` mark instead. Think what changes in interpretation.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 27

Exercise 7
Using a dataset of your choice (e.g., `cars.json`, `movies.json`, or your own
CSV):
• Choose an appropriate mark.
• Use at least three encoding channels.
• Assign correct data types to each field.
• Optionally use `facet` or `shape` for an extra dimension.
Visual Analytics -Practical Part P05 -Vega-Lite: Data, Encoding Channels, Marks 28