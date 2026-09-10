D3.js
Selections
|                  | Visual Analytics – | Practical Part –       | P08 |     |
| ---------------- | ------------------ | ---------------------- | --- | --- |
| Visual Analytics |                    | P08 -D3.js -Selections |     | 1   |

| Visual Analytics | P08 -D3.js -Selections | 2   |
| ---------------- | ---------------------- | --- |

What is D3.js ?
D3.js is a small, free JavaScript library
for manipulating web documents
based on data
https://d3js.org/
Visual Analytics P08 -D3.js -Selections 3

What is D3.js ?
• JavaScript library
• Easy integration in most data analysis pipelines
• Deployable both on client side or server side
• Versatile:
• Recreate easily known visual paradigm
• Create new ones
• Gives full control on the visualization design process
Visual Analytics P08 -D3.js -Selections 4

Versions
Latest Version v7.9.0
Any version >= 6.0 should be OK
DO NOT USE EARLIER VERSION (v4 or v5 for example)
| Visual Analytics | P08 -D3.js -Selections | 5   |
| ---------------- | ---------------------- | --- |

How to use it
https://www.npmjs.com/package/d3
• Installation →
npm install d3
• Import in server-side→
const d3 = require('d3')
• Import in client-side →
import * as d3 from ‘d3
• Import in HTML →
<script src="d3.v7.8.5.min.js"></script>
Visual Analytics P08 -D3.js -Selections 6

DOM – Document Object Model
• https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
• DOM (Document Object Model) is a hierarchical representation of the
content of an HTML document
• Each element of the document is represented as a node:
• Linked to the parent element (node) to which it belong
• Linked with as many children as the elements it hierarchically contains
Visual Analytics P08 -D3.js -Selections 7

Main Features
• D3 allows to bind arbitrary data to a Document Object Model (DOM) and then apply data-
driven transformations to the document.
• Is possible to use D3 to generate a basic HTML table from an array of numbers or use the
same data to create an interactive SVG bar chart with smooth transitions and interaction.
• D3 solves the crux of the problem: efficient manipulation of documents based on data.
This gives D3 extraordinary flexibility, exposing the full capabilities of underlying
technologies such as CSS3, HTML5 and SVG. (Transformations, not Representations)
• D3 is extremely fast, supporting large datasets and dynamic behaviors for interaction and
animation.
• For those common needs, D3’s functional style allows code reuse through a diverse
collection of optional modules.
Visual Analytics P08 -D3.js -Selections 8

D3 Main Components
Selections
Dynamic
Interactions
D3 Properties
Transition Enter & Exit
Visual Analytics P08 -D3.js -Selections 9

D3 Main Components
Selections
Dynamic
Interactions
D3 Properties
Transition Enter & Exit
Visual Analytics P08 -D3.js -Selections 10

Modules
• D3 is composed of multiple sub modules, each of them is oriented to a
specific task
• Explore all the API at https://d3js.org/api
| Visual Analytics | P08 -D3.js -Selections | 11  |
| ---------------- | ---------------------- | --- |

| Visual Analytics | P08 -D3.js -Selections | 12  |
| ---------------- | ---------------------- | --- |

1. Selecting Elements
https://d3js.org/d3-selection/selecting
| Visual Analytics | P08 -D3.js -Selections | 13  |
| ---------------- | ---------------------- | --- |

Selections
• Selections allow powerful data-driven transformation of the DOM:
| • Set attributes |     |     |     |     |
| ---------------- | --- | --- | --- | --- |
• Styles
• Properties
| • HTML | or text | content |     |     |
| ------ | ------- | ------- | --- | --- |
•
…
• Using the data binding on selections, you can also add or remove elements to
correspond to data.
| Visual Analytics |     |     | P08 -D3.js -Selections | 14  |
| ---------------- | --- | --- | ---------------------- | --- |

Selection
• A selection is the entry object for manipulating the DOM
• A D3 selection is an OBJECT containing an array of elements of the DOM.
• D3 uses CSS3 selectors to select elements.
• After selecting elements, we can apply operators to them to do stuff.
• These operators can get or set attributes, styles, properties, HTML and text
content.
Visual Analytics P08 -D3.js -Selections 15

d3.select( )
selector
• Selects the first element that matches the specified selector string
➢ const svg = d3.select('#chart')
➢ const anchor = d3.select('a')
➢ d3.select(document.body).style('background', 'red')
The selector can be:
• string
• DOM node (e.g. document.body)
• function that returns one of the previous
https://d3js.org/d3-selection/selecting#select
Visual Analytics P08 -D3.js -Selections 16

d3.selectAll( )
selector
• Selects all elements that match the specified selector string
➢ const p = d3.selectAll('p')
➢ d3.selectAll('div').style('background', 'red')
https://d3js.org/d3-selection/selecting#selectAll
Visual Analytics P08 -D3.js -Selections 17

