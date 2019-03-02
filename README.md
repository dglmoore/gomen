# Gomen

| **Build Status**                                                                                |
|:-----------------------------------------------------------------------------------------------:|
| [![][travis-img]][travis-url] [![][appveyor-img]][appveyor-url] [![][codecov-img]][codecov-url] |

[travis-img]: https://travis-ci.com/dglmoore/gomen.svg?branch=master
[travis-url]: https://travis-ci.com/dglmoore/gomen

[appveyor-img]: https://ci.appveyor.com/api/projects/status/8pbhg2lc08mig98h?svg=true
[appveyor-url]: https://ci.appveyor.com/project/dglmoore/gomen

[codecov-img]: https://codecov.io/gh/dglmoore/gomen/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/dglmoore/gomen

Imagine a network of agents playing a two-player game in time, changing their
strategies in time. _Gomen_ is a small project aiming to determine if
information-theoretic tools such as mutual information or transfer entropy can
allows us to infer the game, strategy rule and topology of the graph given only
the time series of the agents' strategies.

To answer this question, we need a number of components

1. A specification of a two-player game ([Game](game.html))
2. An arena, i.e. a graph, on which the game is played ([Arena](#))
3. A scheme for updating player strategies ([Scheme](#))
4. Information-theoretic methods ([Information](#))
