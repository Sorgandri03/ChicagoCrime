JavaScript
|                                   | Visual Analytics – | Practical Part – | P03 |     |
| --------------------------------- | ------------------ | ---------------- | --- | --- |
| Visual Analytics - Practical Part |                    | P03 -JavaScript  |     | 1   |

What is JavaScript?
• JavaScript is a cross-platform, object-oriented scripting language
• Client-side version runs in the browser (e.g. Chrome, Firefox, Edge, …)
• Server-side version runs in the OS, allowing more advanced features
JavaScript IS NOT Java! They have only similar syntax
Visual Analytics - Practical Part P03 -JavaScript 2

Client-Side JavaScript
• Runs inside a browser (e.g., Chrome, Edge, Firefox, Safari, …)
• Extends the core language with functionalities that allows to interact with
the web pages:
• Modify the Document Object Model (DOM) i.e. the webpage
• Respond to user events like clicks, text input, mouse movements
Visual Analytics - Practical Part P03 -JavaScript 3

Server-Side JavaScript
• Runs on the operating systemExtends the core language with functionalities
that allows to interact with the operating system:
• Access to filesystem
• Access to the network
• …
A server-side JavaScript program is similar to a Python program:
• To be executed it needs a particular software installed, called JavaScript
Engine. Node.js is one of them.
Visual Analytics - Practical Part P03 -JavaScript 4

JavaScript Guides
We don’t need a textbook, most of the information are available online:
• Mozilla Developer Guide
• https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/
• The Modern JavaScript Tutorial
• https://javascript.info/
Visual Analytics - Practical Part P03 -JavaScript 5

Setup the developing environment
• Install Node.js, any version >= 22.x is ok
• https://nodejs.org
• Goole Chrome browser
• Not all browser supports all the newest JavaScript features.
Google Chrome is one of the most updated.
Visual Analytics - Practical Part P03 -JavaScript 6

Client-side JavaScript
The HTML tag <script> … </script> allow to insert JavaScript code in the page
P03_CODE/01
| Visual Analytics - Practical Part | P03 -JavaScript | 7   |
| --------------------------------- | --------------- | --- |

Client-side JavaScript
The HTML tag <script> allow also to import the code from external files
The code is loaded in the same place in which
is imported
P03_CODE/02
Visual Analytics - Practical Part P03 -JavaScript 8

JavaScript Console on Google Chrome
• The browser provide also a console to
insert JavaScript code and execute it
on the fly
• Right click on the page → Inspect
Visual Analytics - Practical Part P03 -JavaScript 9

Elements
The Elements tab show the elements
composing the html page. It allows to
modify properties and attributes
| Visual Analytics - Practical Part | P03 -JavaScript | 10  |
| --------------------------------- | --------------- | --- |

Console
The Console tab allow to manually
insert JavaScript code in the page
| Visual Analytics - Practical Part | P03 -JavaScript | 11  |
| --------------------------------- | --------------- | --- |

Network
The Network tab show information
about the network, downloaded files
etc.
Is important to active the Disable Cache
checkbox
In general, browser tends to memorize in cache the
scripts. When we modify the script are not always
updated
Visual Analytics - Practical Part P03 -JavaScript 12

JavaScript Tutorial
Introduction to the basic notions
| Visual Analytics - Practical Part | P03 -JavaScript | 13  |
| --------------------------------- | --------------- | --- |

The use of comments
| Visual Analytics - Practical Part | P03 -JavaScript | 14  |
| --------------------------------- | --------------- | --- |

The use of semicolon ;
Semicolons ; are NOT MANDATORY line breaks work as the same
| Visual Analytics - Practical Part | P03 -JavaScript | 15  |
| --------------------------------- | --------------- | --- |

Hello World
| Visual Analytics - Practical Part | P03 -JavaScript | 16  |
| --------------------------------- | --------------- | --- |

Variable declarations
• JavaScript has three kinds for
variable declarations:
• var → Declares a variable, optionally
initializing it to a value
• let → Declares a block-scoped, local
variable, optionally initializing it to a
value
• const → Declares a block-scoped,
read-only named constant
Visual Analytics - Practical Part P03 -JavaScript 17

The VAR variable
var is globally visible, we can read/write it in any
following part of the code, after its declaration
We cannot redeclare a variable var
AVOID to use var, only if you really need its
behavior. The fact that is globally visible can lead to
programming mistakes
USE the let variable instead
Visual Analytics - Practical Part P03 -JavaScript 18

The LET variable
A let variable is block-scoped, i.e. can be accessed
only inside the block in which is declared.
A block is a construction enclosed by parentheses:
FOR, WHILE, IF, ELSE, …
Always use let instead of var, when it is possible.
This is a best practice that helps to limit mistakes.
Visual Analytics - Practical Part P03 -JavaScript 19

