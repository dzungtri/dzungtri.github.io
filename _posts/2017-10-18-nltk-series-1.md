---
layout: post
title: "Language Processing and Python - Natural Language Toolkit part-1"
description: "Language Processing and Python - Natural Language Toolkit part-1"
date: 2017-09-29
tags: [nltk, Vietnamese, text-analysis-in-python]
comments: true
use_math: true
---

### Create working enviroment

```bash
# change ml-fun to your virtual env name
$ conda activate ml-fun 

# instlal nltk package
$ conda install nltk

# start python shell
$ python

# start nltk ui downloader
>>> nltk.download() 
```
in download screen, select some interesting packages to download, in our article wil use *book* package. Let's have a cup of coffee while wait for the download task to finish.

![nltk downloader](/assets/nltk-series/nltk-downloader.png)

If we try to import data of nltk before the download task not complete yet, there are a *LookupError* error is raised in case *nltk_data* not found, error message as bellow.

```
LookupError: 
**********************************************************************
  Resource 'corpora/gutenberg' not found.  Please use the NLTK
  Downloader to obtain the resource:  >>> nltk.download()
  Searched in:
    - '/Users/dungntnew/nltk_data'
    - '/usr/share/nltk_data'
    - '/usr/local/share/nltk_data'
    - '/usr/lib/nltk_data'
    - '/usr/local/lib/nltk_data'
**********************************************************************
```

### Variety of basic analyses tasks.

#### Import NLTK Book Data

```python
>>> from nltk.book import *
```

After run command *from nltk.book import \**, data of 9 books will be assigned corresponding to  text1-> text9 in our environment. We can use: *texts()*, *sents()* to list loaded materials.

```python
>>> text1

```

#### Counting, concordancing, collection discovery and display the results.

To work with basic task in nltk, we can import *word_tokenize* or *sent_tokenize* and *Text* class from *nltk.text*. 

##### search text in paragraph

