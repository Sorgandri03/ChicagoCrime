Visual Analytics
Giuseppe Santucci
Interaction
9 –
(Human-Computer)
Thanks to John Stasko, Robert Spence, Ross Ihaka,
Marti Hearst, Kent Wittemburg
1

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
2

Interaction
• Static display (all the information pops out by design)
• No physical interaction – No visual analytics or analytics
• All the represented data is presented to the user: interaction is NOT a key issue!
3

Interaction? A classification attempt
Information
space
User intention
Interaction modality
4

First scenario
Classic stepped
menus
Searching for
entertainment
• The represented data is NOT fully
presented to the user
• Information space: discrete
• Interaction: stepped
• Responsive system (<1 sec)
• Easily lost
• No overview
• Long paths to remember...
• That's why old mobile phones were
so hard to use
5

Second
scenario
Looking for
a house (using price)
• The represented data is fully presented to the user
• Information space: discrete (price bin size)
• Interaction: ~stepped – The goal of the interaction is to select a subset of the data
• Responsive system (<0.2 s)
6

Third
scenario
Drinking
a coffee...
• The represented data is NOT fully presented to the user
• Information space: discrete (moving images)
• Interaction: No physical interaction, or passive interaction, unless an
image attracts attention and we move to stepped interaction... video
7

8

Third
scenario - today
Using your iphone
• Information space: discrete
• Notifications
• POP up advices
• ADs
9

Fourth
scenario
Analyzing
an amplifier
•to better understand it
•to optimize a component
• Information space: discrete
• Interaction: continuous (pixel level)
• - the purpose is to analyze the data
• Immediate response (<0.1 sec) 10

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
12

Information space
Continuous Discrete
Information spaces
Two classes of information space
13

Information space & interaction
Continuous
World Wide Web
Stepped
Coffee Table
Notifications
Passive
Composite
Continuous Discrete
Information spaces Interaction modes
Information spaces, interaction modes and examples of their combination
14

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
15

User intention
• Learning
– Explore the information space
• Seeking
– In depth search
• Opportunistic analysis
– what is there?
• Involuntary
– publicity...
16

