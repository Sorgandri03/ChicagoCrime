Visual Analytics
Giuseppe Santucci
5a – Visual Analytics: Application
Domain Based Representations
Thanks to Daniel Keim

Visual Analytics of Anomaly Detection in Large Data Streams
(paper from Daniel Keim group)
 You must monitor a network composed of 8 systems with 16 servers each
 Each server provides basic information
 CPU % occupation
 DISK % occupation
 MEM % occupation
 ...
 That corresponds to 128 temporal data streams (overplotting !!)
CPU %
time

Pixel oriented visualization overview
Slot:
e.g. one
hour
28 days (5 min windows), about 8k observations
Each observation takes a small square →one (representation) or few pixels (presentation)
8 pixels (8 systems) per cell
The color codes the CPU %

Monitoring at server level
The whole system
Color is preattentive!

Histogram + 1 level treemap
Chart(cid:9)Title
400
350
Number
300
250
Of
+
200
vulnerabilities 150
100
Single
50
0 Nodes
1 2 3 4 5 6
size= num
Network
of vulnerabilities
11/4/2025 EuroVA 2011 -31st May -Bergen, Norway 7

Node encoding (7 values)
IP address
size #vulnerabilities
a score
b color environmental
c explotability distribution
d type of node
e temporal trend
Advanced filtering (no guidance)
11/4/2025 EuroVA 2011 -31st May -Bergen, Norway 8

Flipped
Length = number of vulnerabilities in a sub-network
Size = number of vulnerabilities in a node
Special representation for nodes with 0 vulnerabilities
| 11/4/2025 | EuroVA 2011 -31st May -Bergen, Norway | 9   |
| --------- | ------------------------------------- | --- |

Role of analytics within representation phase
We can classify automatic activities in three main groups
1. Deriving new values from the dataset for ad-hoc visualization
• This is the less standard and the more creative part of the process
2. Data reduction / data mining
 Clustering /classification /…
 Sampling
 Dimensionality reduction (coming soon…)
3. Visualization improvement
 Data distribution
 Perceptual issues
 Cognitive issues

By the way: What's wrong with this slide?

The Context
(VA1: understanding the domain)
 Information retrieval (IR) evaluation is an experimental field
 In the last 30 years, large-scale evaluation campaigns have the goal of
assessing the performances of IR engines
 TREC [Text REtrieval Conference] (USA) and CLEF [Cross-Language Evaluation
Forum](Europe)
 Hundreds of research groups
 Producing a huge amount of valuable data to be analyzed, mined, and understood
EuroVA 2011 -31st May-Bergen, Norway 12

The Cranfield methodology
(VA2: understanding the user needs)
 Shared experimental collections :
 To create comparable experiments
 To evaluate their performance
(VA3: understanding the data used in the domain)
 An experimental collection is a triple:
 D is a set of documents
 Q is a set of topics simulating actual user queries
 J is a (hand made!) set of relevance judgments, assigning a
relevance value (0,1,2,3...) to each document for a single query q
i
 0= non relevant, 1= relevant (2= very relevant, etc.)
EuroVA 2011 -31st May -Bergen, Norway 13

Different experiment goals
Given a query q and a set of relevant and not relevant documents
i
 Catch 'em all ! (the relevant ones)
 Precision (only relevant ones) P=9/14≈64%
 Recall (as many as possible) R=9/9 =100%
 Sort 'em all!
Ranking!
 Rank the result to present to the user the most relevant
documents in top position
EuroVA 2011 -31st May -Bergen, Norway 14

Ranking!
 We focus on assessing the ranking quality in the
challenging situation in which the relevance
judgment is not binary
 RANK: = 3 = 2 = 1 = 0
 Our goal is to provide precise indications on:
 Misplaced documents (in the ranked list)
 Quantitative problems rising from such
misplacements
EuroVA 2011 -31st May -Bergen, Norway 15

Modeling the problem
 We use  a judgment function that assigns a value
|     | V   | GT(V) |
| --- | --- | ----- |
[0..k] to each document (0 non relevant, k highest
|     | id1 | 3   |
| --- | --- | --- |
relevance)
|     | id2 | 1   |
| --- | --- | --- |
 We model the retrieved result with a ranked vector V
| of n elements | id3 | 2   |
| ------------- | --- | --- |
|               | id4 | 3   |
 Typical values: k=3, n=200 (out of 1000)
|    | id5 | 2   |
| --- | --- | --- |
The ground truth GT(V[i]) function returns the
relevance values
|     | id6 | 2   |
| --- | --- | --- |
|     | id7 | 3   |
|     | ... | ... |
EuroVA 2011 -31st May -Bergen, Norway 16

(VA4: understanding the analytics used in the domain)
 For the end user, the value of a retrieved document is
