---
layout: post
title: "Coding Maxtrix - Chapter 0 Function"
description: "Linear Algebra in python - chapter function"
date: 2017-09-26
tags: [linear-algebra, function]
comments: true
use_math: true
---

## The Function and other mathematical and computational preliminaries

#### Set terminology and notation

Set is a collection of mathematical objects in which each object is considered to occur at most one. The objects belonging to a set are its *elements*. We use curly braces to indicate a set specified by explicitly enumerating its elements. For example, $\heartsuit\spadesuit\clubsuit\diamondsuit$ is the set of suits in traditional deck of cards.  The order in which elements are listed is not signification; a set imposes no order among its elements.  
  The symbol $\in$ is used to indicate that an object belongs to a set (equivalently, that the set *contains* the object). For example 
  $\heartsuit \in \{\heartsuit,\spadesuit,\clubsuit\diamondsuit\}$.  
  One set $S_1$ is *contained in* another $S_2$ written $S_1 \subseteq S_2$ if every element of $S_1$ belongs to $S_2$. Two sets are equal consists of two steps: (1) prove the first set is contained in the sencond, and (2) prove the sencond is contained in the first.  
  A set can be infinite. For example set R, which consists of all real numbers, and the set C which consists of all complex numbers.  
  If a set S is not infinite, we use $|S|$ to denote its *candinality*, the number of elements it contains. For example, the set of suits has candinality is 4.

#### Cartesian product

That is, for sets A and B, the **Cartesian product** A x B is the set of all _ordered pairs_ (a, b) where $a \in A$ and $b \in B$. **Products** can be specified using set-builder notation for example. A = {x, y, z}, B = {1, 2, 3} so A x B is a sets consists all pairs {(x, 1), (x, 2), (x, 3), (y, 1), (y, 2), (y, 3), (z, 1), (z, 2), (z, 3)}. The candinality of A x B  = $|A| x |B| = 9$.

$$
\begin{array}{|c|c|c|c|}
\text{A B} & 1 & 2 & 3 \\
x & (x, 1) & (x, 2) & (x, 3) \\
y & (y, 1) & (y, 2) & (y, 3) \\
z & (z, 1) & (z, 2) & (z, 3) \\ 
\end{array}
$$

#### The Function
The function is a rule that, for each element in some _set_ D of posible inputs, assigns a posible output. The output is said to the _image_ of the input under the given function.

and the input is a _pre-image_ of the output. The set _D_ of posible inputs is called the _domain_ of the function.  
  Formally, a _function_ is a (possiby infinite) set of pairs _(a, b)_ no two of which share the same first entry.

---
__Example__: the doubling function with domain {1, 2, 3,..} is {(1, 2), (2, 4), (3, 6),..} 

---
__Example__: The multiplication function with domain {1, 2, 3..} x {1, 2, 3, ..} looks something like this:  
{((1, 1), 1), ((1, 2), 2), ((1, 3), 3), ..((2, 1), 2), ((2, 2), 4), ((2, 3), 6), ..}

For a function named _f_, the image of _q_ under _f_ denoted by _f(q)_. If _r = f(q)_, we say that _q maps to r under f_. The notaion for "q maps to r" is $q \mapsto r$. Its is convenient when specifying a function to specify a _co-domain_ for the function.The co-domain is a set from which the function's outputvalues are chosen. Note that one has some leeway in choosing the co-domain since not all of its members need to be outputs.  
The notation  

$$
f: D \rightarrow F
$$ 

mean that _f_ is a function whose domain is the set _D_ and whose _con-domain_ (the set of possible output) is the set _F_. More briefly: "a function from _D_ to _F_" or "a function that maps _D_ to _F_". 

___
__Example__ Caesar was said to have sued a cryptosystem in which each letter was replaced with the one three steps forwad in alphabet(warapping around for X, Y, Z). Thus the plain-text MATRIX would be encrypted as the cyphertex PDWULA. The function that maps each plain text letter to its cyphertex replacement bould be written as: 

$$
A \mapsto D, B\mapsto E,C \mapsto F .. 
$$

This function's domain and co-domain are both the alphabet {A, B, .., Z}

The _image_ of a function _f_ is set of images of all domain lements. That is, the image of _f_ is the set of elements of the co-domain that actually occur as outputs. For example, the image of Caesar's encryption function is the entrie alphabet, and the image of cosine funciton is set of numbers between -1 and 1.

