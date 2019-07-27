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
import * as Rule from './Rule';
import { random, RNG } from './util';

// Of course there are requirements on the `graph`, `strategies` and `payoffs`.
// In particular:
function checkArgs(graph: any, strategies: number[], payoffs: number[][]) {
    if (strategies.length !== graph.order()) {
        const msg = 'strategies must have same size as arena';
        const res = `expected ${graph.order()}, got ${strategies.length}`;
        throw new Error(`${msg}; ${res}`);
    } else if (payoffs.length === 0) {
        throw new Error(`payoffs matrix must be non-empty, got ${JSON.stringify(payoffs)}`);
    } else if (payoffs.length !== graph.order() || payoffs.some(p => p.length !== 2)) {
        throw new Error('payoffs matrix has incorrect size');
    }
}

export type Scheme = (graph: any, ss: number[], ps: number[][], rng?: RNG) => number[];

// ## Counterfactual Scheme
//
// The counterfactual scheme `cf` specifies that an agent should change its
// strategy based entirely on the difference in its counterfactual payoffs
// according to the `rule`.
export function cf(rule: Rule.Rule = Rule.sigmoid()): Scheme {
    return (graph: any, ss: number[], ps: number[][], rng?: RNG): number[] => {
        checkArgs(graph, ss, ps);

        if (rng === undefined) {
            rng = random;
        }

        const dst = ss.slice();
        for (let i = 0, len = ss.length; i < len; ++i) {
            const s = ss[i];
            const sbar = s ^ 1;
            dst[i] = rng.float() <= rule(ps[i][sbar] - ps[i][s]) ? sbar : s;
        }
        return dst;
    };
}
