Visual Analytics
Giuseppe Santucci
5 – Representation
Thanks to John Stasko, Robert Spence, Ross Ihaka,
Marti Hearst, Kent Wittemburg
1

Canonical steps in infovis – STEP 1
Internal
DATA
Representation
Mathematics
(infinite space & resolution) Sport Physics
Chemistry Literature
Encoding of values
History
Art
Univariate data Geography
Bivariate data
Trivariate data
Multidimensional data
Encoding of relations
Temporal data
Map & Diagrams
Graphs/Trees
Data streams
2

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
3

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
4

Data types and complexity
• Attributes are just single values (Numerical /Categorical)
• A single data item (e.g., a single car) has several attributes and the item
represent a (mathematical) relation among them
• Attribute pairs may present some patterns (e.g., correlations)
• Data items can have same patterns in their Rn space (e.g., cluster, outliers, etc.)
– Visible only in 2D space: 2D scatterplot
– 3D scatterplot are seldom used
• Or they can have relationships (E-R model)
• Visual representation of values
• Visual representation of relations / relationships
• Visual representation of patterns / functions
• Derived values
– Statistical indicators / Aggregate values / …
5

Visual representation of a single value
• Representing the price (12k) of a car using different encodings
0 10
10
11
10
12
13
hmmm...
6

Relations
| Make | Price (£) | MPG | Rating | Age (yrs) |
| ---- | --------- | --- | ------ | --------- |
among
| Ford  | 15,450 | 31  | ***** | 3   |
| ----- | ------ | --- | ----- | --- |
| Chevy | 12,450 | 27  | ***   | 4   |
values
A table representing a relation among n values
10
Color coding highlighting
a single value A scatter plot representing a
relation between 2 values
7

Brushing is the process of interactively selecting data items from a visual representation. The
original intention of brushing is to highlight brushed data items in different views of a visualization.
Brushing [Spence, 2007]
• Brushing, a very useful interaction technique, can be used to
interactively visualize a relationship among data items
• Use interaction for that only when needed
Interaction to identify a
doctor highlights the
hospital beds under his
care, and vice versa
Brushing means selecting a subset of the data items with an input device
(mouse). This is usually done to highlight this subset, but it can also be done
to delete it from the view or to de-emphasize it, if the user wants to focus on
the other items.
Brushing is most interesting in connection with linking (between two or more
visualizations)
[Voigt, 2002]
Mouse hovering
8

Relationships
• Use interaction for that only when needed
• Here a doctor is depicted below the beds she is responsible for
– The relationship is encoded visually
9

Functions between two values
Scatterplot, correlation, regression, etc.
10

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
11

Univariate data
• Representing single values seems quite easy
• Some human factors make, sometimes, this problem quite hard
12

An aircraft example
• A basic measure: aircraft height (basic value but very important…)
Three issues with it:
1) The unit is too little: pilots think in
terms of hundreds of feet;
2) However, 100 feet are still not
enough for real usage so
3) altimeters use 3 hands
• 10.000 feet
• 1.000 feet
• 100 feet
Typical altimeter
13.460 feet
13

Change blindness
2. Pilots gaze moves away from altimeter quite often (piloting, looking at
other instruments, etc.) and, after a quick change, some, similar
representations can be confused (with very bad consequences…)
32.600 feet 24.600 feet (about 3km lower!)
14

15

Animation can help...
16

Stress and fatigue
3. During an emergency, a pilot must control several instruments and reading
the altimeter under stress can make change blindness more easy
European glider pilots take less risks
(only two hands and meters – but
under stress the mental conversion
feet-meters can be a complex activity)
17

Modern solution used in
modern digital instruments
2200
2000
Overview + Details
1820
1800 00
Change blindness is not possible
1600
Bigger digits reflect the pilot mind:
1400
hundreds of feet
Low
1200
18

Stress and fatigue
Representations of the vital signs of a patient during an operation. The difficulty of paying constant
attention to such a display throughout a long operation has led to the encoding of vital signs in the pitch
of a frequently repeated ‘beep’. A change in pitch is immediately noticed wherever the gaze of the
anesthetists is directed
Note: sometimes aircraft pilots in emergency situations turn off distracting alarm noises and the radio…
19