#### Functions versus procedures, versus computation problems.

A _procedure_ is a precise description of computation; it accept _inputs_ called _arguments_ and produces an _output_ called the _return value_

Example: 
```
def mul(q, p): return q * p
```

A _computational problem_ is an input-output specification that procedure might be required to satisfy.

Example:

```
- input: pair of (p, q) of integers greater than 1

- output: the product of p, q
```

#### Notation for the set of functions with given domain and co-domain

For sets _D_ and _F_, we use the notation $F^D$ to denote all functions from _D_ to _F_.  
For any finite sets _D_ and _F_, we have: $|D^F| = |D|^{|F|}$

#### Identity function

From any domain _D_, there is a function $id_D: D \to D$ that called the _identity function_ for D, defined by:  
 
$$id_D(d) = d$$

for every $d\in D$.

#### Composition of functions

The operation _functional composition_ combines two functions to get new function. We will later deine maxtrix multiplication in terms of function composition. Given two functions $f: A\to B$ and $g: B\to C$ , the function $g \circ f$, called the composition of _g_ and _f_ , is function whose domain is _A_ and its co-domain is _C_. It defined by the rule:  

$$
(g \circ f)(x) = g(f(x))
$$


**Example** Define the function

$$
f: \{A, B, C, D, ..., Z\}  \rightarrow \{0, 1, 2, 3, .., 25\}
$$
by 

$$
A\mapsto 0, B\mapsto 1, C\mapsto 2, ...,Z\mapsto 25
$$
Define function _g_ as follows. The domain and co-domain of _g_ are both the set {0, 1, ..., 25} , and $g(x) = (x + 3) \mod 26$. For third function _h_, the domain is {0, ..25} and the co-domain is {A, .., Z} and $0\mapsto A, 1\mapsto B, etc$. Then $h\circ(g\circ f)$ is function that implements the Caesar cypher as descripted in above.

For building intuition, we can use a diagram to represent compostion of functions with finite domains and co-domains.

#### Associativity of function composition
The composition of function is *associative*:

For function _f_, _g_, _h_,

$$ h\circ (g\circ f) = (g\circ h)\circ f$$

So:  

$$
h \circ (g \circ f) = h\circ g \circ f
$$

#### Function inverse
For example, who recived a cyphertex: PDWULA. to obtain the plaintext (MATRIX), we must find for each letter in cyphertex the letter that maps to it under encryption function. That is, we must find the letter that maps to P (namely M), letter that maps to D (namely A) and so on. In doing, we can be seen to applying _another_ function to each of letters of cyphertex, specifically the function that reverses the effect of the encryption function. This function is said to be _functional inverse_ of encryption function.

  For antother example, consider the functions _f_ and _h_ in Example above, _f_ is function from {A, B, .., Z} to {0, 1, ..25} and _h_ is function from {0, 1, 2..} to {A, B, C, .., Z}. Each one reverses the effect of the other. That is, $h\circ f$ is the identity function on {A, .. Z} and $f\circ h$ is identity function on {0, 1, .., 25}. We say that _h_ is function inverse of _f_. There are no reason for privilegin _f_, however; _f_ is function inverse of _h_ as well.

  In general,

  __Defination 0.3.13:__ we say that functions _f_ and _g_ are _function inverses_ of each other if  
  * $f\circ g$ is defined and is the identity function on the domain of _g_, and
  * $g\circ f$ is defined and is the identity function on the domain of _f_.

  Not every function has an inverse. A function that has an inverse is said to be _invertible_. 

  __Definition 0.3.14__: Consider a function $f: D\rightarrow F$. We say that _f_ is _one-to-one_ if for every $x, y \in D, f(x) = f(y)$ implies $x = y$ . We say that _f_ is _onto_ if, for every $z \in F$, there exists $x \in D$ such that $f(x) = z$.

__Lemma 0.3.16__: An invertible function is one-to-one.
__Lemma 0.3.17__: An invertible function is onto.

__Theorem 0.3.18 (Function Invertibility Theorem)__: A function is invertible if it is one-to-one and onto.

__Lemma 0.3.19__ Every function has at most one function inverse.

#### Invertibility of the composition of invertible functions

