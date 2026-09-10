D3.js
Data, Scales, and Colors
|                  | Visual Analytics – |                          | Practical Part – | P05 |     |
| ---------------- | ------------------ | ------------------------ | ---------------- | --- | --- |
| Visual Analytics |                    | P09 -D3.js -Data Joining |                  |     | 1   |

Data Joining
https://d3js.org/d3-selection/joining
| Visual Analytics | P09 -D3.js -Data Joining | 2   |
| ---------------- | ------------------------ | --- |

selection.data( , )
array key
• Binds the specified array of data with the selected elements, returning a new
selection.
• The selection or the array can have different length, only the common
elements are matched
• Key function is important in case of elements updating, to maintain a
reference of data
KEY function [optional]
const sel = d3.selectAll('circle')
.data(['red', 'green', 'blue', 'yellow'], d => d)
.attr('fill', d => d)
Visual Analytics P09 -D3.js -Data Joining 3

Create elements from data with
enter()
See: example01
• Simple and easy approach to
create elements from binded data
const arr = ['a', 'b', 'c', 'd']
• We need to:
svg.selectAll('.myChars')
1. Create an empty selection
.data(arr)
.enter()
2. Bind the data
.append('text')
3. Call the enter() method
.attr('class', 'myChars')
4. Call the append() method .attr('fill', 'green')
.attr('font-size', 30)
5. Then every method called is
.attr('x', (d, i) => i * 30)
evaluated with the current data for
.attr('y', d => 30)
each appended element .text(d => d)
Visual Analytics P09 -D3.js -Data Joining 4

Use the enter() ONLY IF we want to
add elements to the DOM
| Visual Analytics | P09 -D3.js -Data Joining | 5   |
| ---------------- | ------------------------ | --- |

The tricky part
Take care of what we are selecting. In some cases
|     | we need that selectAll | must be an empty | selection |     |
| --- | ---------------------- | ---------------- | --------- | --- |
svg.selectAll('.myChars')
  .data(arr)
  .enter()
| Visual Analytics |     | P09 -D3.js -Data Joining |     | 6   |
| ---------------- | --- | ------------------------ | --- | --- |

Example01a
| Visual Analytics | P09 -D3.js -Data Joining | 7   |
| ---------------- | ------------------------ | --- |

Create/Update/Remove elements from data
• The DOM can be manipulated also by adding/updating/removing elements
• D3’s data join lets you specify exactly what happens to the DOM as data
changes.
• Minimize DOM operations
• Easily animate changes
• Manage three phases (enter, update, exit)
Visual Analytics P09 -D3.js -Data Joining 8

| Enter – | Update – | Exit  |     |     |
| ------- | -------- | ----- | --- | --- |
Existing
New elements
elements
to create
to delete
Existing elements
to update
| Visual Analytics |     |     | P09 -D3.js -Data Joining | 9   |
| ---------------- | --- | --- | ------------------------ | --- |

selection.join( )
enterFn, updateFn, exitFn
• The selection.join is the method we need to manage ALL TOGHETER the
creation, update and removing of DOM elements
• It's fantastic because it is:
➢Hard to learn
➢Easy to forget
Visual Analytics P09 -D3.js -Data Joining 10

selection.join(enterFn, updateFn, exitFn)
| • Call the join() after having setted |     | the data |     |     |
| ------------------------------------- | --- | -------- | --- | --- |
➢sel.data(...)
     .join(enterFn, updateFn, exitFn)
• enterFn → A function that manages the creation of new elements
| •   | → a function that manages the updating |     | of new elements |     |
| --- | -------------------------------------- | --- | --------------- | --- |
updateFn
| •   | → a function that manages the deleting |     | of elements |     |
| --- | -------------------------------------- | --- | ----------- | --- |
exitFn
| Visual Analytics |     | P09 -D3.js -Data Joining |     | 11  |
| ---------------- | --- | ------------------------ | --- | --- |

