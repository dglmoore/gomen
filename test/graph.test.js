const { barabasiAlbertGraph, latticeGraph } = require('../lib/graph.js');
const { ArgumentError } = require('ow');

test('barabasiAlbertGraph throws for invalid size', function() {
    expect(() => barabasiAlbertGraph()).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph('a', 2)).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph([2], 2)).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph(-1, 2)).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph( 0, 2)).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph( 1, 2)).toThrow(ArgumentError);
});

test('barabasiAlbertGraph throws for invalid edge parameter', function() {
    expect(() => barabasiAlbertGraph(5)).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph(5, 'a')).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph(5, [2])).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph(5, -1)).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph(5,  0)).toThrow(ArgumentError);
    expect(() => barabasiAlbertGraph(5,  5)).toThrow(ArgumentError);
});

test('barabasiAlbertGraph has correct number of nodes', function() {
    expect(barabasiAlbertGraph(5, 1).order()).toBe(5);
    expect(barabasiAlbertGraph(5, 2).order()).toBe(5);
    expect(barabasiAlbertGraph(3, 1).order()).toBe(3);
    expect(barabasiAlbertGraph(3, 2).order()).toBe(3);
});

test('latticeGraph throws for invalid height', function() {
    expect(() => latticeGraph()).toThrow(ArgumentError);
    expect(() => latticeGraph('a', 2)).toThrow(ArgumentError);
    expect(() => latticeGraph([2], 2)).toThrow(ArgumentError);
    expect(() => latticeGraph(-1, 2)).toThrow(ArgumentError);
    expect(() => latticeGraph( 0, 2)).toThrow(ArgumentError);
    expect(() => latticeGraph( 1, 2)).toThrow(ArgumentError);
});

test('latticeGraph throws for invalid width', function() {
    expect(() => latticeGraph(2)).toThrow(ArgumentError);
    expect(() => latticeGraph(2, 'a')).toThrow(ArgumentError);
    expect(() => latticeGraph(2, [2])).toThrow(ArgumentError);
    expect(() => latticeGraph(2, -1)).toThrow(ArgumentError);
    expect(() => latticeGraph(2,  0)).toThrow(ArgumentError);
});

test('latticeGraph has correct number of nodes', function() {
    expect(latticeGraph(2,2).order()).toBe(4);
    expect(latticeGraph(2,3).order()).toBe(6);
    expect(latticeGraph(3,2).order()).toBe(6);
    expect(latticeGraph(3,3).order()).toBe(9);
    expect(latticeGraph(5,8).order()).toBe(40);
    expect(latticeGraph(8,5).order()).toBe(40);
});

test('latticeGraph has correct number of edges', function() {
    const numEdges = (n,m) => 2*n*m - n - m;

    expect(latticeGraph(2,2).size()).toBe(numEdges(2,2));
    expect(latticeGraph(2,3).size()).toBe(numEdges(2,3));
    expect(latticeGraph(3,2).size()).toBe(numEdges(3,2));
    expect(latticeGraph(3,3).size()).toBe(numEdges(3,3));
    expect(latticeGraph(5,8).size()).toBe(numEdges(5,8));
    expect(latticeGraph(8,5).size()).toBe(numEdges(8,5));
});

test('latticeGraph has correct edges', function() {
    expect(latticeGraph(2,2).edges())
        .toEqual([[0,1],[0,2],[1,3],[2,3]]);
    expect(latticeGraph(2,3).edges())
        .toEqual([[0,1],[0,3],[1,2],[1,4],[2,5],[3,4],[4,5]]);
    expect(latticeGraph(3,2).edges())
        .toEqual([[0,1],[0,2],[1,3],[2,3],[2,4],[3,5],[4,5]]);
    expect(latticeGraph(3,4).edges())
        .toEqual([[0,1],[0,4],[ 1,2],[1,5],[2,3],[2,6],[3,7],
            [4,5],[4,8],[ 5,6],[5,9],[6,7],[6,10],[7,11],[8,9],
            [9,10],[10,11]]);
});
