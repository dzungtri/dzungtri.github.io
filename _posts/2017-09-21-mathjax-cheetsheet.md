---
layout: post
title: "Mathematical notation, equation, formulas with MathJax"
description: "Mathematical notation, equation, formulas use MathJax (Ams -
 LaTex syntax)."
date: 2017-09-21
tags: [Markdown, Math, LaTeX, Mathjax]
comments: true
use_math: true
---


#### *Inline* formulas and *block* formulars
Enclose the formula in `$...$`. For display block formula: `$$...$$`.

These render differently. For example, type:  
`$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$`  
to show: $\sum_{i=0}^n i^2 = \frac{(n^2 + n)(2n + 1 )}{6}$ which is inline mode or type:  
```
$$
\sum_{i=0}^n = \frac{(n^2 + n)(2n + 1)}{6}
$$
```
to show:  
$$
\sum_{i=0}^n = \frac{(n^2 + n)(2n + 1)}{6}
$$

#### Greek Letters
For __Greek letters__,use `$ \alpha, \beta, ..., \omega $`: $\alpha, \beta, \omega$. For uppercase, use: `$ \Gamma \Delta \Omega$`: $ \Gamma \Delta \Omega$.

To show:  

$$
\forall x \in X, \quad \exists y \leq \epsilon
$$  

write:  

```
\forall x \in X, \quad \exists y \leq \epsilon
```


#### For **superscripts and subscripts**
Use `^` and `_`. For example: `$x_i^2$`: $x_i^2$, `$\log_2 x$`: $\log_2 x$

#### Groups
Superscript and subcripts, and other operations apply only to the next "group". A "groups" is iether a single symbol, or any formula surrounded by curly braces _{...}_. If you do `10^10`, you will get surprise: $10^1$0. But `10^{10}` gives what you probaly wanted: $10^{10}$. Use curly braces to delimit a formula to which a superscripts or subscridpt applies: `x^5^6` is an error; `{x^y}^z` is: ${x^y}^z$. And `x^{y^z}` is $x^{y^z}$. Observe the difference between `x_i^2` $x_i^2$ and `x_{i^2}` $x_{i^2}$.

#### Parentheses
Ordinary symbols `() []` make parentheses and brackets $(2+3)[4 + 4]$. Use `\{` and `\}` for curly braces {}.

Using `\left(`...`\right)` to make size ajust automatically to the formula they enclose, for example:  
$\left( \frac{\sqrt{x}}{y^3} \right)$

Some sorts for `\left ...\right`:  
```
$ \left( x  \right) $
$ \left[ x  \right] $
$ \\{ x \\} $
$ | x | $
$ \left| \frac{x+1}{x} \right| $
$ \left\vert x  \right\vert $
$ \left\Vert x  \right\Vert $
$ \langle x \rangle $
$ \lceil x \rceil $
$ \lfloor x \rfloor$
```
$\left( x  \right)$
$\left[ x  \right]$   

$\\{x + 1\\}$  
$ | x | $  
$ \left| \frac{x+1}{x} \right| $  
$ \left\vert x  \right\vert $
$ \left\Vert x  \right\Vert $ 
$ \langle x \rangle $  
$ \lceil x \rceil $  
$ \lfloor x \rfloor$

There are also invisible parentheses, denoted by `.`: `\left.\frac12\right\rbrace` is $\left.\frac12\right\rbrace$.

#### Sum and integrals
`\sum` and `\int`; the subscript is lower limit and superscript is the upper limit, so for example:  
`\sum_1^n` is $\sum_1^n$. Dont forget *{}* if the limits are more than a single symbol. For example:  
`\sum_{i=0}^{\infty} i^2` is $\sum_{i=0}^{\infty} i^2$.  
Similarly, `\prod` $\prod$ and `\int` $\int$, `\bigcup` $\bigcup$, `\bigcap` $\bigcap$, `\iint` $\iint$.

Example: in mathematics, A the symbol $\prod$ is representing a product over a set of terms.
$$
 \prod_{n=1}^3 2n = 2 \cdot 4 \cdot 6
$$

