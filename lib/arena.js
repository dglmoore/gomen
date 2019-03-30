// # Arenas - Where Games are Played
const is = require('is');
const random = require('random');
const { Space } = require('./util.js');

// An `Arena` consists of a 2-player `game` played by all agents, an undirected
// `graph` representing the neighborhoods of each agent, i.e. which pairs of
// agents can play each other, and a `scheme` which the agents use to choose a
// strategy.
const Arena = function(game, graph, scheme) {
    // The `graph` must be non-empty, i.e. must have at least one node.
    if (graph.order() === 0) {
        throw new RangeError('graph is empty');

    // The `graph` may not have any disconnected agents, i.e. everyone must
    // have someone to play with.
    } else if (Array.from(graph.degree().values()).includes(0)) {
        throw new RangeError('graph has a disconnected node');
    }

    // ## Prototype
    //
    // There are a few things that an `Arena` needs to be able to do. The
    // prototype of the object provides this functionality.

    const proto = {
        // _**`size()`**_

        // First of all, we need to be able to get the `size` of the `Arena`,
        // i.e. the number of agents. This is particularly useful for
        // allocating arrays and error checking.
        size() {
            return this.graph.order();
        },

        // ********************************************************************
        // _**`payoffs(ss)`**_

        // Next, we need to be able to determine the counterfactual `payoffs`
        // that each player could have recieved given all of the agents'
        // previous strategies `ss`.
        payoffs(ss) {
            // The strategies `ss` must be an array. If that's not the case, we
            // throw a `TypeError`.
            if (!Array.isArray(ss)) {
                throw new TypeError(`strategies must be an array, got ${ss}`);

            // We also need to make sure the array is the right size, namely
            // that each agent has a strategy, and we throw a `RangeError` if
            // that's not true.
            } else if (ss.length !== this.size()) {
                const msg = 'strategies must have same size as arena';
                const res = `expected ${this.size()}, got ${ss.length}`;
                throw new RangeError(`${msg}; ${res}`);
            }

            // We then create a `size() x 2` matrix of `payoffs` where the
            // `[i][s]` element corresponds to the total pay off the `i`th
            // agent would have recieved had they played strategy `s` in the
            // previous round of games.
            //
            // This amounts to looping over each of the agents, then each of
            // that agent's neighbors, and then the possible strategies the
            // agent could have played. Within this looping structure, we
            // accumulate the payoff for each such combination.
            const size = this.size();
            const payoffs = new Array(size);
            for (let i = 0; i < size; ++i) {
                payoffs[i] = [0, 0];
                for (let j of this.graph.neighbors(i)) {
                    for (let s = 0; s < 2; ++s) {
                        payoffs[i][s] += this.game.getPayoff(s, ss[j]);
                    }
                }
            }
            return payoffs;
        },

        // Play a round of the game provided initial strategies `ss`
        // using the random number generator `rng`.
        round(ss, rng) {
            return this.scheme(this.graph, ss, this.payoffs(ss), rng);
        },

        // Play `rounds` of the game starting from a random initial set of
        // strategies. Optionally, the user may specify that this process be
        // repeated `replicates` number of times, and can provide a random
        // number generator `rng`.
        play({ rounds, exhaustive, replicates, rng }) {
            if (!is.integer(rounds)) {
                throw new Error('number of rounds is not an integer');
            } else if (is.lt(rounds, 1)) {
                throw new Error('number of rounds is less than 1');
            }
            if (is.defined(replicates)) {
                if (!is.integer(replicates)) {
                    throw new Error('number of replicates is not an integer');
                } else if (is.lt(replicates, 1)) {
                    throw new Error('number of replicates is less than 1');
                }
            }
            if (rng === undefined) {
                rng = random;
            }
            if (exhaustive) {
                const space = Space(this.graph.order());
                const series = new Array(space.volume);
                let i = 0;
                for (let init of space) {
                    series[i] = new Array(rounds);
                    series[i][0] = init;
                    for (let r = 0; r < rounds; ++r) {
                        series[i][r+1] = this.round(series[i][r], rng);
                    }
                    ++i;
                }
                return series;
            } else if (replicates === undefined) {
                const series = new Array(rounds);
                series[0] = new Array(this.graph.order()).fill(0).map(() => rng.int(0,1));
                for (let r = 0; r < rounds; ++r) {
                    series[r+1] = this.round(series[r], rng);
                }
                return series;
            } else {
                const series = new Array(replicates);
                for (let r = 0; r < replicates; ++r) {
                    series[r] = this.play({ rounds, rng });
                }
                return series;
            }
        }
    };
    // ************************************************************************

    // ## Object Creation
    //
    // The resulting object uses the above prototype, and exposes the `game`
    // and `graph` to the user as enumerable members.
    return Object.assign(Object.create(proto), { game, graph, scheme });
};

module.exports = Arena;
