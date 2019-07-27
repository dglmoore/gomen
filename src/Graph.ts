// # Graphs
//
// We need to extend `JSNetworkX` with a few algorithms that it doesn't
// provide. This is where we do it. The `Graph` module is modified directly and
// is exported.
const is = require('is');
const Graph = require('jsnetworkx');

import { iota, random, randomSubset, RNG, zip } from './Util';

Graph.barabasiAlbertGraph = (n: number, m: number, rng: RNG = random): any => {
    if (!is.integer(n)) {
        throw new Error('number of nodes is not an integer');
    } else if (is.lt(n, 2)) {
        throw new Error('number of nodes is less than 2');
    }
    if (!is.integer(m)) {
        throw new Error('number of connections is not an integer');
    } else if (!is.within(m, 1, n - 1)) {
        throw new Error('number of connections is not in [1, n) with n the number of nodes');
    }

    const g = Graph.emptyGraph(m);
    let targets = iota(m);
    const repeatedNodes = new Array();
    let source = m;
    while (source < n) {
        const sources = new Array(m).fill(source);
        g.addEdgesFrom(zip(sources, targets));
        Array.prototype.push.apply(repeatedNodes, targets);
        Array.prototype.push.apply(repeatedNodes, sources);
        targets = randomSubset(repeatedNodes, m, rng);
        source += 1;
    }

    return g;
};

Graph.wheelGraph = (n: number): any => {
    if (!is.integer(n)) {
        throw new Error('number of nodes is not an integer');
    } else if (is.lt(n, 4)) {
        throw new Error('number of nodes is less than 2');
    }

    const g = Graph.cycleGraph(n - 1);
    for (let i = 0; i < n - 1; ++i) {
        g.addEdge(i, n - 1);
    }
    return g;
};

Graph.starGraph = (n: number): any => {
    if (!is.integer(n)) {
        throw new Error('number of nodes is not an integer');
    } else if (is.lt(n, 3)) {
        throw new Error('number of nodes is less than 2');
    }

    const g = Graph.emptyGraph(n - 1);
    for (let i = 0; i < n - 1; ++i) {
        g.addEdge(i, n - 1);
    }
    return g;
};

function gridIndex(m: number): (i: number, j: number) => number {
    return (i: number, j: number): number => j + i * m;
}

Graph.latticeGraph = (n: number, m: number): any => {
    if (!is.integer(n) || !is.integer(m)) {
        throw new Error('dimensions are not integers');
    } else if (is.lt(n, 2) || is.lt(m, 2)) {
        throw new Error('dimensions must be at least 2x2');
    }

    const index = gridIndex(m);

    const g = Graph.emptyGraph(n * m);
    for (let i = 0; i < n - 1; ++i) {
        g.addEdge(index(i, 0), index(i + 1, 0));
    }
    for (let j = 0; j < m - 1; ++j) {
        g.addEdge(index(0, j), index(0, j + 1));
    }
    for (let i = 1; i < n; ++i) {
        for (let j = 1; j < m; ++j) {
            g.addEdge(index(i, j), index(i - 1, j));
            g.addEdge(index(i, j), index(i, j - 1));
        }
    }
    return g;
};

export default Graph;
