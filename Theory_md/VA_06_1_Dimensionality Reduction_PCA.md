Visual Analytics
Giuseppe Santucci
Dimensionality reduction_1
How to represent multidimensional data and
PCA (folders a,b,c,d)
Thanks to Enrico Bertini
1

Outline
• Motivations
• PCA (Principal Component Analysis)
• MDS (Multidimensional Scaling)
• t-SNE (t-distributed Stochastic Neighbor Embedding)
• Comparison
2

2D (cured) scatterplots are great for data distribution,
visual analysis, and for triggering interaction!
3

How do we deal with and represent and
visualize multidimensional (>3D) data?
• Ideally, we would like to see relationships between data items in the
multidimensional Rn space n>>3 (here we focus on numeric data)
– clusters, trends, outliers, data distribution, etc...
• 3D scatterplots are hard to use
• 4D scatterplots do not exist
• Most visualization techniques allow for visualizing a very limited number of
variables
4

Parallel coordinates, 3D scatterplot, SPLOM, ...
Mathematics
Sport Physics
Chemistry Literature
History
Art
Geography
5

Focusing on proximity Data
• Sometimes we want to visualize data in a way that reveals similarity
between data objects and provides clues about distribution and
clusters
• The first, intuitive source of similarity is the Euclidean distance
– but also, cosine similarity, i.e., proportionality, should be considered
• We need a visual representation that allows us to say “these objects
are similar” or say data is here and there (more complex)
• Clusters, similarity, and outliers (trends)
6

Proximity in the Car Data Set ?
7

Proximity in the R13 Wine Data Set?
The labeled clusters tale…
8

Running example: the wine dataset
• We have 3 labeled ‘clusters’
(producers 0,1,2)
• Are the 3 subset of the data
REAL cluster in R13?
• And,if yes, how to show them to
the user?
• Most of the actual solutions try
to force the labeled sets to 2D
clusters
– Using the notion of similarity
• Even if they are not real
clusters…
– New research trends try to attack
this issues
This is just 3D. What about 13D?
9

Similarity
• The notion of similarity is crucial
• In some cases, it’s straightforward:
e.g., values of the car data set: Euclidean distance
– (What about non numerical attribute?)
• In other cases, similarity can be defined according to some data
analysis (vs. Euclidean distance):
– similarity between documents, images, songs, molecules
• cosine similarity
– Route distance
– Manhattan distance
– perceptual similarity
– etc.
10

Euclidean similarity ?
A classical approach is to analyze the data…
Let’s go for clustering the wine dataset (see 06a_Clustering wine.zip) !
Metrics give us a good confidence that the clusters associated with the three
producers ~ correspond to real Euclidean clusters
11

Visualizing similarity
R2
In the most general case, it is not possible to observe data and similarity
directly in the original Rn space
– REDUCING the original dimensions Rn → Rk k<<n Typically, K=2
12

Multidimensionality reduction
• Moving from n dimensions to k<<n dimensions is useful for
• compressing the data
• saving time, like k-means
• using simple visualizations (e.g., 2D scatterplots)
• For visualization purposes we want to map data points x in Rn to points y in
R2 (o R3) so that we can use these coordinates to visualize our data items and
observe similarity (and, sometimes, observe data distribution and values)
• The transformation should be done in a way that similar points in Rn translates
into similar points in R2 (and vice-versa)
– Similarity may be defined in different ways
– Some techniques use Euclidean distance in Rn (e.g., PCA, ~ t-SNE)
– Some techniques use user defined notion of similarity (e.g., MDS)
13

A toy dataset and a toy dimensionality
reduction (2D->1D)
The idea is to observe issues and good
…
choices in a dimensional space that we can understand
What do you see here?
14

Simplest way: projection
B.t.w., it might be not
so simple: n(n-1)/2
• Toy example, 2D → 1D projections!
• We are people from 1D Flatland
(Gulliver’s travels by Jonathan Swift)
•Does it preserve
X1 Euclidean distance ?
•Does it represent data
projection
in a correct way?
• Euclidean distance is preserved but...
• False positive !
• Correct X1 or X2 values and
distributions
X2 projection
What do
you see here?
15

