// # Graphs
//
// We need to extend `JSNetworkX` with a few algorithms that it doesn't
// provide. This is where we do it. The `jsnx` module is modified directly and
// is exported.
const jsnx = require('jsnetworkx');
const is = require('is');
const random = require('random');
const { iota, zip, randomSubset } = require('./util.js');

// Barabasi-Albert Graphs
//
// This function generates graphs according to the Barabasi-Albert preferential
// attachment algorithm.  It expects as arguments the number of nodes in the
// graph `n`, and the number of prior nodes to which to connect `m`.
// Optionally, the user may specify a random number generator `rng=random`.
//
// ## Examples
// ```
// > let g = jsnx.barabasiAlbertGraph(5,1)
// undefined
// > g.order()
// 5
// > g.size()
// 4
// ```
jsnx.barabasiAlbertGraph = function(n, m, rng=random) {
    if (!is.integer(n)) {
        throw new Error('number of nodes is not an integer');
    } else if (is.lt(n, 2)) {
        throw new Error('number of nodes is less than 2');
    }
    if (!is.integer(m)) {
        throw new Error('number of connections is not an integer');
    } else if (!is.within(m, 1, n-1)) {
        throw new Error('number of connections is not in [1, n) with n the number of nodes');
    }

    let g = jsnx.emptyGraph(m);
    let targets = iota(m);
    let repeated_nodes = new Array();
    let source = m;
    while (source < n) {
        const sources = new Array(m).fill(source);
        g.addEdgesFrom(zip(sources, targets));
        Array.prototype.push.apply(repeated_nodes, targets);
        Array.prototype.push.apply(repeated_nodes, sources);
        targets = randomSubset(repeated_nodes, m, rng);
        source += 1;
    }

    return g;
};

jsnx.wheelGraph = function(n) {
    if (!is.integer(n)) {
        throw new Error('number of nodes is not an integer');
    } else if (is.lt(n, 2)) {
        throw new Error('number of nodes is less than 2');
    }

    let g = jsnx.cycleGraph(n-1);
    for (let i = 0; i < n-1; ++i) {
        g.addEdge(i, n-1);
    }
    return g;
};

jsnx.starGraph = function(n) {
    if (!is.integer(n)) {
        throw new Error('number of nodes is not an integer');
    } else if (is.lt(n, 2)) {
        throw new Error('number of nodes is less than 2');
    }

    let g = jsnx.emptyGraph(n-1);
    for (let i = 0; i < n-1; ++i) {
        g.addEdge(i, n-1);
    }
    return g;
};

const gridIndex = (m) => (i, j) => j + i * m;

jsnx.latticeGraph = function(n, m) {
    if (!is.integer(n) || !is.integer(m)) {
        throw new Error('dimensions are not integers');
    } else if (is.lt(n, 2) || is.lt(m, 2)) {
        throw new Error('dimensions must be at least 2x2');
    }

    const index = gridIndex(m);

    let g = jsnx.emptyGraph(n*m);
    for (let i = 0; i < n - 1; ++i) {
        g.addEdge(index(i,0), index(i+1, 0));
    }
    for (let j = 0; j < m - 1; ++j) {
        g.addEdge(index(0,j), index(0, j+1));
    }
    for (let i = 1; i < n; ++i) {
        for (let j = 1; j < m; ++j) {
            g.addEdge(index(i,j), index(i-1, j));
            g.addEdge(index(i,j), index(i, j-1));
        }
    }
    return g;
};

module.exports = jsnx;
