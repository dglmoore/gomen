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

test.each`
    P            | R
    ${undefined} | ${undefined}
    ${0.5}       | ${undefined}
    ${undefined} | ${0.5}
    ${0.0}       | ${0.0}
    ${0.5}       | ${1.0}
    ${0.5}       | ${0.5}
`('PrisonersDilemma throws for invalid parameters', function({ P, R }) {
    expect(() => TwoPlayerGame.PrisonersDilemma(P, R)).toThrow(RangeError);
});

test.each([[0.5,0.75], [0.25, 0.50]])('PrisonersDilemma(%i, %i)', function(P, R) {
    expect(TwoPlayerGame.PrisonersDilemma(P, R).payoff).toEqual([[R, 0.0], [1.0, P]]);
});

test.each`
    T            | P
    ${undefined} | ${undefined}
    ${0.5}       | ${undefined}
    ${undefined} | ${0.5}
    ${0.0}       | ${0.0}
    ${0.5}       | ${1.0}
    ${0.5}       | ${0.5}
`('HawkDove throws for invalid parameters', function({ T, P }) {
    expect(() => TwoPlayerGame.HawkDove(T, P)).toThrow(RangeError);
});

test.each([[0.5,0.75], [0.25, 0.50]])('HawkDove(%i, %i)', function(T, P) {
    expect(TwoPlayerGame.HawkDove(T, P).payoff).toEqual([[0.0, 1.0], [T, P]]);
});

test.each`
    P            | T
    ${undefined} | ${undefined}
    ${0.5}       | ${undefined}
    ${undefined} | ${0.5}
    ${0.0}       | ${0.0}
    ${0.5}       | ${1.0}
    ${0.5}       | ${0.5}
`('StagHunt throws for invalid parameters', function({ P, T }) {
    expect(() => TwoPlayerGame.StagHunt(P, T)).toThrow(RangeError);
});

test.each([[0.5,0.75], [0.25, 0.50]])('StagHunt(%i, %i)', function(P, T) {
    expect(TwoPlayerGame.StagHunt(P, T).payoff).toEqual([[0.0, 1.0], [T, P]]);
});
