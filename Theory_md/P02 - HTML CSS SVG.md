HTML, CSS, SVG
|                                   | Visual Analytics – | Practical Part –    | P02 |     |
| --------------------------------- | ------------------ | ------------------- | --- | --- |
| Visual Analytics - Practical Part |                    | P02 -HTML, CSS, SVG |     | 1   |

| HTML - | HyperText | Markup Language |     |     |
| ------ | --------- | --------------- | --- | --- |
• Plaintext document structured with nested elements
• Elements are surrounded by opening and closing tag brackets
<element> … </element>
• Attributes (class, id, …) add additional properties to the elements
• See https://developer.mozilla.org/en-US/docs/Glossary/HTML for a deeper
guide
| Visual Analytics - Practical Part |     |     | P02 -HTML, CSS, SVG | 2   |
| --------------------------------- | --- | --- | ------------------- | --- |

Anatomy of an HTML element
• Opening tag: consists of the name of the element (p for paragraph), wrapped in
opening and closing angle brackets. This opening tag marks where the element begins or
starts to take effect.
• Content: This is the content of the element, a text or other elements or both.
• Closing tag: Same as the opening tag but includes a forward slash before the element
name. This marks where the element ends.
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 3

Attributes
• Add additional behavior on the elements. Available attributes depend on the
element type
• Common attributes are:
• id → a user-defined string to unique identify the element
• class → a user-defined string to assign the element to a group (useful for styling)
• Attributes specific of some elements:
• href → specify the url to which the element points (a link)
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 4

A simple HTML page 1/2
P02_CODE/01
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 5   |
| --------------------------------- | ------------------- | --- |

A simple HTML page 2/2
CSS code
P02-code-01
P02_CODE/01
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 6   |
| --------------------------------- | ------------------- | --- |

The <div> tag
• The div tag specify the basic html element that can be used as container
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 7   |
| --------------------------------- | ------------------- | --- |

CSS – Cascading Style Sheets
Learn how to style the web
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 8   |
| --------------------------------- | ------------------- | --- |

CSS
• Technology to set the style of HTML documents
• For example, you can use CSS to alter the font, color, size, and spacing of
your content, split it into multiple columns, or add animations and other
decorative features.
• Can be used in three way (ALL can COHESIST):
| • Inside | the html element |                       |     |     |
| -------- | ---------------- | --------------------- | --- | --- |
| • Inside | the html page    | with the <style> tag  |     |     |
• External file imported into the html
• https://developer.mozilla.org/en-US/docs/Learn/CSS
| Visual Analytics - Practical Part |     |     | P02 -HTML, CSS, SVG | 9   |
| --------------------------------- | --- | --- | ------------------- | --- |

CSS inside an element
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 10  |
| --------------------------------- | ------------------- | --- |

CSS in the HTML header
Selector of the element(s)
Properties
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 11  |
| --------------------------------- | ------------------- | --- |

CSS in external file(s)
mystyle.css
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 12  |
| --------------------------------- | ------------------- | --- |

CSS Selectors
• Use # to select element by id
#myid {
color: red;
}
Other combinations of selectors can
• Use . To select a class
exist. See the documentation for
.myclass {
more info
color: red;
}
• Use the name of the tag to select all the tags
h1: {
color: red;
}
• Properties are assigned to all the elements matching the selection
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 13

https://css-tricks.com/
| Visual Analytics -Practical Part | P02 -HTML, CSS, SVG | 14  |
| -------------------------------- | ------------------- | --- |

Flexbox Layout
| • The | Flexbox Layout | aims at providing a more  |     |     |
| ----- | -------------- | ------------------------- | --- | --- |
efficient way to lay out, align and distribute
space among items in a container, even
when their size is unknown and/or dynamic
(thus the word “flex”).
• https://css-tricks.com/snippets/css/a-guide-
to-flexbox/
| Visual Analytics - Practical Part |     |     | P02 -HTML, CSS, SVG | 15  |
| --------------------------------- | --- | --- | ------------------- | --- |

Grid Layout
• CSS Grid Layout (aka “Grid” or “CSS
Grid”), is a two-dimensional grid-based
layout system that, compared to any
web layout system of the past,
completely changes the way we design
user interfaces.
• https://css-
tricks.com/snippets/css/complete-
guide-grid/
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 16

SVG
Scalable Vector Graphics
https://developer.mozilla.org/en-US/docs/Web/SVG
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 17  |
| --------------------------------- | ------------------- | --- |

SVG Scalable Vector Graphics
• SVG is an XML-based markup language for describing
two-dimensional based vector graphics
• SVG is also an HTML element <svg> … </svg>
We use it to create visualizations
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 18

A donut chart with SVG
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 19  |
| --------------------------------- | ------------------- | --- |

Coordinate Systems
| • The origin | (0,0) is on the | top-left |     |     |
| ------------ | --------------- | -------- | --- | --- |
• The X axis goes from left to right
• The Y axis goes from top to bottom
| Visual Analytics - Practical Part |     |     | P02 -HTML, CSS, SVG | 20  |
| --------------------------------- | --- | --- | ------------------- | --- |

SVG Measure Unit
• Pure numbers (float or int)
• In general, an SVG unit corresponds to a pixel on the screen
• This behavior can be changed using the attribute
viewBox
An SVG with size 100x100 containing a
red circle with center (cx, cy) in (10,50)
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 21

SVG Elements
• SVG provide different elements that can be used inside the tag
• See https://developer.mozilla.org/en-US/docs/Web/SVG/Element for a
comprehensive list.
• Most used elements
• <circle> Draw a circle
• <rect> Draw a rectangle
• <line> Draw a straight line
• <path> Draw any line, and can be also closed
• <text> Draw a text Example of a path
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 22

