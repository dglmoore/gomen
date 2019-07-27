import { Arena } from '../src/Arena';
import { TwoPlayerGame } from '../src/Game';
import { jsnx } from '../src/Graph';
import * as Scheme from '../src/Scheme';
import { random } from '../src/util';

const seedrandom = require('seedrandom');

const { completeGraph, cycleGraph, emptyGraph } = jsnx;

test('Throws on empty graph', () => {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = emptyGraph(0);
    const scheme = Scheme.cf();
    expect(() => new Arena(game, graph, scheme)).toThrow(/empty/);
});

test.each([[1], [2], [3]])('Throws on disconnected node (emptyGraph(%d))', (n: number) => {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = emptyGraph(n);
    const scheme = Scheme.cf();
    expect(() => new Arena(game, graph, scheme)).toThrow(/disconnected/);
});

test.each([[2], [3], [4]])('Arena has size(%d)', function(n) {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    expect(new Arena(game, graph, Scheme.cf()).size()).toBe(n);
});

test.each([[2], [3], [4]])('payoff throws if strategies size !== arena size', (n: number) => {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    const scheme = Scheme.cf();
    const arena = new Arena(game, graph, scheme);
    expect(() => arena.payoffs(new Array(n - 1).fill(0))).toThrow(Error);
    expect(() => arena.payoffs(new Array(n + 1).fill(0))).toThrow(Error);
});

test.each`
    n    | ss           | payoffs
    ${2} | ${[0, 0]}    | ${[[0.75, 1.0], [0.75, 1.0]]}
    ${2} | ${[0, 1]}    | ${[[0.0, 0.5], [0.75, 1.0]]}
    ${2} | ${[1, 0]}    | ${[[0.75, 1.0], [0.0, 0.5]]}
    ${2} | ${[1, 1]}    | ${[[0.0, 0.5], [0.0, 0.5]]}
    ${3} | ${[0, 0, 0]} | ${[[1.5, 2.0], [1.5, 2.0], [1.5, 2.0]]}
    ${3} | ${[0, 0, 1]} | ${[[0.75, 1.5], [0.75, 1.5], [1.5, 2.0]]}
    ${3} | ${[0, 1, 0]} | ${[[0.75, 1.5], [1.5, 2.0], [0.75, 1.5]]}
    ${3} | ${[0, 1, 1]} | ${[[0.0, 1.0], [0.75, 1.5], [0.75, 1.5]]}
    ${3} | ${[1, 0, 0]} | ${[[1.5, 2.0], [0.75, 1.5], [0.75, 1.5]]}
    ${3} | ${[1, 0, 1]} | ${[[0.75, 1.5], [0.0, 1.0], [0.75, 1.5]]}
    ${3} | ${[1, 1, 0]} | ${[[0.75, 1.5], [0.75, 1.5], [0.0, 1.0]]}
    ${3} | ${[1, 1, 1]} | ${[[0.0, 1.0], [0.0, 1.0], [0.0, 1.0]]}
`('correct payoff - n = $n, ss = $ss', ({ n, ss, payoffs }) => {
    const game = TwoPlayerGame.PrisonersDilemma(0.5, 0.75);
    const graph = completeGraph(n);
    const scheme = Scheme.cf();
    expect(new Arena(game, graph, scheme).payoffs(ss)).toEqual(payoffs);
});

test('play using cf scheme', () => {
    random.use(seedrandom(1879));
    const game = TwoPlayerGame.StagHunt(1 / 3, 2 / 3);
    const graph = cycleGraph(5);
    const scheme = Scheme.cf();
    const a = new Arena(game, graph, scheme);
    expect(a.round([0, 0, 1, 1, 0], random)).toEqual([1, 0, 1, 0, 0]);

    a.round([0, 0, 1, 1, 0]);
});