SPLOM (Rn → R2s)
1D distributions
Starting point
Nice labeling
2D values
N values (with
Several inspections)
What can you
see here? 2D correlations
Euclidean distance
Is preserved
But false positive !
16

Some projections are better than others...
• Some strategies allow for preserving some data characteristics during the
dimension reduction
variance=0.0062
variance=0.055
Which one is better? And why?
17

Principal Component Analysis (PCA)
• Transform the coordinate space Rn (Xs) into a new one Rn ( ranked Ys) where:
– “The first principal Y component has the largest possible variance and
1
• each succeeding component in turn has the highest variance possible under the constraint that it is
orthogonal to (i.e., uncorrelated with) the preceding components”
• PCA produces a (ranked) list of coordinates that allows for an 'optimal' projection
• It is a linear transformation and preserves Euclidean distance and does not
introduce false negatives And yes, it DOES NOT reduce the dimensionality !
– For visualization purposes most of the time we project the data on the two first 2 coordinates (2D
scatterplot)
– But we can project on 3 coordinates as well
– It is the projection that reduces the dimensionality!
– The projection does not increase the Euclidean distance (if 2 points are close in Rn they
are close(r) in R2)
– It is the projection that introduces false positives! (2 fare away points in Rn may be close in
R2)
18

2D Principal Component Analysis (PCA)
y
1
x
y
2
2
y1
PCA
x
1
X , X , ..., X Y , Y , ..., Y
1 2 n 1 2 n
• It does NOT reduce the number of dimensions ...
• It is a linear transformation Rn → Rn (in R2 it corresponds to a rotation)
• Y is the axis in which the variance has a maximum
1
• Projecting on it is the best choice for a toy R2→R1 reduction
19

Python example (pandas, numpy, matplotlib, and sklearn)
• You have to install Python (3.x) and the above packages
– e.g., pip install numpy
• and run the example file
– 01_PCA_2D.py
• you will deal with two different types of arrays:
1. pandas.core.frame.DataFrame → data from excel
2. numpy.ndarray → trasformed data, like normalization, PCA, etc
20

Handling the data with pandas DataFrames df
• df=pd.read_excel('data.xlsx')
• [ [X1],[X2], ..., [Xn] ]
21

Handling the data with numpy.ndarray d
22

Plotting the data with plt.plot
23

2 levels slicing
d[interval/value, interval/value] →slice
optional
First column
Second column
first X 3 values
1
as separated item
24

Slicing ?
d[value, value] →element
d[value] →row
d[interval] →rows
d[interval, value] →column slice
d[interval, interval] → data slice
25

.T
numpy array type has nice and useful methods
T → transpose d.T has the same structure of df (pandas.dataframe)
26

Let's go through PCA steps and
theory
(PCA_2D.ipynb)
27

Feature scaling
• Attributes MUST be "normalized"
• Standardization
• The result of standardization (or Z-score normalization) is that the features will be rescaled so that they’ll have
the properties of a standard normal distribution with μ=0 and σ=1
z = (x−μ)/σ
• Min-Max scaling (not linear) not suitable for PCA
28

Scaling example
(03_PCA_Scale_wine.py)
original data Covariance matrix
[ 0.66 0.09]
[ 0.09 1.25 ]
[ 1.01 0.09]
[ 0.046 0.004] [ 0.09 1.01]
[ 0.004 0.049] Without normalization
min-max
z score PCA will produce very different results!!!
29

PCA from matplotlib standardizes by default !
• What about PCA from other libraries?
• Take care of that!!! Also because …
sklearn!
30

2D→ 1D
So what?
• Meaning?
• Procedure?
• How do we get these ‘magic’ Ys ?
13D→ 2D
13D→ 3D
31

PCA details – definition: Variance
| • given a sample X=(x |     | ,x ,...,x | ) with mean (X)  |     |
| --------------------- | --- | --------- | ----------------- | --- |
|                       |     | 1 2       | n                 |     |
𝑛
•
1
|     | Var(X)  | = ෍ | 𝑥 − (X) | 2   |
| --- | ------- | --- | -------- | --- |
𝑖
𝑛
𝑖=1
• Data with little variance is not "interesting"
• And its projection is not nice...
32