to search a word stored in *text1*, we use function *concordance()*. (From Wikipedia, in linguistic _concordance_ mean, a form of cross-reference between different parts of a sentence or phrase. That function is a special nltk function in Text class. Basically, if we want to use the *.concordance()*, we have to instantiate a Text object and call it on that object. E.g:

```python
from nltk.text import Text

# load text document to list of words 
text_list = ['word1', 'word2', ...] 

text_list_nltk = Text(text_list)

# print a concordance for *word* (with specified context window, word matching is not case-sentisive.)
my_doc.concordance('word-to-search')
```

to load text file to list of tokens, we can use *tokenize* package in nltk. E.g:

```python
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.text import Text

# path to text file
file_path = 'path_to_file.txt'

# read file to raw text
raw_text = open(file_path).read()

# tokenize
tokens = word_tokenize(raw_text)

# convert to nltk Text (list in nltk)
text_list_nltk = Text(tokens)

# then search, counting, concordancing, etc..
text_list_nltk.concordance('a word.')

```

##### Find other words which appear in the same context as specified word; list most similar words first.

```python
>>> text_list_nltk.similar('specified word', num=num_of_words_to_generate)
```

for example, with *text1*, result of _similar_ function is:

```
>>> text1.similar("monstrous")
true contemptible christian abundant few part mean careful puzzled
mystifying passing curious loving wise doleful gamesome singular
delightfully perilous fearless
```

with same _similar_ function, result when run in _text2_
```
>>> text2.similar('monstrous')
very so exceedingly heartily a as good great extremely remarkably
sweet vast amazingly
```

as results above, we can see that: *monstrous* in book 2 so cute and kindkind, in book 2 have quite negative meaning. 

##### Counting in Text

To counting all words in document, use default python len
```python
>>> len(text3)
44764
```
there are 44.764 words in text3

To count words used in doucment. convert list word to Python set and count by len function.
```python
>>> len(set(text3))
2789
```
that result mean, there are 2789 words used in that document, less than 3000 words in English is used in that book. So if you learn just 3000 common words in English you can read good that book!.

The next task, view all words used in that book by function: *sorted* and *set*
```python
>>> sorted(set(text3))
['!', "'", '(', ')', ',', ',)', '.', '.)', ':', ';', ';)', '?', '?)', 'A', 'Abel', 'Abelmizraim', 'Abidah', 'Abide', 'Abimael', 'Abimelech', 'Abr', 'Abrah', 'Abraham', 'Abram', 'Accad', 'Achbor', 'Adah', 'Adam', 'Adbeel', 'Admah', 'Adullamite', 'After', 'Aholibamah', 'Ahuzzath', 'Ajah', 'Akan', 'All', 'Allonbachuth', 'Almighty', 'Almodad', 'Also', 'Alvah', 'Alvan', 'Am', 'Amal', 'Amalek', 'Amalekites', 'Ammon', 'Amorite', 'Amorites', 'Amraphel', 'An', 'Anah', 'Anamim', 'And', 'Aner', 'Angel', 'Appoint', 'Aram', 'Aran', 'Ararat', 'Arbah', 'Ard', 'Are', 'Areli', 'Arioch', 'Arise', 'Arkite', 'Arodi', 'Arphaxad', 'Art'....
```

Counts the number of occurences of a word in the document with: *.count*

```python
>>> text3.count('lol')
704
```

So fun, the word *lol* appeared 704 times in that book. 

Calculate frequence of occurences of a word in document

```python
>>> text3.count('lol') / len(text3)
```
It's useful to statistics the appear of event or specified word in document.

#### Lists of Words

##### Lists
when run *from nltk.book import \**, there are some *sent-x* is imported for our. se can inspect value of *sent1*
```python
>>> sent1
```
In nltk, one sentence is a python list, for example, sentence: ""Donald Trump is president 45th of USA" in python is:
```python
>>> my_sent = ["Donald", "Trump", "is", "president", "45th", "of", "USA"]
>>> len(my_sent)
7
>>> sorted(set(my_sent))
['45th', 'Donald', 'Trump', 'USA', 'is', 'of', 'president']
>>> my_sent.count('is')
1
```

Index, Slicing in List

```python
>>> text4[1005]
'Heaven'

>>> text4.index('Heaven')
10005

>>> text4[16715:16735]
['U86', 'thats', 'why', 'something',...]
```

##### Strings

```python
>>> my_str = "Donald Trump is president 45th of US"
>>> my_str[5]
'd'
>>> my_str.index("i")
13
>>> my_str + " and very rich"
'Donald Trump is president 45th of US and very rich'
>>> my_str * 2
'Donald Trump is president 45th of USDonald Trump is president 45th of US'
```

#### Basic Statistics

##### Frequency Distributions

| Word | Frequency |
|--- | --- |
| the | 2 |
| is | 5 |
| book | 2 |
| --- | --- |

Above table is a frequency distributions, that table list words and the number of occurences of that word. In NLTK we can use class *nltk.probability.FreqDist* to calculate frequency distributions. 

```python
# import FreqDist class from probability package
>>> from nltk.probability import FreqDist

# import sample data from book to text1, text2...
>>> from nltk.book import *

# create instance of FreqDist with text1 as data
>>>fdist1 = FreqDist(text1)

# list top N(=50) most common words in text1
>>> vocabulary1 = list(fdist1.keys())
>>> vocabulary1[:50]
['[', 'Moby', 'Dick', 'by', 'Herman', 'Melville', '1851', ']', 'ETYM...]

# visualize result with matplotlib
>>> fdis1.plot(50)

# set cumulative
>>> fdist1.plot(10, cumulative=True)
```  

##### Select words with conditions

__1.  {w | w $\in$ V & P(w)}__ -> [w for w in V if P(w)]


###### example 1: get list of words that have len > 15

```python

>>> V = set(text1)

>>> result = [w for w in V if len(w) > 15]

>>> sorted(result)

```

###### example 2: get list of words that have len > 7 and appeared times > 7

```python
>>> fdist = FreqDist(text1)
>>> result = [w for w in set(text1) if len(w) > 7 and fdist[w] > 7]
```

#### Collocations and Bigrams

The definition of __collocations__ refers to a group of words that often go together or that are likely to occur together.

A __bigram__ or __digram__ is a sequence of two adjacent elements from a string of tokens, which are typically letters, syllables, or words. A bigram is an n-gram for $n=2$. The frequency distribution of every bigram in a string is commonly used for simple statistical analytis of text. Bigrams help provide the conditional probability of token given the preceding token, when the relation of the conditional probability is applied:

$$
P(W_{n}|W_{n-1}) = \frac{P(W_{n-1}, W_{n})}{P(W_{n-1})}
$$
That is, the probability $P()$ of token $W_{n}$ given the preceding token $W_{n-1}$ is equal to the probability of their bigram, or the co-occurrence of the two tokens $P(W_{n-1}, W_{n})$, divided by the preceding token.










