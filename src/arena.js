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

    // ## Prototype

    const proto = {
        // Get the `size` of the arena, i.e. the number of agents.
        size() {
            return this.graph.order();
        },

        // Compute the `payoff` of each agent's possible strategy against all
        // agent's current strategy `ss`. The result is a `size() x 2` matrix
        // with element `[i][s]` the payoff agent `i` would receive if it had
        // chosen strategy `s`.
        payoff(ss) {
            if (!Array.isArray(ss)) {
                throw new TypeError(`strategies must be an array, got ${ss}`);
            } else if (ss.length !== this.size()) {
                const msg = 'strategies must have same size as arena';
                const res = `expected ${this.size()}, got ${ss.length}`;
                throw new RangeError(`${msg}; ${res}`);
            }
        }
    };

    // The resulting object exposes `game` and `graph` as enumerable members.
    return Object.assign(Object.create(proto), { game, graph });
};

module.exports = Arena;