PCA details – definition: Covariance
• given two samples X=(x ,x , ... ,x ) and Y=(y ,y , ... ,y ) representing pairs (x,y) with
1 2 n 1 2 n i i
means (X) and (Y)
𝑛
1
= ෍(𝑥𝑖 − (X))(𝑦𝑖 − (Y))
• Cov(X,Y)
𝑛
𝑖=1
• Cov(X,Y)>0 → X and Y variate (with respect to ) in a similar way
• Cov(X,Y)<0 → X and Y variate (with respect to ) in an opposite way
• Cov(X,Y)=0 → X and Y variate (with respect to ) in an independent way
• Note that: Cov(X,X)=var(X)
33

Example
• Height and weight of a growing child:
Cov( [2.6,5.3,6.7,7.4,8.4,10.1],
[47.1,59.1,64.7,68.2,73.9,81.6] )=30.96
34

Variance and Covariance?
• High variance is good!
• While projecting the data low covariance on other axes is good!
• Why?
• The variance of the projection is higher!
p’ >p !!!
1 1
p d
p’
1 d
1
p
2 p’
2
High covariance: d>p >p
1 2
Low covariance: d~p’ >>p’
1 2
35

Variance and Covariance?
• How can we improve a projection?
p
height
1 d
??
??
p
2
weight
We cannot change data or variance
But we can change axes !
PCA!!!
36

PCA details – 2d Data example
37

PCA details – Covariance matrix
x variance
x variance 2
1
x y covariance, symmetric
highest projection
variance in this space:
X
2
covariance>0
38

PCA goal
• PCA computes a NEW space (using a linear
transformation) "optimizing" the covariance matrix
first component
variance (Y )
1
( 2.09 0)
0 0.016
second component
variance (Y )
2
covariance=0
39

Visual comparison
This is the "best"
1D projection we
can get from this
data
Y The problem is
2
that this axis has
not a clear
meaning (it is a
Y
1
combination of
the old x and y)
40

How ? Step 1
• PCA computes the eigenvalues and eigenvectors (autovalori e autovettori)
from the covariance matrix of the original data after z-score normalization
|     |     |     |     | 1.05263158- |  1.03653895 | =0  |
| --- | --- | --- | --- | ------------ | ----------- | --- |

1.03653895   1.05263158-

|    | = 2.09460306   |     |             |     |     |     |
| --- | -------------- | --- | ----------- | --- | --- | --- |
|     | 1              |     | eigenvalues |     |     |     |
|    | = 0.01650805,  |     |             |     |     |     |

(                 ) (y )=( 0)
| 0 1.05263158- . 0 0 | 6 1 0 0 8 6 - l  |  1.03653895 0 . 0 1 7 9 | 8 2 3 3           |       1 |     |     |
| -------------------- | ---------------- | ----------------------- | ----------------- | ------- | --- | --- |
  eigenvector
|     |     |   |     | =   0 |     |     |
| --- | --- | --- | --- | ----- | --- | --- |
y 
| 0 1.03653895   1.05263158- . 0 1 | 7 9 8 2 3 3     |         0 . 0 5 4 6 | 6 1 6 1 - l       |              | 0   |     |
| --------------------------------- | --------------- | ------------------- | ----------------- | ------------ | --- | --- |
|                                   |                 |                     |                 | 2            |     |     |
| (                                 |                 |                     |         )         |   (y  )=( 0) |     |     |
| 0 . 0 0                           | 6 1 0 0 8 6 - l | 0 . 0 1 7 9         | 8 2 3 3           |   1          |     |     |
1 .0 5 2 6 3 1 5 8 -    1 . 0 3 6 5 3 8 9 5   eigenvector
= 0 
| 01.0.013769583283935       1  .005.0256436165186-1 |     |     | -l  | y   |     |     |
| --------------------------------------------------- | --- | --- | --- | --- | --- | --- |
|                                                     |     |     |    |     | 0   |     |
|                                                     |     |     |    | 2   |     |     |
41

How ? Step 1 coded in Python
(02_PCA_2D_full.py)
1.05263158-  1.03653895 =0
1.03653895 1.05263158-

 = 2.09460306
1
 = 0.01650805,

 /( + )= 0.992%
 1 2
 /( + )= 0.008%
2 1 2
 takes 99.2% of total variance!