User intention (by
17

human
Interaction framework
Goal
1. Information space
2. Interaction mode
3. User intent
Form
Evaluation
Intention
We need a general Gulf Gulf
of of
framework for interaction: execution evaluation
Form
Interpretation
Action plan
Norman’s Action Cycle (1988)
Execute
A visual analytics system Perception
Action
must provide the means to perform
all these steps
Change in
World
computer
18

A simple example
Goal
A simple example:
• goal: take a pictorial record of an event
• intention: do it by yourself with a camera Form
Evaluation
Intention
• action plan: select scene and exposure
parameters
Gulf Gulf
• execute: shutter release
of of
• change in the world: the picture exists execution evaluation
Form
• perception: the click from the camera Interpretation
Action plan
• interpretation: done
• evaluation: look at the picture (faster with
digital cameras)
Execute
Perception
Action
In the following we apply these steps to the
different kinds of interactions
Change in
World
19

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
20

Continuous interaction
• It is no a new concept (early applications in statistics in 1969)
• The increased computational power allows for modeling more
complex relations but the principle is the same: the user interacts with
a ~continuous control and the graphic changes
• Let’s recall it with an example from attribute explorer
21

01_v5attributeexplorer.avi

Continuous interaction
• Intention: e.g., to understand which kinds of houses exist in a specific price
range
• Forming an action plan: the application should convey in an intuitive way how
to adjust the upper and lower limits of price (easier than setting exposure
manually on a compact digital camera...)
Goal
Form
Intention Evaluation
Gulf Gulf
of of
execution evaluation
Form
Action plan Interpretation
Execute
Action Perception
Change in
World
One way of reducing the
ambiguity. Mouse-over
indicates possible movement
Mouse-down only, or
mouse-down and drag?
23

Continuous interaction
• Execution: it seems quite straightforward but some tricks can help Goal
– e.g., disregarding y axis mouse movements,
Form
Evaluation
– or allowing cyclic selections on the same x, y coordinates Intention
Gulf Gulf
of of
execution evaluation
Form
Action plan Interpretation
Example: in PowerPoint it is impossible to select the
green circle under this writing Execute
Perception
Action
Change in
World
• The change in the world is the histogram
change and perception (color?) and
evaluation (a counter?) refers to a single
limit adjustment
24

Mental mapping
Evaluation
• A sequence of interactions
allows for forming a mental
Interpretation
mapping
• As an example the user can
Execution Perception
increase continuously the upper
price limit to see what happens Display
change
in the other histograms
• Be aware of change blindness:
animation
• Other helps: some snapshots of EExxeeccuuttiioonn
relevant values DDiissppllaayy cchhaannggee IInntteerrpprreettaattiioonn
PPeerrcceeppttiioonn
ttiimmee
aabboouutt 5500 mmsseecc
25

Continuous interaction
• Continuous interaction can
Treble
generate pre-attentive like
effects
• If two circles suddenly
expand together that
reveals a correlation
Bass
Circles indicate the effect, on some overall circuit property, of variation in the
corresponding component
26

Designing a lamp
a1
S2
• The filament inside a S1
light bulb is sustained
S3
by a structure that has a2
four parameters
rr
– X1=a1
– X2=a2
dd
– X3=dd
– X4=rr
S4
• Four stresses (S1..S4)
are computed for a set
of different structures
27

Histograms interaction
As the range of S4 is moved to higher values, the
corresponding values of S3 move to lower values,
indicating a trade-off
Yellow circles indicate the average
attribute values of objects satisfying all
limits
Histograms showing the stresses
Video12
S1 to S4 calculated for a collection
of designs of a structure
28

Histograms interaction
As the range of S4 is moved to higher values, the
corresponding values of S3 move to lower values,
indicating a trade-off
Yellow circles indicate the average
attribute values of objects satisfying all
limits
Histograms showing the stresses
Video12
S1 to S4 calculated for a collection
of designs of a structure
29

CROSS FILTER ! https://square.github.io/crossfilter/
30

What can be improved here?
Numbers are fare away
Are these bins really empty?
Is this inter-bins selection reasonable?
31

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
32

Stepped
interaction
• The system is not exactly
responsive
• Speed transition is a key
issue
• Exploration refers to
discrete change of view
Stepped interaction involved in a search for entertainment
33

Stepped interaction
• Even in this case the challenge is forming
an action plan
• In each step the user has to decide the
best single movement
• e.g., if the user does not know that “The
Face” is classified as SciFi it might result in
bouncing between a) and b) several times a)
b)
• Most of the effort is, in this case, devoted
to facilitate the navigation
34

Stepped interaction
• Like moving in a physical space the following questions
may arise:
– Where am I?
– Where can I go?
– How do I get there?
– What lies beyond?
– Where can I usefully go?
– How can I retrieve that interesting spot I saw before?
– Where have I been?
• Think of the navigation of a complex Web site...
35

Stepped interaction
• Some useful solutions are exactly the same that are used in
physical situations.
• If the navigation is performed to reach a known unique goal the
activity resembles a wayfinding
• If the movement has the goal of learning the information space
structure that resembles a physical exploration
• If the goal is to find in the most direct manner a specific target it
resembles a pursuit (ricerca)
• Again, a Web site can give a precise idea of these activities
36

Navigational Cue &
Sensitivity
The cloud formed above a invisible
island beyond the horizon provides a
• Navigational cue physical navigational cue
– Where can I go from here?
– How do I get there?
The Minard's map is...
• Sensitivity S=SM,SI denotes
A navigational cue in the
– a single movement (SM) in the
information space
information space and
– a single interaction (SI)
– needed to achieve it
cue = indizio
• Where to go and how!
cue sensitivity
37

Sensitivity Affordance = invito all'uso
where
how
The label ‘cafe’ and the flat plate provide Part of a web page. Each label and surrounding
navigational cues by showing where the grey area indicate that a mouse click on the area
user can go (the cafe) and how they can (SI) will cause movement (SM) to another page
get there (push the door) concerned with the selected type of holiday
affordance is high
I do not like it: interaction(SI)
is not standard...
affordance is not high 38

Sensitivity encoding
Green: satisfying all attribute limits
Black : houses that fail one attribute limit
Gray : houses that fail two attribute limits
White: houses that fail three attribute limits
If we want to move towards houses not satisfying just a parameter we need to include black houses...
39

