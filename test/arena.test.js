const { TwoPlayerGame, Arena, Scheme } = require('../main.js');
const { cycleGraph, completeGraph, emptyGraph } = require('jsnetworkx');
const random = require('random');
const seedrandom = require('seedrandom');

test('Throws on empty graph', function() {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = emptyGraph(0);
    expect(() => Arena(game, graph)).toThrow(/empty/);
});

test.each([[1],[2],[3]])('Throws on disconnected node (emptyGraph(%d))', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = emptyGraph(n);
    expect(() => Arena(game, graph)).toThrow(/disconnected/);
});

test.each([[2],[3],[4]])('Arena has size(%d)', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    expect(Arena(game, graph).size()).toBe(n);
});

test.each([[2],[3],[4]])('payoff throws if strategies is not array', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    const arena = Arena(game, graph);
    expect(() => arena.payoffs(5)).toThrow(TypeError);
    expect(() => arena.payoffs({0: 1})).toThrow(TypeError);
    expect(() => arena.payoffs('string')).toThrow(TypeError);
});

test.each([[2],[3],[4]])('payoff throws if strategies size !== arena size', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    const arena = Arena(game, graph);
    expect(() => arena.payoffs(new Array(n-1).fill(0))).toThrow(RangeError);
    expect(() => arena.payoffs(new Array(n+1).fill(0))).toThrow(RangeError);
});

test.each`
    n    | ss         | payoffs
    ${2} | ${[0,0]}   | ${[[0.75, 1.00], [0.75, 1.00]]}
    ${2} | ${[0,1]}   | ${[[0.00, 0.50], [0.75, 1.00]]}
    ${2} | ${[1,0]}   | ${[[0.75, 1.00], [0.00, 0.50]]}
    ${2} | ${[1,1]}   | ${[[0.00, 0.50], [0.00, 0.50]]}
    ${3} | ${[0,0,0]} | ${[[1.50, 2.00], [1.50, 2.00], [1.50, 2.00]]}
    ${3} | ${[0,0,1]} | ${[[0.75, 1.50], [0.75, 1.50], [1.50, 2.00]]}
    ${3} | ${[0,1,0]} | ${[[0.75, 1.50], [1.50, 2.00], [0.75, 1.50]]}
    ${3} | ${[0,1,1]} | ${[[0.00, 1.00], [0.75, 1.50], [0.75, 1.50]]}
    ${3} | ${[1,0,0]} | ${[[1.50, 2.00], [0.75, 1.50], [0.75, 1.50]]}
    ${3} | ${[1,0,1]} | ${[[0.75, 1.50], [0.00, 1.00], [0.75, 1.50]]}
    ${3} | ${[1,1,0]} | ${[[0.75, 1.50], [0.75, 1.50], [0.00, 1.00]]}
    ${3} | ${[1,1,1]} | ${[[0.00, 1.00], [0.00, 1.00], [0.00, 1.00]]}
`('correct payoff - n = $n, ss = $ss', function({ n, ss, payoffs }) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    expect(Arena(game, graph).payoffs(ss)).toEqual(payoffs);
});

test('play cf', function() {
    const rng = random.clone(seedrandom(1879));
    const a = Arena(TwoPlayerGame.StagHunt(1/3, 2/3), cycleGraph(5), Scheme.cf());
    expect(a.round([0,0,1,1,0], rng)).toEqual([1,0,0,1,0]);

    a.round([0,0,1,1,0]);
});

test('play imitation', function() {
    const rng = random.clone(seedrandom(1879));
    const a = Arena(TwoPlayerGame.StagHunt(1/3, 2/3), cycleGraph(5), Scheme.imitation());
    expect(a.round([0,0,1,1,0], rng)).toEqual([0,1,1,1,0]);

    a.round([0,0,1,1,0]);
});
