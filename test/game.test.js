const { Game } = require('../main.js');

test('Game can add', function() {
    expect(Game.add(1, 2)).toBe(3);
});
