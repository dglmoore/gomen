// # Utility Functions
//
// There are a number of functions that turn out to be pretty useful to have,
// but aren't offered by the Javascript standard library. We implement a few of
// them here for internal use.
const random = require('random');
const is = require('is');

// Construct an array of a give size `n` filled with sequential values starting
// from `start = 0`.  The starting value need not be an integer, any number will
// suffice, but each value in sequence will differ by `1`.
//
// ## Examples
// ```
// > iota(3)
// [ 0, 1, 2 ]
// > iota(3, 5)
// [ 5, 6, 7 ]
// > iota(5, -2.1)
// [ -2.1, -1.1, -0.10000000000000009, 0.8999999999999999, 1.9 ]
// ```
const iota = function(n, start=0) {
    if (!is.integer(n)) {
        throw new Error('length is non-integral');
    } else if (n < 0) {
        throw new Error('length is negative');
    }
    if (!is.number(start)) {
        throw new Error('starting value is not a number');
    }
    const arr = new Array(n);
    for (let i = 0; i < n; ++i) {
        arr[i] = start + i;
    }
    return arr;
};

// Zip two arrays (`a` and `b`) together, creating an "array of arrays", the
// `i`th element of which corresponds to an array of the `i`th element of each
// of the arguments in the order they were provided. The length of the array
// will be `zip(a,b).length === Math.min(a.length, b.length)`.
//
// ## Examples
// ```
// > zip([], [])
// []
// > zip([], [1])
// []
// > zip([1,2], [3])
// [ [ 1, 3 ] ]
// > zip([1], [2,3])
// [ [ 1, 2 ] ]
// > zip([1,2,3], [4,5,6])
// [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
// ```
const zip = function(a, b) {
    if (!is.array(a)) {
        throw new Error('first argument is not an array');
    } else if (!is.array(b)) {
        throw new Error('second argument is not an array');
    }
    if (b.length < a.length) {
        return b.map((e, i) => [a[i], e]);
    } else {
        return a.map((e, i) => [e, b[i]]);
    }
};

// Select a random subset of a sequence `seq` of size `m` with each element of
// the subset unique. The user may optionally provide a random number generator
// `rng=random` which has an `int(a,b)` method.
//
// ## Examples
// ```
// > const random = require('random');
// undefined
// > const seedrandom = require('seedrandom');
// undefined
// > const rng = random.clone(seedrandom(2018));
// undefined
// > randomSubset([], 0)
// []
// > randomSubset([1,2,3,4], 2, rng)
// [ 2, 3 ]
// > randomSubset([1,2,3,4], 2, rng)
// [ 1, 2 ]
// > randomSubset([1,2,3,4], 2, rng)
// [ 2, 1 ]
// > randomSubset([1,2,2,2], 3, rng)
// { ArgumentError: Expected number to be in range [0..2], got 3
//     at randomSubset (.../src/util.js:45:5) name: 'ArgumentError' }
// > randomSubset([1,2,2,2], 2, rng)
// [ 2, 1 ]
// ```
const randomSubset = function(seq, m, rng=random) {
    if (!is.array(seq)) {
        throw new Error('first argument is not an array');
    }
    const unique = [...new Set(seq)];
    if (!is.within(m, 0, unique.length)) {
        throw new Error('second argument is out of range');
    }
    if (!is.fn(rng.int)) {
        throw new Error('third argument does not have an `int` method');
    }
    let targets = new Set();
    while (targets.size < m) {
        const x = unique[rng.int(0, unique.length-1)];
        targets.add(x);
    }
    return Array.from(targets);
};

const Space = function(n) {
    const volume = 1 << n;
    let stateNum = 0;
    let state = new Array(n).fill(0);
    return Object.create({
        get volume() {
            return volume;
        },

        [Symbol.iterator]() {
            return Object.create({
                next() {
                    if (stateNum === volume) {
                        return { done: true };
                    } else if (stateNum !== 0) {
                        for (let i = 0; i < n; ++i) {
                            if (state[i] === 0) {
                                state[i] = 1;
                                for (let j = 0; j < i; ++j) {
                                    state[j] = 0;
                                }
                                break;
                            }
                        }
                    }
                    ++stateNum;
                    return { value: state.slice(), done: false };
                }
            });
        }
    });
};

module.exports = { iota, zip, randomSubset, Space };