The CONST variable
|     | A const | variable is block-scoped | and read-only |     |
| --- | ------- | ------------------------ | ------------- | --- |
Use const if you don't have to modify its value
| Visual Analytics - Practical Part | P03 -JavaScript |     |     | 20  |
| --------------------------------- | --------------- | --- | --- | --- |

Special values: null and undefined
A null value is always assigned in the code
The undefined value is automatically setted if a value is
missing, for example if a function has not a return statement, it
returns undefined by default. Or if a function takes in input a
parameter, and it is not passed when the function is called, the
parameter is setted to undefined.
Visual Analytics - Practical Part P03 -JavaScript 21

Display variables
| Visual Analytics - Practical Part | P03 -JavaScript | 22  |
| --------------------------------- | --------------- | --- |

Strictly Equality
• The strictly equality/disequality checks both the value and the type of the
variable
a === b
// strictly equal
a !== b
// strictly not equal
null == undefined //--> true
null === undefined //--> false
Visual Analytics - Practical Part P03 -JavaScript 23

Strings
Strings can be declared with different types of quotes
| Visual Analytics - Practical Part | P03 -JavaScript | 24  |
| --------------------------------- | --------------- | --- |

Template Strings
Backticks allows to create strings with embedded expressions, by using the
construct ${ … } Similar to python f-strings
| Visual Analytics - Practical Part | P03 -JavaScript | 25  |
| --------------------------------- | --------------- | --- |

Converting strings to number
| Visual Analytics - Practical Part | P03 -JavaScript | 26  |
| --------------------------------- | --------------- | --- |

Functions 1/2
| Visual Analytics - Practical Part | P03 -JavaScript | 27  |
| --------------------------------- | --------------- | --- |

Function 2/2
| Visual Analytics - Practical Part | P03 -JavaScript | 28  |
| --------------------------------- | --------------- | --- |

Arrow Functions
| Visual Analytics - Practical Part | P03 -JavaScript | 29  |
| --------------------------------- | --------------- | --- |

Arrays
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
• Arrays can be declared in two ways:
• with squared parentheses (like Python)
• instantiating the Array class, passing a length and an initial fill value that is copied in
each element of the array
Visual Analytics - Practical Part P03 -JavaScript 30

Useful methods
of the class Array
| Visual Analytics - Practical Part | P03 -JavaScript | 31  |
| --------------------------------- | --------------- | --- |

Useful methods
of the class Array
https://javascript.info/array-methods
| Visual Analytics - Practical Part | P03 -JavaScript | 32  |
| --------------------------------- | --------------- | --- |

Dictionary (called Object)
• Dictionary can be declared like Python
• Dictionary keys (a, b, c, … in the example) can be also written without quotes
IF the key is not a number or it does not contain spaces
| Visual Analytics - Practical Part | P03 -JavaScript | 33  |
| --------------------------------- | --------------- | --- |

Iterate over a dictionary
| Visual Analytics - Practical Part | P03 -JavaScript | 34  |
| --------------------------------- | --------------- | --- |

Set
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
A set is a collection of unordered and unique objects
| Visual Analytics - Practical Part | P03 -JavaScript | 35  |
| --------------------------------- | --------------- | --- |

Class basic syntax
| Visual Analytics - Practical Part | P03 -JavaScript | 36  |
| --------------------------------- | --------------- | --- |

Class inheritance
| Visual Analytics - Practical Part | P03 -JavaScript | 37  |
| --------------------------------- | --------------- | --- |

Error handling
• Usually, a script “dies” (immediately
stops) in case of an error, printing it to
console.
• But there’s a syntax
construct try...catch that allows us to
“catch” errors so the script can, instead
of dying, do something more reasonable
• Learn more at
https://javascript.info/error-handling
Visual Analytics - Practical Part P03 -JavaScript 38

Server-side JavaScript
| Visual Analytics - Practical Part | P03 -JavaScript | 39  |
| --------------------------------- | --------------- | --- |

Server-Side JavaScript
• Runs on the operating system, needs an engine (e.g. Node.js) to be executed
• Extends the core language with functionalities that allows to interact with
the operating system:
• Access to filesystem
• Access to the network
• …
A server-side JavaScript program is similar to a Python program:
• To be executed it needs a particular software installed, called JavaScript
Engine. Node.js is one of them.
Visual Analytics - Practical Part P03 -JavaScript 40

Node.js
• Cross-platform JavaScript runtime environment
• Based on the V8 JavaScript Engine, the core of Google Chrome
https://nodejs.org
| Visual Analytics - Practical Part | P03 -JavaScript | 41  |
| --------------------------------- | --------------- | --- |

Setup the developing environment
• Any text editor is ok, but for the course is suggested
Visual Studio Code
• https://code.visualstudio.com/
• Install Node.js, any version >= 22 is ok
• https://nodejs.org
Visual Analytics - Practical Part P03 -JavaScript 42

How to run a server-side JavaScript program
• A JavaScript program is a text file with extension .js
• Suppose the file is myprogram.js
• In the console execute the command: node myprogram.js
| Visual Analytics - Practical Part | P03 -JavaScript | 43  |
| --------------------------------- | --------------- | --- |

