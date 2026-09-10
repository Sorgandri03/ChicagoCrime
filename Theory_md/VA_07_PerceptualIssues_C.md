Visual Analytics
Giuseppe Santucci
7 – Perceptual issues_C
Thanks to Colin Ware, John Stasko, Robert Spence,
Ross Ihaka, Marti Hearst, Kent Wittemburg
1

Outline
• Visible Light & Eyes
• Luminance
• Hue
• Brightness
• Lightness
• Chromaticity
• Saturation
• Trichromacy and Color Opponent Theory
• Color & Information Visualization
• Pre-attentive processing
2

Outline
• Visible Light & Eyes
• Luminance
• Hue
• Brightness
• Lightness
• Chromaticity
• Saturation
• Trichromacy and Color Opponent Theory
• Color & Information Visualization
• Pre-attentive processing
3

Main learned issues
• Color perception is relative
• Human eyes are sensitive to very small differences
– hence sixteen million colors are needed
• 8 bit encoding of R G B = 24 bit ~ 16 106
• Not sensitive to absolute values
– hence, we can only use ~ 10 colors for coding categories
4

Color --> Classification
Rapid Visual Segmentation
Color helps us to determine type
Only about six main categories
green yellow
pink
white purple
red blue brown
black orange
grey
yellow green
5
a

Color for labeling
• Distinctness
• Unique hue (red, green, yellow, blue, black and white)
• Contrast with background
• Color blindness (mainly red-green direction)
• Conventions
• The bottom line 6 + 6 = 12
11 Colors
for labeling
max 4 for color-blind people
6

Color -> Numbers ?
Color a > color b
> means
- brighter
- more satured
7

Examples of color scales for encoding numbers
• Grayscale
– Convey ordering but exhibits the DOG problem
• Rainbow scale
– Popular, but
• not intuitive ordering
• yellow and green in the middle
• Red-violet at the start and at the end are similar (solved in limited spectrum scale)
• Saturation scale
– Saturation of a color is not generally explicitly controlled
– The saturation scale has the basic advantages of being simple and intuitive
– Its basic weakness is a limited number of distinguishable display levels
• Redundant scales, data values can be mapped to both hue and lightness
– It shows the location of high areas more clearly
– Visually impaired can unambiguously interpreted it
8

An orthogonal consideration: JND
• Just Noticeable Difference (JND)
• The smallest detectable difference between a reference and secondary
level of a particular stimulus
• Very often it is a very good idea to limit the number of used colors to in
a color scale to allow people to better perceive the differences
9

JND+
double
encoding
brightness
hue What is the problem?
How can we improve it ?
Increasing hue & brightness
10

Hue circle is not perceived as increasing stimulus
• But blue-yellow (somewhat) is!
11

Blu-yellow hue plus increasing brightness
brightness
blue-yellow
blue-yellow + brightness
12

Color brewer provides quite good solutions…
13

In any case: Watch the DOG!
14

The revised gravity gray map
15

Outline
• Visible Light & Eyes
• Luminance
• Hue
• Brightness
• Lightness
• Chromaticity
• Saturation
• Trichromacy and Color Opponent Theory
• Color & Information Visualization
• Pre-attentive processing
16

Pre-Attentive Processing
• Some Visual Properties Processed Pre-Attentively
– No need to focus attention nor reasoning
• Pre-Attentive Properties -> Design of representation
– Can be perceived immediately
• < 200 - 250ms
– Eye movements = at least 200ms
– Some processing can be done very quickly
➔ Implies low-level processing in parallel
17

Pre-Attentive Experiment
900
• Number of irrelevant items (distractors) varies
• Pre-attentive 10 msec per item or better.
response
700
time
• Decision = Fixed Time
milliseconds
regardless of the number of distractors
➔ Preattentive
500
3 6 12
Number of distractors
18

Segmentation by Primitive Features
• How many areas ?
19

Pre-Attentive Processing – lightness/saturation/hue
• How many 3s ?
08028085080830802809850-802808
567847298872ty4582020947577200
21789843890r455790456099272188
897594797902855892594573979209
20