$$
\begin{eqnarray}
\max (a, b)
= 
  \begin{cases}
  a & (a\geqq b) \\
  b & (a \lt  b)
  \end{cases}
\end{eqnarray}
$$

#### Fractions
The are two ways to make these. `\frac ab` applies to next two groups and produces $\frac ab$; for more complicated numerators and denominators use `{..}`: `$\frac{a +1}{b + 1}$` is $\frac{a +1}{b + 1}$. If the numrator and denominator are complicated, you maybe prefer `\over` which splits up the group that it is in: `{a+1}\orver{b+1}` is: ${a + 1} \over {b + 1}$.
#### Radical signs
use `sqrt`, which ajust to size of its argument:  
`\sqrt{x^3}` is $\sqrt{x^3}$ and `\sqrt[3]{x^5}` is $\sqrt[3]{x^5}$. For complicated expressions, consider using `{..}^{x/y}` instead. Example: $\left(\frac{x^3+y}{z - 1}\right)^{3\over4}$ or $ \sqrt[4]{ \left({x^3+y} \over {z-1} \right)^3}$

#### Special functions
"lim", "sin", "max", "ln" and so on are normally set in roman font. Use: `\lim`, `\sin`, etc.  
Example: `\lim_{x\to0}` is $\lim_{x\to 0}$

#### Accents and diacritial marks
`\hat x` is: $\hat x$, `\widehat` for larger formula: $\widehat {xy}$   
`\bar` is: $\bar x$, or `\overline` is $\overline{xyz}$  
`\vec` is: $\vec x$, or `\overrightarrow` is $\overrightarrow{xyz}$.

#### Matrices  
Use `$$\begin{matrix} ... \end{matrix}`. In between the begin and end, put the matrix elements. End each matrix row with `\\`. seperate each matrix column element with `&`.

```
$$
    \begin{pmatrix}
     1 & x & x^2 \\
     1 & y & y^2 \\
     1 & z & z^2 \\ 
    \end{pmatrix}
$$

```

$$
    \begin{pmatrix}
     1 & x & x^2 \\
     1 & y & y^2 \\
     1 & z & z^2 \\ 
    \end{pmatrix}
$$

To add brackets, either use `\left, \right` or replace the _matrix_ with:  
`pmatrix` for  
$$\begin{pmatrix} 1&2 \\ 3&4 \end{pmatrix}$$  
`bmatrix` for  
$$\begin{bmatrix}1&2 \\ 3&4\end{bmatrix}$$  
`Bmatrix` for  
$$\begin{Bmatrix}1&2 \\ 3&4\end{Bmatrix}$$  
`vmatrix` for  
$$\begin{vmatrix}1&2 \\ 3&4\end{vmatrix}$$  
`Vmatrix` for  
$$\begin{Vmatrix}1&2 \\ 3&4\end{Vmatrix}$$.  

Use `\cdots` $\cdots$, `\ddots` $\ddots$, `\vdots` $\vdots$ when want to omit some the entries:

$$
\begin{Vmatrix}
1 & a_1 & a_1^2 & \cdots & a_1^n \\
1 & a_2 & a_2^2 & \cdots & a_2^n \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & a_m & a_m^2 & \cdots & a_m^n
\end{Vmatrix}
$$

For "Augmented" matrics, put parentheses or brackets around a suitably-formatted tables, for examples:

$$
\left[
  \begin{array}{cc|c}
  1 & 2 & 3\\
  4 & 5 & 6
  \end{array}
\right]
$$

is produced by:

```
$$
\left[
  \begin{array}{cc|c}
  1 & 2 & 3\\
  4 & 5 & 6
  \end{array}
\right]
$$
```

For small inline matrics, using: `\bigl( \begin{small matrix}     ....   \end{smallmatrix} \bigr)`. For example:  
matrix: $\bigl[ \begin{smallmatrix} 1 & 2 \\\ 3 & 4 \end{smallmatrix} \bigr]$  is produced by:  
```
$\bigl[ \begin{smallmatrix} 1 & 2 \\ 3 & 4 \end{smallmatrix}\bigr]$
```

#### Definitions by cases piecewise functions

