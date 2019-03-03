// # Gomen Module

// The _Gomen_ module provides access to the following components:
// * [Two Player Games](game.html)
// * [Arenas](arena.html)
// * [Rule](rule.html)
module.exports = {
    TwoPlayerGame: require('./src/game.js'),
    Arena: require('./src/arena.js'),
    Rule: require('./src/rule.js')
};
