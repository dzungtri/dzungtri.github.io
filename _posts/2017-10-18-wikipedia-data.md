---
layout: post
title: "Use wikipedia package to download data"
description: "Use wikipedia to download sample data"
date: 2017-10-18
tags: [nltk, wikipedia, text-analysis-in-python]
comments: true
use_math: false
---

This is an example use wikipedia to load summary and content text from ![One Piece Wikipadia](https://en.wikipedia.org/wiki/One_Piece) page and save to text file to use for later analytis. 

```bash
# change ml-fun to your virtual env name
$ conda activate ml-fun 

# install wikipedia package
$ conda install wikipedia

# start ipython shell
$ ipython
```

```python

# import wikipedia
>>> import wikipedia
>>> from wikipedia import page

# page name: One Piece
# ref url: https://en.wikipedia.org/wiki/One_Piece
>>> page_name = 'One Piece'
>>> wiki_page = page(page_name)
>>> with open('one_piece_summary.txt') as f:
       f.write(wiki_page.summary)

>>> with open('one_piece_content.txt') as f:
       f.write(wiki_page.content)

# confirm saved data
>>>%cat one_piece_content.txt

# view more function in wiki page object
>>>help(wiki_page)

# you also setting language for wiki 
>>>wikipedia.set_lang("ja")
>>>wikipedia.summary('One Piece', sentences=1)
'『ONE PIECE』（ワンピース）は、尾田栄一郎による日本の少年漫画作品。'
```
