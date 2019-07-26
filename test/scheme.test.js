const {
    Scheme,
    jsnx: { completeGraph },
} = require('../lib');

test('cf scheme - strategies not array', function() {
    const scheme = Scheme.cf();
    const graph = completeGraph(5);
    expect(() => scheme(graph, 'string')).toThrow(/strategies must be an array/);
    expect(() => scheme(graph, 5)).toThrow(/strategies must be an array/);
});

test.each([0, 4, 6])('cf scheme - strategies invalid length', function(n) {
    const scheme = Scheme.cf();
    const graph = completeGraph(5);
    const array = new Array(n).fill(0);
    expect(() => scheme(graph, array)).toThrow(/strategies must have same size/);
});

test('cf scheme - payoffs not a matrix', function() {
    const scheme = Scheme.cf();
    const graph = completeGraph(5);
    const array = new Array(5).fill(0);
    expect(() => scheme(graph, array, 'string')).toThrow(/payoffs must be a matrix/);
    expect(() => scheme(graph, array, 5)).toThrow(/payoffs must be a matrix/);
    expect(() => scheme(graph, array, [])).toThrow(/payoffs must be a matrix/);
    expect(() => scheme(graph, array, [1, 2])).toThrow(/payoffs must be a matrix/);
});

test.each([4, 6])('cf scheme - payoffs incorrect size', function(n) {
    const scheme = Scheme.cf();
    const graph = completeGraph(5);
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

test('imitation scheme - strategies not array', function() {
    const scheme = Scheme.imitation();
    const graph = completeGraph(5);
    expect(() => scheme(graph, 'string')).toThrow(/strategies must be an array/);
    expect(() => scheme(graph, 5)).toThrow(/strategies must be an array/);
});

test.each([0, 4, 6])('imitation scheme - strategies invalid length', function(n) {
    const scheme = Scheme.imitation();
    const graph = completeGraph(5);
    const array = new Array(n).fill(0);
    expect(() => scheme(graph, array)).toThrow(/strategies must have same size/);
});

test('imitation scheme - payoffs not a matrix', function() {
    const scheme = Scheme.imitation();
    const graph = completeGraph(5);
    const array = new Array(5).fill(0);
    expect(() => scheme(graph, array, 'string')).toThrow(/payoffs must be a matrix/);
    expect(() => scheme(graph, array, 5)).toThrow(/payoffs must be a matrix/);
    expect(() => scheme(graph, array, [])).toThrow(/payoffs must be a matrix/);
    expect(() => scheme(graph, array, [1, 2])).toThrow(/payoffs must be a matrix/);
});

test.each([4, 6])('imitation scheme - payoffs incorrect size', function(n) {
    const scheme = Scheme.imitation();
    const graph = completeGraph(5);
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
