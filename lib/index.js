// # Gomen Module

// The _Gomen_ module provides access to the following components:
// * [Two Player Games](game.html)
// * [Arenas](arena.html)
// * [Rule](rule.html)
// * [Scheme](scheme.html)
// * [jsnx](graph.html)
module.exports = {
    TwoPlayerGame: require('./Game').TwoPlayerGame,
    Arena: require('./arena'),
    Rule: require('./Rule'),
    Scheme: require('./scheme'),
    jsnx: require('./graph')
};
