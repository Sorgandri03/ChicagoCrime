Visual Analytics
Giuseppe Santucci
Dimensionality reduction_3 : t-SNE
Folder g
Thanks to Enrico Bertini
1

t-SNE
(t-distributed -Stochastic Neighbor Embedding)
• It is a nonlinear dimensionality reduction
• It is quite similar to MDS, in the sense that:
– it uses a similarity between points in Rn, and
– it arranges points on a 2D space, using this similarity
• It is quite different from Euclidean MDS, in the sense that:
– the similarity is not linear and is not the Euclidean distance!
2

Clusters are defined considering neighbors
How far they are?
It depends on the density…
3

SNE similarity in Rn
(Stochastic Neighbor Embedding)
• In SNE (without the t) the high dimensional Euclidean distance ||x -x|| between x and x
i j i j
in Rn is used to define a similarity between points using a conditional probability p :
j|i
Rn→
normal distribution x i x i
low density high density
(far neighbors) (near neighbors)
• p is the probability that x would pick x as its neighbor if neighbors were picked in proportion to their
j|i i j
probability density under a Gaussian centered at x
i
• where  is the variance of a Gaussian centered on x and it is inversely proportional to the point density
i i
around x
i
• p is very high if points are very close and very little if the points are well separated
j|i
  is different for every point: points in dense areas are given a variance smaller than points in sparse areas
i
• think at this as a definition of distance that is affected by local density: if you are considering a very
dense area you are a neighbors only if you are very close...
4

Similarity based on density
x
i
x
i
x
j
x
j
similar not similar
5

SNE similarity in R2
• x and x are mapped in y and y in R2 and, following the previous approach, the 2-
| i   | j   | i   | j   |
| --- | --- | --- | --- |
dimensional Euclidean distance ||y-y|| is converted in the conditional probability q :
i j j|i
R2→
• Where the variance   is constant and equal to 1/sqrt(2) → 22 =1
i
| •   | In an ideal mapping,  p |     | ==  q    |
| --- | ----------------------- | --- | -------- |
|     |                         |     | j|i  j|i |
• The mapping proceeds using a simulated annealing-like technique
(similar to MDS) that tries to minimize the sum of | p -  q  |
j|i  j|i
6

t-SNE ?
• t-SNE optimizes SNE
– using a symmetric p
ij
– using a Student-t distribution with a single degree of freedom in R2 rather than a Gaussian
SNE t-SNE
Rn→
R2→
7

Let's go with an example
• We use the Optical Recognition of Handwritten Digits Data Set
( )
http://archiveicsuciedu/ml/datasets/Optical+Recognition+of+Handwritten+Digits
• It has 64 attributes that corresponds to the gray scale values of a 8x8 pixel
image
• 0, 0, 5, 13, 9, 1, 0, 0, 0, 0, 13, 15, 10, 15, 5, 0, 0, 3, 15, 2, 0, 11, 8, 0, 0, 4, 12, 0, 0, 8, 8, 0, 0, 5,
8, 0, 0, 9, 8, 0, 0, 4, 11, 0, 1, 12, 7, 0, 0, 2, 14, 5, 10, 12, 0, 0, 0, 0, 6, 13, 10, 0, 0, 0
8

We compare MDS and t-SNE
elements
dimensions
9

We compare MDS and t-SNE
classes
10

MMDDSS
11

t-SNE
12

What about wine?
• Let's try!
13

Try t-sne on wine....
14

t-NSE
• Similar, as technique, to MDS but using a distorted notion of distance
• It amplifies separations
• Useful for cluster identification
• It is based on similarities among points expressed as probabilities
using distances and densities
15

MDS t-SNE
PCA
Linear transformation Non linear transformation Non linear transformation
Eigenvalues and Focuses on similarities Focuses on similarities
associated to distance that
eigenvectors You can user your own
are modeled as conditional
Preserves distances definition of similarity
probabilities based on
Uses and gives special (more powerful than simple
density
emphasis to variance Euclidean distance)
It amplifies separations
Projection on 2 (3) axes Points are arranged on the
Points are arranged on the
2D space iterating and
It introduces false positives
2D space iterating and
minimizing a stress function
minimizing a stress function
It introduces false positives
It introduces false positives
and false negatives
and false negatives
16

Let' analyze a dataset about diabetes
• Separate classes
• Outliers
• ...
• PCA
• MDS
• t-SNE
• Radviz
aware-diag-sapienza.github.io/d3-radviz/prototype/index.html
https://aware-diag-sapienza.github.io/W4SP/
17

18

19