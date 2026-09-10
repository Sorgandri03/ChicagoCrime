Visual Analytics

Giuseppe Santucci

2 – Visualizing numbers -
Introduction

Thanks to Ross Ihaka

1

Outline

• An introductive example
• Good and bad graphs

2

•
•

Number visualization ?
Information visualization is, in general, about numbers
In some cases, however, the numerical values and their
relationships are the main focus of the visualization, and the use
of tables, graphs and other visual means to communicate
quantitative information is commonplace in business today (pie
charts, diagrams, boxplots, scatterplots, etc.)

• Actual software applications allows for easy (?) development of

•

different typologies of charts
I will discuss the basic relationships and the logical steps that allow
for moving from (few) quantitative data to suitable visualizations

3

A starting example : a lotto game

•

Lotto games are played world-wide and many people
have theories about how to make money at the game

• User task ? ---> Money !!!

• We will examine a lotto game, to see whether it might

be possible to play it profitably

•

The game we’ll look at is the daily pick-it lottery run by
the state of New Jersey in the USA

4

Lotto rules

• Each player selects a number between 000 and 999

• The winning number is selected by independently picking

three digits between 0 and 9 at random

• All players that hold the winning number split the prize

money for the game: the size of the prize depends on the
number of players who choose the winning number

5

Available data

• The results of the games (winning number and winning

amount) are publicly available

• We will use the results of 254 consecutive games to look for

a profitable strategy

• A sample of the data is on Classroom: LottoData.xls

6

The data (254 values, 100 shown)
(winning number, winning amount)

•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•
•

(810, $190.0), (156, $120.5), (140, $285.5), (542, $184.0), (507, $384.5),
(972, $324.5), (431, $114.0), (981, $506.5), (865, $290.0), (499, $869.5),
(020, $668.5), (123, $83.0), (356, $188.0), (015, $449.0), (011, $289.5),
(160, $212.0), (507, $466.0), (779, $548.5), (286, $260.0), (268, $300.5),
(698, $556.5), (640, $371.5), (136, $112.5), (854, $254.5), (069, $368.0),
(199, $510.0), (413, $102.0), (192, $206.5), (602, $261.5), (987, $361.0),
(112, $167.5), (245, $187.0), (174, $146.5), (913, $205.0), (828, $348.5),
(539, $283.5), (434, $447.0), (357, $102.5), (178, $219.0), (198, $292.5),
(406, $343.0), (079, $332.5), (034, $532.5), (089, $445.5), (257, $127.0),
(662, $557.5), (524, $203.5), (809, $373.5), (527, $142.0), (257, $230.5),
(008, $482.5), (446, $512.5), (440, $330.0), (781, $273.0), (615, $171.0),
(231, $178.0), (580, $463.5), (987, $476.0), (391, $290.0), (267, $176.0),
(808, $195.0), (258, $159.5), (479, $296.0), (516, $177.5), (964, $406.0),
(742, $182.0), (537, $164.5), (275, $137.0), (112, $191.0), (230, $298.0),
(310, $110.0), (335, $353.0), (238, $192.5), (294, $308.5), (854, $287.0),
(309, $203.5), (026, $377.5), (960, $211.5), (200, $342.0), (604, $259.0),
(841, $231.0), (659, $348.0), (735, $159.0), (105, $130.5), (254, $176.0),
(117, $128.5), (751, $159.0), (781, $290.0), (937, $335.0), (020, $514.0),
(348, $191.0), (653, $304.5), (410, $167.0), (468, $257.0), (077, $640.0),
(921, $142.0), (314, $146.0), (683, $356.0), (000, $96.0), (963, $295.0),

7

Available data

• Does this data contain information which will enable us to

choose a profitable strategy for this game?

• Using which method?
• Viz?
• Statistics?
• Data mining?
• Opinion?

8

Let's attack visually the problem

