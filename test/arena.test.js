const { TwoPlayerGame, Arena } = require('../main.js');
const { Graph, emptyGraph, pathGraph } = require('jsnetworkx');

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

test.each([[2],[3],[4]])('Throws on unlabled edges', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = pathGraph(n);
    expect(() => Arena(game, graph)).toThrow(/mislabeled edge/);
});

test.each([[2],[3],[4]])('Throws on mislabeled edges', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = new Graph();
    for (let v = 0; v < n-1; ++v) {
        graph.addEdge(v, v+1, { first: v-1 });
    }
    expect(() => Arena(game, graph)).toThrow(/mislabeled edge/);
});

test.each([[2],[3],[4]])('Can label edges with first vertex', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = new Graph();
    for (let v = 0; v < n-1; ++v) {
        graph.addEdge(v, v+1, { first: v });
    }
    Arena(game, graph);
});

test.each([[2],[3],[4]])('Can label edges with second vertex', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = new Graph();
    for (let v = 0; v < n-1; ++v) {
        graph.addEdge(v, v+1, { first: v+1 });
    }
    Arena(game, graph);
});

test.each([[2],[3],[4]])('Arena has size(%d)', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = new Graph();
    for (let v = 0; v < n-1; ++v) {
        graph.addEdge(v, v+1, { first: v });
    }
    expect(Arena(game, graph).size()).toBe(n);
});

test.each([[2],[3],[4]])('payoff throws if strategies is not array', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = emptyGraph(n);
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i !== j) {
                graph.addEdge(i, j, { first: i });
            }
        }
    }
    const arena = Arena(game, graph);
    expect(() => arena.payoff(5)).toThrow(TypeError);
    expect(() => arena.payoff({0: 1})).toThrow(TypeError);
    expect(() => arena.payoff('string')).toThrow(TypeError);
});

test.each([[2],[3],[4]])('payoff throws if strategies size !== arena size', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = emptyGraph(n);
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i !== j) {
                graph.addEdge(i, j, { first: i });
            }
        }
    }
    const arena = Arena(game, graph);
    expect(() => arena.payoff(new Array(n-1).fill(0))).toThrow(RangeError);
    expect(() => arena.payoff(new Array(n+1).fill(0))).toThrow(RangeError);
});

test.each([[2],[3],[4]])('payoff throws if strategies size != arena size', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = emptyGraph(n);
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i !== j) {
                graph.addEdge(i, j, { first: i });
            }
        }
    }
    Arena(game, graph).payoff(new Array(n).fill(0));
});
