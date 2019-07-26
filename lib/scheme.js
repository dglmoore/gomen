// # Schemes
//
// Schemes specify how an agent decides how which strategy to use in the next
// round of the game. Each scheme takes a [Rule](rule.html) as an argument, and
// returns a function with signature:
// ```
// function(graph, strategies, payoffs, rng): Array
// ```
// which each scheme can use to it's liking to return a new array of
// strategies.
//
// The `strategies` argument is an array of strategies, one for each agent.
// The `payoffs` argument is a matrix of counterfactual payoffs as may be
// returned by [`Arena.prototype.payoffs`](arena.html). The `rng` argument is
// an (optional) random number generator providing at least two methods:
// `float` and `int`. If `rng === undefined`, the
// [random](https://www.npmjs.com/package/random) package provides a default
// value.
const random = require('random');
const Rule = require('./Rule');

// Of course there are requirements on the `graph`, `strategies` and `payoffs`.
// In particular:
const checkArgs = function(graph, strategies, payoffs) {
    // 1. `strategies` must be an `Array`.
    if (!Array.isArray(strategies)) {
        throw new TypeError(`strategies must be an array, got ${JSON.stringify(strategies)}`);
    // 2. `strategies` must have exactly as many elements as agents in the
    //    graph.
    } else if (strategies.length !== graph.order()) {
        const msg = 'strategies must have same size as arena';
        const res = `expected ${graph.order()}, got ${strategies.length}`;
        throw new RangeError(`${msg}; ${res}`);
    // 3. `payoffs` must be a matrix
    } else if (!Array.isArray(payoffs)
            || payoffs.length == 0
            || payoffs.some(p => !Array.isArray(p))) {
        throw new TypeError(`payoffs must be a matrix, got ${JSON.stringify(payoffs)}`);
    // 4. `payoffs` must have as many rows as agents in the graphs, and as many
    //    columns as possible strategies.
    } else if (payoffs.length !== graph.order() || payoffs.some(p => p.length != 2)) {
        throw new RangeError('payoffs matrix has incorrect size');
    }
};

// ## Counterfactual Scheme
//
// The counterfactual scheme `cf` specifies that an agent should change its
// strategy based entirely on the difference in its counterfactual payoffs
// according to the `rule`.
const cf = function(rule = Rule.sigmoid()) {
    return function(graph, ss, ps, rng) {
        checkArgs(graph, ss, ps);

        if (rng === undefined) {
            rng = random;
        }

        const dst = ss.slice();
        for (let i = 0, len = ss.length; i < len; ++i) {
            const s = ss[i], sbar = s ^ 1;
            dst[i] = (rng.float() <= rule(ps[i][sbar] - ps[i][s])) ? sbar : s;
        }
        return dst;
    };
};

// ## Imitation Scheme
//
// The `imitation` scheme specifies that an agent should change its strategy to
// that used by a random neighbor in the previous round if based on the
// difference in the agent's and neighbor's expected mean payoff in the next
// round.
const imitation = function(rule = Rule.sigmoid()) {
    return function(graph, ss, ps, rng) {
        checkArgs(graph, ss, ps);

        if (rng === undefined) {
            rng = random;
        }

        const payoffs = ps.slice();
        for (let i = 0, len = ps.length; i < len; ++i) {
            const degree = 2 * graph.degree(i);
            payoffs[i] = ps[i].reduce((acc, p) => acc + (p / degree));
        }

        const dst = ss.slice();
        for (let i = 0, len = ss.length; i < len; ++i) {
            const neighbors = graph.neighbors(i);
            const j = neighbors[rng.int(0, neighbors.length - 1)];
            if (rng.float() <= rule(payoffs[j] - payoffs[i])) {
                dst[i] = ss[j];
            } else {
                dst[i] = ss[i];
            }
        }
        return dst;
    };
};

module.exports = { cf, imitation };
