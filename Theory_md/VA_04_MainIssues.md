Visual Analytics
Giuseppe Santucci
Overture : a bad story
4 - Main issues : , , how
what why
Thanks to John Stasko, Robert Spence, Ross Ihaka,
Marti Hearst, Kent Wittemburg
1

Outline
• A bad story (rising the attention on correct tables/graphs)
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
– Old fashioned example
2

The 1986 Challenger disaster
• The Space Shuttle Challenger exploded shortly after take-off in January 1986.
Subsequent investigation determined that the cause was the failure of the O-ring
seals used to isolate the fuel supply from burning gases
-2 C°
http://www.math.yorku.ca/SCS/Gallery/
3

The Challenger disaster
• NASA staff was aware of possible o-ring failures and had analysed the data, plotting ambient
temperature and number and locations of O-ring failures on test rockets
• A lot of faxes were around the day before the lunch, trying to show an inverse correlation between
temperature and o-ring failures
• But they had excluded observations where no O-rings failed, believing that they were uninformative
• Even if the recommendation was clear (but embedded in a lot of useless details…)
12 C°
4

Disaster was no a surprise!
5

Weak data presentation and visualization (?)
6

What was the knowledge to show?
(viz /table for explaining…)
7

??
8

Bad infovis/number viz continued during the investigation
• The figure shows o-ring failures at different launch temperatures collected by NASA before 1986 (24 flights)
http://www.math.yorku.ca/SCS/Gallery/
9

Legend on the next page...
Exam warning
Missing legend ?
-1 !
http://www.math.yorku.ca/SCS/Gallery/
10

Bad infovis/number viz continued during the investigation
• The figure shows o-ring failures at different launch temperatures collected by NASA before 1986 (24 flights)
http://www.math.yorku.ca/SCS/Gallery/
11

The visualization of the fax data
during the investigation
• Making decisions also on fax data was not easy (and engineers were under pressure...)
They perceived a risk for low temperature but they were no able to quantify it nor to
convince NASA managers! They failed to explain!
• So, the political decision was: GO!
• And visualizations during investigation were bad as well...
12

The whole data (scatterplot correlation, 24 points)
31° F No failure
Failure on any
above 75° F
flight below 65° F
13

The Challenger disaster
• Reanalysis of the O-ring data using a regression model. This provides a predicted
extrapolation (black curve) of the probability of failure to the low (31° F - 0.5° C)
temperature at the time of the launch and confidence bands on that extrapolation
(red curves). There's not much data at low temperatures (the confidence band is
quite wide), but the predicted probability of failure is uncomfortably high (80%)
• Would you take a ride on Challenger when the weather is so cold?
14

The Challenger disaster
• It is perhaps unreasonable to expect that a sophisticated statistical analysis
of the data should have been carried out, given the time pressure for a launch
/ no-launch decision
• Nevertheless, it is of interest to ask whether a better graph might have better
explained that something could be wrong
• Likely, the following graph should have caused any engineers or managers to
conclude that there were excessive risks associated with low temperatures
15

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
• A case study (Explorative: We do not know the answer)
16

Issues to take into account designing an Infovis application
• Different Infovis applications share common concepts, like user task, data, etc.
• This lecture will introduce them using a running example
• A very common Infovis application is a system that allows the user to select
one item to buy (☺); we use, as a running example, a system that allows to buy
a used car
– Note that, in this case, the data cardinality is not very high, it is the
combination of the options (model, price, age, fuel consumption, etc.) that
makes it a complex activity and comparing, e.g., even 50 cars is not so easy
17

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
• A case study (Explorative: We do not know the answer)
18

Task, subtask, & problem
• The running example task is to search for a used car within a
predefined (not necessarily very large) set
• This task can be abstracted as: select a subset of “interesting”
objects within a (even large) collection
• N.B.: There exist completely different tasks, like:
– There is a correlation between x and y?
– There are “strange” data items ( a Rolls Royce for just 100 Euros ?)
– …
19

Task, subtask, & problem
• Obviously, to perform the main task, some, additional, subtasks are needed
• The most important one is to gain insights into a collection:
– Ah ah, this seller has only very old cars;
– Ah ah, there is not the information about cars’ HP;
– Ah ah, the price range is [10k .. 33k];
– …
• The idea is: in order to make a decision on a set, we have to understand
some set “characteristics”
– At a global level (overview)
– At the object level (details)
20

Task, subtask, & problem
• … select a subset of “interesting” objects within a (even large) collection
• What does “interesting” mean?
• We witness, very often, a lack of precision
– Nice looking car ?
– Inexpensive ?
– …
• Or for other tasks
– I’m looking for suspicious people passing the USA border…
– Strange DNA patterns…
• Very often “a problem is formulated as it is being solved” (Schon, 1983)”
• In order to cope with vague problems we have to provide for a high degree
of interactivity
21

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
• A case study (Explorative: We do not know the answer)
22

Data
• Roughly speaking we can assume that our data is a table of “abstract data”
• This is a very common assumption in Infovis
• Complexity rises from the number of attributes and the number of rows
– AS index=number of rows x number of colums ...
• The car dataset is as follows
Miles per gallon
|     | Price (£) |     | Rating | Age (yrs) |
| --- | --------- | --- | ------ | --------- |
Make
MPG
| Ford  |        | 31  |       | 3   |
| ----- | ------ | --- | ----- | --- |
|       | 15,450 |     | ***** |     |
|       | 12,450 | 27  |       | 4   |
| Chevy |        |     | ***   |     |
23

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
24

