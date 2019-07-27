import { jsnx, Scheme } from '../src';

describe('counterfactual scheme', () => {
    test.each([0, 4, 6])('.strategies invalid length', (n: number) => {
        const scheme = Scheme.cf();
        const graph = jsnx.completeGraph(5);
        const array = new Array(n).fill(0);
        expect(() => scheme(graph, array, new Array(5).fill([0, 0]))).toThrow(/strategies must have same size/);
    });

    test('.payoffs not a matrix', () => {
        const scheme = Scheme.cf();
        const graph = jsnx.completeGraph(5);
        const array = new Array(5).fill(0);
        expect(() => scheme(graph, array, [])).toThrow(/payoffs matrix must be non-empty/);
    });

    test.each([4, 6])('.payoffs incorrect size', (n: number) => {
        const scheme = Scheme.cf();
        const graph = jsnx.completeGraph(5);
        const array = new Array(5).fill(0);

        const payoffs = new Array(n).fill([]);
        expect(() => scheme(graph, array, payoffs)).toThrow(/payoffs matrix has incorrect size/);

        const too_few = new Array(5).fill([1]);
        expect(() => scheme(graph, array, too_few)).toThrow(/payoffs matrix has incorrect size/);

        const too_many = new Array(5).fill([0, 0, 0]);
        expect(() => scheme(graph, array, too_many)).toThrow(/payoffs matrix has incorrect size/);

        const jagged = [[0, 0], [0, 0], [0, 0], [0], [0, 0]];
        expect(() => scheme(graph, array, jagged)).toThrow(/payoffs matrix has incorrect size/);
    });
});
