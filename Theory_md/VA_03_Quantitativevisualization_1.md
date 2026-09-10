Visual Analytics
Giuseppe Santucci
3 – Visualizing quantitative
Information
Thanks to Stephen Few
1

Outline
• New ideas about good and bad graphs
• Purpose of the graph
• Meaning of numbers
• Tables and graphs
2

An example
• You are a manager of a big company
• You need to control and report investors, every Monday, the current state of quarterly sales
in the Americas, Asia, and Europe, with the goal of verifying your forecast (explanation)
• Someone presents you with this graph
• Are you happy with it?
• Think how to design something that is more informative for your job
3

All the needed information
(and additional support to the task)
2003 Q1-to-date Regional Sales - Elapsed quarter: 83%
March 15th 2003
Sales ($) Planned Q1 sales ($) Linear projection Actual progress
| Americas | 469384 | 586730 | 549179 | 0.80 |
| -------- | ------ | ------ | ------ | ---- |
| Europe   | 273854 | 353272 | 320409 | 0.78 |
| Asia     | 34847  | 43210  | 40771  | 0.81 |
1. Units !
2. The actual date and quarter progress (task!)!
3. Some additional summarizing information (sales progress)
4. Planned sales vs actual sales (according to the task!)
5. Linear forecast
4

A better quantitative visualization
(even with Excel...)
5

Comparison is a frequent numerical task!
6

Comparing with other products
Is it ok?
Perceptual
(color)
and
HCI
(recognition rather than recall)
issues
The focus is the comparison
of your product:
• vs others
• on 6 months
Better approach ?
7

Better visual
comparison!
Above
Baseline
Below
8

Comparison percentage!
Eventually supported by Excel !!!!
My(cid:9)product(cid:9)vs.(cid:9)RoundTuits(cid:9)
300 %
250 %
Competitor's
200 % mean
150 %
slicer
100 %
dicers
50 %
%
0
Jul Aug Sep Oct Nov Dec
9

Multiple comparison percentage!
Not supported by Excel
Slicer Dicers vs 3 competitors
%
%
%
%
slicer
%
dicers
%
%
10

Be careful! Are these the same?
Slicer Dicers vs 3 competitors
slicer
dicers
10000
20000
11

Overall
12

Another example of comparison: our
company against the world!
• What is the purpose
of this chart?
• What is wrong with it?
13

Even worst : 3D!!!
14

Issues
• Is the order clear?
• Which one is my
company?
• Who is bigger between
G and A?
15

16

At least most of them...
17

A better solution
G
If you have ordering (ranking) alternatives think about that!
18

Why do I hate pie-charts?
The relative difficulty of assessing quantitative value as a function of visual
encoding mechanism, as established by Cleveland and McGill (1984) and
restated on 2010
Position Most accurate
Length
Angle
Slope
Area
Pie-charts discards the two first choices
Volume
I do NOT see ANY reasons to use them
Colour
Least accurate
Density
19

What about visual quantitative comparison?
Use position and length
Avoid angles
Avoid areas
Avoid volumes
Use color density carefully
20

Position
• It works fine
21

Length?
• The lookup of precise number might be difficult if the
position is not evident (e.g., stacked bar chart)
?
40
20
? 220
180
It makes sense to explicitly add figures
22

Length?
• Length is fine as well
Automatically produced
The reality,
by Excel
use the full scale range
(I do not like it…)
23

Areas: some new surprising issues
• Human being are very bad in estimating area ratios
• What is the ratio A/B between this two circles?
25% 35% 40% 45% 50% 55% 60% 70% ?
• What is the shape that produces the biggest error?
• The square!
• Perceptual Guidelines for Creating Rectangular Treemaps (Nicholas Kong et al., Infovis 2010)
24

Colors for numerical data
• Someone already thought how to associate quantitative values to
colors and different choices are available
• Do not reinvent the wheel
• The rainbow scale does not work!!!
• It is a very common error (I did it as well, 35 years ago...)
rainbow scale
HSI color model
(Keim and Kriegel) - Issues in visualizing large databases.
Proc. of the IFIP working conference on Visual database Systems, 1995
25

