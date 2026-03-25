---
layout: post
title: "Play music on Terminal via python"
description: "Play music on Terminal via python"
date: 2017-09-14
tags: [sady, terminal, music]
comments: true
---

<p align="center">
  <p align="center">
	 A simple python play music tool
	 <br>
	 <br>
	 <a class="no-hov" href="https://github.com/dzungtri/sady"><img src="/assets/sady/sady-1.png"></a>
	 <a class="no-hov" href="https://raw.githubusercontent.com/dzungtri/sady/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
	 <br><br>
  </p>
</p>
<br>

Sady is a minimal cloud music search and play tools. Perfect for Terminal lover
Coding and Relax without open Web browser. Sady tool also include some quick command
for example: help, search, download sync, list, history.
That tools was developed with perpose for learning Python 3 in my free time,
I'm looking forward your contribute and feedback.

## Features
- Written entries on Python3
- Best module practice with separated layers: UI - handlers - services
- Async request
- Local cache synced music file => you can play without network connect.

## Usage

### Quick Install


```
$ curl "https://raw.githubusercontent.com/dzungtri/sady/master/install.sh?v=1.0" | sh
```

This script use for Macosx only. For ubuntu or other linux users please use manual install.
current issues: zsh: command not found: just after installed in current termial session
=> open other termial tab to reload ~/.bash_profile  or: source ~/.bash_profile to take effect.



### Dependences
- python >= 3.3 (asyncio requires Python 3.3 or later)
- mplayer (music player commandline version)

### Manual Initialization

Install dependences if need (MacOSX).

( For other linux - window users , to install mplayer and python3 please type:`$ [google('how to install %s' % pkg for pkg in dependences)] `)

```
# install mplayer via homebrew
$ brew install mplayer

# install python3
$ brew install python3
```

Clone & Install `sady`

(For all linux users & Macosx users)
```
# clone repo to your local directory
$ SADY_HOME_DIR=~/.sady
$ git clone git@github.com:dzungtri/sady.git $SADY_HOME_DIR
$ cd $SADY_HOME_DIR

# create python env & install dependence python packages
$ virtualenv -p python3 ./env && source ./env/bin/activate
$ pip install -r requirements.txt
```

Add `sady` commandline to your bashrc (~/.bash_profile)

(For all linux users & Macosx users)
```
$ echo "export SADY_HOME_DIR=$SADY_HOME_DIR" >> ~/.bash_profile
$ echo "alias sady='cd $SADY_HOME_DIR && ./env/bin/python3 ./__init__.py'" >> ~/.bash_profile
$ source ~/.bash_profile
```

### Run -> to enjoy (๑˃̵ᴗ˂̵)
```
$ sady -q "Lets it go Idina Menzel"
```


### Usage

cmd mod

| command        | description |
| ------------- |:-------------:|
| any | search and play any track by name, keywords, etc.. |
| exit | to quit sady |
| search      | search track by name, keywords, singer, etc..  |
| select      | select one track index to play (auto sync)       |
| sync | sync track to play in local with track index (no param -> all)|
| list | list all tracks in playlist (alias: ll, top)|
| next | next tracks page |
| prev | prev tracks page |

playing mod:

( ref: player --help  or man player to see help)

| command        | description
| ------------- |:-------------:|
| q | to quit mplayer - back to sady cmd |
| space | to pause - replay track |

## Screen shoots

#### Start tool and show available commands
![Center screen -1 ](/assets/sady/sady-1.png "Center")
{: .center}

#### Free style search music by song title and singer
![Center screen -2 ](/assets/sady/sady-2.png "Center")
{: .center}

#### Select a song to play from list
![Center screen -3 ](/assets/sady/sady-3.png "Center")
{: .center}

#### After song synced - sound will play via mplayer
![Center screen -4 ](/assets/sady/sady-4.png "Center")
{: .center}

# Licnese
The MIT License (MIT)

Copyright (c) 2017 DZung Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
