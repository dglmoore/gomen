import { TwoPlayerGame } from '../src/Game';

test('Raise Error if payoff is not 2x2', function() {
    expect(() => new TwoPlayerGame([[], []])).toThrow(Error);
    expect(() => new TwoPlayerGame([[1, 2]])).toThrow(Error);
    expect(() => new TwoPlayerGame([[1], [1, 2]])).toThrow(Error);
    expect(() => new TwoPlayerGame([[1, 2], [1]])).toThrow(Error);
    expect(() => new TwoPlayerGame([[1, 2, 3], [1, 2]])).toThrow(Error);
    expect(() => new TwoPlayerGame([[1, 2], [1, 2, 3]])).toThrow(Error);
});

test('Stores payoff matrix', function() {
    expect(new TwoPlayerGame([[1, 2], [3, 4]]).payoff).toEqual([[1, 2], [3, 4]]);
});

test('getPayoff raises error', function() {
    const game = new TwoPlayerGame([[1, 2], [3, 4]]);
    expect(() => game.getPayoff(-1, 0)).toThrow(/undefined/);
    expect(() => game.getPayoff(2, 0)).toThrow(/undefined/);
    expect(() => game.getPayoff(0, -1)).toThrow(/undefined/);
    expect(() => game.getPayoff(0, 2)).toThrow(/undefined/);
});

test('Can get payoffs', function() {
    const game = new TwoPlayerGame([[1, 2], [3, 4]]);
    expect(game.getPayoff(0, 0)).toBe(1);
    expect(game.getPayoff(0, 1)).toBe(2);
    expect(game.getPayoff(1, 0)).toBe(3);
    expect(game.getPayoff(1, 1)).toBe(4);
});

test('Cannot set invalid payoffs', function() {
    let game = new TwoPlayerGame([[1, 2], [3, 4]]);
    expect(() => (game.payoff = [[1]])).toThrow(Error);
    expect(() => (game.payoff = [[1, 2], [3, 4], [5, 6]])).toThrow(Error);
    expect(() => (game.payoff = [[1, 2, 3], [4, 5, 6]])).toThrow(Error);
    expect(() => (game.payoff = [[1, 2, 3], [4, 5]])).toThrow(Error);
    expect(() => (game.payoff = [[1, 2], [3, 4, 5]])).toThrow(Error);
});

test('Can set payoffs', function() {
    let game = new TwoPlayerGame([[1, 2], [3, 4]]);
    game.payoff = [[0, 1], [2, 3]];
    expect(game.getPayoff(0, 0)).toBe(0);
    expect(game.getPayoff(0, 1)).toBe(1);
    expect(game.getPayoff(1, 0)).toBe(2);
    expect(game.getPayoff(1, 1)).toBe(3);
});

test('Can modify payoffs', function() {
    let game = new TwoPlayerGame([[1, 2], [3, 4]]);
    game.payoff[0][0] = 0;
    game.payoff[0][1] = 1;
    game.payoff[1][0] = 2;
    game.payoff[1][1] = 3;
    expect(game.getPayoff(0, 0)).toBe(0);
    expect(game.getPayoff(0, 1)).toBe(1);
    expect(game.getPayoff(1, 0)).toBe(2);
    expect(game.getPayoff(1, 1)).toBe(3);
});

test.each`
    P      | R
    ${0.0} | ${0.0}
    ${0.5} | ${1.0}
    ${0.5} | ${0.5}
`('PrisonersDilemma throws for invalid parameters', function({ P, R }) {
    expect(() => TwoPlayerGame.PrisonersDilemma(P, R)).toThrow(Error);
});

test.each([[0.5, 0.75], [0.25, 0.5]])('PrisonersDilemma(%i, %i)', function(P, R) {
    expect(TwoPlayerGame.PrisonersDilemma(P, R).payoff).toEqual([[R, 0.0], [1.0, P]]);
});

test.each`
    T      | P
    ${0.0} | ${0.0}
    ${0.5} | ${1.0}
    ${0.5} | ${0.5}
`('HawkDove throws for invalid parameters', function({ T, P }) {
    expect(() => TwoPlayerGame.HawkDove(T, P)).toThrow(Error);
});

test.each([[0.5, 0.75], [0.25, 0.5]])('HawkDove(%i, %i)', function(T, P) {
    expect(TwoPlayerGame.HawkDove(T, P).payoff).toEqual([[0.0, 1.0], [T, P]]);
});

test.each`
    P      | T
    ${0.0} | ${0.0}
    ${0.5} | ${1.0}
    ${0.5} | ${0.5}
`('StagHunt throws for invalid parameters', function({ P, T }) {
    expect(() => TwoPlayerGame.StagHunt(P, T)).toThrow(Error);
});

test.each([[0.5, 0.75], [0.25, 0.5]])('StagHunt(%i, %i)', function(P, T) {
    expect(TwoPlayerGame.StagHunt(P, T).payoff).toEqual([[0.0, 1.0], [T, P]]);
});

test.each`
    R      | P
    ${0.0} | ${0.0}
    ${0.5} | ${1.0}
    ${0.5} | ${0.5}
`('Deadlock throws for invalid parameters', function({ R, P }) {
    expect(() => TwoPlayerGame.Deadlock(R, P)).toThrow(Error);
});

test.each([[0.5, 0.75], [0.25, 0.5]])('Deadlock(%i, %i)', function(R, P) {
    expect(TwoPlayerGame.Deadlock(R, P).payoff).toEqual([[R, 0.0], [1.0, P]]);
});

test.each`
    T      | S
    ${0.0} | ${0.0}
    ${0.5} | ${1.0}
    ${0.5} | ${0.5}
`('Harmony throws for invalid parameters', function({ T, S }) {
    expect(() => TwoPlayerGame.Harmony(T, S)).toThrow(Error);
});

test.each([[0.5, 0.75], [0.25, 0.5]])('Harmony(%i, %i)', function(T, S) {
    expect(TwoPlayerGame.Harmony(T, S).payoff).toEqual([[1.0, S], [T, 0.0]]);
});
