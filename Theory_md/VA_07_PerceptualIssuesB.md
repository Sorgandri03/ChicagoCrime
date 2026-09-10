Visual Analytics

Giuseppe Santucci

7 – Perceptual issues - B

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
• Luminance http://cie.co.at/e-ilv
• Hue
• Brightness
• Lightness (color brightness)
• Chromaticity
• Saturation
• Trichromacy and Color Opponent Theory
• Color & Information Visualization
• Pre-attentive processing

3

Luminance

17-711 luminance (in a given direction, at a given point of a real or
imaginary surface)

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

•

It is the density of luminous intensity with respect to a projected area in It
is based on luminous flux that includes V(𝜆) perceptive correction

• But we do not still perceive luminance in a linear way!
• Beside light frequency already used in the luminous intensity computation

– it is not perceived in a linear way and
– the non-linearity depends also on source dimension!

4

The CIE V(λ) function

• The CIE (Commision Internationale de L’Eclairage)

standardized the V(λ) function (averaging 200 people)

Perceived power= ∫ Vλ E λ  λ

5

Practical usage of luminance

• Text/background contrast: ISO and W3C specify a minimum level of

luminance difference (1:3)

6

Hue (perceptual value)

17-542  hue:  attribute  of  a  visual  perception  according  to
which  an  area  appears  to  be  similar  to  one  of  the  colours:
red,  yellow,  green,  and  blue,  or  to  a  combination  of
adjacent pairs of these colours considered in a closed ring

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

red

blue

yellow

green

yellowish green
greenish blue
bluish red
yellowish red

gialloverde
verdeblu
rossoblu
giallorosso

Why red, yellow, green, blue?
And what about
reddish green (rossoverde)?
yellowish blue (gialloblu)?

7

Brightness (perceived luminance)

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

• 17-111 brightness : attribute of a visual perception according to which an area appears to emit, or

reflect, more or less light

• Brightness refers to the perceived amount of light coming from a source of light (reflected or

•

generated)
It is not linear with luminance and the usage of the magnitude estimation technique is quite popular:
– Subjects are asked to indicate when a perceived sensation is twice then a reference one
– Most physical sensations follow a simple power law: S=aIn
– S is the sensation, a is a constant and the stimulus intensity I is raised to a power n (typically n<1)

• For large source of light (>5 degrees) the law is: Brightness = Luminance0.333

– to duplicate the perceived brightness, it is needed to increase luminance by an 8 factor
• For point sources of light (e.g., stars or scatterplot points ) the law is: Brightness = Luminance0.5
– to duplicate the perceived brightness, it is needed to increase luminance by a 4 factor

8

An old well-known example : star magnitude

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

• by Ipparco, ~200 BC  and published ☺ by Tolomeo 350 years later
• Magnitude 1   :   the brightest star visible in the sky  (Sirio)
• Magnitude 2   :   stars showing ½ brightness of magnitude 1
• ….
• Magnitude 6 :  the faintest stars that are visible at naked eyes 1/64 th
•

Ipparco et al.  star classification has been recently revised:
– Magnitude 6 is now 100 times less bright of 1 not 64 times
– So, the real brightness ratio between two consecutive magnitudes was about 2.5
– But they did not have computers and photometers…

9

Monitor gamma ?

• Most visualizations are produced on a monitor

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

• Nowadays computer allows for setting the gamma value (ranging from 1.4 to 3.0)

• The relationship between physical luminance L and voltage V is:

L=V

• A gamma value close to 3  L=V compensates the Brightness/Luminance law

Brightness = Luminance0.333 = V

resulting in a display characterized by a linear relationship between voltage and  brightness

10

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

Monitor illumination and gamma

• Monitor are not used in dark rooms
•

In normal usage about 15 – 40% of light
comes from the ambient light A and not
from the monitor

• We can take that in account adding a
constant to the gamma equation:

B

L=A+V

•

In such a case a better linear relationship
between brightness B and V is obtained
with a lower gamma

V

11

Lightness (perceived color brightness)

Lightness refers to the perceived reflectance of a colour surface

17-680 lightness (of a related colour): brightness of an area judged relative to the
brightness of a similarly illuminated area that appears to be white or highly transmitting.
It's the degree of a color's proximity to white (lightest) or black (darkest) and is also known
as value or luminosity.
•
• White surfaces reflect about 90% of the light striking them. They are light
•
•

Black surfaces reflect about 3%. They are dark
In colorimetry and color theory, lightness is the perception of a color
brightness. It is one of the color appearance parameters of any color appearance
model and in some cases it is is called with different names (e.g., value in the Munsell
color model)

White, max

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

• Some adaptive mechanism of the vision system allow for perceiving colors  in a

constant way:

– A black object in a sunny day reflects about 1000 candelas per square
– The same object in an office light reflects 50 candelas per square

•

It is still perceived as black

– A white paper in the same office reflects less light than the black object in the sun

•

It is still perceived as white

Black, min

Each row exhibits the same lightness

12

Chromaticity

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

17-144 chromaticity: property of a colour stimulus defined by its 3
chromaticity coordinates, or by its dominant or complementary wavelength
and purity taken together
17-145 chromaticity coordinates ratio of each of a set of 3 tristimulus
values to their sum

