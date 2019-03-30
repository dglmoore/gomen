// # Two Player Games

// In order to play a game, we need to specify which game we're playing. To do
// that, we create a simple factory function `TwoPlayerGame` which returns an
// object to represent a 2-player game represented in normal form.
const TwoPlayerGame = function(payoff, name) {
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
        payoff, name
    });
};
// ----------------------------------------------------------------------------

// ## Specific Games
//
// There are a number of specific 2-player games for which we've implemented convenience
// functions:
// * [Prisoner's Dilemma](#the-prisoner39s-dilemma)
// * [Hawk-Dove](#hawk-dove)
// * [Stag Hunt](#stag-hunt)
// * [Deadlock](#deadlock)
// * [Harmony](#harmony)
// ----------------------------------------------------------------------------

// ### The Prisoner's Dilemma
//
// Create the [Prisoner's Dilemma][prisoners-dilemma] characterized by a payoff
// matrix
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
// [prisoners-dilemma]: https://en.wikipedia.org/wiki/Prisoner%27s_dilemma "Prisoner's Dilemma"
TwoPlayerGame.PrisonersDilemma = function(P, R) {
    if (0.0 < P && P < R && R < 1.0) {
        return TwoPlayerGame([[R, 0.0], [1.0, P]], 'Prisoner\'s Dilemma');
    } else {
        throw new RangeError(`Prisoner's dilemma requires 0 < P < R < 1, got ${{P, R}}`);
    }
};
// ----------------------------------------------------------------------------

// ### Hawk-Dove
//
// Create the [Hawk-Dove][hawk-dove] game characterized by a payoff matrix
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
// [hawk-dove]: https://en.wikipedia.org/wiki/Chicken_(game) "Hawk-Dove"
TwoPlayerGame.HawkDove = function(T, P) {
    if (0.0 < T && T < P && P < 1.0) {
        return TwoPlayerGame([[0.0, 1.0], [T, P]], 'Hawk-Dove');
    } else {
        throw new RangeError(`Hawk-Dove requires 0 < T < P < 1, got ${{T, P}}`);
    }
};
// ----------------------------------------------------------------------------

// ### Stag Hunt
//
// Create the [Stag Hunt][stag-hunt] game characterized by a payoff matrix
// ```
// 0 1
// T P
// ```
// with `0 < P < T < 1`.
//
// #### Examples
// ```
// > TwoPlayerGame.StagHunt(0.5, 0.75)
// { payoff: [ [ 0, 1 ], [ 0.75, 0.5 ] ] }
// ```
// [stag-hunt]: https://en.wikipedia.org/wiki/Stag_hunt "Stag Hunt"
TwoPlayerGame.StagHunt = function(P, T) {
    if (0.0 < P && P < T && T < 1.0) {
        return TwoPlayerGame([[0.0, 1.0], [T, P]], 'Stag Hunt');
    } else {
        throw new RangeError(`Stag Hunt requires 0 < P < T < 1, got ${{T, P}}`);
    }
};
// ----------------------------------------------------------------------------

// ### Deadlock
//
// Create the [Deadlock][deadlock] game characterized by a payoff matrix
// ```
// R 0
// 1 P
// ```
// with `0 < R < P < 1`.
//
// #### Examples
// ```
// > TwoPlayerGame.Deadlock(0.5, 0.75)
// { payoff: [ [ 0.5, 0 ], [ 1, 0.75 ] ] }
// ```
// [deadlock]: https://en.wikipedia.org/wiki/Deadlock_(game_theory) "Deadlock"
TwoPlayerGame.Deadlock = function(R, P) {
    if (0.0 < R && R < P && P < 1.0) {
        return TwoPlayerGame([[R, 0.0], [1.0, P]], 'Deadlock');
    } else {
        throw new RangeError(`Deadlock requires 0 < R < P < 1, got ${{R, P}}`);
    }
};
// ----------------------------------------------------------------------------

// ### Harmony
//
// Create the Harmony game characterized by a payoff matrix
// ```
// 1 S
// T 0
// ```
// with `0 < T < S < 1`.
//
// #### Examples
// ```
// > TwoPlayerGame.Harmony(0.5, 0.75)
// { payoff: [ [ 1, 0.75 ], [ 0.5, 0 ] ] }
// ```
TwoPlayerGame.Harmony = function(T, S) {
    if (0.0 < T && T < S && S < 1.0) {
        return TwoPlayerGame([[1.0, S], [T, 0.0]], 'Harmony');
    } else {
        throw new RangeError(`Harmony requires 0 < T < S < 1, got ${{T, S}}`);
    }
};

module.exports = TwoPlayerGame;