Use `\begin{cases} ..\end{cases}`. For each case with a `\\`, and use `&` before parts that should be aligned.

For example, you get this:  

$$
f(n) = 
\begin{cases}
 n/2, & \text{if $n$ is even} \\
 3n + 1, &\text{if $n$ is odd}
\end{cases}
$$  

By writing this:  

```
f(n) = 
\begin{cases}
  n/2, & \text{if $n$ is even}\\
  3n + 1, & \text{if $n$ is odd}
\end{cases}
```

The brace can be moved to the right:

$$
\left.
\begin{array}{1}
\text{if $n$ is even: } & n/2\\
\text{if $n$ is odd: } & 3n + 1
\end{array}
\right\}
= f(n)
$$

by writing this:

```
\left.
  \begin{array}{1}
    \text{if $n$ is even: } & n/2\\
    \text{if $n$ is odd: } & 3n + 1
  \end{array}
\right\}
= f(n)
```

To get a larger vertical space between cases we can use `\\[2ex]` instead of `\\`. For example you get this: 

$$
f(n) = 
\begin{cases}
  \frac{n}{2}, & \text{if n is even} \\[2ex]
  3n + 1, & \text{if n is odd}
\end{cases}
$$

By writing this:

```
f(n) = 
\begin{cases}
  \frac{n}{2}, & \text{if n is even} \\[2ex]
  3n + 1, & \text{if n is odd}
\end{cases}
```

#### Arrays

It is often easier to read table formatted in Math Jax rather than plain text or  
fixed width font. Array and tables are created with the array evironment. Just ater `\begin {array}` the format of each column should be listed, use `c` for a center column, `r` for right aligned, `l` for left aligned and a `|` for vertical line. body is a matrices, cells is separated by `&` and rows is broken using `\\`. A horizontal line spanning the array can be placed before the current line with `hline`.

For example,

$$
\begin{array}{c|lcr}
n & \text{Left} & \text{Center} & \text{Right} \\
\hline
1 & 0.24 & 1 & 125 \\
2 & -1 & 189 & -8 \\
3 & -20 & 2000 & 1+10i
\end{array}
$$

```
$$
\begin{array}{c|lcr}
n & \text{Left} & \text{Center} & \text{Right} \\
\hline
1 & 0.24 & 1 & 125 \\
2 & -1 & 189 & -8 \\
3 & -20 & 2000 & 1+10i
\end{array}
$$
```

#### Colors
Named colors are browser dependent. if oa browser dont known particular color name, text will rendered as black.

Example:

$$
\begin{array}{c|r}
  \text{color code} & \text{rendered text} \\
  \hline
  \text{black} & \color{black}{text} \\
  \text{red}  & \color{red}{text} \\
  \text{blue}  & \color{blue}{text} \\
  \text{green}  & \color{green}{text}
\end{array}
$$

```
$$
\begin{array}{c|r}
  \text{color code} & \text{rendered text} \\
  \hline
  \text{black} & \color{black}{text} \\
  \text{red}  & \color{red}{text} \\
  \text{blue}  & \color{blue}{text} \\
  \text{green}  & \color{green}{text}
\end{array}
$$
```

#### Complex

```
\underset{j=1}{\overset{\infty}{\LARGE\mathrm K}}\frac{a_j}{b_j}=\cfrac{a_1}{b_1+\cfrac{a_2}{b_2+\cfrac{a_3}{b_3+\ddots}}}
```

To get: 

$$
\underset{j=1}{\overset{\infty}{\LARGE\mathrm K}}\frac{a_j}{b_j}=\cfrac{a_1}{b_1+\cfrac{a_2}{b_2+\cfrac{a_3}{b_3+\ddots}}}
$$

#### Commutative diagrams
```
$\require{AMScd}$
\begin{CD}
    A @>a>> B\\
    @V b V V= @VV c V\\
    C @>>d> D
\end{CD}
```

to get this diagram: 

$\require{AMScd}$
$$
\begin{CD}
    A @>a>> B\\
    @V b V V= @VV c V\\
    C @>>d> D
\end{CD}
$$

