const { TwoPlayerGame } = require('../main.js');

test('Raise TypeError if payoff is not a matrix', function() {
    expect(() => TwoPlayerGame()).toThrow(TypeError);
    expect(() => TwoPlayerGame(null)).toThrow(TypeError);
    expect(() => TwoPlayerGame('string')).toThrow(TypeError);
    expect(() => TwoPlayerGame([5])).toThrow(TypeError);
});

test('Raise RangeError if payoff is not 2x2', function() {
    expect(() => TwoPlayerGame([[],[]])).toThrow(RangeError);
    expect(() => TwoPlayerGame([[1,2]])).toThrow(RangeError);
    expect(() => TwoPlayerGame([[1],[1,2]])).toThrow(RangeError);
    expect(() => TwoPlayerGame([[1,2],[1]])).toThrow(RangeError);
    expect(() => TwoPlayerGame([[1,2,3],[1,2]])).toThrow(RangeError);
    expect(() => TwoPlayerGame([[1,2],[1,2,3]])).toThrow(RangeError);
});

test('Stores payoff matrix', function() {
    expect(TwoPlayerGame([[1,2],[3,4]]).payoff).toEqual([[1,2],[3,4]]);
});

test('getPayoff raises error', function() {
    const game = TwoPlayerGame([[1,2],[3,4]]);
    expect(() => game.getPayoff()).toThrow(/undefined/);
    expect(() => game.getPayoff(0)).toThrow(/undefined/);
    expect(() => game.getPayoff(0,'a')).toThrow(/undefined/);
    expect(() => game.getPayoff(-1,0)).toThrow(/undefined/);
    expect(() => game.getPayoff(2,0)).toThrow(/undefined/);
    expect(() => game.getPayoff(0,-1)).toThrow(/undefined/);
    expect(() => game.getPayoff(0,2)).toThrow(/undefined/);
});

test('Can get payoffs', function() {
    const game = TwoPlayerGame([[1,2],[3,4]]);
    expect(game.getPayoff(0,0)).toBe(1);
    expect(game.getPayoff(0,1)).toBe(2);
    expect(game.getPayoff(1,0)).toBe(3);
    expect(game.getPayoff(1,1)).toBe(4);
});