NPM Package Manager
https://www.npmjs.com/
• To install external libraries (package) there is npm
| • Similar to pip |     | for Python |     |     |
| ---------------- | --- | ---------- | --- | --- |
• Two main commands:
| • npm | init→ | create the project |     |     |
| ----- | ----- | ------------------ | --- | --- |
• npm install foo → install the package (i.e. library) called foo
• npm install --save-dev foo → install the package as developing dependence
meaning that is required for the development process, but is not required in the
application that we are going to develop
| Visual Analytics - Practical Part |     |     | P03 -JavaScript | 44  |
| --------------------------------- | --- | --- | --------------- | --- |

Project Structure
• Inside a folder in which npm has installed some packages, we find:
• node_modules → a folder containing all the files of the external packages, DO NOT
EDIT files inside this folder, if you are on a git project, add the folder to gitignore
• package.json → a json file specifying all the required packages and other information.
Executing only npm install without the name of the package, inside a folder in
which there is a package.json file, each dependency listed in the file will be installed.
• package-lock.json → a json file in which are reported all information about
dependency versions. Do not edit this file. It is automatic generated.
Visual Analytics - Practical Part P03 -JavaScript 45

package.json
| Visual Analytics - Practical Part | P03 -JavaScript | 46  |
| --------------------------------- | --------------- | --- |

Hot to run a project
npm start to run the project that contains a package.json file
• It executes the script index.js
• Other scripts can be executed, in that cases, they must be specified in a filed of the
package.json file
Visual Analytics - Practical Part P03 -JavaScript 47

StandardJS
• Visual Studio Code extension for JavaScript Standard Style with automatic
fixing.
• Helps to maintain code clear, improve readability, limits errors
https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard
Visual Analytics - Practical Part P03 -JavaScript 48

Setup StandardJS
• Open VisualStudio code settings (StandardJS extesion has to be yet installed)
https://code.visualstudio.com/docs/getstarted/settings
• Search for "autosave" and set to "onFocusChange"
| Visual Analytics - Practical Part | P03 -JavaScript | 49  |
| --------------------------------- | --------------- | --- |

Setup StandardJS
• Search for "standard" and enable "Auto Fix On Save"
| Visual Analytics - Practical Part | P03 -JavaScript | 50  |
| --------------------------------- | --------------- | --- |

npm install --save-dev standard
To use the standard.js extension:
• Configure the extension as specified in the previous slides
• In each project, must be installed as development dependency
| Visual Analytics - Practical Part | P03 -JavaScript | 51  |
| --------------------------------- | --------------- | --- |

EXAMPLE-03
A simple http server that responds with hello world.
Code available in P03_CODE/03
| Visual Analytics - Practical Part | P03 -JavaScript | 52  |
| --------------------------------- | --------------- | --- |

EXAMPLE-03
A simple http server that responds
with hello world
index.js
package.json
Visual Analytics - Practical Part P03 -JavaScript 53

EXAMPLE-03 | package.json
npm init
npm install express
npm install --save-dev standard
Express is a minimalist web server https://expressjs.com/
(Flask is something similar for Python)
Remember to add manually the scripts part
Visual Analytics - Practical Part P03 -JavaScript 54

EXAMPLE-03 | index.js
External modules are imported with the
require command. Not only for libraries, but
also for object from other files of the project.
Instantiate the server object
Set the function to be called when arrives a
request to the endpoint '/'
Start the server, specify a callback function
that is called when the server is ready
Visual Analytics - Practical Part P03 -JavaScript 55

Import/Export on Server-side
• Use module.exports = … to export an object/variable/function/class
• Use const foo = require('foo') to import from the module foo
installed as dependency
• Use const foo = require('./path/foo') to import from the
module local module foo
Visual Analytics - Practical Part P03 -JavaScript 56

webpack
| Visual Analytics - Practical Part | P03 -JavaScript | 57  |
| --------------------------------- | --------------- | --- |

webpack
• webpack is a static module bundler for modern JavaScript applications
• Used to compile JavaScript modules: collect all dynamic dependencies and
generate static files
| Visual Analytics - Practical Part | P03 -JavaScript | 58  |
| --------------------------------- | --------------- | --- |

WEBPACK
Webpack
https://webpack.js.org/
| Visual Analytics - Practical Part | P03 -JavaScript | 59  |
| --------------------------------- | --------------- | --- |

WebApp Template
In folder config webpack configuration files
In folder src source files of my application
• index.html
• index.css
• index.js
• …
• All the other scripts that I need
Configuration files of the project
Visual Analytics - Practical Part P03 -JavaScript 60

Import/Export on Client-side
• Use export keyword to export an object/variable/function/class
• Use export default keyword to set the default export
• Use import foo from bar to import the default exported object
• Use import {fn1, fn2} from bar to import some objects
Visual Analytics - Practical Part P03 -JavaScript 61