import { iota, randomSubset, Space, zip } from '../src/util';

test('iota throws for invalid length', function() {
    expect(() => iota(-1)).toThrow(Error);
});

test('iota starting at 0', function() {
    expect(iota(0)).toEqual([]);
    expect(iota(3)).toEqual([0, 1, 2]);
});

test('iota with non-zero start', function() {
    expect(iota(0, -1)).toEqual([]);
    expect(iota(3, -1)).toEqual([-1, 0, 1]);
    expect(iota(3, 2.3)).toEqual([2.3, 3.3, 4.3]);
});

test('zip with same length', function() {
    expect(zip([], [])).toEqual([]);
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
});

test('zip with different lengths', function() {
    expect(zip([], [1, 2])).toEqual([]);
    expect(zip([1, 2], [])).toEqual([]);
    expect(zip(['a'], [1, 2])).toEqual([['a', 1]]);
    expect(zip([1, 2], ['a'])).toEqual([[1, 'a']]);
    expect(zip([1, 2, 3], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
    expect(zip(['a', 'b'], [1, 2, 3])).toEqual([['a', 1], ['b', 2]]);
});

test('randomSubset throws for too large subset size', function() {
    expect(() => randomSubset([], 1)).toThrow(Error);
    expect(() => randomSubset([1], 2)).toThrow(Error);
    expect(() => randomSubset([1, 2], 4)).toThrow(Error);
    expect(() => randomSubset([2, 1, 2], 3)).toThrow(Error);
});

test('randomSubset throws for negative subset size', function() {
    expect(() => randomSubset([1, 2, 3], -1)).toThrow(Error);
});

test('randomSubset produces no duplicate values', function() {
    const seq = [1, 2, 1, 1, 2, 4, 6, 7, 7, 4, 2, 4, 5, 8, 2, 1, 2, 4, 7, 7, 8, 9, 2];
    for (let i = 0; i < 100; ++i) {
        const subset = randomSubset(seq, 5);
        expect(subset).toHaveLength(5);
        expect([...new Set(subset)]).toHaveLength(5);
    }
});

test('randomSubset accepts RNG', function() {
    const MockRNG = Object.assign(
        Object.create({
            int(a: number, b: number): number {
                if (this.state === undefined) {
                    this.state = a;
                    return this.state;
                } else if (this.state < b) {
                    return ++this.state;
                } else {
                    throw new Error('exceed the limit of the RNG');
                }
            },
        }),
        { state: undefined },
    );

    expect(randomSubset([1, 2, 3, 4, 5], 2, MockRNG)).toEqual([1, 2]);
    expect(randomSubset([1, 2, 3, 4, 5], 2, MockRNG)).toEqual([3, 4]);
});

test('Space throws for invalid dimension', () => {
    expect(() => new Space(-1)).toThrow(Error);
    expect(() => new Space(0)).toThrow(Error);
});

test.each`
    n    | states
    ${1} | ${[[0], [1]]}
    ${2} | ${[[0, 0], [1, 0], [0, 1], [1, 1]]}
    ${3} | ${[[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]}
`('Can iterate over space', ({ n, states }) => {
    const space = new Space(n);
    expect(Array.from(space)).toEqual(states);
    expect(Array.from(space)).toEqual(states);
});
