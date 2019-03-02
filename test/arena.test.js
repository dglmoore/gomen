const { Arena } = require('../main.js');

test('Arenas can add', function() {
    expect(Arena.add(1,2)).toBe(3);
});
