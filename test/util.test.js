const util = require('../lib/util.js');
const { ArgumentError } = require('ow');

test('iota throws for invalid length', function() {
    expect(() => util.iota()).toThrow(ArgumentError);
    expect(() => util.iota(-1)).toThrow(ArgumentError);
    expect(() => util.iota('a')).toThrow(ArgumentError);
    expect(() => util.iota([1])).toThrow(ArgumentError);
    expect(() => util.iota({m: 1})).toThrow(ArgumentError);
});

test('iota throws for non-numeric start', function() {
    expect(() => util.iota(3, null)).toThrow(ArgumentError);
    expect(() => util.iota(3, 'a')).toThrow(ArgumentError);
    expect(() => util.iota(3, [1])).toThrow(ArgumentError);
    expect(() => util.iota(3, {m: 1})).toThrow(ArgumentError);
});

test('iota starting at 0', function() {
    expect(util.iota(0)).toEqual([]);
    expect(util.iota(3)).toEqual([0,1,2]);
});

test('iota with non-zero start', function() {
    expect(util.iota(0, -1)).toEqual([]);
    expect(util.iota(3, -1)).toEqual([-1,0,1]);
    expect(util.iota(3, 2.3)).toEqual([2.3,3.3,4.3]);
});

test('zip throws for non-array objects', function() {
    expect(() => util.zip()).toThrow(ArgumentError);
    expect(() => util.zip(3, [1,2,3])).toThrow(ArgumentError);
    expect(() => util.zip('abc', [1,2,3])).toThrow(ArgumentError);
    expect(() => util.zio({0: 'a', 1: 'b'}, [1,2,3])).toThrow(ArgumentError);
    expect(() => util.zip([1,2,3], 3)).toThrow(ArgumentError);
    expect(() => util.zip([1,2,3], 'abc')).toThrow(ArgumentError);
    expect(() => util.zio([1,2,3], {0: 'a', 1: 'b'})).toThrow(ArgumentError);
});

test('zip with same length', function() {
    expect(util.zip([], [])).toEqual([]);
    expect(util.zip([1,2,3], ['a','b','c'])).toEqual([[1,'a'],[2,'b'],[3,'c']]);
});

test('zip with different lengths', function() {
    expect(util.zip([], [1,2])).toEqual([]);
    expect(util.zip([1,2], [])).toEqual([]);
    expect(util.zip(['a'], [1,2])).toEqual([['a',1]]);
    expect(util.zip([1,2], ['a'])).toEqual([[1,'a']]);
    expect(util.zip([1,2,3], ['a','b'])).toEqual([[1,'a'],[2,'b']]);
    expect(util.zip(['a','b'], [1,2,3])).toEqual([['a',1],['b',2]]);
});

test('randomSubset throws for non-array sequences', function() {
    expect(() => util.randomSubset(null, 2)).toThrow(ArgumentError);
    expect(() => util.randomSubset(3, 1)).toThrow(ArgumentError);
    expect(() => util.randomSubset('abc', 2)).toThrow(ArgumentError);
    expect(() => util.randomSubset({0: 'a', 1: 'b', 2:'c'}, 2)).toThrow(ArgumentError);
});

test('randomSubset throws for too large subset size', function() {
    expect(() => util.randomSubset([], 1)).toThrow(ArgumentError);
    expect(() => util.randomSubset([1], 2)).toThrow(ArgumentError);
    expect(() => util.randomSubset([1,2], 4)).toThrow(ArgumentError);
    expect(() => util.randomSubset([2,1,2], 3)).toThrow(ArgumentError);
});

test('randomSubset throws for negative subset size', function() {
    expect(() => util.randomSubset([1,2,3], -1)).toThrow(ArgumentError);
});

test('randomSubset produces no duplicate values', function() {
    const seq = [1,2,1,1,2,4,6,7,7,4,2,4,5,8,2,1,2,4,7,7,8,9,2];
    for (let i = 0; i < 100; ++i) {
        const subset = util.randomSubset(seq, 5);
        expect(subset).toHaveLength(5);
        expect([...new Set(subset)]).toHaveLength(5);
    }
});

test('randomSubset throws for invalid RNG', function() {
    expect(() => util.randomSubset([1,2,3,4,5], 2, null)).toThrow(ArgumentError);
    expect(() => util.randomSubset([1,2,3,4,5], 2, {})).toThrow(ArgumentError);
    expect(() => util.randomSubset([1,2,3,4,5], 2, 5)).toThrow(ArgumentError);
    expect(() => util.randomSubset([1,2,3,4,5], 2, ['1','2'])).toThrow(ArgumentError);
});

test('randomSubset accepts RNG', function() {
    const MockRNG = Object.assign(Object.create({
        int(a, b) {
            if (this.state === undefined) {
                this.state = a;
                return this.state;
            } else if (this.state < b) {
                return ++this.state;
            } else {
                throw new Error('exceed the limit of the RNG');
            }
        }
    }), { state: undefined });

    expect(util.randomSubset([1,2,3,4,5], 2, MockRNG)).toEqual([1,2]);
    expect(util.randomSubset([1,2,3,4,5], 2, MockRNG)).toEqual([3,4]);
});
