// # Rules
//
// Agents need a rule according to which they will change their strategies
// based on the difference in their counterfactual payoffs from previous
// rounds. Essentially, the rules are probability distributions over the
// real-valued payoff differences.

// _**`sigmoid(beta=1.0)`**_

// The `sigmoid` rule specifies that an agent should change its strategy with
// probability
// ```
// P(dp) = 1 / (1 + e^(-beta*dp))
// ```
// by returing a function which implements the above operation.
//
// The following errors are thrown at the time of calling `sigmoid`:
// * a `TypeError` if `beta` is not a `Number
// * a `RangeError` if `beta < 0.0`
const sigmoid = function(beta=1.0) {
    if (beta.constructor.name !== 'Number') {
        throw new TypeError('sigmoid expects beta to be a number');
    } else if (beta < 0.0) {
        throw new RangeError(`sigmoid expects beta > 0, got ${beta}`);
    }

    return (dp) => 1.0 / (1.0 + Math.exp(-beta*dp));
};
// ****************************************************************************

// _**`fermi(beta=1.0) = sigmoid(beta=1.0)`**_

// The `fermi` rule is essentially an alias for the `sigmoid` rule.
const fermi = sigmoid;
// ****************************************************************************

// _**`heaviside(epsilon=1e-3)`**_

// The `heaviside` rule specifies that an agent should change its strategy
// with probability
// ```
// P(dp) = (|dp| < epsilon) ? 0.5 : (dp < 0) ? 0.0 : 1.0,
// ```
// i.e. according to a step function. Here `epsilon` represents the size
// of the region around `dp = 0` in which the probability is `0.5` to
// account for floating-point precision errors.
//
// The following errors are thrown at the time of calling `sigmoid`:
// * a `TypeError` if `epsilon` is not a `Number
// * a `RangeError` if `epsilon < 0.0`
const heaviside = function(epsilon=1e-3) {
    if (epsilon.constructor.name !== 'Number') {
        throw new TypeError('heaviside expects epsilon to be a number');
    } else if (epsilon < 0) {
        throw new RangeError(`heaviside expects epsilon > 0, got ${epsilon}`);
    }

    return (dp) => {
        if (Math.abs(dp) < epsilon) {
            return 0.5;
        } else {
            return Number(dp > 0);
        }
    };
};
// ****************************************************************************

module.exports = { sigmoid, fermi, heaviside };