Pre-Attentive Channels
• Form
– Orientation
– Size / Length
– Curvature
– Spatial grouping
• Color
– Hue
– Lightness / Saturation
• Motion
– Blinking
– Direction of motion
• Spatial/Position
– 2D position
– Stereoscopic depth
– Convex/concave for shading
21

- Curvature
Pre-Attentive Processing
22

- Shape
Pre-Attentive Processing
23

- Hue
Pre-Attentive Processing
24

- Enclosure
Pre-Attentive Processing
25

Size
Pre-Attentive Processing -
26

Motion
Pre-Attentive Processing -
27

Orientation
Pre-Attentive Processing -
28

Simple shading
Pre-Attentive Processing -
29

Pre-Attentive – Summary
30

Problem solved?
• Not at all!
• Conjunction of pre-attentive features is very
often NOT pre-attentive!
31

Pre-Attentive Conjunctions
• Position + Hue
• Size + Hue
• Position + Shape
• Hue + Motion
• ...
32

Hue+size conjunction (does not pop out)
33

Compound features (do not pop out)
34

Pre-Attentive Demo
• Pre-Attentive Demo by Christopher Healey
• Target = Red square
35

Go!
36

Viewer cannot rapidly and accurately
determine if target (red square) is present or
absent when target has two or more features,
each of which are present in the distractors.
Viewer must search sequentially.
• Target = Red square
Pre-Attentive Demo
• Distractors
– blue squares (hue search)
– red circles (shape search)
– blue circles and red squares (conjunction search)
– ready ?
37

Example: Conjunction of Features
With conjunction encoding the red square is not pre-attentively identified
38

Preattentive Processing
Perception in Visualization:
http://www.csc.ncsu.edu/faculty/healey/PP/ 39

Preattentive
Features
http://www.csc.ncsu.edu/faculty/healey/PP/
40

Integral-Separable Dimensions Theory (Colin Ware)
All features influence each
most integral (bad)
other to some extent but
some more than others. For
instance, if you use color and
size to encode two data
features, the way color is
perceived will be affected by
the size of the object
when encoding different data
attributes with different visual
features, there are good
combinations that make them
more separable, there are
also combinations that make
most separable (good)
them less separable
41

width
Get rectangle of same ?
most integral (bad)
Two variables
are encoded using
width and height
most separable (good)
42

height
Get rectangle of same ?
most integral (bad)
Two variables
are encoded using
width and height
most separable (good)
43

Not so easy...
same height...
same width
44

Much better !
Shape, color, location
Location and color are
more separable than
location, width and height!
45

Cargo cult visualizations! Thanks to Enrico Bertini...
what is
wrong with it?
See discussion here:
http://fellinlovewithdata.com/reflections/demystifying-cargo-cult-visualization-you-cannot-visualize-3-variables-by-mixing-3-colors
46

cargo cult science in a famous lecture … (source
Wikipedia)
• to negatively characterize research in the soft sciences (psychology and
psychiatry in particular) – arguing that they have the semblance of
being scientific, but are missing “a kind of scientific integrity, a principle of
scientific thought that corresponds to a kind of utter honesty”.
47

Cargo cult visualization
• Cargo cult vis is not just junk charts, it’s more insidious. In chart junks
there is “only” the bad or creative use of standard charts in ways that
basically hide the message behind the glitter. But here we have a
more courageous step: a method proposed like if it was new when in fact
it is not new at all and it’s badly executed
• Cargo cult visualization is trying to invent new techniques without
having (or neglecting) any minimal knowledge of the basics
• That’s dangerous and can deceive novices who are interested in
visualization
48

you cannot visualize 3 variables combining 3 hues
• You are on the top of the
scale: most integral!
49

you cannot visualize 3 variables combining 3 colors!
?
?
https://clarle.github.io/yui3/yui/docs/color/rgb-slider.html
50

What are the general implications of all these perceptual
issues in visualization design and use?
PLEASE: remember, at least, the following slides… ☺
51

Highlighting (Pop-Out Effect)
● use pre-attentive features and few separable values (e.g., green and red) to
stand out
Encoding
most integral (bad)
● limit the number of features
● limit number of levels (JND)
● remember perceptive issues (DOG)
● reduce interference among preattentive channels
most separable (good)
52