Nested selections
| • selection.select( |     |     | )   |     |     |
| ------------------- | --- | --- | --- | --- | --- |
selector
• For each selected element, selects the first descendant element that matches the
|     | specified | selector | string |     |     |
| --- | --------- | -------- | ------ | --- | --- |
• If the current element has associated data, this data is propagated to the
corresponding selected element
|                  | ➢ const b = d3.selectAll('p').select('b') // the first <b> in every <p> |     |     |                        |     |
| ---------------- | ----------------------------------------------------------------------- | --- | --- | ---------------------- | --- |
| Visual Analytics |                                                                         |     |     | P08 -D3.js -Selections | 18  |

d3.select('#myDiv')
==
d3.select(document.body)
.select('#myDiv')
| Visual Analytics | P08 -D3.js -Selections | 19  |
| ---------------- | ---------------------- | --- |

selection.filter( )
filter
• Filters the selection, returning a new selection that contains only the
elements for which the specified filter is true.
• The can be specified as a selector string or a function
filter
➢ const even = d3.selectAll('tr')
.filter(':nth-child(even)’)
==
➢ const even = d3.selectAll('tr')
.filter((d, i) => i % 2 == 1)
Visual Analytics P08 -D3.js -Selections 20

To remember
Selections are immutable.
All selection methods that affect which
elements are selected (or their order)
return a new selection.
Visual Analytics P08 -D3.js -Selections 21

Selection methods typically return the current selection,
allowing the concise application of multiple operations on a
given selection via method chaining.
const p = d3.selectAll(‘circle') const p = d3.selectAll(‘circle')
==
.attr('class’, ‘point') p.attr('class’, ‘point')
.style('color', 'red') p.style('color', 'red')
Visual Analytics P08 -D3.js -Selections 22

2. Modifying Elements
https://d3js.org/d3-selection/modifying
| Visual Analytics | P08 -D3.js -Selections | 23  |
| ---------------- | ---------------------- | --- |

Summary of common methods
1. selection.attr( )
name, value
2. selection.style( )
name, value
3. selection.property( )
name, value
4. selection.text( )
value
5. selection.html( )
value
6. selection.classed( )
name, value
Visual Analytics P08 -D3.js -Selections 24

Details 1/2
selection.attr( )
name, value
• Sets the attribute with the specified name to the specified value to all the selected
elements. Returns the selection.
selection.style( )
name, value
• Sets the style property with the specified name to the specified value to all the
selected elements. Returns the selection.
selection.property( )
name, value
• Like selection.attr, but use this for some special attributes of HTML elements
• ('checked' for checkboxes, 'value' for input elements, 'selected' …)
Visual Analytics P08 -D3.js -Selections 25

Details 2/2
selection.text( )
value
• Sets the text content to the specified value on all selected elements, replacing any
existing child elements.
selection.html( )
value
• Sets the html content to the specified value on all selected elements, replacing any
existing child elements.
selection.classed( )
name, value
• Assigns (value==true) or unassigns (value==false) the specified CSS class names on the
selected elements by setting the class attribute.
Visual Analytics P08 -D3.js -Selections 26

The value parameter
The value parameter (for all the methods: attr, style, …) can be specified or not
• Not specified (getter)
• selection.attr('id') // not specified
• Works as a getter function
• Returns the current value of the specified attribute for the first (non-null) element in the selection.
• This is generally useful only if you know that the selection contains exactly one element.
• Specified (setter)
• selection.attr('id', 'foo') // specified
• Sets the attribute with the specified name to the specified value on the selected elements
• If value is a constant (number, string), all elements are given the same attribute value
• If value is a function (d, i) => {…} is evaluated for each element is the selection, using its return value
Visual Analytics P08 -D3.js -Selections 27

Example – 01a_selections.html
| Visual Analytics | P08 -D3.js -Selections | 28  |
| ---------------- | ---------------------- | --- |

Example – 01b_selections.html
| Visual Analytics | P08 -D3.js -Selections | 29  |
| ---------------- | ---------------------- | --- |

Example – 02_sub_selections.html
| Visual Analytics | P08 -D3.js -Selections | 30  |
| ---------------- | ---------------------- | --- |

Dynamic Properties
• D3 allows you to bind data to a selection; this data is available when
computing properties.
• The data is specified as an array of arbitrary values (whatever you want), and
each value to be passed as the first argument (d) to property functions.
• The first element in the data array is passed to the first node in the selection,
the second element to the second node, and so on.
Visual Analytics P08 -D3.js -Selections 31

Dynamic Properties
#selection.data(values)
• Binds values (an array of data) to the current selection
• The specified values is an array of data values, such as an array of numbers or
objects, or a function that returns an array of values.
Visual Analytics P08 -D3.js -Selections 32

Example – 03_dynamic_properties.html
| Visual Analytics | P08 -D3.js -Selections | 33  |
| ---------------- | ---------------------- | --- |

3. Transitions
https://d3js.org/d3-transition
| Visual Analytics | P08 -D3.js -Selections | 34  |
| ---------------- | ---------------------- | --- |

Transitions
# selection
.transition()
.duration( ) //optional
millisec
• Starts a transition for the current selection.
• Transitions behave much like selections, except operators animate smoothly over
time rather than applying instantaneously.
• Set the duration of a transition
Visual Analytics P08 -D3.js -Selections 35

Example – 04_transitions.html
| Visual Analytics | P08 -D3.js -Selections | 36  |
| ---------------- | ---------------------- | --- |

4. Events
https://srivastavayushmaan1347.medium.com/mastering-dom-events-in-
javascript-a-comprehensive-guide-part-2-d44579255bb8
| Visual Analytics | P08 -D3.js -Selections | 37  |
| ---------------- | ---------------------- | --- |

Standard DOM Events
The browser defines a set of low-level Events that are (in general) generated
by user interactions
• click
• mouseover
• mouseout
• mousedown
• mouseup
• keydown
• keyup
• ….
https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
Visual Analytics P08 -D3.js -Selections 38

D3 Events
D3 defines additional high-level events generated by user interactions
• brush
• zoom
• …
• They depends on the visual component that generates the events
Visual Analytics P08 -D3.js -Selections 39

Bind a listener for an event
| # selection.on( |     | )   |     |     |
| --------------- | --- | --- | --- | --- |
typename, listener, options
• event
| typename | is a string that identify the  |     | :   |     |
| -------- | ------------------------------ | --- | --- | --- |
• 'click'
• 'dblclick'
• 'mouseover'
• …
| • listener is a function accepting 2 parameters (event, d) |     |     |     |     |
| ---------------------------------------------------------- | --- | --- | --- | --- |
• From the event object we can retrieve the node generating it (event.currentTarget)
• d is the data associated to the element
See 06_events.html
| Visual Analytics |     | P08 -D3.js -Selections |     | 40  |
| ---------------- | --- | ---------------------- | --- | --- |

Example – 05_events.html
| Visual Analytics | P08 -D3.js -Selections | 41  |
| ---------------- | ---------------------- | --- |

5. Creating/Deleting Elements
https://d3js.org/d3-selection/modifying#selection_append
| Visual Analytics | P08 -D3.js -Selections | 42  |
| ---------------- | ---------------------- | --- |

Details
selection.append( )
tag
• For each element in the selection, creates a new child element with the specified tag.
• Tag can be a function (d, i) => {…} that returns a tag string
• This correct too (d) => {…}
selection.remove( )
value
• Removes each element of the selection from the document.
Visual Analytics P08 -D3.js -Selections 43

| selection.append( ) |     |     |
| ------------------- | --- | --- |
tag
const div = d3.select('body')
              .append('div')
const p = div.append('p')
             .text('Hello World')
| Visual Analytics | P08 -D3.js -Selections | 44  |
| ---------------- | ---------------------- | --- |

| selection.remove( ) |     |     |
| ------------------- | --- | --- |
tag
const div = d3.select('body')
              .append('div')
div.remove() // delete the div from the DOM
// to remove all children of a selection
selection.selectAll('*').remove()
| Visual Analytics | P08 -D3.js -Selections | 45  |
| ---------------- | ---------------------- | --- |

6. Utilities
| Visual Analytics | P08 -D3.js -Selections | 46  |
| ---------------- | ---------------------- | --- |

selection.each( )
fn
• Invokes the passed function fn for each element in the selection, passing:
• d → datum of the element
• i → index of the element
• nodes → list of all the elements in the selection (nodes[i] is the current element)
• The method can be used to invoke arbitrary code for each selected element
• Useful for creating a context to access parent and child data simultaneously
parent.each((parentDatum, i, nodes) => {
d3.select(nodes[i])
.selectAll('.child')
.text(childDatum => `child ${childDatum.name} of ${parentDatum.name}`)
})
Visual Analytics P08 -D3.js -Selections 47

selection.call(fn, …args)
• Invokes the specified function exactly once, passing the selection along with
any optional arguments.
• Returns this selection.
• This is equivalent to invoking the function by hand but facilitates method
chaining
function name (selection, first, last) {
selection
.attr('first-name', first)
.attr('last-name', last)
}
// normal usage of function
name(d3.selectAll('div'), 'John', 'Snow')
// using call produces the same result
d3.selectAll('div').call(name, 'John', 'Snow')
Visual Analytics P08 -D3.js -Selections 48