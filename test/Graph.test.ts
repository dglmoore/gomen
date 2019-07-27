import { jsnx } from '../src';

describe('barabasiAlbertGraph', () => {
    const { barabasiAlbertGraph } = jsnx;

    test('.throws for invalid size', () => {
        expect(() => barabasiAlbertGraph()).toThrow(Error);
        expect(() => barabasiAlbertGraph('a', 2)).toThrow(Error);
        expect(() => barabasiAlbertGraph([2], 2)).toThrow(Error);
        expect(() => barabasiAlbertGraph(-1, 2)).toThrow(Error);
        expect(() => barabasiAlbertGraph(0, 2)).toThrow(Error);
        expect(() => barabasiAlbertGraph(1, 2)).toThrow(Error);
    });

    test('.throws for invalid edge parameter', () => {
        expect(() => barabasiAlbertGraph(5)).toThrow(Error);
        expect(() => barabasiAlbertGraph(5, 'a')).toThrow(Error);
        expect(() => barabasiAlbertGraph(5, [2])).toThrow(Error);
        expect(() => barabasiAlbertGraph(5, -1)).toThrow(Error);
        expect(() => barabasiAlbertGraph(5, 0)).toThrow(Error);
        expect(() => barabasiAlbertGraph(5, 5)).toThrow(Error);
    });

    test('.has correct number of nodes', () => {
        expect(barabasiAlbertGraph(5, 1).order()).toBe(5);
        expect(barabasiAlbertGraph(5, 2).order()).toBe(5);
        expect(barabasiAlbertGraph(3, 1).order()).toBe(3);
        expect(barabasiAlbertGraph(3, 2).order()).toBe(3);
    });
});

describe('starGraph', () => {
    const { starGraph } = jsnx;
    test('.throws for invalid size', () => {
        expect(() => starGraph()).toThrow(Error);
        expect(() => starGraph('a')).toThrow(Error);
        expect(() => starGraph([2])).toThrow(Error);
        expect(() => starGraph(-1)).toThrow(Error);
        expect(() => starGraph(0)).toThrow(Error);
        expect(() => starGraph(1)).toThrow(Error);
        expect(() => starGraph(2)).toThrow(Error);
    });

    test('.has correct number of nodes', () => {
        expect(starGraph(3).order()).toBe(3);
        expect(starGraph(4).order()).toBe(4);
        expect(starGraph(5).order()).toBe(5);
        expect(starGraph(6).order()).toBe(6);
        expect(starGraph(7).order()).toBe(7);
    });

    test('.has correct number of edges', () => {
        expect(starGraph(3).size()).toBe(2);
        expect(starGraph(4).size()).toBe(3);
        expect(starGraph(5).size()).toBe(4);
        expect(starGraph(6).size()).toBe(5);
        expect(starGraph(7).size()).toBe(6);
    });
});

describe('wheelGraph', () => {
    const { wheelGraph } = jsnx;
    test('.throws for invalid size', () => {
        expect(() => wheelGraph()).toThrow(Error);
        expect(() => wheelGraph('a')).toThrow(Error);
        expect(() => wheelGraph([2])).toThrow(Error);
        expect(() => wheelGraph(-1)).toThrow(Error);
        expect(() => wheelGraph(0)).toThrow(Error);
        expect(() => wheelGraph(1)).toThrow(Error);
        expect(() => wheelGraph(2)).toThrow(Error);
        expect(() => wheelGraph(3)).toThrow(Error);
    });

    test('.has correct number of nodes', () => {
        expect(wheelGraph(4).order()).toBe(4);
        expect(wheelGraph(5).order()).toBe(5);
        expect(wheelGraph(6).order()).toBe(6);
        expect(wheelGraph(7).order()).toBe(7);
    });

    test('.has correct number of edges', () => {
        expect(wheelGraph(4).size()).toBe(6);
        expect(wheelGraph(5).size()).toBe(8);
        expect(wheelGraph(6).size()).toBe(10);
        expect(wheelGraph(7).size()).toBe(12);
    });
});

describe('latticeGraph', () => {
    const { latticeGraph } = jsnx;
    test('.throws for invalid height', () => {
        expect(() => latticeGraph()).toThrow(Error);
        expect(() => latticeGraph('a', 2)).toThrow(Error);
        expect(() => latticeGraph([2], 2)).toThrow(Error);
        expect(() => latticeGraph(-1, 2)).toThrow(Error);
        expect(() => latticeGraph(0, 2)).toThrow(Error);
        expect(() => latticeGraph(1, 2)).toThrow(Error);
    });

    test('.throws for invalid width', () => {
        expect(() => latticeGraph(2)).toThrow(Error);
        expect(() => latticeGraph(2, 'a')).toThrow(Error);
        expect(() => latticeGraph(2, [2])).toThrow(Error);
        expect(() => latticeGraph(2, -1)).toThrow(Error);
        expect(() => latticeGraph(2, 0)).toThrow(Error);
    });

    test('.has correct number of nodes', () => {
        expect(latticeGraph(2, 2).order()).toBe(4);
        expect(latticeGraph(2, 3).order()).toBe(6);
        expect(latticeGraph(3, 2).order()).toBe(6);
        expect(latticeGraph(3, 3).order()).toBe(9);
        expect(latticeGraph(5, 8).order()).toBe(40);
        expect(latticeGraph(8, 5).order()).toBe(40);
    });

    test('.has correct number of edges', () => {
        const numEdges = (n: number, m: number): number => 2 * n * m - n - m;

        expect(latticeGraph(2, 2).size()).toBe(numEdges(2, 2));
        expect(latticeGraph(2, 3).size()).toBe(numEdges(2, 3));
        expect(latticeGraph(3, 2).size()).toBe(numEdges(3, 2));
        expect(latticeGraph(3, 3).size()).toBe(numEdges(3, 3));
        expect(latticeGraph(5, 8).size()).toBe(numEdges(5, 8));
        expect(latticeGraph(8, 5).size()).toBe(numEdges(8, 5));
    });

    test('.has correct edges', () => {
        expect(latticeGraph(2, 2).edges()).toEqual([[0, 1], [0, 2], [1, 3], [2, 3]]);
        expect(latticeGraph(2, 3).edges()).toEqual([[0, 1], [0, 3], [1, 2], [1, 4], [2, 5], [3, 4], [4, 5]]);
        expect(latticeGraph(3, 2).edges()).toEqual([[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5]]);
        expect(latticeGraph(3, 4).edges()).toEqual([
            [0, 1],
            [0, 4],
            [1, 2],
            [1, 5],
            [2, 3],
            [2, 6],
            [3, 7],
            [4, 5],
            [4, 8],
            [5, 6],
            [5, 9],
            [6, 7],
            [6, 10],
            [7, 11],
            [8, 9],
            [9, 10],
            [10, 11],
        ]);
    });
});