Sensitivity (SM,SI)
1 2 3 4 5
Number of bedrooms
In a limit positioning tool, colour coding indicates that selection will be unaffected
while the lower limit stays within the white region (no movement in the
information space). When a limit moves into the yellow region selection will be
affected (movement in the information space)
40

Dynamic Query Interface (No sensitivity encoding)
Price
| £0k |     | £50k |     | £100k |
| --- | --- | ---- | --- | ----- |
Number of bedrooms
| 1   | 2   | 3   | 4   | 5   |
| --- | --- | --- | --- | --- |
Journey time
| 0 mins |     | 30 mins |     |     |
| ------ | --- | ------- | --- | --- |
The Dynamic Queries interface. Limits placed on house attributes by a user
leads to the display of houses satisfying those limits on the map
41

Dynamic Query Interface
Three houses which satisfy all limits with the
sole exception of the upper limit on Price
lower upper
limit limit
Price
A possible modification to the Dynamic Queries interface. Houses violating only
one limit are identified, so that sensitivity is explicit rather than having to be
discovered by manual movement of the limits
42

EZChooser
In the EZChooser outline cars are those that satisfy all requirements except one.
Selection of the range immediately underneath an outline car ensures that the
car then satisfies all requirements
That help in deciding the next step!
43

Residue
• What lies beyond?
• Sensitivity only answers the question for the next step
• Adding to a single movement SM the information of what lies beyond
can greatly improve the navigation
• Residue: an indication of distant content in the Single Movement
encoding
• Distant means requiring more than one movement
44

Residue
AAAAnnnniiiimmmmaaaallllssss
EEEEnnnnccccooooddddiiiinnnngggg    ooooffff    SSSSMMMM    aaaannnndddd
|     | MMMMaaaammmmmmmmaaaallllssss |     | BBBBBBBiiiiiiirrrrrrrdddddddsssssss | FFFFFFFiiiiiiissssssshhhhhhh | IIIIIIInnnnnnnssssssseeeeeeeccccccctttttttsssssss |
| --- | ---------------------------- | --- | ----------------------------------- | ---------------------------- | ------------------------------------------------- |
SSSSIIII    ffffoooorrrr    MMMMaaaammmmmmmmaaaallllssss
|     | MMMMaaaammmmmmmmaaaallllssss |     |     |     | Insects |
| --- | ---------------------------- | --- | --- | --- | ------- |
|     | SSSSMMMM                     |     |     |     | SSMM    |
MMMMaaaammmmmmmmaaaallllssss
| CCCCCCCaaaaaaatttttttsssssss BBBBBBBeeeeeeeaaaaaaarrrrrrrsssssss | TTTTTTTiiiiiiigggggggeeeeeeerrrrrrrsssssss | WWWWhhhhaaaalllleeeessss |     |     |     |
| ---------------------------------------------------------------- | ------------------------------------------ | ------------------------ | --- | --- | --- |
CCCCaaaattttssss
SSSSMMMM
Representation of the top two levels of an hierarchically structured menu-based
system providing information about animals
The word Mammals encodes sensitivity AND residue
Obviously it requires specific knowledge (e.g., do not search whales under fish...)
But also a shared understanding of the used words...
45

Science Culture
An experiment
Biology Technology
• 64 words arranged on a binary tree
• several people were asked to
search for a particular word
Medicine Zoology
• Errors were counted
Fish Animal
Freshwater Saltwater
Marlin Sailfish
That part of a 26 menu to be traversed in a successful search for the target word ‘Marlin’
46

Residue is harder to represent at the top levels
40
30
Percent
total
error
20
10
1 2 3 4 5 6
Menu level
Errors made at different levels of a narrow and deep six-level menu in the
search for a target at the lowest level
47

Another experiment
100
h
c
r 90
a
e
s
t
c 80
e
r
r
o
c
70
t
n
e
c
r
e 60
P
50 Paper size?
2 4 8 64 Pages to print?
Number of options displayed at each level
Percentage correct search as a function of menu structure
Broad and shallow menu structure perform better
This is way using old cell phones is so hard....
The same happens with the awful new trend in UI design, inspired by of simplify the interaction offering few
and simple actions at each level....
48

Improving menu efficacy
Example of the provision of an ‘Upcoming’ help field, where samples from the next
lower level help to enhance confidence in the interpretation of the menu options
8-10% errors vs 22-28% error percentage
49

