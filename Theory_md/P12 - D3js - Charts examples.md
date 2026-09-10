D3.js – Charts examples

Visual Analytics – Practical Part

Visual Analytics

1

Collection of charts

• https://d3-graph-gallery.com/

Visual Analytics

2

Bar chart

Visual Analytics

3

Bar chart

• Scale X → d3.scaleBand()

• Domain is all the bars' labels

• Scale Y → d3.scaleLinear()
• Domain = [0, max(val)]

• Data → array (each element is a bar)

• A rect for each data entry

Visual Analytics

4

Line chart

Visual Analytics

5

Line chart

• Each element of the data array becomes a point of the line

• The line is a svg path

• A line generator (d3.line) create the d attribute of the path

• https://d3js.org/d3-shape/line

• A curve generator specifies the style of the line

• https://d3js.org/d3-shape/curve

Visual Analytics

6

Area chart

Visual Analytics

7

Area chart

• Similar to line chart

• Instead of a line generator we have an area generator

Visual Analytics

8

Brush Example

• An horizontal brush (brushX) on the area chart

• Highlight in a different color the selected part of the area

Visual Analytics

9

Heatmap

Visual Analytics

10

Heatmap

• scaleBand for X and Y

• Cells are a 2D matrix but must be passed as a plain array, where on each

element there is the reference to the row and the column, for example the
labels.

Visual Analytics

11

Node-link diagram

• https://observablehq.com/@d3/force-

directed-graph-component

• Represent a graph

Visual Analytics

12