Back to change blindness
What is the difference between these two picture (if any)?
20

I prefer the first one …
21

If it is not a glider … I like engines…
22

Animation can greatly help!!
Animation and brushing are very powerful tools
23

Another kind of blindness
In the next movie, the girl with the white t-shirt is going to receive the ball
several times
Count how many times she receives the ball (disregarding knocking up)
24

Ready?
25

So...
• 6 times ?
• 7 times ?
• 8 times ?
• 9 times ?
• 10 times ?
26

Fine… and now another question…
• How many gorillas were in
the video ?
27

Inattentional blindness
28

Inattentional blindness
• Just one gorilla…
• Back to univariate data…
29

Collections of number
• Very often the interest is about a collection/sample of numbers
60
outliers
50 95 percentile
Price
(£K)
75 percentile
40
median
30
20
25 percentile
10
5 percentile
Each dot represents the price of a car A Box Plot of the same data
Derived value!!!
30

A common way of defining outliers
• Even if the definition of
boxplots does not include
outliers it is quite common
presenting them using the
IQR*1.5 formula
• N.B. boxplots can be used
for ANY data distribution
31

Collections of number
• Histograms & bargrams (aggregate data)
88
66
44
22
11 ––2200 2200––3300 3300––4400 4400––5500 5500––6600
PPrriiccee ((££KK))
32
P r i c e £ k
1 0 - 1 2 1 2 - 1 4 1 6 - 1 8
A bargram representation of univariate data, obtained by
‘tipping over’ the columns (bars) of a histogram and joining
them end-to-end, ignoring any null bins
A quick note:
10-12 12-14 is
[10-12) [12-14) or (10-12] (12-14]
Take care of the scales…

Collections of number
| Nissan | Ford | Ferrari | MG  | Cadillac |
| ------ | ---- | ------- | --- | -------- |
A bargram representation of univariate categorical data   How improve it?
• A frequency distribution
33

Collections of number
Nissan Ford Ferrari MG NissCaandillaFcord NissFaenrrariFord NMisGsFanerraCrFiaodridllacMGFerrarCiadillacMG Cadillac
Order them by cardinality (be aware of changes in data)
• A frequency distribution
34

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
35

Bivariate data
| • The conventional approach to represent    | Price | n. of    |
| ------------------------------------------- | ----- | -------- |
| data with two attributes is the scatterplot |       | bedrooms |
|                                             | 110   | 1        |
|                                             | 160   | 3        |
|                                             | 180   | 5        |
|                                             | 140   | 2        |
|                                             | 140   | 3        |
|                                             | 160   | 1        |
|                                             | 170   | 5        |
|                                             | 110   | 5        |
|                                             | …     | …        |
A scatterplot of bivariate data.  Each point indicates the Price and Number of
bedrooms associated with a house.                     denotes visual outliers
36

Time-series
• Special solutions are available when one of the
attribute is the time
• Typical application are medical, climate studies, and
market analysis
Example:
weekly stock
stock price
prices for 1430
stocks in a
year
1 6 12 18 24 30 32 36 42 48 52 time, weeks of the year
37

An overview of the entire data set
38

A single time-box (brushing) limits the display to items with prices between $70
an $250 in the first weeks of the year
39

A additional constraint selects items with prices between $70 and $95 during
weeks 7 to 12
40

A constraint concerns prices between $90 and $115 for weeks 15 to 18
41

Or: give me stocks whose trend is “similar to that line”
42

• When cyclic aspect of
Time-series
the time are relevant
different visualizations
82
may make evident
repetitive patterns
• (legend is missing...)
Example:
Ozone level in
Los Angles
over 10 years
91
43

• Or in a spiral /circle
Time-series
fashion
Example:
Alarms in a
network
44

Do you remember Florence Nightingale?
45