The enter function
• Must handle the creation of new elements
• Takes in input the enterSelection, that contains only the new elements to
create
• Must return the selection
function enterFn (enterSelection) {
// remember to ALWAYS return the new selection
// when we call append, a new selection is generated as output
return enterSelection.append('rect') // first, create the element (MANDATORY!)
.attr('class', 'myClass') // then set all the attributes/styles/properties
.attr('x', 45)
// ...
}
Visual Analytics P09 -D3.js -Data Joining 12

The update function
• Must handle the updates of existing elements
• Takes in input the updateSelection that contains the existing elements to
update
• Must return the selection
function updateFn (updateSelection) {
// remember to ALWAYS return the new selection
// when we call a transition, a new selection is generated as output
return updateSelection
.transition() // without a transition the update is istantaneus
.attr('y', 100)
}
Visual Analytics P09 -D3.js -Data Joining 13

The exit function
• Must handle the removing of existing elements
• Takes in input the exitSelection that contains all the elements to remove
function exitFn (exitSelection) {
// NO NEED to return the selection in the exit function
exitSelection.remove()
}
Visual Analytics P09 -D3.js -Data Joining 14

The tricky part
Take care of what we are selecting. In some cases
|     | we need that selectAll | must be an empty | selection |     |
| --- | ---------------------- | ---------------- | --------- | --- |
svg.selectAll('circle')
  .data(myDataArray)
  .join(enterFn, updateFn, exitFn)
| Visual Analytics |     | P09 -D3.js -Data Joining |     | 15  |
| ---------------- | --- | ------------------------ | --- | --- |

• If we want to ONLY ADD new elements
• selectAll() must return an empty selection
• Is common to pass, as selector, the class we will apply to the new elements. In this
way the selection is empty
• If we want to add/update elements
• selectAll() must contain something, to update elements
Visual Analytics P09 -D3.js -Data Joining 16

Example1b
• We have the 26 chars of the alphabet (a, b, c, …)
• Each letter has a fixed x position in the page in a row at coordinates y
• Every 2 seconds we repeat the following:
1. Generate a new subset of random letters: S_NEW
2. (ENTER) If the letter is new (not yet plotted) → plot it in green at the top of the page
and then after some delay move down to y changing its color to black
3. (UPDATE) If the letter is already plotted → do nothing
4. (EXIT) If the letter was plotted, but in not in the new subset, change its color to red,
move down to the page and then delete it
Visual Analytics P09 -D3.js -Data Joining 17

Example 02 – EXERCISE TO COMPLETE IN CLASS
• Dataset data/blobs_5.csv
• 1000 Points
• 2 dimensions (pointX, pointY) in [0, 1000]
• 5 clusters (pointCluster)
Visual Analytics P09 -D3.js -Data Joining 18

Example 02 – EXERCISE TO COMPLETE IN CLASS
• Complete the plot() function in
example02.js and call its main() in the
index.js
• Create a scatterplot from the blobs_5.csv
dataset (already imported in the script)
function plot (dataset, svg, chartWidth, chartHeight)
• Color the points according to their cluster
• Point stroke white
• Points must have the css class "point"
Visual Analytics P09 -D3.js -Data Joining 19

| Example 02 – |     |     | EXERCISE TO COMPLETE IN CLASS |     |     |     |
| ------------ | --- | --- | ----------------------------- | --- | --- | --- |
• Remember that
•
|                           | circle         | uses cx | and cy | attributes for the center |     |     |
| ------------------------- | -------------- | ------- | ------ | ------------------------- | --- | --- |
|                           | • r for radius |         |        |                           |     |     |
| • In this example the svg |                |         |        | size is 1000x1000         |     |     |
• Points coordinates (from the dataset) are in [0,1000]
• They can be used as coordinated for the circles
| Visual Analytics |     |     |     |     | P09 -D3.js -Data Joining | 20  |
| ---------------- | --- | --- | --- | --- | ------------------------ | --- |

Example 02 – EXERCISE TO COMPLETE IN CLASS
• Add a ON CLICK listener on each point.
• When the user click on it:
• log on the console the data associated to the point
• Change the radius of the point to 20
• Change the color to black
• Use a transition
Visual Analytics P09 -D3.js -Data Joining 21