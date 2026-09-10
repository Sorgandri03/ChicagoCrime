Visual Analytics
Giuseppe Santucci
7 – Perceptual issues
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

Visible light and pure colors
• Let’s start with the basic stuff : the visible light (for human beings)
• It is a tiny part of the whole spectrum
• The usual unit is the nanometer, 10-9 m, and the visible range is from 400 (violet) to 700 nm (red)
• Light consisting of a single wavelength is monochromatic light, which looks to the eye as a pure color
high frequency low frequency
3

Light sources
• Usual light sources are not monochromatic and are characterized
by their spectral power distribution
Sun spectral power distributions
4

Light, objects, and perceived colors
• Perceived color of an object depends on
1. The light source,
2. the properties of visual system, and
3. how the light interacts with the object
• Light can be
– Refracted and then transmitted through it (if the object is transparent, like our cornea)
– Absorbed by it (transforming in to heat)
– Scattered inside the object if it is not completely transparent, because of the collision of photons
with the molecules of the object (like sunlight scattering in the atmosphere)
– Reflected
• Color = reflected light (same of light source) + scattered (depends on the object) +
cognitive bias
5

The eye
• it is like a camera (focal length = 17 mm)
– or is a camera like the eye?
• high resolution only in the very little fovea area
• two basic sensors rods (bastoncelli) and cones (coni)
Rods work only
Cones work with high light
in low light
Photopic vision
Black and white
Colors
Disabled with day light
About 100.000
cones in the
fovea
180 cones per
degree
6

Chromatic aberration
• Different wavelengths are focused at different distance
– refraction depends on wavelength
• If we use in the same image two far pure colors the eye is not able to focus both of them
Red text is closer
then
blue text
7

Visual angle (degrees, minutes, seconds)
=2 arctan (h/2d)
1 cm tall object viewed at 57 cm has 1 degree angle
57 cm is a good approximation of the distance at which we view a computer monitor
That roughly corresponds to the fovea visual angle
8

Simple acuity
• Acuity : ability to see
details (pixels should
be below our acuity)
degrees, minutes, seconds
° ' ''
9

Acuity falls off rapidly from fovea
100
80
60
40
20
| 50 30             | 10 10  | 30 50 |
| ----------------- | ------ | ----- |
| DistancefromFovea | (deg.) |       |
10

Luminance spatial modulation
| 𝐶𝑜𝑛𝑡𝑟𝑎𝑠𝑡 | = (𝐿𝑚𝑎𝑥 | − 𝐿𝑚𝑖𝑛)/(𝐿𝑚𝑎𝑥 | + 𝐿𝑚𝑖𝑛) |
| -------- | ------- | ------------- | ------- |
11

Luminance L?
• The jargon used by people dealing with light and color is very complex and
often used in a confused way
– We need to refer to perceived stimuli
• The CIE (Commission Internationale de L’Eclarage) has published in 2011
the Standard CIE S 017/E:2011 ILV: International Lighting Vocabulary
(www.cie.co.at/publications/international-lighting-vocabulary)
– It contains 1448 entries ! → https://cie.co.at/e-ilv
• Luminance is a a physical value (measurable using a photometer)
• Do not relax, most of the relevant concepts refer to perceived stimuli and
numerical values must be adapted using human eyes behaviour
12

Radiant flux, luminous flux, luminous intensity, illuminance, luminance
objective data
• Luminous flux is the human eyes
perception (V ) of the radiant flux that a
ƛ
light source emits, integrated over the
entire angular span of the light. The unit is
the lumen (perceptive unit)
• Luminous intensity is the density of a
luminous flux in a given direction, i.e., a
solid angle (steradian). The unit is candela
(lumens/steradian)
• Illuminance refers to the density of
luminous flux that shines onto a real or
imaginary surface, measured in lumens per
square meter (lumens/m2), also called lux
SI: International System of Units
13

1 Lux ?
• The area subtended by 1 steradian at 1 meter distance is 1 m2
• One lux is the light flux from a candela entering 1 m2 from 1 meter of
distance
• Modern definition of candela:
The definition in the SI Brochure is: "The candela, symbol cd, is the SI unit of
luminous intensity in a given direction. It is defined by taking the fixed
numerical value of the luminous efficacy of monochromatic radiation of
frequency 540 × 1012 Hz
14

