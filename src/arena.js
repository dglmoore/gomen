// # Arenas - Where Games are Played

// An `Arena` consists of a 2-player `game` played by all agents, and an
// undirected `graph` representing the neighborhoods of each agent, i.e. which
// pairs of agents can play each other.
const Arena = function(game, graph) {
    // The `graph` must be non-empty, i.e. must have at least one node.
    if (graph.order() === 0) {
        throw new RangeError('graph is empty');

    // The `graph` may not have any disconnected agents, i.e. everyone must
    // have someone to play with.
    } else if (Array.from(graph.degree().values()).includes(0)) {
        throw new RangeError('graph has a disconnected node');
    }
    // In order to completely specify how the games should be played, each edge
    // of the graph must be labled with which of it's two vertex agents will be
    // playing first player, e.g.
    // ```
    // > graph.getEdgeData(0, 1)
    // { first: 0 }
    // ```
    for (let edge of graph.edges(true)) {
        let [u, v, { first }] = edge;
        if (first === undefined || (first !== u && first !== v)) {
            throw new RangeError(`graph has a mislabeled edge; got ${JSON.stringify(edge)}`);
        }
    }

    // ## Prototype

    // The `Arena`'s prototype provides the following functionality
    const proto = {
        // * One can ask for the `size` of the arena, i.e. the number of
        //   agents.
        size() {
            return this.graph.order();
        }
    };

    // The resulting object exposes `game` and `graph` as enumerable members.
    return Object.assign(Object.create(proto), { game, graph });
};

module.exports = Arena;