GGTT((VV))
associated with its position in the vector (the lower the
33
position the less likely the user will read it)
11
 IR people model it with a discounting function DF that
progressively reduces the relevance of a document GT(V[i])
22
as i increases 33
2
2
2
2
3
3
x=2 impatient users ... x=10 patient users
......
EuroVA 2011 -31st May -Bergen, Norway 17

You know this stuff…
| 11/4/2025 | EuroVA 2011 -31st May -Bergen, Norway | 18  |
| --------- | ------------------------------------- | --- |

Modeling the problem(cont.)
 The overall quality of a result is evaluated using a
Discount Cumulative Gain function:
DCG(V,i)=
 That estimates the information gained by a user that
examines the first i documents of V
 It is a summary measure and hides details
EuroVA 2011 -31st May -Bergen, Norway 19

(VA5: design your own analytics)
 We define the vector O, the optimal permutation of V that
produces the highest DCG for each i
 We define and compute:
 R_Pos, the relative position of documents in V with respect to
their optimal position in O
 Delta_gain(i), the difference of information gain DCG between
V[i] and O[i]
EuroVA 2011 -31st May -Bergen, Norway 20

An example
| The actual result |      |       | The optimal result |      |       |
| ----------------- | ---- | ----- | ------------------ | ---- | ----- |
| GT(V)             | DF   | DCG   | GT(O)              | DF   | DCG   |
| 3                 | 3,00 | 3,00  | 3                  | 3,00 | 3,00  |
| 1                 | 1,00 | 4,00  | 3                  | 3,00 | 6,00  |
| 2                 | 1,26 | 5,26  | 3                  | 1,89 | 7,89  |
| 3                 | 1,50 | 6,76  | 3                  | 1,50 | 9,39  |
| 2                 | 0,86 | 7,62  | 2                  | 0,86 | 10,25 |
| 2                 | 0,77 | 8,40  | 2                  | 0,77 | 11,03 |
| 3                 | 1,07 | 9,47  | 2                  | 0,71 | 11,74 |
| 2                 | 0,67 | 10,13 | 2                  | 0,67 | 12,41 |
| 0                 | 0,00 | 10,13 | 1                  | 0,32 | 12,72 |
| 1                 | 0,30 | 10,43 | 1                  | 0,30 | 13,02 |
| 0                 | 0,00 | 10,43 | 0                  | 0,00 | 13,02 |
| 3                 | 0,84 | 11,27 | 0                  | 0,00 | 13,02 |
EuroVA 2011 -31st May -Bergen, Norway 21

Summarizing the analytics
 Actual result vs optimal result (reordering)
 a metric for showing the difference between actual and optimal at the level of
single document
 a global metric for the quality of a result (actual & optimal)
11/4/2025 EuroVA 2011 -31st May -Bergen, Norway 22

VA6: design the data representation
The actual result
The optimal result
|       |      |      |           | GT(O) | DF   | DCG  |
| ----- | ---- | ---- | --------- | ----- | ---- | ---- |
| GT(V) | DF   | DCG  | DELTAGAIN |       |      |      |
|       |      |      |           | 3     | 3,00 | 3,00 |
| 3     | 3,00 | 3,00 | 0,00      |       |      |      |
|       |      |      |           | 3     | 3,00 | 6,00 |
| 1     | 1,00 | 4,00 | -2,00     |       |      |      |
| 2     | 1,26 | 5,26 | -0,63     | 3     | 1,89 | 7,89 |
OK OK
| 3   | 1,50 | 6,76 | 0,00 | 3   | 1,50 | 9,39 |
| --- | ---- | ---- | ---- | --- | ---- | ---- |
ABOVE LOSS
| 2   | 0,86 | 7,62 | 0,00 | 2   | 0,86 | 10,25 |
| --- | ---- | ---- | ---- | --- | ---- | ----- |
BELOW GAIN
| 2   | 0,77 | 8,40  | 0,00  | 2   | 0,77 | 11,03 |
| --- | ---- | ----- | ----- | --- | ---- | ----- |
|     |      |       |       | 2   | 0,71 | 11,74 |
| 3   | 1,07 | 9,47  | 0,36  |     |      |       |
|     |      |       |       | 2   | 0,67 | 12,41 |
| 2   | 0,67 | 10,13 | 0,00  |     |      |       |
|     |      |       |       | 1   | 0,32 | 12,72 |
| 0   | 0,00 | 10,13 | -0,32 |     |      |       |
|     |      |       |       | 1   | 0,30 | 13,02 |
| 1   | 0,30 | 10,43 | 0,00  |     |      |       |
|     |      |       |       | 0   | 0,00 | 13,02 |
| 0   | 0,00 | 10,43 | 0,00  |     |      |       |
|     |      |       |       | 0   | 0,00 | 13,02 |
| 3   | 0,84 | 11,27 | 0,84  |     |      |       |
EuroVA 2011 -31st May -Bergen, Norway 23