Representation & Presentation
8
1
• The first step is to encode data values to visual attributes in an infinite -
6
1
resolution space
8
1
• We will detail this activity in the next lectures
-
6
1
• Here we assume to use a common representation method, the bargrams
4
1
(a partition of the data set encoding the size)
-
2 1
Data set is partitioned through the 8
1
values of an attribute (intervals, or 4 1 -
2
- 6 1
Ratio scale bins, on a ordinal/interval/ratio/ 2 1 1
attribute scale or categorical values of a
-
0 1
nominal scale)
k
£ 2 1
Price £k 10 - 12 12 - 14 16 - 18
e c
i r P k
-
0 1 4 1
-
2 1
£
e
c
{ i r P 2 1
-
0
1
Basically it is a flipped hystogram
Size proportional to the cardinality of k
£
What is the advantage of flipping it?
the subset e
Conversely, what is the drawback? c
i
r
P
25

Representation for vague goals
| •     | Nice looking car??? |         |         |         |
| ----- | ------------------- | ------- | ------- | ------- |
| •     | Bargrams + pictures |         |         |         |
| Price | £k                  | 10 - 12 | 12 - 14 | 16 - 18 |
26

Representation & Presentation
• The chosen representation is presented on the screen
• Limitations in time and space may require to adapt the representation
• Usual techniques (e.g., scrollbars) may partially solve the problem
| 30  |     | 35  | 40  |
| --- | --- | --- | --- |
MPG
Price £k
| 10 - 12 | 1122 --  1144 |     | 16 - 18 |
| ------- | ------------- | --- | ------- |
27

Presentation
• Several presentation techniques use zoom/distortion to better solve space
limitations
• Here we use a techniques called “semantic zoom”: the enlarged zone
presents details that are not available at all elsewhere
• Also the not zoomed areas still convey visual information
age
rec’n
HP
MPG
3030 35 40
Price £k
10 - 12 12 - 14 16 - 18
12 - 14
make
color
taxed
cond’n
28

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
29

Overview
• Bargrams allow for presenting a data overview
– Qualitative awareness of one aspect
– Quickly (even better, pre-attentively)
• Half of the cars consume 30 MPG !
• Price ranges in 10k-18k and ~ half of the cars cost 16k-18k
age
rec’n
HP
MPG
3030 35 40
Price £k
10 - 12 12 - 14 16 - 18
12 - 14
make
color
taxed
cond’n
30

Interactive object/attribute selection
• Beside overview a means is needed for selecting single items
Price £k
10 - 12 12 - 14 16 - 18
• Icons positioned above a bargram represent individual cars
• Selecting a single item allows for accessing details and
managing single objects
31

Interactive object/attribute selection
Price £k
10 - 12 12 - 14 16 - 18
• Interaction and pre-attentive coding allow for
exploring single items in efficient way
• Showing at the same time multiple attributes
32

Outline
• Types of Symbolic Displays (what)
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
33

Filtering
• A system for suppressing not relevant data is required
• For instance it is possible to focus only on a specific price range
? Ambiguity !
34

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
35

Significant objects
• To simplify the exploration of the data set and taking into account the user task it is
useful to mark/define some significant objects (e.g.,whish list)
• Significant means
– Mmm, interesting, I’ll look at it again…
– This is my ideal car!
– …
• Also comparison among significant objects (not presented here)
12 - 14
12 - 14
An icon above a bargram can represent an ‘ideal’
A car that is potentially of interest
(and possibly nonexistent) car to act as a point of
and worth remembering can be
reference
‘tagged’ for later re-examination
The system can compute how existing cars are far
form the ideal one (Visual Analytics)
36

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
37

Navigational guidance
Select *
From cars
Where price<16 AND MPG > 35 AND Color=“Red”
….. NO cars ! or 2000 cars...
So what?
In general, it should be posssible to restrict/enlarge the selection
38

Navigational guidance
What if questions:
• what if I have 1k more to spend?
• what if I can bear a lower MPG?
•...
Obviously such questions can be answered changing the filtering option on price, including more expensive
cars
But that must be done again for each new what if question:
•what if I decide to consider a lower MPG ?
A very helpful solution is to make the user aware that some potential items are around, e.g., showing items
that does not satisfy only one requirement
MPG 30 35 40
Price £k
10 - 12 1122 -- 1144 16 - 18
39

Outline
• Issues to take into account designing an Infovis application
– Task, subtasks, & problem (why)
– Data (how)
– Representation & Presentation (how)
– Overview & interactive object/attribute selection (how)
– Filtering (how)
– Significant/reference data (how)
– Navigational guidance (how)
– Movement in the information space (how)
40

Movement in the information space
What is the main difference between Minard’s visualizations and this system?
| MPG | 30  | 35  | 40  |
| --- | --- | --- | --- |
?
| Price £k | 10 - 12 1122  --  1144 | 16 - 18 |     |
| -------- | ---------------------- | ------- | --- |
Interaction!
Computers allows for changing, switching, filtering, arranging, tagging, etc.
This is a key issue!
41

Demo
42

Summarizing
HIGHER-ORDER
COGNITIVE
PROCESSES
REPRESENTATION of data
Problem (re)formulation
Evaluation of options
DATA
Strategy formulation
PRESENTATION of the
PERCEPTION Internal modelling
represented data
INTERPRETATION etc.
Decision making
INTERACTION to select
the required view of data
Spence’s book Ware’s book
43