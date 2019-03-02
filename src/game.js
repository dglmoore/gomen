// # Two Player Games

// In order to play a game, we need to specify which game we're playing. To do
// that, we create a simple factory function `TwoPlayerGame` which returns an
// object to represent a 2-player game represented in normal form.
const TwoPlayerGame = function(payoff) {
    // The factory function expects a 2x2 `payoff` matrix, returning a
    // `TypeError` if it is not a matrix and a `RangeError` if it is not 2x2.
    if (!Array.isArray(payoff) || payoff.some(row => !Array.isArray(row))) {
        throw new TypeError(`payoff must be a matrix ${payoff}`);
    } else if (payoff.length != 2 || payoff.some(row => row.length != 2)) {
        throw new RangeError(`payoff matrix must be 2x2, got ${payoff}`);
    }

    return Object.assign(Object.create({
        // The only method provided is `getPayoff(i,j)` which returns the payoff if
        // the first and second players play strategies `i` and `j`, respectively.
        getPayoff(i, j) {
            const p = this.payoff[i][j];
            if (p === undefined) {
                throw new Error(`payoff is undefined for strategies ${{i, j}}`);
            }
            return p;
        }
    }), {
        // The payoff matrix is an enumberable member of the returned object.
        payoff
    });
};
// ----------------------------------------------------------------------------

// ## Specific Games
//
// There are a number of specific 2-player games for which we've implemented convenience
// functions:
// 1. [Prisoner's Dilemma](#the-prisoner39s-dilemma)
// 2. [Hawk Dove](#hawk-dove)
// ----------------------------------------------------------------------------

// ### The Prisoner's Dilemma
//
// Create the [Prisoner's Dilemma](https://en.wikipedia.org/wiki/Prisoner%27s_dilemma)
// characterized by a payoff matrix
// ```
// R 0
// 1 P
// ```
// with `0 < P < R < 1`.
//
// #### Examples
// ```
// > TwoPlayerGame.PrisonersDilemma(0.5, 0.75)
// { payoff: [ [ 0.75, 0 ], [ 1, 0.5 ] ] }
// ```
TwoPlayerGame.PrisonersDilemma = function(P, R) {
    if (0.0 < P && P < R && R < 1.0) {
        return TwoPlayerGame([[R, 0.0], [1.0, P]]);
    } else {
        throw new RangeError(`Prisoner's dilemma requires 0 < P < R < 1, got ${{P, R}}`);
    }
};
// ----------------------------------------------------------------------------

// ### Hawk-Dove
//
// Create the [Hawk-Dove](https://en.wikipedia.org/wiki/Chicken_(game)) game
// characterized by a payoff matrix
// ```
// 0 1
// T P
// ```
// with `0 < T < P < 1`.
//
// #### Examples
// ```
// > TwoPlayerGame.HawkDove(0.5, 0.75)
// { payoff: [ [ 0, 1 ], [ 0.5, 0.75 ] ] }
// ```
TwoPlayerGame.HawkDove = function(T, P) {
    if (0.0 < T && T < P && P < 1.0) {
        return TwoPlayerGame([[0.0, 1.0], [T, P]]);
    } else {
        throw new RangeError(`Hawk-Dove requires 0 < T < P < 1, got ${{T, P}}`);
    }
};

module.exports = TwoPlayerGame;