Suggestion for Word
developers
(page to print, page order, scale...)
(print cover page, cover page type, ...)
2022!

Scent (profumo, traccia, pista in Italian)
• When can I go from here?
• Where can I most beneficially go from here?
• Scent: perceived benefit associated with a Single Movement, evaluated
through one or more cues
– high-order cognitive process
– it depends on user's current internal model of the information space
– it depends on the strategy adopted to carry out a task
51

Scent
• where to go
remote content
Residue • how
(= cue encoding
• what lies beyond
remote content)
encoding
SM and SI
sensitivity cues
• next step
• distant content
human interpretation • what's my benefit
Interpreted
sensitivity cues scent
and residues human evaluation
of the benefit of
available SMs
The relation between sensitivity, residue, and scent
52

Scent example
• The value of Y has been measured
for six different values of X. The task
is to find a simple mathematical
function that relates Y to X with
Y
acceptable accuracy
• A statistical package will calculate the
coefficients of the following equation
• It is crucial decide what terms are
significant
• X ?
• X2 ?
• ...
• In the case of y=f(x ,x , x ) the
1 2 3
X
information space is the definition of
the formula:
2 2 2
Y = a + bX1 + cX2 + dX3 + eX1X2 + fX2X3 + gX3X1 + hX1 + jX2 + kX3
53

Scent
The model maker interface
(for people inexperienced in statistics)
SM and SI are encoded by the boxes and circles :
• Gray box are not legal (you have to include all lower terms)
• Black circle included in the model, white circle excluded
• Circle size:
the extent to which including or excluding is beneficial to the fitting process: Scent
• They provide a clear scent of the next steps
• Which term are you likely to include/exclude?
• Note, It is visual analytics, the system recomputes the circles’ size after any interaction....
54

A weighted menu
Personnel
Admin
Research
Sales
Marketing
The size denotes the extent of the data connected to the menu item (residue)
55

Stepped interaction: Where am I ?
It is very easy to get lost:
• Where can I go from here?
• How do I get there?
• What lies beyond
• Where can I usefully go from here?
• Where I have been? I want to go back!
• Two kinds of breadcrumb trails
– path breadcrumbs
– location breadcrumbs
56

Path breadcrumbs
• They represent the user path in the information space
• They represent recent location AND Single Interactions
• They favorite selective retreat, a very common web browsing activity
(60% of WWW activities...)
next links
A representation of history leading to the current location
57

Location breadcrumbs
• Path + structure
Location
structure
User’s
path
Location breadcrumbs (red) provide an awareness of the structure of a site
within which the current location resides
58

selective
retreat
An example of path breadcrumbs within a website
59

A menu with path breadcrumbs!
selective
retreat
Two menu systems investigated by Field and Apperley (1990)
The selective menu performs better (40% accessed pages vs 50%, 63% efficiency vs 50 %)
and gives a better understanding of the database structure
60

Where am I ?
• Where can I go from here?
• What lies beyond
• Where can I usefully go from here?
• Where I have been? I want to go back!
• It applies to complex VA analysis as well
– how to deal with it ?
– Visual breadcrumbs?
– It is stepped/continuous…
61

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
62