__Lemma 0.3.20__: If _f_ and _g_ are invertible functions and $f\circ g$ exists then $f\circ g$ is invertible and ${(f\circ g)}^{-1} = g^{-1}\circ f^{-1}$.

__Example__ The following figure shows two invertible functions is _f_ and _g_ their composition of this is: $f \circ g$. 

$$
\begin{array}{c c | c}

1 \overset{g}{\mapsto} A & A \overset{f}{\mapsto} p & 1 \overset{f\circ g}{\mapsto} p \\

2 \overset{g}{\mapsto} B & B \overset{f}{\mapsto} q & 2 \overset{f\circ g}{\mapsto} q \\


3 \overset{g}{\mapsto} C & C \overset{f}{\mapsto} r & 3 \overset{f\circ g}{\mapsto} r

\end{array}
$$

The inverse of $f\circ g$ will be $(f \circ g)^{-1}$ figure as bellow  

$$
\begin{array}{c c|c}
p \xrightarrow{f^{-1}} A & A \xrightarrow{g^{-1}} 1&  p \xrightarrow{g^{-1}\circ f^{-1}} 1
\\
q \xrightarrow{f^{-1}} B & B \xrightarrow{g^{-1}} 2&  q \xrightarrow{g^{-1}\circ f^{-1}} 2
\\
r \xrightarrow{f^{-1}} C & C \xrightarrow{g^{-1}} 3&  r \xrightarrow{g^{-1}\circ f^{-1}} 3
\end{array}
$$

## Probability

#### Probability distributions

A function $Pr(.)$ from a finite domain $\Omega$ to the set $R^+$ of nonnegatove reals is a _discrete probability distribution_ if $\sum_{\omega \in \Omega}Pr(\omega)=1$. the elements of the domains as _outcomes_. The image of an outcome under PR(.) is called _probability_ of the outcome. The probabilites are supposed to be proportional to _relative likelihoods_ of outcomes. The we use the term _likelihood_ to mean the common sense notion and probability mean the mathematical abstraction of it.

##### Uniform distributions
All the outcoms are equally likely, so they are all assigned the same probabilites. In such a case, we say that the probability distribution is _uniform_.

__Example__: To model the flipping of a single coin, $\Omega = \{heads, tails\}$. We assume that the two outcomes are equally likely, so we assign them the same probability: Pr(heads) = Pr(tails). Since we require the sum to be 1, so Pr(heads) = Pr(tails) = 1/2. In Python, we would be write the probabilty distributions as:  
```
>>> Pr = {heads: 1/2, tails: 1/2}
```    

__Example__ To model the roll of single die, $\Omega=\{1, 2, 3, 4, 5, 6\}$ and Pr(1) = Pr(2) = .. Pr(6) = 1/6. In Python we can write:  
```
>>> Pr = {1: 1/6, 2: 1/6, 3: 1/6, 4: 1/6, 5: 1/6, 6: 1/6}
```

__Example__ To model the flipping of two coins, a penny and a nikel. $\Omega = \{HH, HT, TH, TT\}$, and each of the outcomes has same probability is 1/4. In Python:  

```
>>> Pr = { ('H', 'H'): 1/4, ('H', 'T'): 1/4, ('T', 'H'): 1/4, ('T', 'T'): 1/4 }
```

##### Nonuniform distributions

Different outcomes have different probabilities.

__Example 0.4.4__ Let $\Omega = \{A, B, ..Z\}$ and assign probabilities according to how likely you are to draw letter at the begining of a Scrabble game. The likelihood of drawing an R is twice that of drawing a G, thrice that of drawing a C and six times drawing Z. We need to assign probabilities that are proportional to these likelihoods. We must have some number _c_ such that. for each letter, the probability of drawing that letter should be _c_ times the number of copies of that letter.

$$
Pr[\text{drawing letter X}] = c \cdot \text{number of copies of letter X} 
$$ 

Summing over all leters, we get  
 
$$
1 = c\cdot \text{total number of tiles}
$$

Since the total number of tiles is 95, we define _c = 1/95_ . The probability of drawing an E is therefore 12/95, which about .126, the probabiluty of drawing an A is 9/95, and so son. In Python, the probability distribution is

