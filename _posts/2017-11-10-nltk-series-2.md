---
layout: post
title: "Language Processing and Python - Natural Language Toolkit part-2"
description: "Language Processing and Python - Natural Language Toolkit part-2"
date: 2017-11-10
tags: [nltk, Vietnamese, text-analysis-in-python]
comments: true
use_math: true
---


#### Corpus/Corpora
In linguistics, a corpus (plural corpora) or text corpus is a large and structured set of texts (nowadays usually electronically stored and processed). They are used to do statistical analysis and hypothesis testing, checking occurrences or validating linguistic rules within a specific language territory.
[Wikipedia](https://en.wikipedia.org/wiki/Text_corpus)

#### Treebank
In linguistics, a treebank is a parsed text corpus that annotates syntactic or semantic sentence structure. [Wikipedia](https://en.wikipedia.org/wiki/Treebank)

#### Corpora in NLTK

##### Gutenberg Corpus
Gutenberg is a project provided free 25.000 books [home page](https://www.gutenberg.org/). 

To list all book from Gutenbers that provided in NLTK.

```python
>>> from nltk.corpus import gutenberg
>> gutenberg.fileids()
['austen-emma.txt', 'austen-persuasion.txt', 'austen-sense.txt', ..]
```

select a book and import data to Python variable

```python
>>> emma = nltk.corpus.gutenberg.words
('austen-emma.txt')
>>> len(emma)
192427
```

That book named Emma, there are 192.427 words.

###### Problem-1: Calculate the avarage length of each word, the evarage length of each sentence, and the avarage number of occurrences of a word in all Gutenberg's books provided by NLTK.


```python
from nltk.corpus import gutenberg as bookdb

for book_id in bookdb.fileids():
    num_chars = len(bookdb.raw(book_id))
    num_words = len(bookdb.words(book_id))
    num_sents = len(bookdb.sents(book_id))
    num_vocabs = len(set(
    [w.lower() for w in bookdb.words(book_id)]
    ))
    
    print('{} {} {} {}'.format(
      int(num_chars/num_words),
      int(num_words/num_sents),
      int(num_words/num_vocabs),
      book_id
    ))
  
```

result:

```bash
4 24 26 austen-emma.txt
4 26 16 austen-persuasion.txt
4 28 22 austen-sense.txt
4 33 79 bible-kjv.txt
4 19 5 blake-poems.txt
4 19 14 bryant-stories.txt
4 17 12 burgess-busterbrown.txt
4 20 12 carroll-alice.txt
4 20 11 chesterton-ball.txt
4 22 11 chesterton-brown.txt
4 18 10 chesterton-thursday.txt
4 20 24 edgeworth-parents.txt
4 25 15 melville-moby_dick.txt
4 52 10 milton-paradise.txt
4 11 8 shakespeare-caesar.txt
4 12 7 shakespeare-hamlet.txt
4 12 6 shakespeare-macbeth.txt
4 36 12 whitman-leaves.txt
```

##### Web & Chat Text Corpus
```
# try with webtext
from nltk.corpus import webtext

for fileid in webtext.fileids():
    print('{} - {}'.format(fileid, webtext.raw(fileid)[:25]))

# try with nps chat
from nltk.corpus import nps_chat
nps_chat.fileids()

chatroom = nps_chat.posts('10-19-30s_705posts.xml')
chatroom[:50]
```

##### Brown Corpus
The Brown Corpus was the first million-word electronic corpus of English, created in 1961 at Brown University. This corpus contains text from 500 sources, and the sources have been categorized by genre, such as news, editorial, and so on. 1.1 gives an example of each genre (for a complete list, see http://icame.uib.no/brown/bcm-los.html).

We can access the corpus as a list of words, or a list of sentences (where each sentence is itself just a list of words). We can optionally specify particular categories or files to read:

```python
from nltk.corpus import brown
brown.categories()

['adventure',
 'belles_lettres',
 'editorial',
 'fiction',
 'government',
 'hobbies',
 'humor',
 'learned',
 'lore',
 'mystery',
 'news',
 'religion',
 'reviews',
 'romance',
 'science_fiction']
```

fetch some words in category 'news'.
```python
from nltk.corpus import brown

brown.words(categories='news')

['The', 'Fulton', 'County', 'Grand', 'Jury', 'said', ...]
```

fetch some sentences in list categories

```python
from nltk.corpus import brown

brown.sents(categories=['news', 'reviews', 'Friday'])
```

Next, we need to obtain counts for each genre of interest. We will use NLTK's suport for conditional frequency distributions. 

##### Loading your own Corpus