Passive interaction
• During a typical use of a visualization tool most of the user's
time is spent in this activity
– observing the screen and being involved in high cognitive processes
• It does not implies a static display
• Static display
– designed to answer a specific question (Minard's map)
– authored by the user
63

Moving displays
• Still passive interaction
• Data driven : the user is
not controlling the
motion
A continuous sequence of
representations of the US dollar –
euro exchange rate
64

Discrepancy between
Controlled Moving displays desired and achieved
quality
| Sketch    | of  the  | ‘cockpit’  |     | of          | a  computer-aided  |             |        |
| --------- | -------- | ---------- | --- | ----------- | ------------------ | ----------- | ------ |
| circuit   | design   | system     |     | supporting  |                    | the  human  |        |
| guidance  | of       | automated  |     | design.     |                    | The         | clock  |
hand rotates in discrete steps to represent the
| iterative   | behaviour  |                    |          | of         | the  | optimization  |      |
| ----------- | ---------- | ------------------ | -------- | ---------- | ---- | ------------- | ---- |
| algorithm.  |            |   Simultaneously,  |          |            | the  | parameter     |      |
| values      | chosen     |                    | by  the  | algorithm  |      | and           | the  |
various performances of the designed circuit
| are  represented,  |     |     | respectively,  |     | by  | the  size  | of  |
| ------------------ | --- | --- | -------------- | --- | --- | ---------- | --- |
the blue bars and red circles. At any time the
| designer  | can  | halt  | the  | algorithm  |     | and  adjust  |     |
| --------- | ---- | ----- | ---- | ---------- | --- | ------------ | --- |
parameter
values
| either  | the  details  |     | of  the  | algorithm  |     | or  certain  |     |
| ------- | ------------- | --- | -------- | ---------- | --- | ------------ | --- |
allowed limits to circuit performance
algorithm's steps
65

GGooaall
Involuntary browsing
at a coffee table
FFFooorrrmmm
EEvvaalluuaattiioonn
IIInnnttteeennntttiiiooonnn
GGuullff
ooff
eevvaalluuaattiioonn
FFFooorrrmmm
IInntteerrpprreettaattiioonn
AAAccctttiiiooonnn ppplllaaannn
EEExxxeeecccuuuttteee
PPeerrcceeppttiioonn
AAAccctttiiiooonnn
CCCChhhhaaaannnnggggeeee iinn
iinnWW WWoorroollddrrlldd
Norman’s Action Cycle for involuntary browsing
66

Interaction with Progressive Visual Analytics
67
A.WA.RE: Advanced Visualization & Visual Analytics REsearch Group @Sapienza

Informed passive interaction - The Telecom case
68

Visual Analytics
Combination of automated analysis techniques with interactive visualizations
to process and analyze the information spaces
“MInosntoanlitthanice Voiussu”a Vl Aisnuaally Atincsa l(yMtiVcAs )(IVA)
Long-running
cycles making the
approach
unfeasible !!!
69

Progressive Visual Analytics (PVA)
When parallel computation and faster CPU are not
enough, PVA addresses the problem producing
• an early partial result, followed by
• a sequence of partial results, till
• a final result
MVA
PVA
Early partial result Sequence of partial results
70
{
Final result

fields sharing the same problem
Online algorithms
VA framework
...
...
DB Algorithms
On line DB aggregation
...
PVA
InfoVis HCI
Modeling Viz pipelines
Interaction techniques
...
...
71

Design goal Unbearabledelay
What do they have all in common? Perceptual update t > 0.1s
Immediate response t > 1s
Unit task completion t > 20-30 s
• An unbearable delay t
Tractable analysis t > days
t
Within analyst life t > hundreds of
unbearable depends on the the task
years
• A problem originating the delay
• A technical solution tricking the problem and producing a sequence of
results with a bearable t' t'<<t → Passive interaction!
t'
• It is not free!
• Some hidden issues to deal with
72

Causes & technical solutions
Main Causes
• Large data sets
• Computational complexity
• Slow connections
• A malign combination of two or more of them!
Main Technical solutions
• Split the data in chunks and process each chunk individually
⇨ Partial results of increasing completeness
• Split the analytical algorithm into computational steps that iteratively
refine previous results
⇨ Partial results of increasing precision
• Or both of them!
73

Main issues
MVA produces just ONE and precise result
MVA
How much can l trust How far am l from the
this result ? final result?
PVA
Approximation and errors introduced by either data
chunking or process chunking
Early, but Fluctuation could
useful? confuse the user
Variability of the convergence and usefulness of the first
result
74

Mitigating Interaction issues 1
How much can l trust How far am l from
this result ? final result?
PVA
Approximation and errors introduced by either
data chunking or process chunking
• Use metrics to measure/estimate
approximation and errors
• Make explicit them to the user, helping him to
better judge results usefulness and
convergence
75

Mitigating issue 2
Early, but Fluctuation could
useful? confuse the user
Variability of the convergence and usefulness of the first result
• Design the production of the first result in a careful way
• Respecting the t' constraints
• Working on highly relevant data
• Preserving the structure of the viz
• Allowing full interaction on it
• Minimize fluctuations impact
• Use animation
• Maintain the context
• Slow down and avoid non relevant changes
• Block user interaction while updating the result
76

An example: The combinatorial Telecom case
Mobile consumers switch from one operator to another based
on the best fares: advertising campaigns are very important
The TIM goal is to locate a campaign target of the 110 Italian
provinces, e.g., the top10 that maximize an objective
function
The objective function uses stored data (e.g., traffic between
𝑛
provinces): it requires the exploration of all combinations
𝑘
110
exploration requires (4)hundreds of years, and the
10
designed solution allows the analyst for interactively
investigate on smaller province subsets
77

An explorative approach – Basic (progressive) VA
110
provinces
user top10
interactive scatterplot Sankey plot
selection
continue interaction Passive interaction
(e.g., 40 provinces)
like it!
do not like it!
done!
go for a background
calculation
78

The problem & the solution
40
T𝐡𝐞 𝐩𝐫𝐨𝐛𝐥𝐞𝐦: enumeration requires about 75 hours, making
10
the explorative analysis not possible: t =20-30 s
max
30 seconds vs 75 hours
t'
The solution: partitioning the user selection and computing the top ten
as the union of local optima allow for fine tuning t'; further partial results
are obtained covering the user selection with increasing size subsets
79

Issue 1 and mitigation
The solution introduces errors and approximation
We defined 2 metrics to make the user aware of
• The first one allows for making decision on the value of a partial result
• The second one allows for estimating the stability of the partial result
• We show them to the user, together with the Sankey plot
How much can l trust How far am l from
this result ? final result?
PVA
80

The metrics drive the progression
81

Issue 2 and mitigation
Partial results oscillate (e.g., a province disappear from the top10 and after some iterations
it is back)
To minimize fluctuation effect:
• We show the top10 highlighting it on the 110 provinces (maintaining the context)
• We use animation along updates
• We block updates while the user interacts with the plot
• We update the viz only if there exist a significant improvement (e.g., 5%)
The first result usefulness is improved by:
• Using all the selected provinces for computing the first top10
• Allocating a slot time of maximum size (30 sec) and compute as many as possible
combinations before presenting the user with the first result
82

Informed passive Interaction
StabilUitys:e 8fu.5ln persosv:i nTchees a
ctual
| Top10 higlighted  | Current objective  | Progress: The PVA  |
| ----------------- | ------------------ | ------------------ |
in the aoctbujaecl ttoivpe  1fu0n wctiilol n is
| on the 110  | function value | application has  |
| ----------- | -------------- | ---------------- |
likely baeb  obuet  i6n7 t%he o f the
| provinces |     | processed 0.02% of the  |
| --------- | --- | ----------------------- |
optimal mreasxuilmt um
possible combinations
83

Old video, without metrics and animations
Passive Interaction (old video without figures and
animation)
84

Informed
Passive
Interaction
For progressive
Visual Analytics
85

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
86

Composite interaction
• Real cases require a mixture of the interaction modalities discussed so far
• E.g. Large data set
– stepped interaction to locate the subset of data
– continuous and passive interaction to explore the subset
– Progressive analysis, partial results
• E.g. Controlling an algorithm behavior
– observing algorithm's step with passive interaction
– stepped interaction to change parameters
87

Back to the lamp design example
Continuous interaction: limits placed on the four stresses S1 to S4 have been brushed into the
parameter histograms, with red designs indicating those which satisfy all limits on S1, S2, S3 and S4
88

Passive interaction - A scatterplot matrix associated with a design involving four parameters.
Red indicates the location of designs that satisfy all performance limits. Yellow defines the
regions within which the designs of a mass-produced design will lie as a result of
manufacturing tolerances on the parameters
89

Several years late….
• Claire Information Retrieval Visual Analytics application
• 3 types of open sources modules
– Stop list (6 different modules)
– Models (17 modules)
– Stemmers (6 modules)
• Across 6 years experiments
• 6x17x6x6= 3672 combinations across 4 categorical attributes
• How to evaluate the performances of these combinations
90

Several years late….
• Claire
91

Outline
• Interaction and scenarios
• Information space and user interaction
• User intention and interaction framework
• Continuous interaction
• Stepped interaction
• Passive interaction
• Composite interaction
• Interaction dynamics
• The last palette
92

Interaction dynamics
With information visualization, Norman’s ‘change in world’ consists of an old
view of data being replaced by a new view
93

Blindness
• Change blindness
• Inattentional blindness
• Animation
• Visual momentum
– presentation structure as
constant as possible
• It is free in d3.js
• But do not abuse of it
94

Presentation
The last palette
95