```python
{'A':9/95, 'B':2/95, 'C':2/95, 'D':4/95, 'E':12/95, 'F':2/95, 'G':3/95, 'H':2/95, 'I':9/95, 'J':1/95, 'K':1/95, 'L':1/95, 'M':2/95, 'N':6/95, 'O':8/95, 'P':2/95, 'Q':1/95, 'R':6/95, 'S':4/95, 'T':6/95, 'U':4/95, 'V':2/95, 'W':2/95, 'X':1/95, 'Y':2/95, 'Z':1/95} 
``` 

#### Events and adding probabilities

In Example 0.4.4, what is probability of drawing a _vowel_ from the bag ?  
A set of outcomes is called an _event_. For example, the event of drawing a vowel is represented by the set: {A, E, I, O, U}.

__Principle 0.4.5 (Fundamental Principle of Probability Theory)__: The probability of an event is sum of probabilities of outcomes making up event.

Accordings to this principle, the probability of a vowel is:

$$
9/95 + 12/95 + 9/95 + 8/95 + 4/95
$$

Which is 42/95

#### Applying a function to a random input

When applying a function to an radom input. Since the input to the function is random, the output should also be considered random. Given the probability distribution of the input and a specification of the function, we can use probability theory to derive the probability distribution of the output.

__Example 0.4.6__: Define the function   
$f:\{1, 2, 3,..6\}\rightarrow \{0, 1\}$ by:

$$
f(x) = \begin{cases}
0 & \text{if x is even} \\
1 & \text{if x is odd}
\end{cases}
$$

Consider the experiment in which we roll a single die, yielding one of numbers in {1, 2, 3, 4, 5, 6}, and then apply $f(\cdot)$ to that number, yeidling either a 0 or 1. What is probabilty function for the outcome of this experiment ?  

The outcome of the experiment is 0 if the rolled die shows 2, 4, 6. Each of these probabilies has probability 1/6.  By the Fundamental Principle Of Probability Theory, therefore the output of the function is 0 with probability is 1/6 + 1/6 + 1/6, which is 1/2. Similary, the output of function is 1 with probability 1/2. Thus the probability distribution of the output function is: {0: 1/2, 1: 1/2}.

__Quiz 0.4.7__: Consider the flipping of a panny and a nikel coin. The outcome is a pair (x, y), where each x and y is 'H' or 'T'. Define the function:

$$
f: \{ ('H', 'H'), ('H', 'T'), ('T', 'H'), ('T', 'T') \}
$$
by