• Assume that you have to play (I typically don't)
• Basically, you have to select a number
• Which kind of analysis could you apply to discover whether some

numbers are better than others
• Better means "MORE MONEY"

– silly question? It is not...
– and it is "problem solving". You need to analyze data, discover insights...

• Suggested techniques:

– Scatterplots
– Histograms (estimate frequency probability)
– Boxplots (summarize sample distribution)

9

Scatterplots

data values? encoding?

10

Histograms (frequency distribution over bins)

bin or bucket

data values? encoding?

11

Excel and histograms

12

Boxplot

data values? encoding?

13

13Boxplotdata values? encoding?Go!

• Think of one or more simple number visualizations
• Structure of the visualization (data values)
• Purpose: kind of insights that the visualization can produce

14

Visualizing the data

• Humans can only make sense of three or four numbers at a time

• By representing the values in a graphical form, we make it easier to

handle large numbers of values

• Using visualizations should make it possible to learn more about this

data

• We have NOT to lie or make noise !!!

15

User task and visualization

• One approach to making money at “Pick It” is to try to select numbers which

are more likely to win
– This is why casinos change the roulette wheel on regular basis...

• Since we have data on the winning numbers, we can look at the distribution of
the winning numbers and see whether some values are more likely to produce
a win than others
– ranges of, considering that the three digits are selected independently

• One way to do this is to produce a histogram of the winning numbers

16

Data distribution (considering the highest digit XYZ)

What can we
infer from this
histogram?

Opinions?

By the way, is the bin size ok?

17

Analysis

•

It looks there are more winning numbers in the region from 200 to 300
than in other regions

• This suggests that we might be best to choose numbers in this range,

i.e., numbers starting by 2

18

19

25.4

20

Better number visualization

mean

• Variance analysis AND visualization

21

Conclusions and new task

• Winning numbers are totally random (according to the actual sample...)

•

It makes no sense to look for a "lucky"  number

• However, we can change our task:

– to increase the won amount !

• So, we study the distribution of winning amounts

22

New visualization

mean

23

Looking for new insights

• The histogram shows that there is a wide (more than 2) range amounts won

in the game

• The winning amount does not follow a flat distribution (according to the sample)

•

It might be possible to choose the numbers which win larger amounts

• We search for relationship between ticket number and winning amount

• A scatter plot is the natural way to look for such a relationship

24

A new visualization

Insights?

mean

25

Insights from the scatterplot

•

•

The winning amounts in the band to the left of the plot appear to
generally be higher than those in the rest of the plot
There are some outliers in the top band

• High and low winning amounts seem to be distributed along the

•

whole number range 000-999
That pushes to investigate the number structure, e.g., separating the
numbers into groups according to the first digit of the number...

• Which vis ?

26

Lottery's boxplots

mean

27

28

High and low winning numbers (number lookup)

29

Lotto strategy !!!!!

• While winning numbers are non predictable, players' choices are!

• Choose numbers which are less likely to be chosen by other players

• Then, when you win (if), you will likely win more

• Possible ways to choose:

– Choose a number with a leading zero

– Choose a number with two repeated digits

– Avoid “obvious” numbers like, e.g., 000, 123, 246, . . .

I’ll bet on 077...

30

31

Outline

• An introductive example
• Good and bad graphs

32

Informal approach

•

In this lecture we will try to set down some basic rules for drawing good
graphs

• We will do this by showing that violating the rules produces bad graphs

• Next lectures will cover these issues in a more formal way

33

Rule 0

• Do not use diagrams when handling few numbers

•

It does not make sense to use graphs to display very small
amounts of data

• The human brain is quite capable of grasping one two, or even

three values

34

Rule 0 violation (and rule 2 too)
and meaningless example (9 people in queue?)

35

Rule 0 violation

Male     60%
Female 40%

36

Role 1

• Insure data quality / significance

• Graphs are only as good as the data they display

• No amount of creativity can produce a good graph from dubious or non

relevant data

37

Role 1 violation

And having two
scales is not a
good idea 

38

Role 1 violation (and rule 0 too)

Not very significant data but a very good example of distortion

39

0100000000200000000300000000400000000500000000600000000700000000800000000MeThe rest of the worldSeries1Rule 2:
Insure chart simplicity

• Graphs should be no more complex than the data which they

portray

• Unnecessary complexity can be introduced by

•

•

irrelevant decorations
useless colors
3d effects
...

–
–
–
–
They are collectively known as “chart junk”

For a very comprehensive set of chart junk effects look at
Microsoft Excel
–

 the more recent the version the larger the set of chart junk !

40

Age structure of College enrollment
(percentage of enrolled people above 25 years)

Role 2 violation
(and also rule 3)
• A very good bad example!

•

 Only 5 (!) numbers on it but
– 4 meaningless colors
– useless 3D
– useless y axis split
– confusing and wrong visual attributes (size)
– confusing 100-% on the top (Pareto diagram)
– odd interpolation

• Designers of this graph are now working in
the Microsoft Excel team, inspiring the new
Excel versions ...

American Education Magazine

41

E.g. type of
Sw errors

42

Same data...
but still wrong ...

43

Missing origin !

44

051015202530354019701971197219731974197519761977Chart Title051015202530354019701971197219731974197519761977Chart Title45

Same data... (Best solution, it does not suggest intermediate values...)

But bar thickness is
wrong...
It might push toward
comparing areas
(coming soon)

46

Rule 2 violation

47

Rule 2 violation

48

Role 2 violation

• Why 3D?
• The extra dimension used in this

graph has confused even the person
who created it..

The Washington Post, 1979

49

The same data...

50

Role 3

• Do not distort data in a confusing way

• Graphs should not provide a distorted picture of the values they portray

• Distortion can be either deliberate or accidental

• Of course, it could be useful to know how to produce a graph which

bends the truth...

51

Role 3 violation

• At a very quick glance:

– balanced faculty population
– most male students
• What is wrong with this

graph?

• The X scale is logarithmic!

52

The truth : population size

53

The truth : female /male ratio

54

In other cases distortion is ok...

55

The lie factor

• The visual pioneer Ed Tufte of Yale University has defined a “lie factor” as a

measure of the amount of distortion in a graph

• The lie factor is defined to be:

• Lie Factor = size of effect in graphic / size of effect in data

•

If the lie factor of a graph is greater than 1, the graph is exaggerating the data

effect

•

If the lie factor of a graph is lower than 1, the graph is minimizing the data effect

56

Measuring distortion through the lie factor

Graph effect = 5.3/0.6=8.8

Data effect = 27.5/18=1.52

Lie Factor = 8.8/1.52 = 5.8

57

The same data with lie factor = 1

58

Common Sources of Distortion

• The use of image perspective  is a common source of distortions in

graphs

• Another common source is the inappropriate (or deliberate?) use of

linear scaling when using area or volume to represent values

59

Distortion through non linear volumes

d

kd

V1 = d3

V2 = k3d3

Graph effect = V2/V1 = k3d3/d3 = k3
Data effect    = kd/d    = k
Lie Factor = k3/k = k2

Lie Factor =  Data effect2

Data effect=(13.34/2.41)=5.5 Viz effect= 167
Lie factor = 5.52 = 30 (With cylinders it is less and depends on the aspect ratio)

60

The same data

73  74  75  76  77  78   79

Do you perceive a 5.5/1 ratio?

61

Distortion through areas (Washington post, 1978)

1

0.94

0.83

0.64

0.46

d

kd

Data effect    = kd/d    = k
Graph effect = A2/A1 = k2d2/d2 = k2
Lie Factor = k2/k = k

Lie factor =  Data effect

Is the bottom dollar roughly
half the size of the top one?

62

The same data with lie factor=1

Note that in a histogram you are
visually comparing lengths, not areas

This is why it
is better to use
thin bars...

63

Encoding numerical values

• Human beings are much better in comparing lengths than

areas or volumes

d1 d2

d1/d2 =
?

v1

v2

V1/V2 = ?

• So, using volume or area instead of length is wrong!
• Or it is an intentional lie!

64

Distortion (deliberate?)

What's wrong
with this graph?

A part of the
chart junk

65

Presented data

It suggests
a linear trend

What is wrong
with it?

66

Real data...

The time scale
was not uniform!

Now the exponential
trend is clear

67

Other ways to lie (Tufte/Graphical Integrity)

68

Other ways to lie (Tufte/Graphical Integrity)

69

One of the best graph lie...

• The cover story, "Why does

college have to cost so much?"
shows a large graph
superimposed on a scene from
the Cornell campus. There are
two jagged lines running
across the graph
– "Cornell's Tuition"  = MONEY
– "Cornell's Ranking"=

QUALITY

• The Tuition graph shows a

steady rise, and the ranking
graph, after some early
meandering, plummets to an
all time low.

• The clear impression is that

students are paying more for
far less

• What is wrong with it?

70

The lie

• More careful reading of the whole article (buried several pages into the paper) reveals

a different story:
(1) The ranking graph covers an 11 year period, the tuition graph 35 years, yet they are shown

simultaneously (the same apparent width) on the same horizontal "scale".

(2) The vertical scale for tuition and ranking could not possibly have common units, but the

ranking graph is placed under the tuition graph creating the impression that cost exceeds
quality.

(3) And here is the masterstroke: the sharp "drop" in the ranking graph over the past few years

actually represents the fact that Cornell's rank has IMPROVED from 15th TO 6th ...

71

The real data

72

Summarizing

If the “story” is simple, keep it simple
If the “story” is complex, make it look simple

•
•
• Tell the truth – don’t distort the data

– (at least not by chance)

73