These concepts refer to the proportion of three coordinates chromaticy
coordinates (e.g., Red, Green, and Blue)

13

Saturation

17-1136 saturation:
colourfulness of an area judged in proportion to its brightness

0%

0% (grayscale) to pure color (100%)

100%

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

NOTE: For given viewing conditions and at luminance levels within the range of
photopic vision, a colour stimulus of a given chromaticity exhibits approximately
constant saturation for all luminance levels, except when the brightness is very high

14

Saturation

Luminance
Hue
Brightness

Lightness
Chromaticity
Saturation

• Saturation is a measure of a color's intensity or purity. It refers to how vivid a
color is, with high saturation meaning a pure, bright color and low saturation
meaning a muted, grayed-down color
It is one of the three main properties of color, alongside hue (the color name) and
lightness

•

• High saturation: A color appears bright, vivid, and pure. At 100 % saturation, the

color is completely pure, with no gray added

• Low saturation: A color appears dull, muted, and closer to gray
• A color with 0 % saturation is a shade of gray
• Reducing saturation: Saturation can be decreased by adding gray or black, which

mutes the color. In digital contexts, this is often a scale from 0% to 100%

15

Adaptation

• The iris of the eye opens and closes, modulating the incoming light
• More significant: the photo pigment in cone and rods is bleached under
high light and eyes became less sensitive (rods are totally inactive)
– When moving from strong light to dark photo pigment is regenerated, but it takes time
– That’s way entering in a dark room from a sunny day makes you blind for several

seconds

– The fully regeneration process takes up to 30 minutes (as star observers perfectly

know…)

• Some cognitive mechanisms preserve color perception
• So, the eye is not a photometer at all !!!

16

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

17

Trichromacy and Color Opponent Theory
Why red, green, and blue (RGB) and yellow?
And why a color like reddish green does not exist?

18

Trichromacy Theory

• We have 3 kinds of cones, sensible to different

wavelengths LMS (Long, Medium, Short)
• That’s is the reason why we generate colors

using three primaries (e.g., RGB)

• Chickens have 12 kinds of cone and chiken
engineers will become crazy in designing a
monitor with 12 colored phosphors

• LMS cones spectral
sensitivity curves

19

Color blindness

• About 7% of the male population and 1% of female population suffer from some

color vision deficiency

• That correspond to a lack of one (most cases) of the three receptors
• A better comprehension of the matter allows for designing systems usable by

both trichromats and dichromats

Missing S

Missing M

Missing L

Color simulation

20

Color opponent process theory

• The Hearing idea (1920) is that there are only 6 elementary colors arranged in three pairs

– Black-White (luminance channel)
– Red-Green
– Yellow-Blue

21

Scientific evidence

• Naming: yellowish green or greenish blue are often used;

reddish green or yellowish blue NOT

• Cross-cultural naming:  an anthropological study on more than
100 languages shows that color naming definition order is the
same as follows

Hue

22

awhiteblackgreenyellowgreenbluebrownpinkpurpleorangegreyredyellowNow you know why...

23

Color measurement

• We are able to match any pure color C
(single wavelength)  with an additive
mixture of no more than three hues (called
primaries)

C Ξ rR+gG+bB
• Where Ξ  denotes that the equation refers

to a perceptual match
• Color appearance or Hue
• Two different spectral color distributions

look the same (metameres) if they
stimulate the three cones in the same way

• No physical reason but perceptual

G+B
+R

R G B

24

Change of primaries

• The amount of RGB required to “generate” a color has been determined
by CIE through several experiments performed in 1931 that produced
several standards

• The problem with RGB is that they are not able to cover all the

perceivable colors and different primaries have been chosen for that

• Moreover the RGB standard is device-oriented and hard to use

25

Alternative color spaces

RGB          HSV            HLS

• RGB device-oriented color spaces => not easy to use
• Ease of use is enhanced with cylindrical color spaces directly handling

color attributes such as hue, saturation and value (lightness) (HSV) and
hue, lightness, and saturation (HLS)

• Easier to understand and interact with, but they have no connections

with human color perception

26

Examples of problems in HLS (for viz people...)

Same lightness

Same hue distance

Same lightness distance

27

The CIE X,Y, and Z color space

• CIE selected three abstract primaries able to represent a wide

color space that includes the visible color gamut (in gray)

28

The normalized CIE X,Y, and Z

• Setting x+y+z=1, i.e., normalizing with respect

luminance it becomes a 2D space
• Colors on the border  are “pure” colors
• The white has x=y=z=0.333
• The distance from white point gives the color

saturation

• The triangle represent the RGB space
• Given two colors, all the colors given by their

mixture lie on the connecting line
It is easy to specify a set of three primaries on it

•
• The complementary of a color is produced by

drawing a line between that color and the white
and extrapolating to the opposite locus. The
mixture of the two colors produces white

29

The CIE LUV (perceptually uniform)
a simple-to-computw transformation of the CIE XYZ color
space
The distance between colors can be measured since the
color spaces are roughly uniform
Natural (but not trivial) choice for controlling colours
within a program
L = Lightness
U = red – green axis     (opponent style coordinate)
V = blue – yellow axis   (opponent style coordinate)

Perceptually uniform (distances ≈ perceived differences)

30

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

31