$$
f((x, y)) = \text{the number of H's represented}
$$

__Answer__

co-domain is: {0, 1, 2}

probability distribution of the output function is:

```
{ 0: 1/4,  1: 1/2, 2: 1/4}
```

__Example__ Using a function that mapping $\Omega = \{A, B,.. Z\}$ to {0, 1, 2, 3,} and so on.  

Consider the experiment in which _f_ is applied to a character selected randomly according to the probability distribution as bellow:

```python
{'A':9/95, 'B':2/95, 'C':2/95, 'D':4/95, 'E':12/95, 'F':2/95, 'G':3/95, 'H':2/95, 'I':9/95, 'J':1/95, 'K':1/95, 'L':1/95, 'M':2/95, 'N':6/95, 'O':8/95, 'P':2/95, 'Q':1/95, 'R':6/95, 'S':4/95, 'T':6/95, 'U':4/95, 'V':2/95, 'W':2/95, 'X':1/95, 'Y':2/95, 'Z':1/95} 
``` 

So probability distribution of the output is ?
Because _f_ is a invertable function, there is one and only one input for which the output is 0, namely A. Thus, the probability of the output being 0 is exactly the same as probability of the input being A, namely 9/95. Similary, for each of the integers 0 through 25, comprising the co-domain of _f_, there is exactily one letter that maps to that integer, so the probabilty of that integer equals the probability of that letter.

Thus, if the function is invertable, the probabilies are pre-served, the probabilies of various outputs match the probabilies of the inputs. It follows that, if input is chosen according to uniform distribution, the distribution of the output also uniform.

__Example 0.4.9__: Caesar Cyphersystem, one encrypts a letter by advancing it three positions, we can use the number _k_ of position by which to advance need not be three, it can be integer from 0 to 25. We ref as a key. Suppose we select _key k_ according to the uniform distribution on {0, 1, .., 25} and use it to encrypt the letter P. Let w = {1, 2, 3.., 25}$\rightarrow$ {A, B.., Z} be the function mapping the key to cyphertext:  

$$
\begin{aligned}
 w(k) = && h(f(P) + k \mod 26)\\
      = && h(15 + k \mod 26)
\end{aligned}  
$$

The function $w(\cdot)$ is invertable. the input chosen according the uniform distribution, so the distribution of the output is also uniform.

#### Perfect secrecy

We apply this idea to some even simpler cryptosystems. A cryptosystem must satisfy two obvious requirements:
* the intended recipient of an encrypted message must be able to decrypt it and,
* someone for whom the message not intended should not be able to decrypt it.

### Lab: Python sets, lists, dictionaries and comprehensions

### Simple expressions

__Task 0.5.1__ find the number of minutes in a week.

__Answer__:

```python
7 * 24 * 60 #= 10080
```

__Task 0.5.2__ find the remainder of 2304811 divided by 47 without using the modulo operator %

```python
 2304811 -  (2304811 // 47) * 47  #= 25
```

Python use traditional programming notation for scientific notation. The notation 6.022e23 denote the value $6.022 \times  10^{23}$ and 6.626e-34 denote the value: $6.626 \times 10^{-34}$. 

Python uses limited precision arithmetic, so:

$10^{16} + 1 = 1e16$ and $10^{-16} + 1 = 1.0$

#### Sets

Set is an unordered collection in which each value occurs at most once. the duplicates are eliminated. The cardinality of the set is number of elements in the set. in Python procedure _len_. 

```
>>> len({'a', 'b', 'c', 'a', 'a'}) #= 3 
```

and sum of elements of collections of values is obtained by: 

```
>>> sum({1, 2, 3}) #= 6

>>> sum({1, 2, 3}, 10) #= 10 + 6
```

Testing set membership can using _in_ operator and _not in _ operator.

```
>>> S = {1, 2, 3}
>>> 2 in S
True
>>> 4 in S
False
>>> 4 not in S
True
```

Set union and intersection

The _union_ of two sets S and T is new set that contains every value that is an member of S and of T or both. Python use the vertical bar **|** as union operator:

```
>>> {1, 2, 3} | {2, 3, 4}
{1, 2, 3, 4}
```

The intersection of S and T is new set that contains every vlue that is a member of both S and T. Python using ampersand **&** as intersection operator.

```
>>> {1, 2, 3} & {2, 3, 4}
{2, 3}
```

Mutating a set

A value that can be altered is a mutable value. Sets are mutable, elements can be added or removed using **add** and **remove** methods.

```
>>> S = {1, 2, 3}
>>> S.add(4)
>>> S.remove(2)
>>> S
{1, 3, 4}

```

Python using method **update** to set all elements of other collection.

```
>>> S.update({4, 5, 6})
>>> S
{1, 3, 4, 5, 6}
```

And one can intersect a set with another collections and removing from the set all elemetns not in the other collections:

```
>>> S.intersection_update({5, 6, 7, 8, 9})
>>> S
```

Set comprehensitions

$$
\{2x : x \in \{ 1, 2, 3\}\}
$$

can write in Python as:

```
>>> {2 * x for x in {1, 2, 3}}
```
##### Lists

Python represents sequences of values using _lists_. In a list, order is signification and repeated elements are allowed. The notation for lists uses square brackets. 
```
>>> [1, 2, 3, 2, 3]
[1, 2, 3, 2, 3]
```
List can contain a set or another lists.
```
>>> [[1, 2, 3], {2, 3, 4}, "ok]
[[1, 2, 3], {2, 3, 4}, 'ok']
```
*But a set cannot contain a list because lists are mutable.*

the _length_ of a list obtained using the procedure _len_, and the sum of elements of a collection can be computed using _sum_

to combine the elements in one list with other list. using operator +. 
```
>>> [1, 2, 3] + ['a', 'b']
[1, 2, 3, 'a', 'b']
``` 
to concat multiple list, we also can use sum function with providing [] as the second argument.
```
>>> sum([[1, 2, 3], ['a', 'b']], [])
[1, 2, 3, 'a', 'b']
```

Same as set, list also can use comprehensions.
```
>>> [2 * x for x in {1, 2, 3}]
[2, 4, 6]
```

Obtaining elements of list by indexing
_in set, we cannot using indexing to obtain element, since the order is not significant in set_

The are two ways to obtain an individual element of list. first is by indexing. index in list is started from 0.

Slices: a slice is a new list consisting of consecutive subsequence of elements of the old ist, namely those indexed by range of integers. the range is specified by a colon-separated pair _i: j_ consisting of the index _i_ as first element and _j_ as one past the index of last element.

Prefixes and Suffixes also used in list, _i_ or _j_ can be omitted, so mylist[:2] consists the first two element index: 0, 2, and [2:] consists all element start from 2 (2, 3, 4..)
. 

Slides that skip. we can use colon-separated triple a:b:c if want slide to include every $c^{th}$ element. for example:
mylist[::3] consists each $3^{th}$ element.

Obtaining elements of list by unpacking. Instend assigning a list to single variable, one can assign to list of variables like: [x, y, z] = [1, 2, 3].

##### Tuples
Like a list, tuple is an ordered sequence of elements. However, tuples are immutable so they can be elements of sets. 
```
>>> (1, 2 + 1, 4)
(1, 3, 4)

>>> {1, 2, (3, 4)} | {(5, 6)}
{1, 2, (3, 4), (5, 6)}

>>> {1, 2, (3, 4)} & {(5, 6)}
set()
``` 

Obtaining elements of tuble by indexing and unpacking
```
>>> (1, 2, 3, {4, 5})[3]
{4, 5}

>>> (a, b, c) = (1, 2, 3)
>>> a
1

>>> a, b, c = (1, 2, 3)
>>> b
2

>>> a, b, c = 1, 2, 3
>>> c
3
```

Obtaining a list or set form other collection by using constructor _list_, _set_, _tuple_
```
>>> list({1, 2, 3})
[1, 2, 3]
>>> set([1,1, 2, 3, 3])
{1, 2, 3}
>>> tuple({1, 2, 3, 4})
(1, 2, 3, 4)
```

Tuple comprehensiton is not return a tuple - it return a generator. 
```
>>> (x for x in [1, 2, 3])
 <generator object <genexpr> at 0...
```
To convert to list or tuple, use list, tuple constructor
```
>>> tuple((x for x in [1, 2, 3]))
```

##### Ranges
for any integer _n_ **range(n)** represents the sequence of integers from _0_ to _n-1_. For example range(10) represents the integers from 0 through 9. thefore, the value of the following comprehension is the sum of the squares of these integers: `sum({i * i for i in range(10)})`. to turn the range into list or set, tuple, we can use constructor _list, set, tuple,_ 

__Task 0.5.18__ write a comprehension over a range of the from range(n) such that the value of the comprehension is the set of odd numbers from 1 to 99

__Answer__
```
>>> {x for x in range(100) if x % 2}

# or
>>> {x for x in tuple(range(100))[1::2]}
```
We also can form a range with one, two or three arguments. the expression range(a, b) represents the sequence of integers $a, a + 1, a + 2, ... b -1$. and range(a, b, c) represents the sequence of integers $a, a + c, a + 2c, ..$ stopping just before of b.

```
>>> tuple(range(5, 10))
(5, 6, 7, 8, 9)

>>> tuple(range(1, 10, 3))  
(1, 4, 7)

>>> tuple(range(0, 10, 3))
(0, 3, 6, 9)
```

##### Zip
Another collection can be interated orver is a _zip_. zip is constructed from other collections all of the same length. each lement of the zip is a tuple consisting of one element from each of the input collections.

```
>>> tuple(zip([1, 2, 3], [4, 5, 6]))
( (1, 4), (2, 5), (3, 6) )

>>> characters = ['Neo', 'Morpheus', 'Trinity']
>>> actors = ['Neanu', 'Laurence', 'Carrie-Anne']
>>> set(zip(characters, actors))

>>> [character + ' is played by ' + actor for  (character, actor) in zip(characters, actors)]

['Neo is played by Neanu',
 'Morpheus is played by Laurence',
 'Trinity is played by Carrie-Anne']

```
 __Task 0.5.19__: Assign to L the list consisting of the first five letters ['A', 'B', 'C', 'D', 'E']. Next use L in an exprssion whose value is:   
   [ (0, 'A'), (1, 'B'), .. ('4', 'E') ]
your expression should use a range and a zip, but should not use a comprehention.

__Answer__: 
```
>>> L = ['A', 'B', 'C', 'D', 'E']
>>> list(zip(range(len(L)), L))
[(0, 'A'), (1, 'B'), (2, 'C'), (3, 'D'), (4, 'E')]
```
__Task 0.5.20__: Starting from the lists [10, 25, 40] and [1, 15, 20], write a comprehention whose value is the three-element list in which the first element is the sum of 10 and 1, the second is the sum of 25 and 15, and the third is the sum of 40 and 20. Your expression should se zip but not list.

__Answer__
```
>>> [x + y for  (x, y) in zip([10, 25, 40], [1, 15, 20])]
[11, 40, 60]
```

To reverse order of list, use _reversed(L)_ function, which dose not change the list L, 
```
>>> reversed([1, 2, 3])
[3, 2, 1]
```

#### Dictionaries
a dictionary is a set of key-value pairs. example: function _f_ that maps each letter in the alphabet to its rank in alphabet could be written as:
```
{'A': 0, 'B': 1, 'C': 2, ... 'Z': 25}
```

In Math it's can written as:

$$
\begin{array}{}
  A \mapsto 0 &  B \mapsto 1  & C \mapsto 2 & \cdots & Z\mapsto 25 
\end{array}
$$

As in sets, the order of the key-value pairs is irrelavant, and the keys must be __immutable__ (no sets, lists or dictionaries). The keys will mostly be integers, strings, tuples of strings and integers. The keys and values can be specified with expressions.

```
>>> { 2 + 1: 'thr' + 'ee', 2 * 2: 'fo' + 'ur' }
{3: 'three', 4: 'four'}
```

Each key in a dictionary there corresponds only one value. if a dictionary is given multiple values for the same key, only one value will be associated with that key.

```
>>> {'0': 'zero', '0': 'nothing'}
{'0': 'nothing'}
```

Obtaining the value corresponding to a particular key uses the same syntax as indexing a list or tuple. If the key is not represented in the dictionary, python considers it an KeyError.

To check where a key is in a dictionary using the _in_ operator like testing membership for set.

```
>>> d = {'Oracle': 'DB', 'Apple': 'OSX'}
>>> d['Oracle'] if 'Oracle' in d else 'NOT PRESENT'
```

__Task 0.5.21__: Suppose dlist is a list of dictionaries and _k_ is a key that appears in all the dictionaries in dlist. Write a comprehension that evaluates to the list whose $i^{th}$ element is the value corresponding to key _k_ in the $i^{th}$ dictionary in dlist.

Here is some sample test data:
```python
dlist = [{'James':'Sean', 'director':'Terence'}, {'James':'Roger', 'director':'Lewis'}, {'James':'Pierce', 'director':'Roger'}] 

# k = 'James'
```

__Answer__

```
>>> [d[k] for d for d in dlist]
```

The _identity function_ on set D is the function with the following spect:
* _input_: an element x of D
* _output_: x

example a dictionary that represents the identity function on D = {'red', 'white', 'blue'}

```
>>>D = {'red', 'white', 'blue'}
>>>d = {x:x for x in D}
```

key union and interset
```
>>> [k for k in {'a': 1, 'b': 2}.keys() | {'a': 2, 'c': 4}.keys()]
['a', 'b', 'c']

>>> [k for k in {'a': 1, 'b': 2}.keys() & {'a': 2, 'c': 4}.keys()]

['a']
```

iterates over the (key, value) pairs of dictionary using items(). Each pair is tuple.

```
>>> id2salary = {0: 100, 3:900, 1: 1222}
>>> names = ['Larry', 'Curly', '',  'Moe']
>>> {names[k]: v for k,v in id2salary.items()}
{'Curly': 1222, 'Larry': 100, 'Moe': 900}
```

#### Defining one-lin procedures
```python
def twice(z): return z * 2
```
The word _def_ introduces a procedure definition. name of function being defined is twice, the variable z called the _formal argument_ to the procedure. once this procedure is defined, you can invoke it using the usual notation: the name of procedure followed by expression in parentheis, e.g: _twice(1+ 2)_. The value 3 of expression _1+2_ is _actual agument_ to the procedure. when procedure invoked, the formal agument is temporarily bound to the actual argument, and the body of procedure is excuted. at the and, the binding of the actual argument is removed. 