```
@>>> is used for arrow right

@<<< is used for arrow left

@VVV is used for arrow down

@AAA is used for arrow up

@= is used for horizontal double line

@| is used for vertical double line

@. is used for no arrow
```

Another example:

```
 \begin{CD}
        A @>>> B @>{\text{very long label}}>> C \\
        @. @AAA @| \\
        D @= E @<<< F
    \end{CD}
```

$$
 \begin{CD}
        A @>>> B @>{\text{very long label}}>> C \\
        @. @AAA @| \\
        D @= E @<<< F
    \end{CD}
$$


#### Tags & References
For longer calculations or referring to other post's result, it is convenient to use the tagging, labelling, referencing system. To tag an equations use `\tag{your tag}`, and if you want to refer to that tag latter on, add `\label{some label}` right after the `\tag`. It is not necessary that _your tag_ and _some label_ are the same, but it usally is more convenient to do so:

$$ a:= x^2 - y^3 \tag{1}\label{1}$$

In other to refer to an equation, just use `\eqref{somelabel}`

```
$$ a+y^3 \stackrel{\eqref{1}}= x^2 $$
```

$$ a + y^3 \stackrel{\eqref{1}}= x^2 $$

___

$$
x^5 - y = 1\tag{*}\label{*}
$$

```
$$
x^5 - y = 1\tag{*}\label{*}
$$
```

```
Equations are usually referred to as $\eqref{*}$, but you can also use $\ref{*}$.
```


Equations are usually referred to as $$\eqref{*}$$, but you can also use $$\ref{*}$$.

#### Limits

To make a limit (like $$\lim\limits_{x \to 1} \frac{x^2}{x-1} $$), use this syntax: 

First, start off with `$\lim`. This renders as lim. The backslash is there to prevent things like _lim_, where the lettrs are slanted.

The Seconds, add `\limits_{x \to 1}` inside. The code now looks like: `$\lim \limits_{ x \to 1}$`, and renders as $\lim \limits_{x \to} 1$. The `\to` inside makes the right arrow, rendered as $\to$. The `_` makes  the $x \to1 $ go underneath the lim. Finally, the pair of curly braces `{}` makes sure that $x \to 1$ is treated as a whole object and not two separete things.

Lastly, add the function you want to apply the limit to. To make the limit mentioned above, simply use `$\lim \limits_{x \to 1} \frac{x^2}{x-1}$`  

And that is how you make a limit using MathJax.

#### Sequnce of equations with align

To produce this:

$$
\begin{align}
  v + w = 0 && \text{Given} \tag 1 \\
  -w = -w + 0 && \text{additive identity} \tag 2 \\
  -w + 0 = -w + (v + w) && \text{equations $(1)$ and $(2)$}  
\end{align}
$$

write this:
```

$$
\begin{align}
  v + w = 0 && \text{Given} \tag 1 \\
  -w = -w + 0 && \text{additive identity} \tag 2 \\
  -w + 0 = -w + (v + w) && \text{equations $(1)$ and $(2)$}  
\end{align}
$$
```

#### Highlighting equation
To highlighting an equation, use `\bbox` can be used. E.g, 

$$ \bbox[black,5px]
{
  e^x = \lim \limits_{n \to \infty} \left(1 + \frac{x}{n}\right)^n
}
$$

is produced by:

```
$$ \bbox[black,5px]
{
  e^x = \lim \limits_{n \to \infty} \left(1 + \frac{x}{n}\right)^n
}
$$
```

To add border, use:

$$
\bbox[5px,border:2px solid red]
{
  e^x = \lim\limits_{n \to \infty} \left( 1 + \frac{x}{n}\right)^n \qquad (2)
}
$$

```
$$
\bbox[5px,border:2px solid red]
{
  e^x = \lim\limits_{n \to \infty} \left( 1 + \frac{x}{n}\right)^n \qquad (2)
}
$$
```

#### Degree symbol

The degree symbol for angles is not `^\circ`. For example  
$90^\circ$ is rendered by `90^\circ`.

[Learn more LaTeX Mathematics commands](https://en.wikibooks.org/wiki/LaTeX/Mathematics)