Element Attributes
• Each element has its own attributes defining its shape
• Common attributes exist among all the elements
• fill → background color of the element
• fill-opacity → opacity of the background
• stroke → color of the border
• stroke-opacity → opacity of the border
• stroke-width → thickness of the border
• …
• The styling attributes can be defined also via CSS. In case of conflict (i.e.
defined on both ways) the CSS has the priority.
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 23

Line
The <line> element is an SVG basic shape used to create a line connecting
two points.
Common attributes:
• x1 x-axis coordinate of starting point
• y1 y-axis coordinate of starting point
• x2 x-axis coordinate of ending point
• y2 y-axis coordinate of ending point
• stroke color of the line
• stroke-width width of the line
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 24

Circle
The <circle> element is an SVG basic shape used to draw circles based on a
center point and a radius
Common attributes:
• cx x-axis coordinate of the center
• cy y-axis coordinate of the center
• r radius of the circle
• fill color of the circle
• stroke color of the border
• stroke-width width of the border
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 25

Rectangle
The <rect> element is an SVG basic shape used to draws rectangles, defined
by their position, width, and height. The rectangles may have their corners
rounded.
Common attributes:
• x x-axis coordinate of the top-left corner
• y y-axis coordinate of the top-left corner
• width of the rect
• height of the rect
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 26

Text 1/2
The SVG <text> element draws a graphics element consisting of text. It's
possible to apply a gradient, pattern, etc. to <text>, like any other SVG graphics
element.
Common attributes:
• x the x coordinate of the starting point
• y The y coordinate of the starting point
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 27

Text 2/2
• The x and y attribute set the starting point of the text on the SVG i.e. set the
position the red point, and the text is created consequently
The position of the red point with respect to the text, can be changed using:
• text-anchor {start|middle|end} move the point on the x axis
• alignment-baseline {top|center|bottom|…} move the point on the y axis
https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 28

Path
The <path> element is the generic element to define a shape. All the basic
shapes can be created with a path element.
Attributes:
• d a string defining the shape of the path
We don’t need the learn the commands, a library will help us
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 29

Groups
The <g> element is a container used to group other SVG elements.
Useful for providing attributes to all the inner elements. They inherit the
attributes of the parent group
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 30  |
| --------------------------------- | ------------------- | --- |

Transformations
• The transform property lets you rotate, scale, skew, or translate an element
• Modify the coordinate space of the SVG
• Apply it to a group for transform all the coordinates of the inner elements
• Most used transformations:
• transform="translate(tx,ty)"
• transform="rotate(degree)"
• transform="scale(factor)"
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 31

The math behind transformations
Transformations are 2D matrix operations (addition and multiplications)
𝑥 ′
𝑥
′
𝑃 = 𝑃 =
TRANSFORMATION
𝑦 ′
𝑦
Original point Transformed point
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 32

Translation
The translation moves the point in a different position
𝑡
𝑥
′
𝑃 = 𝑃 +
𝑡
𝑦
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 33

Rotation
The rotation rotates the point with a particular angle 𝜃 from the origin (0,0)
|     | cos | 𝜃   | sin | 𝜃   |     |
| --- | --- | --- | --- | --- | --- |
′
𝑃 = 𝑃 ∗
|                                   | − sin | 𝜃   | cos | 𝜃                   |     |
| --------------------------------- | ----- | --- | --- | ------------------- | --- |
| Visual Analytics - Practical Part |       |     |     | P02 -HTML, CSS, SVG | 34  |

Scale
The scale changes the size of an object of a scaling factor 𝑓
𝑓 0
′
𝑃 = 𝑃 ∗
0 𝑓
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 35

Multiple Transformations
Transformation can be concatenated to obtain multiple effects
• transform="translate(200,0) rotate(90)"
|     |       |     | 200 |     | cos   | 90° | sin | 90° |     |
| --- | ----- | --- | --- | --- | ----- | --- | --- | --- | --- |
|     | 𝑃 ′ = | 𝑃 + |     | ∗   |       |     |     |     |     |
|     |       |     | 0   |     | − sin | 90° | cos | 90° |     |
• transform="rotate(90) translate(200,0)"
|     |     |     | cos | 90° |     | sin 90° |     | 200 |     |
| --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- |
′′
|     | 𝑃 = | 𝑃   | ∗     |     |     |     | +   |     |     |
| --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- |
|     |     |     | − sin | 90° | cos | 90° |     | 0   |     |
The order of transform functions matters.
!=
|                                   |     |     | translation + rotation  |     |     |                     |     | rotation + translation |     |
| --------------------------------- | --- | --- | ----------------------- | --- | --- | ------------------- | --- | ---------------------- | --- |
| Visual Analytics - Practical Part |     |     |                         |     |     | P02 -HTML, CSS, SVG |     |                        | 36  |

Practice use of Transformations
Example of three concentric circles. The center is defined by applying a
transformation on the parent <g>
100
100
If cx and cy are not defined on a circle, they assume the default value of 0
Visual Analytics - Practical Part P02 -HTML, CSS, SVG 37

Nested transformations
equals
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 38  |
| --------------------------------- | ------------------- | --- |

Canvas
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
| Visual Analytics - Practical Part | P02 -HTML, CSS, SVG | 39  |
| --------------------------------- | ------------------- | --- |

Canvas
• The HTML <canvas> element is used to draw graphics on a web
page.
• Behave like an image
• SVG does not scale when containing a lot of items
(>thousands)
• Similar to SVG but:
• NO dynamic properties (i.e. change color of a single element)
• Consider to use it if SVG starts to suffer and block the
browser
Visual Analytics -Practical Part P02 -HTML, CSS, SVG 40