Representation=
Data (Data position and rank) + Derived data:
Misplacement
(color)
Delta Gain (color)
Computed using
DCG and R_Pos
EuroVA2011 -31st May-Bergen, Norway 24

(V7: design the presentation)
do you remember
pixel oriented visualizations?
EuroVA 2011 -31st May -Bergen, Norway 25

(VA8: validate the solution w.r.t. user task)
Good ranking, bad Bad ranking, good
precision and recall precision and recall
EuroVA 2011 -31st May -Bergen, Norway 26

Followed VA steps
1. understand the domain
2. understand the user needs
3. understand the data used in the domain
4. understand the analytics used in the domain
5. design your own analytics
6. design the data representation
7. design the data presentation
8. validate the result with real users
11/4/2025 EuroVA 2011 -31st May -Bergen, Norway 27

A new mantra Overview first,
zoom/filter,
Infovis
details on demand
Ben Shneiderman (1989)
Analyse first,
show the important,
zoom/filter,
analyse further,
details on demand.
Daniel Keim (2006)
Visual Analytics
11/4/2025 EuroVA 2011 -31st May -Bergen, Norway 28

Deriving new values from the
dataset for ad-hoc visualization
 How to visually compare J. London and M. Twain books ?
 [D. A. Keim and D. Oelke. Literature Fingerprinting: A New Method for Visual Literary Analysis.
2007 IEEE Symp. on Visual Analytics Science and Technology (VAST '07) ]
1. Split the book in several text blocks (e.g., pages, paragraph, sentences)
2. Measure, for each text block, a relevant feature (e.g., average sentence
length, word usage, etc. )
3. Associate the relevant feature to a visual attribute (e.g., color)
4. Visualize it

J.London vs M.Twain average sentence lengths

User interaction (a non uniform book?)

Details of a book

What about the Bible?

Role of analytics within representation phase
We can classify automatic activities in three main groups
1. Deriving new values from the dataset for ad-hoc visualization
• This is the less standard and the more creative part of the process
2. Data reduction / data mining
 Clustering /classification /…
 Sampling
 Dimensionality reduction
3. Visualization improvement w.r.t. issues coming from
 Data distribution
 Perceptual aspects
 Cognitive aspects
 ...

Problem
A very basic Infovis activity (representation):
   mapping ND data values (e.g., number of different data densities, city populations, area
densities) to a visual attribute with NL levels (e.g., different color codes, bar heights, circle
radius)
Note that the visual levels of a presented visual attributes are always finite
But, for perception issues, also the represented levels might be finite
And we need metrics to control and assess the proces
|     | D = {d | , ... , d | }   |
| --- | ------ | --------- | --- |
|     |        | 1         | ND  |
?
| VisualAttribute = {c |     | , ... , c | }   |
| -------------------- | --- | --------- | --- |
|                      |     | 1         | NL  |
We discuss the matter in the already tickled context of  2D scatter plot
density maps
37

Perceptual examples
The heights of the bars,
presentation scale, are 100
pixels, 99 pixels, 98 pixels, …
A user is not able to perceive
a difference below 1mm so
m
the representation scale is 6,
c
6
5.9, 5.8, etc.
11/4/2025 38

Note The perception of the
difference is affected by the
choice of the selected
encoding…
Same bars …
Details about
that in next classes…
11/4/2025 39

Are numerical density differences adequate?
100 sample areas
97 contain 25 pixels
3 contains 38 pixels
Which ones ?
8th July 2005 IV 2005 -Greenwich 40

Perceptual studies: the user test
 What is the smallest difference in
pixels between two sample areas that
produce the perception of density
difference?
• Generic step:
– images with 100 sample areas
– 97 with the same number of pixels
(basis)
– 3 filled with extra (delta) pixels
– the user has to recognize the three
more dense areas
• repeat for different basis and
deltas
8th July 2005 IV 2005 -Greenwich 41

Perceptual studies: does the
distance matters?
No!
| 8th July 2005 | IV 2005 -Greenwich | 42  |
| ------------- | ------------------ | --- |

Perceptual studies: result
 we use a subset of the
available represented density
 for 8x8 sample areas we use
14 out of 64 represented
densities
8th July 2005 IV 2005 -Greenwich 43

Image degradation due to point collisions
44

4 data items
are plotted on Density maps
the same
pixel:d=4
A 2D scatter plot
With density map
(to cope with point collisions)
empty we can map the
pixel
density values
to a 256 levels
gray or color scale
8x8 pixels
In the example we borrow the Keim&Kriegel [KK95] color scale,
presenting a monotonically increasing brightness
45

The case study (Infovis contest 2005)
 About 60,000 USA companies plotted on an 800x450 (360,000
pixels) scatter plot
 ND=126 distinct density values (collisions on the same pixel)
ranging on [1..1633]
 N =7042 active pixels (i.e., hosting at least one company):
AP
 2526 pixels (36%) host exactly one company (d=1)
 1182 pixels (17%) host two companies (d=2)
 ...
 1 pixel (0.0001 %) hosts 1633 companies (d=1633)
46

What is the source of the problem?
 The choice of the right mapping is crucial, because the density
frequency distribution presents a very skewed behaviour
36%
r
e
b 17%
l
e m
x
u
i
P n
0.001%
1633
Density (126 distinct values)
47

A (quick) parenthesis
 This is not by chance: very often 2D scatter plots exhibit a skewed frequency
distribution
48

The mapping
ND=126 different data densities = { 1, 2, … , 1633 }
?
NL=256 Color codes = { 0,1, 2, … , 255}
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 49

Outline
 The problem
 Available solutions
 Linear mapping
 Non linear mappings
 Our proposal
 Metrics and discussion
 Conclusions and future work
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 50

 
d −d
Linear mapping ColorCode(d) = Round 255 min 
 d −d 
 max min 
min-max
normalization
TF
•Straightforward solution
•Useless in this situation

Most pixels share very low color codes

Few color codes are used (46 out of 256)

Different low density values are represented
by the same color code:
densities in [1..10] are mapped on codes {1,2}
Color code frequency distribution
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 51

Density function mapping
 j DN (d ) 
ColorCode(d ) = Round 255  AP i 
j
N

i=1 AP

TF
•mapping each density d to a color value
j
proportional to the percentage of pixels having a
density equal or less than d
j
•similar to histogram equalization

Few color codes are used (39 out of 256)

Lowest color code unnecessarily high

Codes ranging only on [91.. 255]

Different high-density values are
represented by the same color code:
densities in [48..1633] -> [250,255]
Color code frequency distribution
52

 The problem
 Available solutions
 Our proposal
 Rationale
 Uniform scale mapping
 Visual comparison
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 53

Rationale
We take into account that:
1. densities and color codes are discrete and finite
2. too close color codes are hardly distinguishable!
3. we need some objective quality metrics to
validate/drive the mapping
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 54

Uniform scale mapping
| We use  a reduced color scale, e.g., with 15 levels (N |     |     |     |     |     | =15) |     |
| ------------------------------------------------------ | --- | --- | --- | --- | --- | ---- | --- |
L
| 0 18 | 36 55 | 73 91 | 109 128 | 146 164 | 182 200 | 219 237 | 255 |
| ---- | ----- | ----- | ------- | ------- | ------- | ------- | --- |
This implies that different density values will be necessarily represented by the same
color code: to reduce the degradation the mapping is performed through an algorithm that
tries to assign to each color the same number of pixels
Number of active points
N
L
…
|     | c c | c   | c   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
|     | 1   | 2 3 | NL  |     |     |     |     |
Target color code frequency distribution
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 55

uniform scale mapping
ColorCode(d ) = DistributePixels
j
Because of densities are
discrete the algorithm
cannot ensure the
N /N value and
AP L
through a peak analysis
it minimizes the variance

Full color scale usage [0..255]

All the color codes are used

Maximum color code separation
Color code frequency distribution
56

Visual comparison
Linear mapping Density function mapping
Eurovis 2007 - 23-25 May - Norrköping, Uniform scale mapping
Sweden 57

Visual comparison
Density function
mapping
Linear mapping
Uniform scale mapping
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 58

Metrics
N =Number  of used color levels
UL
1. ColoscaleUsage: How many
| color codes is the mapping  | C =N | /N   |
| --------------------------- | ---- | ---- |
|                             | sU   | UL L |
using (percentage)?
| 2. ColorscaleActiveRange: What  |     | C −C |
| ------------------------------- | --- | ---- |
N 1
|     | CsAR = | UL  |
| --- | ------ | --- |
part of the color scale range is
C −C
max min
the mapping using
(percentage)?
3. ColorSeparation: How
N
UL (c −c )
distinguishable are the used
i i−1
|              | CS = i=2 |      |
| ------------ | -------- | ---- |
| color codes? |          | N −1 |
UL
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 59

Postal parcels plotted by weight (x) and volume (y)
A well known dataset…
Eurovis 2007 - 23-25 May - Norrköping,
Sweden 60

Grey scale
Linear Density
Function
CsU=0.53
CsAR=1 CsU=0.18
CS=2.83 CsAR=0.62
CS=5.23
Uniform
color sc.
CsU=1
CsAR=1
CS=8.79
61

That’s all (folks), thanks…
Questions?
• For people still warring about the three denser areas....
| 8th July 2005 | IV 2005 -Greenwich | 62  |
| ------------- | ------------------ | --- |