Representation of Quantitative Information
Visual features can be used to encode quantitative information (to
answer “how much” and greater than questions). For instance ...
. .
0  1  2  3  4   5
Position
| Bar    | Symbol  | Color      |
| ------ | ------- | ---------- |
| Height | Size    | saturation |
How are they perceived? Are they equally effective?
53

Accuracy: Steven's Power Law
S=In
n>1
S
n<1
I
54

Relative Vs. Absolute Judgments
Psychophysics: physical stimulus vs. perceived sensation
Human perception based on relative judgments not absolute readings
of physical stimuli
Perception in most cases is not linear w.r.t the physical stimulus
The same physical stimulus may lead to different perceptions when
context changes
55

Just Noticeable Difference (JND)
"The smallest detectable difference between a starting and
secondary level of a particular stimulus"
Weber's Law
"The just-noticeable difference between two stimuli is
proportional to the magnitude of the stimuli”
The bigger the stimulus the bigger the JND…
56

Example: Weight
57

Just Noticeable Differences
Which one is brighter?
(130,130,130) (140,140,140)
The amount of gray saturation is ~50%
58

Just Noticeable Differences
Which one is brighter?
(250, 250, 250) (240,240,240)
The amount of gray saturation is ~3%
59

Which one is longer?
jl
kj
d
c
B
A
60

Framed
jl
jl
kj
kj
d
d
c
c
B
A
61

Aligned
jl
kj
d
c
A B
62

Why framed and aligned are easier to detect?
Position is more accurate
than length!
jl
jl jl
kj
kj kj
d jl
d d
c kj
c c
d
B B c
A A A B
Weber’s law!
63

| Is A brigther | than | B?  |
| ------------- | ---- | --- |
64

65

A (very) didactical example:
A symbol set for a tactical map
• Aircrafts
• Tanks
• Buildings
• Soldiers
• +
• Stress during decision
• Each item can be classified as friendly or hostile
• Some items exists whose presence is just suspected but not confirmed
• Terrain
66

A symbol set for a tactical map
• Aircrafts Tanks Buildings Soldiers
– Different using pre-attentive shapes
• Each item can be classified as friendly or hostile
– Labeled with two well separable colors and using cultural interpretation
(red=danger)
• Some items exists whose presence is just suspected but not confirmed
– Made different with pre-attentive enclosure
• Terrain
– Rendered through simplified shapes and interpretable colors
67

Example
Building
Aircraft
Soldiers
Tank
Non
confirmed
Friendly
Hostile
River
Plain
Mountain
68

| Association      | Selection Order             | Quantity      |
| ---------------- | --------------------------- | ------------- |
| The marks can    | The marks are The marks are | The marks are |
| be perceived as  | perceived as  perceived as  | perceived as  |
DIFFERENT,ORDEREDPROPORTIONAL
SIMILAR
|     | forming families | to each other |
| --- | ---------------- | ------------- |
Size
Value
Texture
Colour
Orientation
Shape
Interpretation of Bertin’s guidance regarding the suitability of various encoding
methods to support common tasks
69

Position Most accurate
Length
Angle
Slope
Area
Volume
Colour
Least accurate
Density
The relative difficulty of assessing quantitative value as a function of encoding
mechanism, as established by Cleveland and McGill
70

| Quantitative | Ordinal           | Categorical       |
| ------------ | ----------------- | ----------------- |
| Position     | Position          | Position          |
| Length       | Density           | Colour hue        |
| Angle        | Colour saturation | Texture           |
| Slope        | Colour hue        | Connection        |
| Area         | Texture           | Containment       |
| Volume       | Connection        | Density           |
| Density      | Containment       | Colour saturation |
| Shape        | Length            | Shape             |
|              | Angle             | Length            |
Slope
Angle
| Treble | Area   | Slope |
| ------ | ------ | ----- |
|        | Volume | Area  |
Volume
Bass
Mackinlay’s guidance for the encoding of quantitative, ordinal and categorical data
71