1
Y =1st component ( ) : 0.70710678 X 0.70710678 X
1 1 1 2
Y =2nd component ( ) : -0.70710678 X 0.70710678 X
2 2 1 2
42

Eigenvectors
Eigenvector 2
Eigenvector 1
| 1st component    :    0. 707  X |      0. 707  X |      |
| ------------------------------- | -------------- | ---- |
|                                 | 1              | 2    |
| 2nd component   :  -0. 707   X  |     0. 707  X  |      |
|                                 | 1              | 2    |
43

How ? Step 2
• PCA creates a new 2D space with the eigenvectors with origin in the means of
X and X axes and offers them in an ordered fashion (sorted by variance)
1 2
• Original data points are mapped in the new space
• The covariance matrix has the eigenvalues on the diagonal
(  0)

0 

second component
Y
2
first component
Y
44
1

Python code using sklearn
data frame
45

Python code using sklearn
pca variable is very useful
 /( + )= 0.992%
 1 2
 /( + )= 0.008%
2 1 2
 takes 99.2% of total variance!
1
46

y ,y , ...............................y
1 2 13
PCA as black-box
2
x ,x , ........................x
1 2 13
2
1
Linear
transformation
new Rn
2D Projection (meaningless axes)
Rn
1. A linear transformation (e.g., PCA) between x ,x , …, x
1 2 13
and y ,y , …, y preserves closeness
1 2 13
3
2. A projection creates new ones 
3. If data points p' and p'' are close in Rn they are close in R2
4. Vice versa is not always true (false positive because of
projection)
5. Remember that PCA uses mean, variance, covariance:
data MUST be a ratio scale...
6. e.g., PCA on numeral values encoding categorical
attributes MAKES NO SENSE!
47

Just a note on normalization
Min-max does not
preserve closeness!!!
Z-score does!
Minmax
P4 and P5 are far away…
P4 and P5 are very close
48

Let's go
• UCI repository :
https://archiveicsuciedu/ml/datasetshtml
• wine dataset
• A downloaded copy is in your folder
49

Wine.xls
Remove producer
Be ready to use it
• 1: 59 rows
• 2: 79 row
• 3: remaining rows
50

51

Wine dataset 13 attributes + 3 classes
producer 0
producer 1
producer 2
52

Objectives
• Download from Classroom VA_07_PCA.ex.zip
• Open the file Load the dataset
• Explore the data
• Compute the PCA on it
• Plot it showing clusters
• Compute the cumulated variance of the first two
components
• Generate the file pca.csv using the function
generateFile(att,d_pca,'wine.data.csv')
• Run server.py
• Open a browser at localhost:777 or 888 for Iris
53

Some python code
(reading a csv and running PCA on
standardized data)
54

Data exploration:
original data
55

Data exploration:
original
normalized data
56

Data exploration
PCA data
57

Data exploration
PCA data
Cumulated variance
|       | /( | +  | +...+ | )        |
| ----- | ---- | --- | ------ | -------- |
|       | i    | 1   | 2      | n        |
| ( + | )/( | +  | +...+ | )= 0.554 |
| 1     | 2    | 1   | 2      | n        |
If you want to know the variance for each dimension (eigenvalues):
58

Some python code
(plotting wine classes on PCA)
59

Some python code
(04_PCA_wine_full.py)
(plotting wine classes with PCA)
60

Final considerations
• It is a linear transformation of the original space
• It's focus is on VARIANCE
• It preserves data point "closeness" from Rn to Rk
• The projection on the new axes creates false positives:
– points far away in Rn may be close in Rk
61

Remember the process
62

Role of PCA (or similar techniques) in Infovis
observe, discover clusters
or
identify outliers
or
trigger interaction selecting
“similar” items
be aware of false positive...
can I trust outliers?
63

Iris data (iris.data.csv) species=1,2,3
• copy 04_PCA_wine_full_sklearn.py to
05_PCA_iris.py
• modify it to compute PCA on iris
• inspect the result with server.py
• note:
– the class ranges are [0:50], [50:100], [100:]
– the file contains the labels on the first row
– the class column, species, is the last one, not the
first one...
64

Iris data (iris.data.csv)
• note:
– the file contains the labels on the first row
– the class column, species, is the last one, not the first one...
65

Iris data (iris.data.csv)
66