Colors for categorical data
• Colors are fine with categorical data
• Do not reinvent the wheel (again)
• There are only 6 elementary colors arranged in three pairs
• black-white
• red-green
• yellow-blue
• That gives us up to 12 (6+6) colors easily distinguishable (11!)
26

colorbrewer2.org (little demo)
Do not use colors in a random way!
27

Some new considerations
• Chartjunk is not the unique enemy...
• Before PCs building graphs was a matter of paper and pencil
– requiring time and effort
– pushing you to better understand :
• the meaning of numbers
• the graph purpose
• the graph organization
• …
• now, with Excel you can produce graphs so fast that you can lose control...
– you select predefined solutions
– you might not understand how the graph is built (row, columns, headings, ...)
– you can make mistakes (e.g., missing the top row, the origin ...)
28

So...
1. Look at the numbers and at the task
2. Plan a graph (even on the paper!), considering perceptual
issues and additional math (mean, variance, etc.)
3. Look for an Excel implementation of your design
4. If 3 fails, proceed without Excel ! Or modify it!
My(cid:9)product(cid:9)vs.(cid:9)RoundTuits(cid:9)
300
mean
250
200
150
slicer
100 dicers
50
0
Jul Aug Sep Oct Nov Dec
29

Outline
• New ideas about good and bad graphs
• Meaning of numbers
• Tables and graphs
30

Types of Data (rough classification)
• Quantitative
(allows arithmetic operations)
- 123, 29.56, …
• Categorical (group, identify & organize; no arithmetic but they give a structure to the graph!)
– Nominal (name only, no ordering)
• North, East, South, West
– Ordinal (ordered, not measurable)
• First, second, third …
• Hot, warm, cold
– Interval (starts out as quantitative, but it is made categorical by subdividing into ordered ranges)
• 0-999, 1000-4999, 5000-9999, 10000-19999, …
• bins in a frequency histogram
– Hierarchical (successive inclusion)
• Region: Continent > Country > State > City
• Animal > Mammal > Horse
• Numbers are spatially arranged on a chart using relationships among data
31

Number →Category Relationships → spatial organization
Quantitative information Relationship
Unit of products sold per Sales count related to
geographical region geography
Expenses by department and Expenses related to
month organizational structure and
time
The number of students that Frequency distribution by bins
got one of the possible exam
grade or grade range
Numbers Categories
32

Relationship between categories and numbers
Quantitative (y axis) vs 2 categorical data (x axis and colors)
An order exists among Q1..Q4...
33

Relationship between numbers and numbers
• Quantitative vs quantitative data
34

Nominal relationship
Region Sales
North 50,000
South 20,000
East 40,000
West 20,000
Total 130,000
• Order is not relevant
– Be aware of some artificial orders (conventional/ alphabetical order)
– Maintain consistence across different graphs
• Just divides up and arranges the quantitative values
35

Ordinal relationship (the order is in the category)
Production office Sales
First office (1977) 50,000
Second office (2000) 20,000
Third office (2005) 40,000
Total 110,000
• Order is relevant
• Altering it is not a good idea
36

Interval (bins) relationship
| Order size | Count | Sum |
| ---------- | ----- | --- |
2000785
| [0, 1000)      | 25  |             |
| -------------- | --- | ----------- |
| [1000, 2000)   | 19  | 20086356256 |
| [2000, 3000)   | 13  | 134555      |
700005254
| [3000, 4000) | 14  |     |
| ------------ | --- | --- |
• Several equal intervals (bins) covering the whole range
– Frequency distribution (count)
– Other math's (sum of values, mean, etc.)
– You can order any of the columns
37

Time series relationship
| Dept      | Jan    | Feb    | Mar    | Qtotal  |
| --------- | ------ | ------ | ------ | ------- |
| Marketing | 83,883 | 98,883 | 95,939 | 273,655 |
| Sales     | 38,838 | 39,848 | 39,488 | 118,174 |
Months, quarters, etc., are predefined time bins
38

Hierarchical relationships
• Multiple categories, closely related to each other as
separate levels in a ranked arrangement
• Commonly used in tables to arrange quantitative
information (e.g., OLAP, On-Line Analytical Processing)
• http://www.tableausoftware.com/products/desktop
39