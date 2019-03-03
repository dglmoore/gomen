const { TwoPlayerGame, Arena } = require('../main.js');
const { Graph, completeGraph, emptyGraph } = require('jsnetworkx');

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
    expect(() => arena.payoff(5)).toThrow(TypeError);
    expect(() => arena.payoff({0: 1})).toThrow(TypeError);
    expect(() => arena.payoff('string')).toThrow(TypeError);
});

test.each([[2],[3],[4]])('payoff throws if strategies size !== arena size', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    const arena = Arena(game, graph);
    expect(() => arena.payoff(new Array(n-1).fill(0))).toThrow(RangeError);
    expect(() => arena.payoff(new Array(n+1).fill(0))).toThrow(RangeError);
});

test.each([[2],[3],[4]])('payoff throws if strategies size != arena size', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    Arena(game, graph).payoff(new Array(n).fill(0));
});
