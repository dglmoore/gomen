// # Graphs
//
// We need to extend `JSNetworkX` with a few algorithms that it doesn't
// provide. This is where we do it. The `jsnx` module is modified directly and
// is exported.
const jsnx = require('jsnetworkx');
const ow = require('ow');
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
    ow(n, ow.number.integer.greaterThanOrEqual(2));
    ow(m, ow.number.integer.inRange(1, n-1));

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
    ow(n, ow.number.integer.greaterThan(1));

    let g = jsnx.cycleGraph(n-1);
    for (let i = 0; i < n-1; ++i) {
        g.addEdge(i, n-1);
    }
    return g;
};

jsnx.starGraph = function(n) {
    ow(n, ow.number.integer.greaterThan(1));

    let g = jsnx.emptyGraph(n-1);
    for (let i = 0; i < n-1; ++i) {
        g.addEdge(i, n-1);
    }
    return g;
};

module.exports = jsnx;
