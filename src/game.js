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

module.exports = TwoPlayerGame;
