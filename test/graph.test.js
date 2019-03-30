const { barabasiAlbertGraph } = require('../lib/graph.js');
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
