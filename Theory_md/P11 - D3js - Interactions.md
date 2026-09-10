D3.js – Interactions
| Visual Analytics – | Practical Part – | P11 |
| ------------------ | ---------------- | --- |
Visual Analytics 1

d3.drag
• Drag-and-drop is a popular interaction method for
manipulating spatial elements: move the pointer to an
object, press and hold to grab it, “drag” the object to a
new location, and release to “drop”.
• D3’s drag behavior provides a flexible abstraction for
drag-and-drop.
• https://d3js.org/d3-drag
Visual Analytics 2

d3.drag
d3.drag()
• automatically creates event listeners to handle drag gestures on an element
• Both mouse events and touch events are supported.
drag.on(type, listener)
• Registers the specified listener to receive events of the specified type from the drag behavior.
• Events supported:
• “start": fired when a drag gesture is started.
• "drag": fired when the element is dragged. event contains "x" and "y” (current absolute drag coordinates of
the element) and "dx" and "dy” (element's coordinates relative to its position at the beginning of the
gesture).
• "end": fired when the drag gesture has finished.
Visual Analytics 3

Drag usage
• Create the drag object
const drag = d3.drag()

• Specify the event listener(s)
|         |             |          |     | .on('start', function (event, d) { |                            |
| ------- | ----------- | -------- | --- | ---------------------------------- | -------------------------- |
|         |             |          |     |                                    | const el = d3.select(this) |
|         |             |          |     | })                                 |                            |
| •       |             |          |     | .on('drag', function (event, d) {  |                            |
| event.x | and event.y | are the  |     |                                    |                            |
d.x = event.x
actual position
d.y = event.y
})
|                                |     |     |     | .on('end', function (event, d) { |     |
| ------------------------------ | --- | --- | --- | -------------------------------- | --- |
| • Call the drag on a selection |     |     |     |                                  |     |
})
• mySelection.call(drag)
Visual Analytics 4

d3.brush
• Brushing is the interactive specification a one- or two-dimensional selected
region using a pointing gesture, such as by clicking and dragging the mouse.
• Brushing is often used to select discrete elements, such as dots in a scatterplot
or files on a desktop.
• It can also be used to zoom-in to a region of interest, or to select continuous regions
for cross-filtering data or live histograms. https://square.github.io/crossfilter/
• https://d3js.org/d3-brush
Visual Analytics 5

d3.brush
• d3.brush() → 2-dimensional brush
• d3.brushX() → 1-dimensional brush moving horizontally
• d3.brushY() → 1-dimensional brush moving vertically
Visual Analytics 6

d3.brush
d3.brush()
• automatically creates event listeners to handle brush gestures on a group element
• Both mouse events and touch events are supported.
brush.on(type, listener)
• Registers the specified listener to receive events of the specified type from the brush interactions
• Events supported:
• “start": fired when a brush gesture is started.
• "brush": fired when the brush element is moved
• "end": fired when the brush gesture has finished.
Visual Analytics 7

Examples on Observable
• DRAG
• https://observablehq.com/@d3/circle-dragging-i
• https://observablehq.com/@d3/drag-collisions
• BRUSH
• https://observablehq.com/@d3/focus-context
• https://observablehq.com/@d3/brushable-scatterplot-matrix
• ZOOM
• https://observablehq.com/@d3/zoomable-scatterplot
• https://observablehq.com/@d3/drag-zoom
Visual Analytics 8