Luminance
• It is the density of luminous intensity with respect to a projected area in a specified
direction at a specified point on a real or imaginary surface
• Its unit is candelas/m2 or nits (same stuff, but used in different contexts)
– The light flux from a candela entering 1 m2 from 1 meter of distance
• CIE note: the definition of luminance can be thought of as dividing a real or imaginary
surface into an infinite number of infinitesimally small surfaces which can be considered
as point sources, each of which has a specific luminous intensity, I , in the specified
v
direction. The luminance of the surface is then the integral of these luminance elements
over the whole surface
• It is useful to characterize the luminous intensity emitted or reflected from a surface
• You can measure luminance with a photometer
15

How we do perceive luminance
spatial modulation ?
| 𝐶𝑜𝑛𝑡𝑟𝑎𝑠𝑡 | = (𝐿𝑚𝑎𝑥 | − 𝐿𝑚𝑖𝑛)/(𝐿𝑚𝑎𝑥 | + 𝐿𝑚𝑖𝑛) |
| -------- | ------- | ------------- | ------- |
16

Spatial contrast sensitivity
how we do perceive luminance differences
Contrast
This allowed for
producing poor monitors
with high difference
in luminance that
is not perceived
(center till 30 % brighter
than borders)
Spatial Freq (1/⍵)
2 8 16 32 60
We need high contrast for both low and high frequencies
The perceived frequency depends on the view distance (and age )
17

The optimal display
• A modern display has about 40 pixels per cm (~100 dpi)
• 1 cm at 57 cm of view corresponds to 1 degree
• The fovea is equipped with 180 cones per degree and we are are able to
distinguish about 60 cycles per degree
• And (sampling theory) we need to sample at twice so, 120 pixels per cm should be
enough (~300 dpi) dpi=dots per inch
• A monitor should be be about 4000x4000
• We are still (a little bit) far away (4k =3840×2160) from a monitor as good as our
eyes
• So why we have laser printers capable of 1200 dots per inch (460 dots per
centimeter)?
18

1200 dpi laser printer ?
• Aliasing. From a fundamental theorem of signal transmission we know that
we have to sample a signal at least twice the highest frequency
• Aliasing occurs when we sample a regular pattern by another regular
pattern at different frequency
Cones in
the fovea
follow non
regular
patterns
19

1200 dpi laser printer can help
• Antialiasing Computing the average of the light pattern can mitigate the
problem in a cost-effective way than simply increasing the pixel number
• It requires additional computation that further increases with colors
20

Superacuity and displays
• Vernier acuity applies also at monitor lines
• Appropriate antialising techniques result in a Vernier acuity better
than pixel resolution !
Vernier Super Acuity = 15 sec vs 30 sec pixel separation
21

1200 dpi laser needed for gray !
• The dots of a laser print are either black or white
• So, a pixel is made of several dots:
– A 16x16 dots matrix can implement a pixel with 256 gray levels
• Square pixels are not used (aliasing again)
• Patterns of dots are randomized
• A 1200 dpi laser print is 1200 dpi only for pure black &
white
• For a gray image it scales to about 120 dpi or less
22

Back to receptive fields
• Receptive field Disregarding several details we can concentrate on
the visual area that responds to the light intensity, i.e., luminance
If the light is on the center If the light is on the border
the corresponding neuronal the corresponding neuronal
activity increases activity decreases
The receptive field is inhibited
by lateral light
23

Maximum: the center is
illuminated and the border The DOG function
is in the dark
• This is typically described with a
Minimum: the center is
Difference Of Gaussians (DOG)
dark and the border is function
illuminated • One Gaussian represent the center
– Increasing the stimulus
It is a perfect edge
• The other one the border
detection function! -
– Decreasing the stimulus
+
24

A proof
25

More inhibition Less inhibition
26

Consequences to be aware of
(DOG)
• Simultaneous Brightness Contrast
27

Consequences to be aware of (DOG)
• Simultaneous Brightness Contrast
28

Consequences to be aware of (DOG)
• Simultaneous Brightness Contrast
Watch the DOG !
29

Gray coding + Simultaneous Brightness
Contrast
can produce very large errors!
30

Consequences to be aware of (DOG)
• The Chevreul illusion
Adjacent pattern of different intensity create edges
31

A perfect edge detection !
32

Cornsweet effect
• Suitable shading creates edges and difference in lightness
• What is the darker side?
33

Cornsweet effect
• No one…
34

Be aware of DOG
35

Be aware of DOG
36

Be aware of or use it, like Seurat !
37