Circular/radial encoding
(see, e.g., http://circos.ca/intro/published_images/)
Not necessarily
focused on repetitive
patterns
More room for the data
46

https://www.climate-lab-book.ac.uk/2016/spiralling-global-temperatures/#more-4330
Repetitive temporal patterns
isultati immagini per circular time series
What is
wrong
with it?
47

Temperature scale – Color legend – Time is not clear
48

Linked histograms
& brushing
price n. of bedrooms
(a) (a) the price and number of bedrooms
associated with a collection of
houses are represented by separate
histograms (i.e., visual
representation of distribution);
(b)
(b) a single house is represented once
on each histogram;
(c) upper and lower limits placed on
price define a subset of houses
(c) which are coded red on both
histograms;
imposed (d) Interpretation is enhanced by
limits
‘ranging down’ the colour-coded
houses, especially if exploration
(d)
involves the dynamic alteration of
limits
imposed
limits
Number of
Price
bedrooms It scales to a larger number of attributes ! 49

Semantic zoom on a collection
60
50
Price
(£K) Ford
40
Nissan
40 VW
Merc
35
Jag
30 Jag
Ford
30
SEAT
20
10
Semantic zoom reveals data about a second attribute
50

Qualitative understanding
The area of each red square encodes the value of the voltage occurring at the
point in the circuit at which the square is located
51

In the State of the World Atlas, magnification encoding is used to give a first impression of population
densities. Note the reduced ‘size’ of Canada and Australia when compared with a conventional map 52

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
53

Trivariate data
Extension of 2D scatterplot to 3D is straightforward but not very effective. It requires
interaction/additional visual elements to deal with occlusion and perspective ambiguity
D
Price
C
Bedrooms
B
A
Time
Does A cost less or more than B?
Books- Occlusion Perspective ambiguity
54

55

Scatterplot matrix (SPLOM)
D
Price
C
B Bedrooms
A
Time
56

Scatterplot matrix & brushing
The highlighting of houses in one scatterplot is propagated to the remaining scatterplots
57

Books Scatterplot matrix
No brushing implemented 
58

Scatterplot + dimension
1
July ‘97
2
Sept ‘97 3
Nov ‘97 4
Month
of Jan ‘98
Production
(MOP) Non linear
Mar ‘98
encoding
May ‘98
2 4 6 8 10 12
Months in service (MIS)
A representation of reported product failure, based on month of production (MOP) of the failed product,
and total months in service (MIS) before the fault occurred. The radius of each circle indicates the
number of faults reported for a given MOP and MIS (0 failures are not represented...)
59

Scatterplot + color
60

2D drawing + visual attribute
Treble
Bass
A representation of the population of
major cities in England, Wales and Circles indicate the extent of the effect of a
Scotland. Circle area encodes component on some property of the circuit,
population in a non linear way and change in size as the frequency cycles
up and down the range from bass to treble
61

2D drawing + visual attribute + interaction
62

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
63

Multidimensional data
• Data attributes > 3
• We need to represent data attributes with other attributes than X,Y, Z
3D scatterplot+size+color
64

Scatterplot matrix + size+color
65

Dare Demo!
66

Gapminder
67

How far can we go?
• X,Y, Z+
• Color+
• Size +
• Shape +
• Pattern +
• Orientation +
• …
• It is clear that we cannot manage in efficient way more than 7, 8
attributes
• We need different approaches
68

Parallel coordinates
B
A
Price
Number Price
Number
of of
bedrooms bedrooms
An alternative representation to the
scatterplot in which the two attribute To avoid ambiguity the pair of
scales are presented in parallel, points representing a house are
thereby requiring two points to joined
represent each house and labelled
69

Parallel coordinates
A parallel coordinate plot representation of a collection of cars, in which a range
of the attribute Year has been selected to cause all those cars manufactured
during that period to be highlighted
70

Parallel coordinates
A B C D E F G
A parallel coordinate plot for six objects, each characterized by seven attributes. The
negative correlation between A and B, and the positive correlation between B and C,
are immediately apparent. The negative correlation between B and E, and the positive
correlation between C and G, are not. Swapping axes has a factorial cost…
71

Patterns that can be rescued using analytics
72

Parallel coordinates
• Parallel coordinates Cons
– Non traditional representation
– Data crossing
– Not easy interaction through a pointer
• e.g., selecting a car subsets requires SEVEN
range selections
• Parallel coordinates Pros
– Details about dimensions' values
– Unique correspondence between data and screen
polylines
73

Radial Axes Visualizations -> 2D scatterplot + axes
preserving values (trying) or
preserving proportion (trying)
74

75

76

Radviz
• 7 dimensions (391 cars)
– miles per gallon (M.P.G.)
– number of cylinders
– horsepower
– weight
– acceleration (time from 0 to 60 mph)
– year
– origin (USA, Europe, Japan)
77

Radviz (data must be normalized)
Year
d1 d2 Origin
0.9
0.9
p
Acceleration
P (0.9, 0.9, 0.9)
0.9
MPG
d3
d1
d2
values acts as springs
0.1
and pull the point towards
0.1 Weight
the anchors
the stronger (wrt the others)
p the closer
P (0.1, 0.1,0.5 )
0.5
Cylind
d3
Horsep
78

Radviz
• Radviz Pros
– Traditional representation (scatter plot)
– No data crossing
– Easy 2D interaction through a pointer (direct manipulation)
– Details about attribute proportions (might) are available
• Radviz Cons
– Normalization and mapping does not preserve Euclidean distance
– Attributes disposition affects plot effectiveness
• but, eventually, we have a solution for that
– No details about dimensions' values
– Most of the people do not understand it fully
79

Vis 2022 AWARE contribution
• Demo of the AWARE prototype
80

Additional considerations
• Min-Max normalization is not linear and destroys data
• A database update changing the min or max of a single data item implies
replotting all the points and changing anchor arrangement!!!
• Radviz is great for PROPORTIONS
– e.g., the market percentage penetration of a set of companies (points) in different contexts (anchors),
• and dataset with dimensions with the same meaning and prefixed min and max
– exam grades for a set of students (points) on a set of exams (anchors)
• It performs poorly with dimensions having different meaning and different min
max values
• We are working on some example right now, some examples in the next
classes…
81

Star plots (or radar diagrams)
Mathematics
Sport Physics
Chemistry Literature
History
Art
Geography
In a star plot attribute scales radiate from a common origin. Because shape can
often effectively represent the combined attribute values of a single object, the
points on each attribute scale can usefully be joined. Other useful information such
as average values or thresholds can be encoded on the star plot
82

Scatterplot matrix (splom)
83

Scagnostic
Wilkinson_2005@Infovis.pdf
Abstract
We introduce Tukey and Tukey
scagnostics and develop
graph- theoretic methods
for implementing their procedure
on large datasets.
84

Mosaic plots
Class
| Survived | Age | Gender |         |     |      |
| -------- | --- | ------ | ------- | --- | ---- |
|          |     |        | 1st 2nd | 3rd | Crew |
670
| No  | Adult | Male | 118 154 | 387 |     |
| --- | ----- | ---- | ------- | --- | --- |
192
| Yes |     |     |   57   14 |   75 |     |
| --- | --- | --- | --------- | ---- | --- |
No Child     0     0   35     0
| Yes |       |        |     5   11  |   13 |     0 |
| --- | ----- | ------ | ----------- | ---- | ----- |
| No  | Adult | Female |     4   13  |   89 |     3 |
| Yes |       |        | 140   80    |   76 |   20  |
| No  | Child |        |     0     0 |   17 |     0 |
| Yes |       |        |     1   13  |   14 |     0 |
Details of the Titanic disaster
85

Mosaic plots
| 2201 |     | 325 285 706        | 885  |
| ---- | --- | ------------------ | ---- |
|      |     | First Second Third | Crew |
| (a)  |     | (b)                |      |
Survived
Female Female
Died
Survived
Male Male
Died
AdultChild
| FirstSecond Third | Crew | FirstSecond Third | Crew |
| ----------------- | ---- | ----------------- | ---- |
| (d)               |      | (c)               |      |
Steps in the creation of a mosaic plot representing the Titanic disaster
86

| Adult   Child Adult Child | Adult       Child | Adult       Child |
| ------------------------- | ----------------- | ----------------- |
87

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• scatter plots + color /size...
• scatter plot matrixes
• parallel coordinates
• radviz
• star plots
• mosaic plots
• icons
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
88

Multiple coordinated views
A histogram representing the prices
Limits on Price identify a
of a collection of houses.
subset of houses, coded green
A single house is shown in yellow
89

Multiple coordinated views
Houses defined by the limits on Price are coded green in other attribute histograms
90

Multiple coordinated views
Green: houses which satisfy all attribute limits
Black: houses which fail only one limit are coded black
If a black house is positioned outside a limit it will turn green if the limit is extended to include it
White and gray: houses which fail two or more limits
Guidance for white and gray is not provided...
91

Multiple coordinated views
Even if no houses satisfy all attribute limits, black houses, which fail only one
limit, provide guidance as to the effect of relaxing limits
92

Influence
explorer
93

Dimensionality reduction
• Move from Rn → R2
• A family of techniques exist, and will be practically
discussed with examples and python code in next
classes
Wine Dataset

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations & relationships
• Lines
• Map & Diagrams
• Trees
• Support for design
95

Encoding of relations and relationships
• Relation: logical or natural association between two  or more values
|     |     | Make Price(£) | MPG Rating | Age (yrs) |
| --- | --- | ------------- | ---------- | --------- |
|     |     | Ford 15,450   | 31 *****   | 3         |
|     |     | Chevy 12,450  | 27 ***     | 4         |
Relationship: connection between two or more data items
| John | Stingy Bank |     | X1  |     |
| ---- | ----------- | --- | --- | --- |
Y
X2
1930 Bentley
X3
What is the visual difference between their encodings?
96

You can encode a relation using values (or lines)
Mathematics
Sport Physics
Chemistry Literature
History
Art
Geography
97

You cannot encode a relationship using values
(they refers to categorical values...)
John Stingy Bank
Line
Position
Brushing
1930 Bentley
Values
But line, position, and brushing, are also fine with relations !
98

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
– Lines
• Map & Diagrams
• Trees
• Support for design
99

Lines! (+ color + time)
Picts
Northumbria
Mercia
West Saxon
South Saxon
Isle of Wight
Kent
Britons
550 600 650 700
Years AD
The incidence of warfare in early Anglo-Saxon England between 550 AD and 700
AD. Red indicates the aggressor, green the attacked
100

|     |     | Originator | Receiver |     |     |
| --- | --- | ---------- | -------- | --- | --- |
Lines !
|     |     | A   | H   |               |     |
| --- | --- | --- | --- | ------------- | --- |
|     |     | C   | L   |               |     |
|     |     | I   | M   |               |     |
|     |     | B   | E   | Phone calls ? |     |
|     |     | F   | H   |               |     |
|     |     | G   | I   |               |     |
|     |     | I   | B   |               |     |
|     |     | B   | M   |               |     |
|     |     | K   | B   |               |     |
|     |     | G   | B   |               |     |
|     |     | K   | E   |               |     |
|     |     | C   | J   |               |     |
B
|     |     | D   | C   |     |     |
| --- | --- | --- | --- | --- | --- |
| B   |     |     |     | K   | E   |
A C
M
|     | D   |     |     | G   | I   |
| --- | --- | --- | --- | --- | --- |
L M
E
A H
K
F
F
J
J C
G
I
H
D
L
101

Radial graph (ancestor of chord diagrams)
Lines + color + partitioning + semantic zoom
(b) mortgage = ipoteca
lender = prestatore
surveyor=ispettore
applicant= richiedente
(a)
accountant=contabile
A representation of mortgage activity (a). Lenders, properties (houses), buyers,
etc. are represented by small radial segments of an annulus as shown in (b), and
their relationships denoted by straight lines
102

A mortgage fraud visualized & discovered
A threshold has been imposed to suppress the display of normal behavior. As a result, unusual
behavior is revealed by the patterns formed by the lines
103

Representing connections (relationships) among people,
date, events...
• Increasing interest about the matter
• intelligence analysis
– associated with chart
– timeline chart
– for annotations
– for explaining
• social networks
– facebook visualization
i2 Limited (2006)
a successful story
(now IBM)
104

105

Association chart about African bombing
relationships
106

Timeline chart about Kennedy assassination
(relationships + time)
107

Chord diagrams (relationships)
108

Chord diagrams
relationships + numerical values (size)
109

Minard idea
110

'Opened' chord diagram...
111

And radial on radial...
112

Please do not abuse of radial chart (you can be lost...)
Think
of the
data!
113

Social networks
Social choices of
fourth grade
students
in a school
boys chose boys
girls chose girls
....
114

Social networks
Social choices of
employees in
a department store
during recreational activities
(coffee break)
Data is collected using electronic
badges or videos
115

Reason for interacting:
social networks + color
gender,
ethnicity,
marital status ?
no...
116

Social networks + color
Age!
(blue <30, 30 <yellow <40, red >40)
117

Do not forget physical connection...
118

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
119

Maps & diagrams
B Golf
Swimming
Swimming Golf pool D F
Restaurant
Pool Course
A
A
B C E
C
Hotels G
D
E Restaurant
F
G
A Venn diagram
might help
120

More hotels
Swimming
Golf
pool
Restaurant
121

Cluster maps
Swimming Golf
pool
Restaurant
122

Cluster maps
While Venn
diagrams do
not scale
Cluster Maps does!
Empty?
If a hotel has Gym
it always has another
facility
123

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
124

Tree representation
• Tree are a particularly interesting kind of graphs (a lot of data
relationships have a hierarchical structure)
designated root node
parent of A
sibling of A
A
leaf nodes
child of A
leaf nodes
125

Trees are hard to draw
• They require more horizontal then vertical space
• There exist a lot of proposals for automatically draw
trees (and graphs)
126

A look to the past: 3D trees
• All nodes subordinate to a given node are arranged into a 3D cone
• More compact
• Occlusions: it requires strong interaction support
Note the animation
127

A look to the past: 3D trees
128

A look to the past: 3D trees
A reorientation, more convenient for the textual labelling (note the shadows)
129

Today solution: parent-child relationship A
direct line
Tree maps
B
containment
The Tree
A
B
Formation of the
Tree Map
The Tree Map
130

??
Tree maps
• Slice-and-dice, more suited for including text and images
Tree
Tree Map
131

Tree maps
• Vertical and horizontal alternation
• It is not easy to discern the hierarchy
132

Treemaps styles
very popular
but if the size is
encoding a value
squares perform
poorly...
Slice and dice horizontal
Squarified
Paper
Ordered Treemap Layouts Ben Shneiderman 2001
Treemaps, a space-filling method of visualizing large hierarchical
data sets, are receiving increasing attention. Several algorithms
have been proposed to create more useful displays by controlling
the aspect ratios of the rectangles that make up a treemap. While
these algorithms do improve visibility of small items in a single
layout, they introduce instability over time in the display of
dynamically changing data, and fail to preserve an ordering of the
underlying data. This paper introduces the ordered treemap,
which addresses these two shortcomings. The ordered treemap
algorithm ensures that items near each other in the given order
will be near each other in the treemap layout. Using experimental
evidence from Monte Carlo trials, we show that compared to
other layout algorithms ordered treemaps are more stable while
Slice and dice vertically maintaining relatively favorable aspect ratios of the constituent
rectangles. A second test set uses stock market data.
133

Smartmoney
134

Treemap + color + filtering
135

Hyperbolic browser
• Rescuing (more or less) the tree design
root node
The further away a node is from the root node, the closer it is to its child nodes,
and the area it occupies decreases
The limit is the pixel...
136

Interaction !
(a) The reporting structure of the employees of a company. (b) One employee of
interest, Rachel Anderson, has been moved towards the centre, revealing her
subordinates 137

The Library of Congress
138

Hyperbolic browser original idea
139

Generic Graph
Node-Edges
Mixed
140

Outline
• Data types & data complexity
• Encoding of values
– Univariate data
– Bivariate data
– Trivariate data
– Multidimensional data
• Encoding of relations
• Lines
• Map & Diagrams
• Trees
• Support for design
141

Representation design palettes
change blindness
derived structure
visibility
perceptual issues
derived values
popping out
brushing
Techniques
Concepts
142

Please, start to install SW on your laptop
• Next week we will use
– Python
– Spyder
– Jupyterlab
143