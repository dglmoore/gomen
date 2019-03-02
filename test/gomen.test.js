const gomen = require('../main.js');

test('Exposes TwoPlayerGame', function() {
    expect(gomen.TwoPlayerGame).toBeDefined();
});

test('Exposes Arena', function() {
    expect(gomen.Arena).toBeDefined();
});
