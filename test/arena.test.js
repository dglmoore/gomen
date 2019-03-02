const { TwoPlayerGame, Arena } = require('../main.js');
const { emptyGraph, pathGraph } = require('jsnetworkx');

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
    const graph = pathGraph(n);
    expect(Arena(game, graph).size()).toBe(n);
});
